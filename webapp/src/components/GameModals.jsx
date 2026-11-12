import React, { useState } from 'react';
import { BrandLogo, KawaiiGoldStar } from './HeroSvgs';

export function GameOverModal({ isOpen, onRecoverTraining, onRecoverGems, onClose }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 bg-slate-900/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-[440px] bg-white rounded-[28px] border-[3px] border-slate-200 border-b-[8px] border-b-slate-300 p-5 sm:p-6 text-center shadow-2xl animate-popIn">
        <div className="text-5xl mb-2">💔</div>
        <h2 className="font-display font-extrabold text-2xl text-duo-red">
          Acabaram as Vidas!
        </h2>
        <p className="font-body text-sm text-slate-500 font-semibold mt-1.5 mb-5">
          Sem problema! Todo campeão precisa de fôlego. Escolha como recuperar suas vidas:
        </p>

        <div className="space-y-2.5">
          <button
            type="button"
            onClick={onRecoverTraining}
            className="toy-btn w-full py-3.5 rounded-2xl bg-duo-green border-b-[6px] border-duo-greenDark text-white text-sm uppercase"
          >
            ⚡ Treino Rápido (+3 ❤️ Grátis)
          </button>
          <button
            type="button"
            onClick={onRecoverGems}
            className="toy-btn w-full py-3.5 rounded-2xl bg-duo-blue border-b-[6px] border-duo-blueDark text-white text-sm uppercase"
          >
            💎 Recarregar 5 Vidas (20 Gemas)
          </button>
          <button
            type="button"
            onClick={onClose}
            className="toy-btn w-full py-3 rounded-2xl bg-white border-2 border-slate-300 border-b-[5px] text-slate-600 text-xs uppercase"
          >
            Voltar ao Mapa
          </button>
        </div>
      </div>
    </div>
  );
}

