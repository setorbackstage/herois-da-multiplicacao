import React from 'react';

export function GameOverModal({ isOpen, onRecoverTraining, onRecoverGems, onClose }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 bg-slate-900/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-[440px] bg-white rounded-[28px] border-[3px] border-slate-200 border-b-[8px] border-b-slate-300 p-6 text-center shadow-2xl animate-popIn">
        <div className="text-5xl mb-2">💔</div>
        <h2 className="font-display font-extrabold text-2xl text-duo-red">
          Ficaram sem Vidas!
        </h2>
        <p className="font-body text-sm text-slate-500 font-semibold mt-1.5 mb-5">
          Não desanime! O Léo e a Maya estão aqui para te apoiar. Escolha como recarregar suas forças:
        </p>

        <div className="space-y-2.5">
          <button
            type="button"
            onClick={onRecoverTraining}
            className="toy-btn w-full py-3.5 rounded-2xl bg-duo-green border-b-[6px] border-duo-greenDark text-white text-sm uppercase"
          >
            ⚡ Treino Rápido com o Léo (+3 ❤️ Grátis)
          </button>
          <button
            type="button"
            onClick={onRecoverGems}
            className="toy-btn w-full py-3.5 rounded-2xl bg-duo-blue border-b-[6px] border-duo-blueDark text-white text-sm uppercase"
          >
            💎 Recarregar Tudo (20 Gemas)
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

export function VictoryModal({ isOpen, completedLevel, onClose }) {
  if (!isOpen) return null;
  const isBossVictory = completedLevel === 10;
  return (
    <div className="fixed inset-0 z-50 bg-slate-900/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-[440px] bg-white rounded-[28px] border-[3px] border-slate-200 border-b-[8px] border-b-slate-300 p-6 text-center shadow-2xl animate-popIn">
        <img
          src="/tabuada-assets/logo-transparente.png"
          alt="Heróis da Multiplicação"
          className="h-11 mx-auto object-contain mb-2"
        />
        <div className="text-5xl mb-1">{isBossVictory ? '👑' : '🎉'}</div>
        <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-duo-greenDark">
          {isBossVictory ? 'CHEFÃO DERROTADO!' : 'MISSÃO CUMPRIDA!'}
        </h2>
        <p className="font-body text-sm sm:text-base text-slate-500 font-semibold mt-1.5 mb-5">
          {isBossVictory
            ? 'O Monstrinho virou amigo da Liga dos Heróis! Você dominou a tabuada!'
            : 'Parabéns! O Léo e a Maya têm muito orgulho da sua conquista!'}
        </p>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl py-3 px-4">
            <div className="font-display font-extrabold text-xl text-amber-700">+15 💎</div>
            <div className="font-body text-xs font-bold text-amber-800">Gemas</div>
          </div>
          <div className="bg-sky-50 border-2 border-sky-200 rounded-2xl py-3 px-4">
            <div className="font-display font-extrabold text-xl text-sky-700">+30 XP</div>
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
          Pausar esta missão?
        </h3>
        <p className="font-body text-sm text-slate-500 font-semibold mt-1 mb-5">
          Seu progresso desta fase será reiniciado se você voltar para o mapa agora.
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
            Sair para o Mapa
          </button>
        </div>
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
