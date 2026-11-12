import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { Lightbulb, Volume2, VolumeX, X } from 'lucide-react';
import { LESSONS_DATA } from '../data/gameData';
import { AvatarGraphic, HeartIcon, VisualMultiplicationGroups } from './HeroSvgs';
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
  const [showClue, setShowClue] = useState(false);
  const [comboCount, setComboCount] = useState(0);
  const [mistakesCount, setMistakesCount] = useState(0);
  const [feedback, setFeedback] = useState(null); // { isCorrect, title, msg }

  const currentQuestion = queue[qIndex];
  const progressPercent = queue.length > 0 ? Math.round((qIndex / queue.length) * 100) : 0;

  // Keep spoken voice, avatar portrait, and tutor name 100% consistent
  const tutorKey = voicePersona === 'maya' ? 'maya' : 'leo';
  const tutorName = tutorKey === 'maya' ? 'Maya' : 'Léo';

  useEffect(() => {
    setShowClue(false);
    if (currentQuestion) {
      const timer = setTimeout(() => {
        speakHeroLine(currentQuestion.q, {
          clipKey: `q_${levelNum}_${qIndex}`,
        });
      }, 260);
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

    if (isCorrect) {
      const nextCombo = comboCount + 1;
      setComboCount(nextCombo);
      const isComboBonus = nextCombo >= 3;
      const earnedXp = isComboBonus ? 15 : 10;
      onAwardXp(earnedXp);

      if (isComboBonus) {
        playLightningSound();
      } else {
        playSuccessSound();
      }

      try {
        confetti({ particleCount: isComboBonus ? 75 : 48, spread: 70, origin: { y: 0.85 } });
      } catch {
        // ignore confetti error
      }

      const praiseLine = getRandomPraise(isComboBonus, tutorKey);
      speakHeroLine(praiseLine);

      setFeedback({
        isCorrect: true,
        title: isComboBonus
          ? `🔥 Sequência ×${nextCombo}! +${earnedXp} XP`
          : `🎉 Resposta certa! +${earnedXp} XP`,
        msg: currentQuestion.explain || praiseLine,
      });
    } else {
      setComboCount(0);
      setMistakesCount((prev) => prev + 1);
      playErrorSound();
      onWrongAnswer();

      if (!isReforco && !retryPool.some((item) => item.q === currentQuestion.q)) {
        setRetryPool((prev) => [...prev, currentQuestion]);
      }

      const hint =
        currentQuestion.clue ||
        'Vamos pensar juntos passo a passo. Você já já tenta essa de novo!';
      speakHeroLine(`Quase lá! ${hint}`);

      setFeedback({
        isCorrect: false,
        title: 'Quase lá!',
        msg: hint,
      });
    }
  };

  const handleContinue = () => {
    playPopSound();
    const nextIdx = qIndex + 1;
    setFeedback(null);
    setSelectedVal(null);
    setShowClue(false);

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
        'Hora da revisão!',
        'Vamos tentar novamente as contas que ficaram em dúvida!'
      );
      speakHeroLine('Hora da revisão! Vamos tentar novamente!');
      return;
    }

    onLessonComplete(levelNum, mistakesCount);
  };

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

  return (
    <div className="fixed inset-0 z-40 bg-duo-cream overflow-y-auto">
      <div className="max-w-2xl mx-auto min-h-full flex flex-col px-4 sm:px-6 pt-3 sm:pt-5 pb-44 sm:pb-48">
        {/* Top Bar */}
        <div className="flex items-center gap-2.5 sm:gap-4 mb-3.5 sm:mb-5">
          <button
            type="button"
            onClick={onRequestExit}
            title="Sair da lição"
            aria-label="Sair da lição"
            className="w-9 h-9 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-200/60 hover:text-slate-600 transition-colors shrink-0"
          >
            <X className="w-5 h-5" strokeWidth={3} />
          </button>

          <div className="flex-1 h-4 bg-slate-200 rounded-full overflow-hidden">
            <div
              style={{ width: `${Math.max(8, progressPercent)}%` }}
              className="relative h-full bg-duo-green rounded-full transition-all duration-300"
            >
              <span className="absolute top-1 left-2 right-2 h-1 bg-white/40 rounded-full" />
            </div>
          </div>

          <button
            type="button"
            onClick={onToggleVoicePersona}
            title="Trocar guia da lição (Léo ou Maya)"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border-2 border-slate-200 border-b-4 text-xs font-extrabold text-duo-ink hover:border-duo-blue transition-colors"
          >
            <span>{tutorName}</span>
          </button>

          <div className="flex items-center gap-1 font-display font-extrabold text-sm sm:text-base text-duo-red bg-white px-2.5 sm:px-3 py-1 rounded-full border-2 border-rose-100 shrink-0">
            <HeartIcon className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>{hero.hearts}</span>
          </div>
        </div>

        {/* Stage 10 Final Boss Compact Banner */}
        {levelNum === 10 && (
          <div className="flex items-center gap-2.5 bg-purple-50 border-2 border-purple-300 rounded-2xl px-3.5 py-2 mb-3">
            <img
              src="/tabuada-assets/monstro-oficial.png"
              alt="Monstrinho dos Números"
              className="w-9 h-9 sm:w-11 sm:h-11 object-contain shrink-0"
            />
            <span className="font-display font-extrabold text-xs sm:text-sm text-purple-800">
              Duelo Amigável: vença para o Monstrinho entrar na Liga!
            </span>
          </div>
        )}

        {/* Tutor Bubble (Zero Spoiler: reveals clue ONLY when child taps "Pedir pista") */}
        <div className="flex items-start gap-3 mb-4 sm:mb-6">
          <div className="w-13 h-13 sm:w-16 sm:h-16 w-12 h-12 rounded-full bg-amber-100 border-[3px] border-amber-400 flex items-center justify-center overflow-hidden shrink-0 shadow-sm">
            <AvatarGraphic avatarKey={tutorKey} className="w-full h-full" />
          </div>

          <div className="relative flex-1 bg-white border-2 border-slate-200 rounded-2xl px-3.5 py-2.5 sm:px-4 sm:py-3 shadow-sm">
            <span className="absolute -left-[9px] top-4 w-0 h-0 border-t-[8px] border-b-[8px] border-r-[9px] border-t-transparent border-b-transparent border-r-slate-200" />
            <span className="absolute -left-[6px] top-[17px] w-0 h-0 border-t-[7px] border-b-[7px] border-r-[7px] border-t-transparent border-b-transparent border-r-white" />

            <div className="flex items-center justify-between gap-2">
              <span className="font-display font-extrabold text-[11px] sm:text-xs uppercase tracking-wider text-duo-blue">
                {isReforco
                  ? `🎯 Revisão com ${tutorName}`
                  : `${tutorName} • ${baseLesson.title.split('•')[0].trim()}`}
              </span>
              {currentQuestion.clue && !showClue && !feedback && (
                <button
                  type="button"
                  onClick={() => {
                    playPopSound();
                    setShowClue(true);
                  }}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 font-display font-bold text-[11px] hover:bg-amber-100 shrink-0"
                >
                  <Lightbulb className="w-3.5 h-3.5" />
                  <span>Pista</span>
                </button>
              )}
            </div>

            <p className="font-body font-bold text-xs sm:text-sm text-slate-600 mt-1">
              {showClue
                ? currentQuestion.clue
                : `Desafio ${qIndex + 1} de ${queue.length} — calcule com calma!`}
            </p>
          </div>
        </div>

        {/* Question Display + Audio Replay */}
        <div className="flex items-center justify-between gap-3 mb-3 sm:mb-5">
          <h1 className="font-display font-extrabold text-xl sm:text-3xl text-duo-ink leading-snug">
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
            aria-label={soundEnabled ? 'Ouvir pergunta' : 'Som desativado'}
            title={soundEnabled ? 'Ouvir pergunta' : 'Som desativado'}
            className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl border-2 border-b-[5px] flex items-center justify-center shrink-0 transition-transform active:translate-y-1 ${
              soundEnabled
                ? 'bg-sky-50 border-duo-blue text-duo-blueDark cursor-pointer'
                : 'bg-slate-100 border-slate-300 text-slate-400 cursor-not-allowed'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile quick tutor toggle */}
        <div className="flex sm:hidden items-center justify-between -mt-1 mb-3">
          <span className="text-[11px] font-bold text-slate-400">
            {comboCount >= 2 ? `🔥 ${comboCount} acertos seguidos` : 'Toque no número certo'}
          </span>
          <button
            type="button"
            onClick={onToggleVoicePersona}
            className="text-xs font-extrabold text-slate-600 bg-white border border-slate-200 rounded-full px-3 py-1"
          >
            Guia: {tutorName} (trocar)
          </button>
        </div>

        {/* Concrete Visual Grouping Helper for Younger Kids */}
        {currentQuestion.visual && (
          <VisualMultiplicationGroups
            groups={currentQuestion.visual.groups}
            perGroup={currentQuestion.visual.perGroup}
            icon={currentQuestion.visual.icon}
          />
        )}

        {/* Options 2x2 Tactile Grid */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 my-auto pb-4">
          {currentQuestion.options.map((opt, idx) => {
            const isSelected = selectedVal === opt;
            return (
              <button
                key={opt}
                type="button"
                disabled={Boolean(feedback)}
                onClick={() => handleSelectOption(opt)}
                className={`toy-btn relative min-h-[76px] sm:min-h-[96px] rounded-[22px] border-2 px-3 py-3 font-display font-extrabold text-2xl sm:text-3xl transition-colors ${
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
          <div className="fixed bottom-0 left-0 right-0 bg-duo-cream/95 backdrop-blur border-t-2 border-duo-creamBorder p-3.5 sm:p-4 z-40">
            <div className="max-w-2xl mx-auto">
              <button
                type="button"
                disabled={selectedVal === null}
                onClick={handleVerify}
                className={`toy-btn w-full py-3.5 sm:py-4 rounded-2xl text-base sm:text-lg uppercase ${
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
            className={`fixed bottom-0 left-0 right-0 z-50 border-t-[3px] px-4 sm:px-6 py-4 sm:py-5 animate-popIn ${
              feedback.isCorrect
                ? 'bg-[#D7FFB8] border-duo-green'
                : 'bg-[#FFDFE0] border-duo-red'
            }`}
          >
            <div className="max-w-2xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
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