export function VictoryModal({
  isOpen,
  completedLevel,
  earnedStars = 3,
  gemsEarned = 15,
  xpEarned = 30,
  onClose,
}) {
  if (!isOpen) return null;
  const isBossVictory = completedLevel === 10;
  return (
    <div className="fixed inset-0 z-50 bg-slate-900/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-[440px] bg-white rounded-[28px] border-[3px] border-slate-200 border-b-[8px] border-b-slate-300 p-5 sm:p-6 text-center shadow-2xl animate-popIn">
        <div className="flex justify-center mb-3">
          <BrandLogo />
        </div>
        <div className="text-4xl mb-1">{isBossVictory ? '🏆' : '🎉'}</div>
        <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-duo-greenDark">
          {isBossVictory ? 'LIGA CONCLUÍDA!' : 'FASE CONCLUÍDA!'}
        </h2>
        <p className="font-body text-sm sm:text-base text-slate-500 font-semibold mt-1 mb-3">
          {isBossVictory
            ? 'Você venceu o desafio final e o Monstrinho entrou para a Liga dos Heróis!'
            : 'Excelente trabalho! Você avançou mais um passo na tabuada.'}
        </p>

        <div className="flex items-center justify-center gap-2 mb-4">
          {[1, 2, 3].map((idx) => (
            <KawaiiGoldStar key={idx} filled={idx <= earnedStars} className="w-9 h-9" />
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl py-3 px-4">
            <div className="font-display font-extrabold text-xl text-amber-700">
              +{gemsEarned} 💎
            </div>
            <div className="font-body text-xs font-bold text-amber-800">Gemas</div>
          </div>
          <div className="bg-sky-50 border-2 border-sky-200 rounded-2xl py-3 px-4">
            <div className="font-display font-extrabold text-xl text-sky-700">
              +{xpEarned} XP
            </div>
            <div className="font-body text-xs font-bold text-sky-800">Experiência</div>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="toy-btn w-full py-4 rounded-2xl bg-duo-green border-b-[6px] border-duo-greenDark text-white text-base uppercase"
        >
          Continuar Aventura! ➔
        </button>
      </div>
    </div>
  );
}

export function ConfirmExitModal({ isOpen, onConfirmExit, onCancel }) {
  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onCancel}
    >
      <div
        className="w-full max-w-[390px] bg-white rounded-[26px] border-[3px] border-slate-200 border-b-[8px] border-b-slate-300 p-6 text-center shadow-2xl animate-popIn"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-4xl mb-2">🛡️</div>
        <h3 className="font-display font-extrabold text-xl text-duo-ink">
          Sair desta fase?
        </h3>
        <p className="font-body text-sm text-slate-500 font-semibold mt-1 mb-5">
          Seu progresso desta rodada será reiniciado se você voltar para o mapa agora.
        </p>
        <div className="space-y-2.5">
          <button
            type="button"
            onClick={onCancel}
            className="toy-btn w-full py-3 rounded-2xl bg-duo-blue border-b-[5px] border-duo-blueDark text-white text-sm uppercase"
          >
            Continuar Jogando
          </button>
          <button
            type="button"
            onClick={onConfirmExit}
            className="toy-btn w-full py-2.5 rounded-2xl bg-white border-2 border-rose-200 border-b-[5px] border-b-rose-300 text-duo-red text-xs uppercase"
          >
            Voltar para o Mapa
          </button>
        </div>
      </div>
    </div>
  );
}

/** Friendly adult challenge gate before parent-only account / VIP purchase screens */
export function ParentalGateModal({ isOpen, onPassed, onCancel }) {
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (answer.trim() === '48') {
      setAnswer('');
      setError(false);
      onPassed();
    } else {
      setError(true);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/75 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onCancel}
    >
      <div
        className="w-full max-w-[400px] bg-white rounded-[26px] border-[3px] border-slate-200 border-b-[8px] border-b-slate-300 p-5 sm:p-6 text-center shadow-2xl animate-popIn"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-3xl mb-2">🔒</div>
        <h3 className="font-display font-extrabold text-xl text-duo-ink">
          Área dos Pais
        </h3>
        <p className="font-body text-xs sm:text-sm text-slate-500 font-semibold mt-1 mb-4">
          Para continuar, peça a um adulto para responder: quanto é <strong>doze vezes quatro</strong>?
        </p>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            inputMode="numeric"
            value={answer}
            onChange={(e) => {
              setAnswer(e.target.value);
              setError(false);
            }}
            placeholder="Digite o resultado"
            autoFocus
            className="w-full px-4 py-3 text-center font-display font-extrabold text-lg rounded-2xl bg-slate-50 border-2 border-slate-200 focus:border-duo-purple outline-none"
          />
          {error && (
            <p className="font-body text-xs font-bold text-duo-red">
              Ops, confira a resposta com um adulto para entrar.
            </p>
          )}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onCancel}
              className="toy-btn flex-1 py-2.5 rounded-2xl bg-slate-100 border-b-[4px] border-slate-300 text-slate-600 text-xs uppercase"
            >
              Voltar
            </button>
            <button
              type="submit"
              className="toy-btn flex-1 py-2.5 rounded-2xl bg-duo-purple border-b-[4px] border-duo-purpleDark text-white text-xs uppercase"
            >
              Entrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function HeroToast({ toast, onDismiss }) {
  if (!toast) return null;
  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[60] w-[calc(100%-28px)] max-w-md pointer-events-auto animate-popIn">
      <div
        onClick={onDismiss}
        role="status"
        className="cursor-pointer bg-white border-2 border-amber-300 border-b-[6px] border-b-amber-400 rounded-2xl px-4 py-3 shadow-xl flex items-center gap-3"
      >
        <span className="text-2xl shrink-0">{toast.emoji || '⭐'}</span>
        <div className="min-w-0 flex-1">
          <div className="font-display font-extrabold text-sm text-duo-ink truncate">
            {toast.title}
          </div>
          {toast.subtitle && (
            <div className="font-body text-xs font-bold text-slate-500">
              {toast.subtitle}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
