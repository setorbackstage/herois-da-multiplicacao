import React, { useEffect, useState } from 'react';
import { AVATAR_CATALOG } from '../data/gameData';
import { getHeroRankTitle } from '../utils/storage';
import { AvatarGraphic } from './HeroSvgs';
import { playPopSound } from '../utils/heroAudio';

export default function HeroProfileModal({
  isOpen,
  hero,
  voicePersona,
  onSetVoicePersona,
  onClose,
  onChangeAvatar,
  onRenameHero,
  onSwitchHero,
}) {
  const [nameDraft, setNameDraft] = useState(hero?.name || '');

  useEffect(() => {
    if (isOpen && hero) {
      setNameDraft(hero.name);
    }
  }, [isOpen, hero]);

  useEffect(() => {
    if (!isOpen) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen || !hero) return null;

  const handleSaveName = (e) => {
    e.preventDefault();
    const cleaned = nameDraft.trim();
    if (cleaned) {
      onRenameHero(cleaned);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[490px] max-h-[92vh] overflow-y-auto bg-white rounded-[28px] border-[3px] border-slate-200 border-b-[8px] border-b-slate-300 p-6 shadow-2xl animate-popIn"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar quartel do herói"
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 border-2 border-slate-300 border-b-4 flex items-center justify-center text-slate-500 font-bold hover:bg-slate-200 active:translate-y-0.5"
        >
          ✕
        </button>

        {/* Hero Identity Header */}
        <div className="flex flex-col items-center text-center mb-5">
          <img
            src="/tabuada-assets/logo-transparente.png"
            alt="Heróis da Multiplicação"
            className="h-9 object-contain mb-2"
          />
          <div className="w-24 h-24 rounded-full bg-amber-100 border-4 border-amber-400 shadow-lg overflow-hidden mb-2.5 flex items-center justify-center">
            <AvatarGraphic avatarKey={hero.avatar} className="w-full h-full" />
          </div>
          <h2 className="font-display font-extrabold text-2xl text-duo-ink">
            {hero.name}
          </h2>
          <p className="font-body text-xs sm:text-sm font-bold text-slate-500">
            {getHeroRankTitle(hero.unlockedLevel)} • Fase {hero.unlockedLevel}
          </p>
        </div>

        {/* Inline Hero Name Editor */}
        <form onSubmit={handleSaveName} className="flex gap-2 mb-5">
          <input
            type="text"
            maxLength={16}
            value={nameDraft}
            onChange={(e) => setNameDraft(e.target.value)}
            placeholder="Nome do Herói"
            className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-50 border-2 border-slate-200 focus:border-duo-blue focus:bg-white outline-none font-display font-bold text-sm text-duo-ink"
          />
          <button
            type="submit"
            className="toy-btn px-4 py-2 rounded-xl bg-duo-blue border-b-4 border-duo-blueDark text-white text-xs uppercase"
          >
            Salvar
          </button>
        </form>

        {/* Avatar Picker with proper selected ring */}
        <div className="mb-5">
          <div className="font-display font-bold text-xs uppercase tracking-wider text-slate-500 text-center mb-2">
            Trocar de Herói ou Companheiro
          </div>
          <div className="grid grid-cols-4 gap-2.5">
            {AVATAR_CATALOG.map((item) => {
              const selected = hero.avatar === item.key;
              return (
                <button
                  key={item.key}
                  type="button"
                  title={item.label}
                  onClick={() => onChangeAvatar(item.key)}
                  className={`relative aspect-square rounded-2xl border-2 border-b-[5px] p-1.5 flex items-center justify-center transition-all active:translate-y-0.5 ${
                    selected
                      ? 'bg-emerald-50 border-duo-green border-b-duo-greenDark'
                      : 'bg-white border-slate-200 border-b-slate-300 hover:border-sky-300'
                  }`}
                >
                  <AvatarGraphic avatarKey={item.key} className="w-full h-full" />
                  {selected && (
                    <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-duo-green border-2 border-white text-white text-[11px] font-black flex items-center justify-center">
                      ✓
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Heroic Cartoon Voice Selector */}
        <div className="mb-5 bg-sky-50/80 border-2 border-sky-200 rounded-2xl p-3">
          <div className="font-display font-bold text-xs uppercase tracking-wider text-sky-800 text-center mb-2">
            Voz Heroica nas Lições
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => {
                playPopSound();
                onSetVoicePersona('leo');
              }}
              className={`py-2 px-3 rounded-xl font-display font-extrabold text-xs sm:text-sm border-2 transition-all ${
                voicePersona === 'leo'
                  ? 'bg-white border-duo-blue text-duo-blueDark shadow-sm'
                  : 'bg-sky-100/50 border-transparent text-slate-500'
              }`}
            >
              ⚡ Léo Herói
            </button>
            <button
              type="button"
              onClick={() => {
                playPopSound();
                onSetVoicePersona('maya');
              }}
              className={`py-2 px-3 rounded-xl font-display font-extrabold text-xs sm:text-sm border-2 transition-all ${
                voicePersona === 'maya'
                  ? 'bg-white border-duo-purple text-duo-purpleDark shadow-sm'
                  : 'bg-sky-100/50 border-transparent text-slate-500'
              }`}
            >
              🌟 Maya Heroína
            </button>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-3 flex items-center gap-3">
            <span className="text-2xl">🔥</span>
            <div>
              <div className="font-display font-extrabold text-base text-duo-ink">
                {hero.streak} Dias
              </div>
              <div className="font-body text-xs text-slate-500 font-bold">
                Ofensiva
              </div>
            </div>
          </div>

          <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-3 flex items-center gap-3">
            <span className="text-2xl">💎</span>
            <div>
              <div className="font-display font-extrabold text-base text-duo-ink">
                {hero.gems}
              </div>
              <div className="font-body text-xs text-slate-500 font-bold">
                Gemas Mágicas
              </div>
            </div>
          </div>

          <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-3 flex items-center gap-3">
            <span className="text-2xl">❤️</span>
            <div>
              <div className="font-display font-extrabold text-base text-duo-ink">
                {hero.hearts} / 5
              </div>
              <div className="font-body text-xs text-slate-500 font-bold">
                Vidas de Herói
              </div>
            </div>
          </div>

          <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-3 flex items-center gap-3">
            <span className="text-2xl">🏆</span>
            <div>
              <div className="font-display font-extrabold text-base text-duo-ink">
                {Math.max(0, hero.unlockedLevel - 1)} / 10
              </div>
              <div className="font-body text-xs text-slate-500 font-bold">
                Fases Vencidas
              </div>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={onSwitchHero}
          className="toy-btn w-full py-3 rounded-2xl bg-white border-2 border-slate-300 border-b-[5px] text-duo-ink text-sm uppercase"
        >
          🔄 Trocar de Herói / Sair
        </button>
      </div>
    </div>
  );
}
