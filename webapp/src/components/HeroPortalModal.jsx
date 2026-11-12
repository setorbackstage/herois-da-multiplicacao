import React, { useEffect, useState } from 'react';
import { AVATAR_CATALOG } from '../data/gameData';
import { AvatarGraphic, BrandLogo } from './HeroSvgs';
import { playPopSound } from '../utils/heroAudio';

export default function HeroPortalModal({
  isOpen,
  initialTab = 'select',
  profiles,
  activeHeroId,
  parentUnlocked = false,
  onRequestParentGate,
  onClose,
  onSelectHero,
  onCreateHero,
  onSyncGuardian,
}) {
  const [tab, setTab] = useState(initialTab);
  const [heroName, setHeroName] = useState('');
  const [heroAvatar, setHeroAvatar] = useState('leo');
  const [heroPin, setHeroPin] = useState('');
  const [guardianEmail, setGuardianEmail] = useState('');
  const [guardianPassword, setGuardianPassword] = useState('');
  const [pinChallengeHero, setPinChallengeHero] = useState(null);
  const [pinAttempt, setPinAttempt] = useState('');
  const [pinError, setPinError] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTab(initialTab);
      setPinChallengeHero(null);
      setPinAttempt('');
      setPinError(false);
    }
  }, [isOpen, initialTab]);

  useEffect(() => {
    if (!isOpen) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const profileList = Object.values(profiles || {});

  const handleCardClick = (hero) => {
    if (hero.pin && hero.id !== activeHeroId) {
      playPopSound();
      setPinChallengeHero(hero);
      setPinAttempt('');
      setPinError(false);
      return;
    }
    onSelectHero(hero.id);
  };

  const submitPinChallenge = (e) => {
    e.preventDefault();
    if (!pinChallengeHero) return;
    if (pinAttempt === pinChallengeHero.pin) {
      onSelectHero(pinChallengeHero.id);
      setPinChallengeHero(null);
    } else {
      setPinError(true);
    }
  };

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    onCreateHero({
      name: heroName.trim() || 'Herói',
      avatar: heroAvatar,
      pin: heroPin.replace(/\D/g, '').slice(0, 4),
    });
    setHeroName('');
    setHeroPin('');
    setHeroAvatar('leo');
  };

  const handleGuardianSubmit = (e) => {
    e.preventDefault();
    onSyncGuardian(guardianEmail.trim(), guardianPassword);
  };

  const handleTabClick = (nextTab) => {
    playPopSound();
    if (nextTab === 'guardian' && !parentUnlocked) {
      onRequestParentGate?.(() => {
        setTab('guardian');
        setPinChallengeHero(null);
      });
      return;
    }
    setTab(nextTab);
    setPinChallengeHero(null);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[490px] max-h-[92vh] overflow-y-auto bg-white rounded-[26px] border-[3px] border-slate-200 border-b-[8px] border-b-slate-300 p-4 sm:p-6 shadow-2xl animate-popIn"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar portal"
          className="absolute top-3.5 right-3.5 w-9 h-9 rounded-full bg-slate-100 border-2 border-slate-300 border-b-4 flex items-center justify-center text-slate-500 font-bold hover:bg-slate-200 active:translate-y-0.5"
        >
          ✕
        </button>

        {/* Brand Header */}
        <div className="text-center mb-4">
          <div className="flex justify-center mb-2">
            <BrandLogo />
          </div>
          <h2 className="font-display font-extrabold text-xl text-duo-ink">
            Quem vai jogar hoje?
          </h2>
          <p className="font-body text-xs sm:text-sm text-slate-500 font-semibold">
            Escolha seu herói ou crie um novo perfil para começar!
          </p>
        </div>

        {/* Single-line compact tabs on 360px+ */}
        <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-2xl mb-4">
          {[
            { id: 'select', label: 'Quem joga?' },
            { id: 'create', label: '+ Novo' },
            { id: 'guardian', label: 'Pais 🔒' },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleTabClick(item.id)}
              className={`py-2 px-1.5 rounded-xl font-display font-bold text-xs sm:text-sm whitespace-nowrap transition-all ${
                tab === item.id
                  ? 'bg-white text-duo-ink shadow-sm'
                  : 'text-slate-500 hover:text-duo-ink'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Tab 1: Profile Switcher */}
        {tab === 'select' && (
          <div>
            {pinChallengeHero ? (
              <form
                onSubmit={submitPinChallenge}
                className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-5 text-center space-y-3"
              >
                <div className="w-16 h-16 mx-auto rounded-full bg-amber-100 border-2 border-amber-400 overflow-hidden">
                  <AvatarGraphic avatarKey={pinChallengeHero.avatar} className="w-full h-full" />
                </div>
                <div className="font-display font-extrabold text-base text-duo-ink">
                  PIN Secreto de {pinChallengeHero.name}
                </div>
                <input
                  type="password"
                  inputMode="numeric"
                  maxLength={4}
                  autoFocus
                  value={pinAttempt}
                  onChange={(e) => {
                    setPinAttempt(e.target.value);
                    setPinError(false);
                  }}
                  placeholder="••••"
                  className="w-40 mx-auto block px-4 py-3 text-center text-xl font-display font-extrabold tracking-[0.45em] rounded-2xl bg-white border-2 border-slate-300 focus:border-duo-blue outline-none"
                />
                {pinError && (
                  <p className="text-xs font-bold text-duo-red">
                    PIN incorreto! Tente novamente.
                  </p>
                )}
                <div className="flex gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setPinChallengeHero(null)}
                    className="toy-btn flex-1 py-2.5 rounded-xl bg-white border-2 border-slate-300 border-b-4 text-slate-600 text-xs uppercase"
                  >
                    Voltar
                  </button>
                  <button
                    type="submit"
                    className="toy-btn flex-1 py-2.5 rounded-xl bg-duo-green border-b-4 border-duo-greenDark text-white text-xs uppercase"
                  >
                    Entrar
                  </button>
                </div>
              </form>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {profileList.map((hero) => {
                    const isCurrent = hero.id === activeHeroId;
                    return (
                      <button
                        key={hero.id}
                        type="button"
                        onClick={() => handleCardClick(hero)}
                        className={`relative rounded-[20px] p-3 border-2 border-b-[6px] flex flex-col items-center text-center transition-all active:translate-y-1 ${
                          isCurrent
                            ? 'bg-sky-50/70 border-duo-blue border-b-duo-blueDark'
                            : 'bg-white border-slate-200 border-b-slate-300 hover:border-duo-blue'
                        }`}
                      >
                        {hero.pin && (
                          <span className="absolute top-2 right-2 text-xs" title="Protegido por PIN">
                            🔒
                          </span>
                        )}
                        <div className="w-16 h-16 rounded-full bg-amber-100 border-2 border-amber-400 overflow-hidden mb-2 flex items-center justify-center">
                          <AvatarGraphic avatarKey={hero.avatar} className="w-full h-full" />
                        </div>
                        <div className="font-display font-extrabold text-sm sm:text-base text-duo-ink truncate max-w-full">
                          {hero.name}
                        </div>
                        <div className="flex items-center gap-2 text-[11px] font-bold text-slate-500 mt-1">
                          <span>🔥 {hero.streak}</span>
                          <span>💎 {hero.gems}</span>
                          <span>❤️ {hero.hearts}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    playPopSound();
                    setTab('create');
                  }}
                  className="toy-btn w-full py-3 rounded-2xl bg-duo-blue border-b-[6px] border-duo-blueDark text-white text-sm uppercase"
                >
                  + Criar Novo Herói
                </button>
              </>
            )}
          </div>
        )}

        {/* Tab 2: Quick Kid Hero Creator */}
        {tab === 'create' && (
          <form onSubmit={handleCreateSubmit} className="space-y-3.5">
            <div>
              <label className="block font-display font-bold text-sm text-duo-ink mb-1">
                Qual é o nome do Herói?
              </label>
              <input
                type="text"
                maxLength={16}
                value={heroName}
                onChange={(e) => setHeroName(e.target.value)}
                placeholder="Ex: Pedro, Sofia, Arthur..."
                className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border-2 border-slate-200 focus:border-duo-blue focus:bg-white outline-none font-display font-bold text-base text-duo-ink"
              />
            </div>

            <div>
              <label className="block font-display font-bold text-sm text-duo-ink mb-1.5">
                Escolha seu personagem:
              </label>
              <div className="grid grid-cols-4 gap-2">
                {AVATAR_CATALOG.map((item) => {
                  const selected = heroAvatar === item.key;
                  return (
                    <button
                      key={item.key}
                      type="button"
                      title={item.label}
                      onClick={() => {
                        playPopSound();
                        setHeroAvatar(item.key);
                      }}
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

            <div>
              <label className="block font-display font-bold text-sm text-duo-ink mb-1">
                PIN Secreto (Opcional • 4 números):
              </label>
              <input
                type="password"
                inputMode="numeric"
                maxLength={4}
                value={heroPin}
                onChange={(e) => setHeroPin(e.target.value.replace(/\D/g, '').slice(0, 4))}
                placeholder="••••"
                className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border-2 border-slate-200 focus:border-duo-blue focus:bg-white outline-none text-center font-display font-extrabold text-lg tracking-[0.4em]"
              />
            </div>

            <button
              type="submit"
              className="toy-btn w-full py-3.5 rounded-2xl bg-duo-green border-b-[6px] border-duo-greenDark text-white text-sm sm:text-base uppercase"
            >
              Começar Aventura! 🚀
            </button>
          </form>
        )}

        {/* Tab 3: Guardian Cloud Sync (behind Parental Gate) */}
        {tab === 'guardian' && (
          <form onSubmit={handleGuardianSubmit} className="space-y-4">
            <div className="bg-purple-50 border-2 border-purple-200 rounded-2xl p-4">
              <div className="font-display font-extrabold text-sm text-purple-900">
                Área dos Pais • Passe VIP
              </div>
              <p className="font-body text-xs text-purple-700 font-semibold mt-1">
                Informe seu e-mail e o código VIP recebido na compra para liberar as apostilas em PDF.
              </p>
            </div>

            <div>
              <label className="block font-display font-bold text-sm text-duo-ink mb-1.5">
                E-mail do Responsável:
              </label>
              <input
                type="email"
                value={guardianEmail}
                onChange={(e) => setGuardianEmail(e.target.value)}
                placeholder="seu-email@exemplo.com"
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 border-2 border-slate-200 focus:border-duo-purple focus:bg-white outline-none font-body font-bold text-sm sm:text-base"
              />
            </div>

            <div>
              <label className="block font-display font-bold text-sm text-duo-ink mb-1.5">
                Código de Acesso VIP:
              </label>
              <input
                type="text"
                value={guardianPassword}
                onChange={(e) => setGuardianPassword(e.target.value.toUpperCase())}
                placeholder="Ex: LIGA27 (recebido após a compra)"
                autoComplete="off"
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 border-2 border-slate-200 focus:border-duo-purple focus:bg-white outline-none font-display font-bold uppercase tracking-wider text-sm sm:text-base"
              />
            </div>

            <button
              type="submit"
              className="toy-btn w-full py-3.5 rounded-2xl bg-duo-purple border-b-[6px] border-duo-purpleDark text-white text-sm uppercase"
            >
              Ativar Acesso VIP ☁️
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
