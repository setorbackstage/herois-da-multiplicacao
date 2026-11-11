import React, { useEffect, useMemo, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import { HERO_TIPS } from './data/gameData';
import {
  getHeroRankTitle,
  hasSavedSession,
  loadAppData,
  loadAudioPrefs,
  saveAppData,
  saveAudioPrefs,
} from './utils/storage';
import {
  playChestSound,
  playFanfareSound,
  playLockedSound,
  playPopSound,
  playSuccessSound,
  setAudioSettings,
  speakHeroLine,
} from './utils/heroAudio';
import { AvatarGraphic, CrownIcon, FlameIcon, GemIcon, HeartIcon } from './components/HeroSvgs';
import AdventureMap from './components/AdventureMap';
import ShopView from './components/ShopView';
import WorkbooksView from './components/WorkbooksView';
import LessonArena from './components/LessonArena';
import HeroPortalModal from './components/HeroPortalModal';
import HeroProfileModal from './components/HeroProfileModal';
import {
  ConfirmExitModal,
  GameOverModal,
  HeroToast,
  VictoryModal,
} from './components/GameModals';

const NAV_ITEMS = [
  { key: 'adventure', icon: '🗺️', label: 'Aventura' },
  { key: 'shop', icon: '💎', label: 'Loja & VIP' },
  { key: 'workbooks', icon: '📚', label: 'Apostilas A4' },
];

export default function App() {
  const [appData, setAppData] = useState(() => loadAppData());
  const [activeTab, setActiveTab] = useState('adventure');

  const initialPrefs = useMemo(() => loadAudioPrefs(), []);
  const [soundEnabled, setSoundEnabled] = useState(initialPrefs.soundEnabled);
  const [voicePersona, setVoicePersona] = useState(initialPrefs.persona);

  const [portalModal, setPortalModal] = useState({ open: false, tab: 'select' });
  const [profileOpen, setProfileOpen] = useState(false);
  const [activeLessonLevel, setActiveLessonLevel] = useState(null);
  const [confirmExitOpen, setConfirmExitOpen] = useState(false);
  const [gameOverOpen, setGameOverOpen] = useState(false);
  const [victoryState, setVictoryState] = useState({ open: false, level: 1 });
  const [toast, setToast] = useState(null);
  const [initialPopoverLevel, setInitialPopoverLevel] = useState(null);
  const toastTimerRef = useRef(null);

  const hero =
    appData.profiles[appData.activeHeroId] || Object.values(appData.profiles)[0];

  const showToast = (emoji, title, subtitle = '') => {
    setToast({ emoji, title, subtitle });
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => setToast(null), 3400);
  };

  useEffect(() => {
    saveAppData(appData);
  }, [appData]);

  useEffect(() => {
    setAudioSettings({ enabled: soundEnabled, persona: voicePersona });
    saveAudioPrefs({ soundEnabled, persona: voicePersona });
  }, [soundEnabled, voicePersona]);

  // Support URL query parameter deep linking
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('portal') === 'create') {
      setPortalModal({ open: true, tab: 'create' });
    } else if (params.get('portal') === 'select') {
      setPortalModal({ open: true, tab: 'select' });
    } else if (params.get('profile') === 'true') {
      setProfileOpen(true);
    } else if (['adventure', 'shop', 'workbooks'].includes(params.get('tab'))) {
      setActiveTab(params.get('tab'));
    } else if (params.get('lesson')) {
      const lvl = parseInt(params.get('lesson'), 10);
      if (!Number.isNaN(lvl)) setActiveLessonLevel(lvl);
    } else if (params.get('popover')) {
      const lvl = parseInt(params.get('popover'), 10);
      if (!Number.isNaN(lvl)) setInitialPopoverLevel(lvl);
    } else if (params.get('view') === 'map') {
      // Explicit map view
    } else if (!hasSavedSession()) {
      setPortalModal({ open: true, tab: 'select' });
    }
  }, []);

  const updateActiveHero = (updater) => {
    setAppData((prev) => {
      const current = prev.profiles[prev.activeHeroId];
      if (!current) return prev;
      const updated = typeof updater === 'function' ? updater(current) : { ...current, ...updater };
      return {
        ...prev,
        profiles: {
          ...prev.profiles,
          [prev.activeHeroId]: updated,
        },
      };
    });
  };

  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    if (next) {
      setAudioSettings({ enabled: true, persona: voicePersona });
      playPopSound();
    }
  };

  const handleToggleVoicePersona = () => {
    const nextPersona = voicePersona === 'leo' ? 'maya' : 'leo';
    setVoicePersona(nextPersona);
    setAudioSettings({ enabled: soundEnabled, persona: nextPersona });
    playPopSound();
    if (soundEnabled) {
      speakHeroLine(
        nextPersona === 'maya'
          ? 'Oi! Aqui é a Maya, vamos calcular juntas!'
          : 'E aí herói! Aqui é o Léo, bora nessa missão!',
        { personaOverride: nextPersona }
      );
    }
    showToast(
      nextPersona === 'maya' ? '🌟' : '⚡',
      nextPersona === 'maya' ? 'Voz ativa: Maya Heroína' : 'Voz ativa: Léo Herói',
      'As questões serão lidas com esta voz!'
    );
  };

  const handleSwitchTab = (tabKey) => {
    playPopSound();
    setActiveTab(tabKey);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartLesson = (levelNum) => {
    if (hero.hearts <= 0) {
      setGameOverOpen(true);
      return;
    }
    setActiveLessonLevel(levelNum);
  };

  const handleClaimChest = (chestNum) => {
    if (hero.openedChests?.includes(chestNum)) {
      showToast('🎉', 'Baú já resgatado!', 'Você já coletou essas 25 gemas.');
      return;
    }
    updateActiveHero((curr) => ({
      ...curr,
      openedChests: [...(curr.openedChests || []), chestNum],
      gems: curr.gems + 25,
    }));
    playChestSound();
    try {
      confetti({ particleCount: 80, spread: 80, origin: { y: 0.6 } });
    } catch {
      // ignore confetti error
    }
    showToast('🌟', 'Baú da Liga Aberto!', 'Você encontrou +25 Gemas Mágicas 💎!');
  };

  const handleWrongAnswer = () => {
    const nextHearts = Math.max(0, hero.hearts - 1);
    updateActiveHero((curr) => ({
      ...curr,
      hearts: Math.max(0, curr.hearts - 1),
    }));
    if (nextHearts <= 0) {
      setTimeout(() => setGameOverOpen(true), 950);
    }
  };

  const handleLessonComplete = (completedLevel) => {
    updateActiveHero((curr) => ({
      ...curr,
      unlockedLevel:
        completedLevel === curr.unlockedLevel && curr.unlockedLevel < 10
          ? curr.unlockedLevel + 1
          : curr.unlockedLevel,
      gems: curr.gems + 15,
      xp: curr.xp + 30,
    }));
    playFanfareSound();
    try {
      confetti({ particleCount: 120, spread: 85, origin: { y: 0.6 } });
    } catch {
      // ignore confetti error
    }
    setActiveLessonLevel(null);
    setVictoryState({ open: true, level: completedLevel });
  };

  const handleBuyHearts = () => {
    if (hero.gems < 20) {
      playLockedSound();
      showToast('💎', 'Gemas insuficientes', 'Complete fases ou abra baús para ganhar mais!');
      return;
    }
    updateActiveHero((curr) => ({
      ...curr,
      gems: curr.gems - 20,
      hearts: 5,
    }));
    playFanfareSound();
    showToast('❤️', '5 Vidas Recarregadas!', 'Você já pode voltar às missões!');
  };

  const handleAddGems = (amount) => {
    updateActiveHero((curr) => ({
      ...curr,
      gems: curr.gems + amount,
    }));
    playFanfareSound();
    try {
      confetti({ particleCount: 55, spread: 60, origin: { y: 0.7 } });
    } catch {
      // ignore
    }
    showToast('💎', `+${amount} Gemas adicionadas!`, 'Seu cofre de herói está brilhando!');
  };

  const handleRecoverTraining = () => {
    updateActiveHero((curr) => ({ ...curr, hearts: 3 }));
    setGameOverOpen(false);
    playSuccessSound();
    showToast('⚡', 'Treino com o Léo concluído!', 'Você recuperou +3 Vidas ❤️ grátis!');
  };

  const handleRecoverGems = () => {
    if (hero.gems < 20) {
      playLockedSound();
      showToast('💎', 'Gemas insuficientes!', 'Use o Treino Rápido gratuito com o Léo.');
      return;
    }
    updateActiveHero((curr) => ({ ...curr, gems: curr.gems - 20, hearts: 5 }));
    setGameOverOpen(false);
    playFanfareSound();
    showToast('❤️', 'Vidas no máximo!', 'Suas 5 vidas foram recarregadas!');
  };

  const handleCreateHero = ({ name, avatar, pin }) => {
    const newId = `hero_${Date.now()}`;
    setAppData((prev) => ({
      activeHeroId: newId,
      profiles: {
        ...prev.profiles,
        [newId]: {
          id: newId,
          name,
          avatar,
          pin,
          hearts: 5,
          streak: 1,
          gems: 100,
          xp: 0,
          unlockedLevel: 1,
          openedChests: [],
          isVIP: false,
        },
      },
    }));
    playFanfareSound();
    try {
      confetti({ particleCount: 70, spread: 70, origin: { y: 0.6 } });
    } catch {
      // ignore
    }
    setPortalModal({ open: false, tab: 'select' });
    showToast('🚀', `Bem-vindo, ${name}!`, 'Sua jornada na Liga dos Heróis começou!');
  };

  const tipOfMoment = HERO_TIPS[(hero.unlockedLevel - 1) % HERO_TIPS.length];
  const masteryPct = Math.min(100, Math.round(((hero.unlockedLevel - 1) / 10) * 100));

  return (
    <div className="min-h-screen toy-shell-bg text-duo-ink flex flex-col">
      <HeroToast toast={toast} onDismiss={() => setToast(null)} />

      {/* ================================================================
          MOBILE & TABLET TOP STICKY HEADER (Hidden >= lg desktop 3-col)
          ================================================================ */}
      <header className="lg:hidden sticky top-0 z-30 bg-duo-cream/95 backdrop-blur-md border-b-2 border-duo-creamBorder px-3 py-2">
        <div className="max-w-2xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <button
              type="button"
              onClick={() => handleSwitchTab('adventure')}
              className="hidden sm:block shrink-0"
              title="Heróis da Multiplicação"
            >
              <img
                src="/tabuada-assets/logo-transparente.png"
                alt="Heróis da Multiplicação"
                className="h-9 object-contain"
              />
            </button>

            <button
              type="button"
              onClick={() => setProfileOpen(true)}
              className="flex items-center gap-1.5 bg-white border-2 border-slate-200 border-b-4 rounded-full pl-1 pr-2.5 py-0.5 active:translate-y-0.5 min-w-0"
            >
              <span className="w-7 h-7 rounded-full bg-amber-100 border border-amber-400 overflow-hidden shrink-0">
                <AvatarGraphic avatarKey={hero.avatar} className="w-full h-full" />
              </span>
              <span className="font-display font-bold text-xs sm:text-sm truncate max-w-[74px]">
                {hero.name}
              </span>
              <span className="text-[10px] text-slate-400">▾</span>
            </button>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <div className="flex items-center gap-1 bg-white border-2 border-slate-200 border-b-4 rounded-2xl px-2 py-0.5 font-display font-bold text-xs">
              <FlameIcon className="w-4 h-4" />
              <span>{hero.streak}</span>
            </div>
            <button
              type="button"
              onClick={() => handleSwitchTab('shop')}
              className="flex items-center gap-1 bg-white border-2 border-slate-200 border-b-4 rounded-2xl px-2 py-0.5 font-display font-bold text-xs active:translate-y-0.5"
            >
              <GemIcon className="w-4 h-4" />
              <span>{hero.gems}</span>
            </button>
            <div className="flex items-center gap-1 bg-white border-2 border-slate-200 border-b-4 rounded-2xl px-2 py-0.5 font-display font-bold text-xs">
              <HeartIcon className="w-4 h-4" />
              <span>{hero.hearts}</span>
            </div>
            <button
              type="button"
              onClick={handleToggleSound}
              title={soundEnabled ? 'Desativar som' : 'Ativar som'}
              className={`w-8 h-8 rounded-full bg-white border-2 border-slate-200 border-b-4 flex items-center justify-center text-sm ${
                soundEnabled ? '' : 'opacity-50 grayscale'
              }`}
            >
              {soundEnabled ? '🔊' : '🔇'}
            </button>
          </div>
        </div>
      </header>

      {/* ================================================================
          MAIN RESPONSIVE 3-COLUMN DESKTOP / CENTER MOBILE SHELL
          ================================================================ */}
      <div className="flex-1 w-full max-w-[1320px] mx-auto px-3 sm:px-6 lg:px-8 flex items-start gap-6 lg:gap-8">
        {/* LEFT SIDEBAR NAVIGATION (Desktop >= lg & Tablet >= md icon rail) */}
        <aside className="hidden md:flex flex-col sticky top-0 h-screen py-6 md:w-[82px] lg:w-[248px] shrink-0 border-r-2 border-duo-creamBorder pr-3 lg:pr-5">
          <button
            type="button"
            onClick={() => handleSwitchTab('adventure')}
            className="mb-7 flex items-center justify-center lg:justify-start gap-2.5 px-1"
          >
            <img
              src="/tabuada-assets/logo-transparente.png"
              alt="Heróis da Multiplicação"
              className="h-11 lg:h-12 object-contain"
            />
          </button>

          <nav className="flex flex-col gap-2.5">
            {NAV_ITEMS.map((item) => {
              const isActive = activeTab === item.key;
              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => handleSwitchTab(item.key)}
                  className={`flex items-center justify-center lg:justify-start gap-3.5 px-3 lg:px-4 py-3 rounded-2xl font-display font-extrabold text-sm uppercase tracking-wide border-2 transition-all ${
                    isActive
                      ? 'bg-sky-50 border-duo-blue text-duo-blueDark shadow-sm'
                      : 'bg-transparent border-transparent text-slate-500 hover:bg-amber-50/70 hover:text-duo-ink'
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="hidden lg:inline">{item.label}</span>
                </button>
              );
            })}

            <button
              type="button"
              onClick={() => setProfileOpen(true)}
              className="flex items-center justify-center lg:justify-start gap-3.5 px-3 lg:px-4 py-3 rounded-2xl font-display font-extrabold text-sm uppercase tracking-wide border-2 border-transparent text-slate-500 hover:bg-amber-50/70 hover:text-duo-ink transition-all"
            >
              <span className="text-xl">🏅</span>
              <span className="hidden lg:inline">Meu Herói</span>
            </button>
          </nav>

          {/* Audio & Hero Voice Controls at bottom of sidebar */}
          <div className="mt-auto space-y-2.5 pt-4 border-t-2 border-duo-creamBorder">
            <button
              type="button"
              onClick={handleToggleSound}
              className="w-full flex items-center justify-center lg:justify-start gap-2.5 px-3 py-2.5 rounded-2xl bg-white border-2 border-slate-200 border-b-4 font-display font-bold text-xs text-duo-ink hover:border-duo-blue"
            >
              <span>{soundEnabled ? '🔊' : '🔇'}</span>
              <span className="hidden lg:inline">
                {soundEnabled ? 'Som Ativado' : 'Som Mudo'}
              </span>
            </button>

            <button
              type="button"
              onClick={handleToggleVoicePersona}
              className="w-full flex items-center justify-center lg:justify-start gap-2.5 px-3 py-2.5 rounded-2xl bg-sky-50 border-2 border-sky-200 border-b-4 font-display font-bold text-xs text-sky-800 hover:border-duo-blue"
            >
              <span>{voicePersona === 'maya' ? '🌟' : '⚡'}</span>
              <span className="hidden lg:inline">
                Voz: {voicePersona === 'maya' ? 'Maya' : 'Léo'}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setPortalModal({ open: true, tab: 'select' })}
              className="w-full flex items-center justify-center lg:justify-start gap-2.5 p-2 rounded-2xl bg-white border-2 border-slate-200 hover:border-duo-blue transition-colors"
            >
              <span className="w-8 h-8 rounded-full bg-amber-100 border border-amber-400 overflow-hidden shrink-0">
                <AvatarGraphic avatarKey={hero.avatar} className="w-full h-full" />
              </span>
              <div className="hidden lg:block text-left min-w-0">
                <div className="font-display font-extrabold text-xs text-duo-ink truncate">
                  {hero.name}
                </div>
                <div className="font-body text-[11px] font-bold text-duo-blueDark">
                  Trocar perfil
                </div>
              </div>
            </button>
          </div>
        </aside>

        {/* CENTER MAIN CONTENT STAGE */}
        <main className="flex-1 min-w-0 max-w-[680px] mx-auto w-full pt-4 md:pt-7 pb-28 md:pb-12">
          {/* Compact VIP Banner visible on mobile/tablet (< lg) */}
          <div
            onClick={() => handleSwitchTab('shop')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleSwitchTab('shop')}
            className="lg:hidden relative overflow-hidden mb-5 rounded-[20px] bg-gradient-to-r from-purple-800 via-purple-700 to-fuchsia-600 p-3.5 text-white border-b-[6px] border-purple-950 flex items-center justify-between gap-3 cursor-pointer"
          >
            <div className="pointer-events-none absolute top-0 bottom-0 -left-1/2 w-1/2 bg-gradient-to-r from-transparent via-white/25 to-transparent animate-sheen" />
            <div className="flex items-center gap-3 relative z-10 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
                <CrownIcon className="w-6 h-5" />
              </div>
              <div className="min-w-0">
                <div className="font-display font-extrabold text-xs sm:text-sm uppercase truncate">
                  Passe VIP • Liga dos Heróis
                </div>
                <div className="font-body text-[11px] text-purple-100 font-semibold truncate">
                  10 Tabuadas + 6 Apostilas A4!
                </div>
              </div>
            </div>
            <span className="toy-btn relative z-10 px-3 py-1.5 rounded-xl bg-duo-gold border-b-4 border-duo-goldDark text-amber-950 text-xs uppercase shrink-0">
              Ver ➔
            </span>
          </div>

          {activeTab === 'adventure' && (
            <AdventureMap
              hero={hero}
              initialPopoverLevel={initialPopoverLevel}
              onStartLesson={handleStartLesson}
              onClaimChest={handleClaimChest}
              onLockedChestToast={() =>
                showToast(
                  '🔒',
                  'Baú Trancado!',
                  'Vença todas as fases desta unidade para abrir!'
                )
              }
            />
          )}

          {activeTab === 'shop' && (
            <ShopView
              onOpenVipGuardian={() => setPortalModal({ open: true, tab: 'guardian' })}
              onBuyHearts={handleBuyHearts}
              onAddGems={handleAddGems}
            />
          )}

          {activeTab === 'workbooks' && <WorkbooksView />}
        </main>

        {/* RIGHT STICKY WIDGET PANEL (Desktop >= lg) */}
        <aside className="hidden lg:flex flex-col gap-5 sticky top-0 py-7 w-[308px] shrink-0">
          {/* HUD Pills Row */}
          <div className="bg-white rounded-[22px] border-2 border-slate-200 border-b-[5px] p-3.5 flex items-center justify-around">
            <div className="flex items-center gap-1.5 font-display font-extrabold text-base" title="Ofensiva Diária">
              <FlameIcon className="w-6 h-6" />
              <span>{hero.streak}</span>
            </div>
            <button
              type="button"
              onClick={() => handleSwitchTab('shop')}
              className="flex items-center gap-1.5 font-display font-extrabold text-base hover:scale-105 transition-transform"
              title="Diamantes Mágicos"
            >
              <GemIcon className="w-6 h-6" />
              <span>{hero.gems}</span>
            </button>
            <div className="flex items-center gap-1.5 font-display font-extrabold text-base" title="Vidas de Herói">
              <HeartIcon className="w-6 h-6" />
              <span>{hero.hearts}</span>
            </div>
          </div>

          {/* Active Hero Summary Card */}
          <div className="bg-white rounded-[22px] border-2 border-slate-200 border-b-[6px] p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-full bg-amber-100 border-2 border-amber-400 overflow-hidden shrink-0">
                <AvatarGraphic avatarKey={hero.avatar} className="w-full h-full" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-display font-extrabold text-base text-duo-ink truncate">
                  {hero.name}
                </div>
                <div className="font-body text-xs font-bold text-slate-500">
                  {getHeroRankTitle(hero.unlockedLevel)} • {hero.xp} XP
                </div>
              </div>
            </div>

            <div className="mb-3">
              <div className="flex justify-between text-xs font-bold text-slate-500 mb-1">
                <span>Progresso na Liga</span>
                <span>{masteryPct}%</span>
              </div>
              <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                <div
                  style={{ width: `${Math.max(10, masteryPct)}%` }}
                  className="h-full bg-duo-green rounded-full transition-all duration-300"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={() => setProfileOpen(true)}
              className="toy-btn w-full py-2.5 rounded-xl bg-white border-2 border-slate-200 border-b-4 text-duo-blueDark text-xs uppercase hover:border-duo-blue"
            >
              Abrir Quartel do Herói
            </button>
          </div>

          {/* Desktop Passe VIP Card */}
          <div
            onClick={() => handleSwitchTab('shop')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleSwitchTab('shop')}
            className="relative overflow-hidden rounded-[22px] bg-gradient-to-br from-purple-800 via-purple-700 to-fuchsia-600 p-5 text-white border-b-[6px] border-purple-950 cursor-pointer"
          >
            <div className="pointer-events-none absolute top-0 bottom-0 -left-1/2 w-1/2 bg-gradient-to-r from-transparent via-white/25 to-transparent animate-sheen" />
            <div className="flex items-center gap-3 mb-2 relative z-10">
              <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center">
                <CrownIcon className="w-6 h-5" />
              </div>
              <div className="font-display font-extrabold text-sm uppercase">
                Passe VIP dos Heróis
              </div>
            </div>
            <p className="font-body text-xs text-purple-100 font-semibold mb-4 relative z-10">
              Libere todas as 10 tabuadas, vidas infinitas e os 6 livros digitais para imprimir!
            </p>
            <button
              type="button"
              className="toy-btn relative z-10 w-full py-2.5 rounded-xl bg-duo-gold border-b-4 border-duo-goldDark text-amber-950 text-xs uppercase"
            >
              Ver Benefícios ➔
            </button>
          </div>

          {/* Dica Mágica Card */}
          <div className="bg-amber-50/80 rounded-[22px] border-2 border-amber-200 p-4">
            <div className="flex items-center gap-2.5 mb-1.5">
              <img
                src={
                  tipOfMoment.hero === 'Maya'
                    ? '/tabuada-assets/heroi-menina-oficial.png'
                    : '/tabuada-assets/heroi-menino-oficial.png'
                }
                alt={tipOfMoment.hero}
                className="w-8 h-8 rounded-full object-cover border border-amber-400"
              />
              <span className="font-display font-extrabold text-xs uppercase text-amber-900">
                {tipOfMoment.title}
              </span>
            </div>
            <p className="font-body text-xs font-bold text-amber-950/80 leading-relaxed">
              {tipOfMoment.text}
            </p>
          </div>
        </aside>
      </div>

      {/* ================================================================
          MOBILE FIXED BOTTOM TAB BAR (Hidden >= md where sidebar takes over)
          ================================================================ */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white border-t-2 border-slate-200 px-2 pt-2 pb-[calc(8px+env(safe-area-inset-bottom))] flex items-center justify-around shadow-[0_-4px_14px_rgba(0,0,0,0.05)]">
        {NAV_ITEMS.map((item) => {
          const isActive = activeTab === item.key;
          return (
            <button
              key={item.key}
              type="button"
              onClick={() => handleSwitchTab(item.key)}
              className={`flex-1 flex flex-col items-center gap-0.5 py-1 rounded-xl font-display font-bold text-[11px] transition-colors ${
                isActive ? 'text-duo-blueDark bg-sky-50' : 'text-slate-400'
              }`}
            >
              <span className="text-xl leading-none">{item.icon}</span>
              <span>{item.key === 'workbooks' ? 'Apostilas' : item.label}</span>
            </button>
          );
        })}
        <button
          type="button"
          onClick={() => setProfileOpen(true)}
          className="flex-1 flex flex-col items-center gap-0.5 py-1 rounded-xl font-display font-bold text-[11px] text-slate-400"
        >
          <span className="text-xl leading-none">🏅</span>
          <span>Meu Herói</span>
        </button>
      </nav>

      {/* ================================================================
          FULLSCREEN QUIZ ARENA OVERLAY
          ================================================================ */}
      {activeLessonLevel !== null && (
        <LessonArena
          levelNum={activeLessonLevel}
          hero={hero}
          soundEnabled={soundEnabled}
          voicePersona={voicePersona}
          onToggleVoicePersona={handleToggleVoicePersona}
          onWrongAnswer={handleWrongAnswer}
          onAwardXp={(xp) =>
            updateActiveHero((curr) => ({ ...curr, xp: curr.xp + xp }))
          }
          onLessonComplete={handleLessonComplete}
          onRequestExit={() => setConfirmExitOpen(true)}
          onNotifyToast={showToast}
        />
      )}

      {/* ================================================================
          MODALS
          ================================================================ */}
      <HeroPortalModal
        isOpen={portalModal.open}
        initialTab={portalModal.tab}
        profiles={appData.profiles}
        activeHeroId={appData.activeHeroId}
        onClose={() => setPortalModal({ open: false, tab: 'select' })}
        onSelectHero={(heroId) => {
          setAppData((prev) => ({ ...prev, activeHeroId: heroId }));
          playFanfareSound();
          setPortalModal({ open: false, tab: 'select' });
        }}
        onCreateHero={handleCreateHero}
        onSyncGuardian={(email) => {
          if (!email) {
            playLockedSound();
            showToast('✉️', 'Informe o e-mail', 'Digite um e-mail de responsável válido.');
            return;
          }
          playFanfareSound();
          setPortalModal({ open: false, tab: 'select' });
          showToast('☁️', 'Conta sincronizada!', `Passe VIP vinculado a ${email}.`);
        }}
      />

      <HeroProfileModal
        isOpen={profileOpen}
        hero={hero}
        voicePersona={voicePersona}
        onSetVoicePersona={(persona) => {
          setVoicePersona(persona);
          setAudioSettings({ enabled: soundEnabled, persona });
          if (soundEnabled) {
            speakHeroLine(
              persona === 'maya'
                ? 'Oi herói! Agora a Maya vai te acompanhar!'
                : 'Super-herói pronto! Aqui é o Léo no comando!',
              { personaOverride: persona }
            );
          }
        }}
        onClose={() => setProfileOpen(false)}
        onChangeAvatar={(avatarKey) => {
          updateActiveHero({ avatar: avatarKey });
          playPopSound();
        }}
        onRenameHero={(newName) => {
          updateActiveHero({ name: newName });
          playPopSound();
          showToast('✅', 'Nome atualizado!', `Seu herói agora se chama ${newName}.`);
        }}
        onSwitchHero={() => {
          setProfileOpen(false);
          setPortalModal({ open: true, tab: 'select' });
        }}
      />

      <ConfirmExitModal
        isOpen={confirmExitOpen}
        onCancel={() => setConfirmExitOpen(false)}
        onConfirmExit={() => {
          setConfirmExitOpen(false);
          setActiveLessonLevel(null);
        }}
      />

      <GameOverModal
        isOpen={gameOverOpen}
        onRecoverTraining={handleRecoverTraining}
        onRecoverGems={handleRecoverGems}
        onClose={() => {
          setGameOverOpen(false);
          setActiveLessonLevel(null);
        }}
      />

      <VictoryModal
        isOpen={victoryState.open}
        completedLevel={victoryState.level}
        onClose={() => setVictoryState({ open: false, level: 1 })}
      />
    </div>
  );
}
