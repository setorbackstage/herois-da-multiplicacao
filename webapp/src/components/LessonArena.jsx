import React, { useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import { LESSONS_DATA } from '../data/gameData';
import { AvatarGraphic, HeartIcon } from './HeroSvgs';
import {
  getRandomPraise,
  playErrorSound,
  playLightningSound,
  playPopSound,
  playSuccessSound,
  speakHeroLine,
  stopAllSpeech,
} from '../utils/heroAudio';

export default function LessonArena({
  levelNum,
  hero,
  soundEnabled,
  voicePersona,
  onToggleVoicePersona,
  onWrongAnswer,
  onAwardXp,
  onLessonComplete,
  onRequestExit,
  onNotifyToast,
}) {
  const baseLesson = LESSONS_DATA[levelNum] || LESSONS_DATA[1];
  const [queue, setQueue] = useState(() => [...baseLesson.questions]);
  const [qIndex, setQIndex] = useState(0);
  const [isReforco, setIsReforco] = useState(false);
  const [retryPool, setRetryPool] = useState([]);
  const [selectedVal, setSelectedVal] = useState(null);
  const [feedback, setFeedback] = useState(null); // { isCorrect, title, msg }
  const qStartTimeRef = useRef(Date.now());

  const currentQuestion = queue[qIndex];
  const progressPercent = queue.length > 0 ? Math.round((qIndex / queue.length) * 100) : 0;

  useEffect(() => {
    qStartTimeRef.current = Date.now();
    if (currentQuestion) {
      const timer = setTimeout(() => {
        speakHeroLine(currentQuestion.q, {
          clipKey: `q_${levelNum}_${qIndex}`,
        });
      }, 280);
      return () => clearTimeout(timer);
    }
    return undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qIndex, isReforco, levelNum]);

  useEffect(() => () => stopAllSpeech(), []);

  const handleSelectOption = (val) => {
    if (feedback) return;
    setSelectedVal(val);
    playPopSound();
  };

  const handleVerify = () => {
    if (selectedVal === null || !currentQuestion || feedback) return;
    const isCorrect = selectedVal === currentQuestion.correct;
    const elapsedSec = (Date.now() - qStartTimeRef.current) / 1000;

    if (isCorrect) {
      const isLightning = elapsedSec <= 5;
      const earnedXp = isLightning ? 15 : 10;
      onAwardXp(earnedXp);

      if (isLightning) {
        playLightningSound();
      } else {
        playSuccessSound();
      }

      try {
        confetti({ particleCount: 55, spread: 70, origin: { y: 0.85 } });
      } catch {
        // ignore confetti error
      }

      const praiseLine = getRandomPraise(isLightning, voicePersona);
      speakHeroLine(praiseLine);

      setFeedback({
        isCorrect: true,
        title: isLightning
          ? `⚡ RESPOSTA RELÂMPAGO! +${earnedXp} XP`
          : `🎉 Resposta Certa! +${earnedXp} XP`,
        msg: praiseLine,
      });
    } else {
      playErrorSound();
      onWrongAnswer();

      if (!isReforco && !retryPool.some((item) => item.q === currentQuestion.q)) {
        setRetryPool((prev) => [...prev, currentQuestion]);
      }

      const hint =
        currentQuestion.tip || 'Todo herói aprende praticando. Vamos tentar de novo!';
      speakHeroLine(`Quase lá! ${hint}`);

      setFeedback({
        isCorrect: false,
        title: 'Quase lá, herói!',
        msg: hint,
      });
    }
  };

  const handleContinue = () => {
    playPopSound();
    const nextIdx = qIndex + 1;
    setFeedback(null);
    setSelectedVal(null);

    if (nextIdx < queue.length) {
      setQIndex(nextIdx);
      return;
    }

    if (retryPool.length > 0 && !isReforco) {
      setIsReforco(true);
      setQueue([...retryPool]);
      setRetryPool([]);
      setQIndex(0);
      onNotifyToast(
        '🎯',
        'Hora do Reforço de Ouro!',
        'Vamos revisar as questões com dúvida para conquistar 100%!'
      );
      speakHeroLine('Hora do reforço de ouro! Vamos dominar todas as dúvidas!');
      return;
    }

    onLessonComplete(levelNum);
  };

  // Keyboard shortcuts: 1-4 select option, Enter verify/continue, Escape pause modal
  useEffect(() => {
    const onKeyDown = (e) => {
      if (['1', '2', '3', '4'].includes(e.key) && !feedback && currentQuestion) {
        const idx = parseInt(e.key, 10) - 1;
        if (currentQuestion.options[idx] !== undefined) {
          handleSelectOption(currentQuestion.options[idx]);
        }
      } else if (e.key === 'Enter') {
        if (feedback) {
          handleContinue();
        } else if (selectedVal !== null) {
          handleVerify();
        }
      } else if (e.key === 'Escape') {
        onRequestExit();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [feedback, selectedVal, currentQuestion, qIndex, queue.length, retryPool, isReforco]);

  if (!currentQuestion) return null;

  const tutorName =
    hero.avatar === 'maya' ? 'Maya' : hero.avatar === 'leo' ? 'Léo' : hero.name;

  return (
    <div className="fixed inset-0 z-40 bg-duo-cream overflow-y-auto">
      <div className="max-w-2xl mx-auto min-h-full flex flex-col px-4 sm:px-6 pt-5 pb-36">
        {/* Top Bar */}
        <div className="flex items-center gap-3 sm:gap-4 mb-5">
          <button
            type="button"
            onClick={onRequestExit}
            title="Sair da lição"
            className="w-9 h-9 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-200/60 hover:text-slate-600 font-bold text-xl transition-colors"
          >
            ✕
          </button>

          <div className="flex-1 h-4 bg-slate-200 rounded-full overflow-hidden">
            <div
              style={{ width: `${Math.max(8, progressPercent)}%` }}
              className="relative h-full bg-duo-green rounded-full transition-all duration-300"
            >
              <span className="absolute top-1 left-2 right-2 h-1 bg-white/40 rounded-full" />
            </div>
          </div>

          {/* Voice Persona Quick Chip */}
          <button
            type="button"
            onClick={onToggleVoicePersona}
            title="Trocar voz heroica (Léo / Maya)"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border-2 border-slate-200 border-b-4 text-xs font-extrabold text-duo-ink hover:border-duo-blue transition-colors"
          >
            <span>{voicePersona === 'maya' ? '🌟 Voz: Maya' : '⚡ Voz: Léo'}</span>
          </button>

          <div className="flex items-center gap-1.5 font-display font-extrabold text-base text-duo-red bg-white px-3 py-1 rounded-full border-2 border-rose-100">
            <HeartIcon className="w-5 h-5" />
            <span>{hero.hearts}</span>
          </div>
        </div>

        {/* Stage 10 Final Boss Banner */}
        {levelNum === 10 && (
          <div className="flex items-center gap-3 bg-purple-50 border-2 border-purple-300 rounded-2xl px-4 py-2.5 mb-4">
            <img
              src="/tabuada-assets/monstro-oficial.png"
              alt="Monstrinho dos Números"
              className="w-11 h-11 object-contain"
            />
            <span className="font-display font-extrabold text-xs sm:text-sm text-purple-800 uppercase tracking-wide">
              Batalha Final: Derrote o Monstrinho dos Números!
            </span>
          </div>
        )}

        {/* Tutor Avatar & Speech Bubble */}
        <div className="flex items-start gap-3 sm:gap-4 mb-7">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-amber-100 border-[3px] border-amber-400 flex items-center justify-center overflow-hidden shrink-0 shadow-sm">
            <AvatarGraphic avatarKey={hero.avatar} className="w-full h-full" />
          </div>

          <div className="relative flex-1 bg-white border-2 border-slate-200 rounded-2xl px-4 py-3 shadow-sm">
            <span className="absolute -left-[9px] top-5 w-0 h-0 border-t-[8px] border-b-[8px] border-r-[9px] border-t-transparent border-b-transparent border-r-slate-200" />
            <span className="absolute -left-[6px] top-[21px] w-0 h-0 border-t-[7px] border-b-[7px] border-r-[7px] border-t-transparent border-b-transparent border-r-white" />
            <div className="font-display font-extrabold text-[11px] sm:text-xs uppercase tracking-wider text-duo-blue">
              {isReforco ? '🎯 Reforço de Ouro' : baseLesson.title}
            </div>
            <p className="font-body font-bold text-sm sm:text-base text-slate-600 mt-0.5">
              {currentQuestion.tip || `Dica de ${tutorName}: Você consegue, herói!`}
            </p>
          </div>
        </div>

        {/* Question Display + Audio Replay */}
        <div className="flex items-center justify-between gap-3 mb-7">
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-duo-ink leading-snug">
            {currentQuestion.q}
          </h1>
          <button
            type="button"
            onClick={() =>
              speakHeroLine(currentQuestion.q, {
                clipKey: `q_${levelNum}_${qIndex}`,
              })
            }
            disabled={!soundEnabled}
            title={soundEnabled ? 'Ouvir pergunta com voz heroica' : 'Som desativado'}
            className={`w-12 h-12 rounded-2xl border-2 border-b-[5px] flex items-center justify-center text-xl shrink-0 transition-transform active:translate-y-1 ${
              soundEnabled
                ? 'bg-sky-50 border-duo-blue text-duo-blueDark cursor-pointer'
                : 'bg-slate-100 border-slate-300 text-slate-400 cursor-not-allowed'
            }`}
          >
            {soundEnabled ? '🔊' : '🔇'}
          </button>
        </div>

        {/* Mobile quick voice persona switch */}
        <div className="flex sm:hidden items-center justify-end -mt-3 mb-4">
          <button
            type="button"
            onClick={onToggleVoicePersona}
            className="text-xs font-extrabold text-slate-500 bg-white border border-slate-200 rounded-full px-3 py-1"
          >
            {voicePersona === 'maya' ? '🌟 Voz: Maya (trocar)' : '⚡ Voz: Léo (trocar)'}
          </button>
        </div>

        {/* Options 2x2 Tactile Grid */}
        <div className="grid grid-cols-2 gap-3.5 sm:gap-4 my-auto pb-6">
          {currentQuestion.options.map((opt, idx) => {
            const isSelected = selectedVal === opt;
            return (
              <button
                key={opt}
                type="button"
                disabled={Boolean(feedback)}
                onClick={() => handleSelectOption(opt)}
                className={`toy-btn relative min-h-[88px] sm:min-h-[104px] rounded-[22px] border-2 px-3 py-4 font-display font-extrabold text-2xl sm:text-3xl transition-all ${
                  isSelected
                    ? 'bg-sky-50 border-duo-blue border-b-[7px] border-b-duo-blueDark text-sky-700'
                    : 'bg-white border-slate-200 border-b-[7px] border-b-slate-300 text-duo-ink hover:border-sky-300'
                }`}
              >
                <span className="absolute top-2 left-3 font-body text-xs font-bold text-slate-400">
                  {idx + 1}
                </span>
                {opt}
              </button>
            );
          })}
        </div>

        {/* Bottom Verify Bar */}
        {!feedback && (
          <div className="fixed bottom-0 left-0 right-0 bg-duo-cream/95 backdrop-blur border-t-2 border-duo-creamBorder p-4 z-40">
            <div className="max-w-2xl mx-auto">
              <button
                type="button"
                disabled={selectedVal === null}
                onClick={handleVerify}
                className={`toy-btn w-full py-4 rounded-2xl text-base sm:text-lg uppercase ${
                  selectedVal !== null
                    ? 'bg-duo-green border-b-[6px] border-duo-greenDark text-white'
                    : 'bg-slate-200 border-b-[6px] border-slate-300 text-slate-400 cursor-not-allowed'
                }`}
              >
                Verificar Resposta
              </button>
            </div>
          </div>
        )}

        {/* Sliding Full-Width Answer Feedback Drawer */}
        {feedback && (
          <div
            className={`fixed bottom-0 left-0 right-0 z-50 border-t-[3px] px-4 sm:px-6 py-5 animate-popIn ${
              feedback.isCorrect
                ? 'bg-[#D7FFB8] border-duo-green'
                : 'bg-[#FFDFE0] border-duo-red'
            }`}
          >
            <div className="max-w-2xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <div
                  className={`font-display font-extrabold text-lg sm:text-xl ${
                    feedback.isCorrect ? 'text-[#2B7800]' : 'text-duo-redDark'
                  }`}
                >
                  {feedback.title}
                </div>
                <p className="font-body font-bold text-sm sm:text-base text-slate-700 mt-0.5">
                  {feedback.msg}
                </p>
              </div>
              <button
                type="button"
                onClick={handleContinue}
                className={`toy-btn sm:w-52 w-full py-3.5 px-6 rounded-2xl text-base uppercase text-white shrink-0 ${
                  feedback.isCorrect
                    ? 'bg-duo-green border-b-[6px] border-duo-greenDark'
                    : 'bg-duo-blue border-b-[6px] border-duo-blueDark'
                }`}
              >
                Continuar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
