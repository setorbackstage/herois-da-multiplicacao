import React, { useEffect, useState } from 'react';
import { AVATAR_CATALOG, SHOP_REWARDS } from '../data/gameData';
import { getHeroRankTitle, getTotalStars } from '../utils/storage';
import { AvatarGraphic, BrandLogo } from './HeroSvgs';
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

  const equippedBadge = SHOP_REWARDS.find((r) => r.id === hero.equippedReward);
  const totalStars = getTotalStars(hero.levelStars);

  const handleSaveName = (e) => {
    e.preventDefault();
    const cleaned = nameDraft.trim();
    if (cleaned) {
      onRenameHero(cleaned);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[480px] max-h-[92vh] overflow-y-auto overflow-x-hidden bg-white rounded-[26px] border-[3px] border-slate-200 border-b-[8px] border-b-slate-300 p-4 sm:p-6 shadow-2xl animate-popIn"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar meu herói"
          className="absolute top-3.5 right-3.5 w-9 h-9 rounded-full bg-slate-100 border-2 border-slate-300 border-b-4 flex items-center justify-center text-slate-500 font-bold hover:bg-slate-200 active:translate-y-0.5"
        >
          ✕
        </button>

        {/* Hero Identity Header */}
        <div className="flex flex-col items-center text-center mb-4">
          <div className="mb-2">
            <BrandLogo compact />
          </div>
          <div className="relative w-20 h-20 rounded-full bg-amber-100 border-4 border-amber-400 shadow-md overflow-hidden mb-2 flex items-center justify-center">
            <AvatarGraphic avatarKey={hero.avatar} className="w-full h-full" />
          </div>
          <h2 className="font-display font-extrabold text-xl sm:text-2xl text-duo-ink flex items-center gap-1.5">
            {equippedBadge && <span title={equippedBadge.name}>{equippedBadge.emoji}</span>}
            <span>{hero.name}</span>
          </h2>
          <p className="font-body text-xs sm:text-sm font-bold text-slate-500">
            {getHeroRankTitle(hero.unlockedLevel)} • Fase {hero.unlockedLevel}
          </p>
        </div>

        {/* Inline Hero Name Editor — min-w-0 prevents horizontal overflow on 360px */}
        <form onSubmit={handleSaveName} className="flex items-center gap-2 mb-4 w-full">
          <input
            type="text"
            maxLength={16}
            value={nameDraft}
            onChange={(e) => setNameDraft(e.target.value)}
            placeholder="Nome do Herói"
            className="flex-1 min-w-0 px-3 py-2.5 rounded-xl bg-slate-50 border-2 border-slate-200 focus:border-duo-blue focus:bg-white outline-none font-display font-bold text-sm text-duo-ink"
          />
          <button
            type="submit"
            className="toy-btn px-3.5 py-2.5 rounded-xl bg-duo-blue border-b-4 border-duo-blueDark text-white text-xs uppercase shrink-0"
          >
            Salvar
          </button>
        </form>

        {/* Avatar Picker */}
        <div className="mb-4">
          <div className="font-display font-bold text-xs uppercase tracking-wider text-slate-500 text-center mb-2">
            Escolha seu Personagem
          </div>
          <div className="grid grid-cols-4 gap-2">
            {AVATAR_CATALOG.map((item) => {
              const selected = hero.avatar === item.key;
              return (
                <button
                  key={item.key}
                  type="button"
                  title={item.label}
                  onClick={() => onChangeAvatar(item.key)}
                  className={`relative aspect-square rounded-2xl border-2 border-b-[5px] p-1 flex items-center justify-center transition-all active:translate-y-0.5 ${
                    selected
                      ? 'bg-emerald-50 border-duo-green border-b-duo-greenDark'
                      : 'bg-white border-slate-200 border-b-slate-300 hover:border-sky-300'
                  }`}
                >
                  <AvatarGraphic avatarKey={item.key} className="w-full h-full rounded-xl" />
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

        {/* Heroic Voice Selector */}
        <div className="mb-4 bg-sky-50/80 border-2 border-sky-200 rounded-2xl p-2.5">
          <div className="font-display font-bold text-[11px] uppercase tracking-wider text-sky-800 text-center mb-1.5">
            Guia e Voz nas Lições
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => {
                playPopSound();
                onSetVoicePersona('leo');
              }}
              className={`py-2 px-2 rounded-xl font-display font-extrabold text-xs sm:text-sm border-2 transition-all ${
                voicePersona === 'leo'
                  ? 'bg-white border-duo-blue text-duo-blueDark shadow-sm'
                  : 'bg-sky-100/50 border-transparent text-slate-500'
              }`}
            >
              Léo
            </button>
            <button
              type="button"
              onClick={() => {
                playPopSound();
                onSetVoicePersona('maya');
              }}
              className={`py-2 px-2 rounded-xl font-display font-extrabold text-xs sm:text-sm border-2 transition-all ${
                voicePersona === 'maya'
                  ? 'bg-white border-duo-purple text-duo-purpleDark shadow-sm'
                  : 'bg-sky-100/50 border-transparent text-slate-500'
              }`}
            >
              Maya
            </button>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 gap-2.5 mb-4">
          <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-2.5 flex items-center gap-2.5">
            <span className="text-xl">⭐</span>
            <div>
              <div className="font-display font-extrabold text-sm sm:text-base text-duo-ink">
                {totalStars} / 30
              </div>
              <div className="font-body text-[11px] text-slate-500 font-bold">
                Estrelas
              </div>
            </div>
          </div>

          <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-2.5 flex items-center gap-2.5">
            <span className="text-xl">💎</span>
            <div>
              <div className="font-display font-extrabold text-sm sm:text-base text-duo-ink">
                {hero.gems}
              </div>
              <div className="font-body text-[11px] text-slate-500 font-bold">
                Gemas
              </div>
            </div>
          </div>

          <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-2.5 flex items-center gap-2.5">
            <span className="text-xl">❤️</span>
            <div>
              <div className="font-display font-extrabold text-sm sm:text-base text-duo-ink">
                {hero.hearts} / 5
              </div>
              <div className="font-body text-[11px] text-slate-500 font-bold">
                Vidas
              </div>
            </div>
          </div>

          <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-2.5 flex items-center gap-2.5">
            <span className="text-xl">🏆</span>
            <div>
              <div className="font-display font-extrabold text-sm sm:text-base text-duo-ink">
                {Math.max(0, hero.unlockedLevel - 1)} / 10
              </div>
              <div className="font-body text-[11px] text-slate-500 font-bold">
                Fases Vencidas
              </div>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={onSwitchHero}
          className="toy-btn w-full py-3 rounded-2xl bg-white border-2 border-slate-300 border-b-[5px] text-duo-ink text-xs sm:text-sm uppercase"
        >
          Trocar de Herói
        </button>
      </div>
    </div>
  );
}
