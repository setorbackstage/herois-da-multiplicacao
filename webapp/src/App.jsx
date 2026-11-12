import React, { useEffect, useMemo, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Award,
  BookOpen,
  Compass,
  ShoppingBag,
  Sparkles,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { HERO_TIPS, SHOP_REWARDS } from './data/gameData';
import {
  getHeroRankTitle,
  getTotalStars,
  hasSavedSession,
  hasVipAccessStorage,
  loadAppData,
  loadAudioPrefs,
  saveAppData,
  saveAudioPrefs,
  setVipAccessStorage,
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
import {
  AvatarGraphic,
  BrandLogo,
  CrownIcon,
  FlameIcon,
  GemIcon,
  HeartIcon,
} from './components/HeroSvgs';
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
  ParentalGateModal,
  VictoryModal,
} from './components/GameModals';

const NAV_ITEMS = [
  { key: 'adventure', label: 'Aventura', mobileLabel: 'Aventura', Icon: Compass },
  { key: 'shop', label: 'Loja', mobileLabel: 'Loja', Icon: ShoppingBag },
  { key: 'workbooks', label: 'Apostilas A4', mobileLabel: 'Apostilas', Icon: BookOpen },
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
  const [victoryState, setVictoryState] = useState({
    open: false,
    level: 1,
    stars: 3,
    gemsEarned: 15,
    xpEarned: 30,
  });
  const [parentUnlocked, setParentUnlocked] = useState(false);
  const [parentGateState, setParentGateState] = useState({
    open: false,
    onPass: null,
  });
  const [toast, setToast] = useState(null);
  const [initialPopoverLevel, setInitialPopoverLevel] = useState(null);
  const toastTimerRef = useRef(null);

  const hero =
    appData.profiles[appData.activeHeroId] || Object.values(appData.profiles)[0];

  const equippedBadge = SHOP_REWARDS.find((r) => r.id === hero.equippedReward);

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

  // Support URL query parameter deep linking & VIP unlock
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const vipToken = (params.get('vip') || '').trim().toLowerCase();
    const vipGranted = ['liga27', '1', 'true'].includes(vipToken);

    if (vipGranted) {
      setVipAccessStorage(true);
      setAppData((prev) => ({
        ...prev,
        profiles: Object.fromEntries(
          Object.entries(prev.profiles).map(([id, profile]) => [
            id,
            { ...profile, isVIP: true },
          ])
        ),
      }));
      playFanfareSound();
      showToast(
        '👑',
        'Passe VIP ativado!',
        'Apostilas em PDF e bônus liberados neste aparelho.'
      );
    }

    if (params.get('portal') === 'create') {
      setPortalModal({ open: true, tab: 'create' });
    } else if (params.get('portal') === 'select') {
      setPortalModal({ open: true, tab: 'select' });
    } else if (params.get('profile') === 'true') {
      setProfileOpen(true);
    } else if (['adventure', 'shop', 'workbooks'].includes(params.get('tab'))) {
      setActiveTab(params.get('tab'));
    } else if (vipGranted) {
      setActiveTab('workbooks');
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

  const requestParentGate = (onPassAction) => {
    if (parentUnlocked) {
      onPassAction?.();
      return;
    }
    setParentGateState({ open: true, onPass: onPassAction });
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
          ? 'Oi! Aqui é a Maya, vamos praticar juntos!'
          : 'Oi! Aqui é o Léo, vamos nessa missão!',
        { personaOverride: nextPersona }
      );
    }
    showToast(
      nextPersona === 'maya' ? '🌟' : '⚡',
      nextPersona === 'maya' ? 'Guia: Maya' : 'Guia: Léo',
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
      confetti({ particleCount: 75, spread: 75, origin: { y: 0.6 } });
    } catch {
      // ignore confetti error
    }
    showToast('🌟', 'Baú Aberto!', 'Você encontrou +25 Gemas 💎!');
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

  const handleLessonComplete = (completedLevel, mistakesCount = 0) => {
    const earnedStars = mistakesCount === 0 ? 3 : mistakesCount === 1 ? 2 : 1;
    const isFirstTime = completedLevel >= hero.unlockedLevel;
    const gemsEarned = isFirstTime ? 15 : 5;
    const xpEarned = isFirstTime ? 30 : 15;

    updateActiveHero((curr) => {
      const prevStars = curr.levelStars?.[completedLevel] || 0;
      return {
        ...curr,
        unlockedLevel:
          completedLevel === curr.unlockedLevel && curr.unlockedLevel < 10
            ? curr.unlockedLevel + 1
            : curr.unlockedLevel,
        levelStars: {
          ...(curr.levelStars || {}),
          [completedLevel]: Math.max(prevStars, earnedStars),
        },
        gems: curr.gems + gemsEarned,
        xp: curr.xp + xpEarned,
      };
    });

    playFanfareSound();
    try {
      confetti({ particleCount: 110, spread: 80, origin: { y: 0.6 } });
    } catch {
      // ignore confetti error
    }
    setActiveLessonLevel(null);
    setVictoryState({
      open: true,
      level: completedLevel,
      stars: earnedStars,
      gemsEarned,
      xpEarned,
    });
  };

  const handleBuyHearts = () => {
    if (hero.hearts >= 5) return;
    if (hero.gems < 20) {
      playLockedSound();
      showToast('💎', 'Gemas insuficientes', 'Complete fases ou abra baús para juntar 20 gemas!');
      return;
    }
    updateActiveHero((curr) => ({
      ...curr,
      gems: curr.gems - 20,
      hearts: 5,
    }));
    playFanfareSound();
    showToast('❤️', '5 Vidas Recarregadas!', 'Bom jogo!');
  };

  const handleBuyOrEquipReward = (item) => {
    const owned = hero.ownedRewards || [];
    if (owned.includes(item.id)) {
      const nextEquipped = hero.equippedReward === item.id ? null : item.id;
      updateActiveHero({ equippedReward: nextEquipped });
      playPopSound();
      showToast(
        item.emoji,
        nextEquipped ? `${item.name} equipada!` : `${item.name} guardada`,
        nextEquipped ? 'Ela já aparece no seu cartão de herói!' : ''
      );
      return;
    }

    if (hero.gems < item.price) {
      playLockedSound();
      showToast(
        '💎',
        `Faltam ${item.price - hero.gems} gemas`,
        'Vença fases e abra baús para juntar gemas!'
      );
      return;
    }

    updateActiveHero((curr) => ({
      ...curr,
      gems: curr.gems - item.price,
      ownedRewards: [...(curr.ownedRewards || []), item.id],
      equippedReward: item.id,
    }));
    playFanfareSound();
    try {
      confetti({ particleCount: 60, spread: 65, origin: { y: 0.7 } });
    } catch {
      // ignore
    }
    showToast(item.emoji, `${item.name} desbloqueada!`, 'Já está equipada no seu perfil!');
  };

  const handleRecoverTraining = () => {
    updateActiveHero((curr) => ({ ...curr, hearts: 3 }));
    setGameOverOpen(false);
    playSuccessSound();
    showToast('⚡', 'Treino concluído!', 'Você recuperou +3 Vidas ❤️ grátis!');
  };

  const handleRecoverGems = () => {
    if (hero.gems < 20) {
      playLockedSound();
      showToast('💎', 'Gemas insuficientes!', 'Use o Treino Rápido gratuito para recuperar vidas.');
      return;
    }
    updateActiveHero((curr) => ({ ...curr, gems: curr.gems - 20, hearts: 5 }));
    setGameOverOpen(false);
    playFanfareSound();
    showToast('❤️', '5 Vidas Recarregadas!', 'Bom jogo!');
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
          gems: 20,
          xp: 0,
          unlockedLevel: 1,
          openedChests: [],
          levelStars: {},
          ownedRewards: [],
          equippedReward: null,
          isVIP: hasVipAccessStorage(),
        },
      },
    }));
    playFanfareSound();
    try {
      confetti({ particleCount: 65, spread: 70, origin: { y: 0.6 } });
    } catch {
      // ignore
    }
    setPortalModal({ open: false, tab: 'select' });
    showToast('🚀', `Bem-vindo, ${name}!`, 'Sua aventura começou!');
  };

  const tipOfMoment = HERO_TIPS[(hero.unlockedLevel - 1) % HERO_TIPS.length];
  const completedCount = Math.max(0, hero.unlockedLevel - 1);
  const masteryPct = Math.min(100, Math.round((completedCount / 10) * 100));
  const totalStars = getTotalStars(hero.levelStars);
  const isVipUnlocked = Boolean(hero?.isVIP || hasVipAccessStorage());

  return (
    <div className="min-h-screen toy-shell-bg text-duo-ink flex flex-col">
      <HeroToast toast={toast} onDismiss={() => setToast(null)} />

      {/* ================================================================
          MOBILE TOP STICKY HEADER (Strictly < md, never shown on Tablet!)
          ================================================================ */}
      <header className="md:hidden sticky top-0 z-30 bg-duo-cream/95 backdrop-blur-md border-b-2 border-duo-creamBorder px-3 py-2">
        <div className="max-w-2xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <button
              type="button"
              onClick={() => handleSwitchTab('adventure')}
              className="hidden sm:block shrink-0"
              title="Heróis da Multiplicação"
            >
              <BrandLogo compact />
            </button>

            <button
              type="button"
              onClick={() => setProfileOpen(true)}
              className="flex items-center gap-1.5 bg-white border-2 border-slate-200 border-b-4 rounded-full pl-1 pr-2.5 py-0.5 active:translate-y-0.5 min-w-0"
            >
              <span className="w-7 h-7 rounded-full bg-amber-100 border border-amber-400 overflow-hidden shrink-0">
                <AvatarGraphic avatarKey={hero.avatar} className="w-full h-full" />
              </span>
              {equippedBadge && <span className="text-xs shrink-0">{equippedBadge.emoji}</span>}
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
              aria-label={soundEnabled ? 'Desativar som' : 'Ativar som'}
              title={soundEnabled ? 'Desativar som' : 'Ativar som'}
              className={`w-8 h-8 rounded-full bg-white border-2 border-slate-200 border-b-4 flex items-center justify-center ${
                soundEnabled ? 'text-duo-blueDark' : 'text-slate-400 opacity-70'
              }`}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* ================================================================
          MAIN RESPONSIVE SHELL:
          - Mobile (< md): Top header + Center main + Bottom nav
          - Tablet / Small Laptop (md..xl): Left rail w-[96px] + Center main w/ inline HUD
          - Large Desktop (>= xl, 1280px+): 3 columns (252px left + center + 308px right)
          ================================================================ */}
      <div className="flex-1 w-full max-w-[1320px] mx-auto px-3 sm:px-6 xl:px-8 flex items-start gap-5 xl:gap-8">
        {/* LEFT SIDEBAR NAVIGATION (Tablet >= md & Desktop >= xl) */}
        <aside className="hidden md:flex flex-col sticky top-0 h-screen py-5 w-[96px] xl:w-[252px] shrink-0 border-r-2 border-duo-creamBorder pr-2.5 xl:pr-5">
          <button
            type="button"
            onClick={() => handleSwitchTab('adventure')}
            className="mb-6 flex items-center justify-center xl:justify-start px-1"
            title="Heróis da Multiplicação"
          >
            <span className="xl:hidden">
              <BrandLogo compact />
            </span>
            <span className="hidden xl:inline-flex">
              <BrandLogo />
            </span>
          </button>

          <nav className="flex flex-col gap-2">
            {NAV_ITEMS.map((item) => {
              const isActive = activeTab === item.key;
              const IconComp = item.Icon;
              return (
                <button
                  key={item.key}
                  type="button"
                  title={item.label}
                  onClick={() => handleSwitchTab(item.key)}
                  className={`flex flex-col xl:flex-row items-center justify-center xl:justify-start gap-1 xl:gap-3.5 px-2 xl:px-4 py-2.5 xl:py-3 rounded-2xl font-display font-extrabold border-2 transition-all ${
                    isActive
                      ? 'bg-sky-50 border-duo-blue text-duo-blueDark shadow-sm'
                      : 'bg-transparent border-transparent text-slate-500 hover:bg-amber-50/70 hover:text-duo-ink'
                  }`}
                >
                  <IconComp className="w-5 h-5 shrink-0" strokeWidth={2.5} />
                  <span className="text-[10px] xl:text-sm xl:uppercase xl:tracking-wide leading-tight">
                    {item.mobileLabel}
                  </span>
                </button>
              );
            })}

            <button
              type="button"
              title="Meu Herói"
              onClick={() => setProfileOpen(true)}
              className="flex flex-col xl:flex-row items-center justify-center xl:justify-start gap-1 xl:gap-3.5 px-2 xl:px-4 py-2.5 xl:py-3 rounded-2xl font-display font-extrabold border-2 border-transparent text-slate-500 hover:bg-amber-50/70 hover:text-duo-ink transition-all"
            >
              <Award className="w-5 h-5 shrink-0" strokeWidth={2.5} />
              <span className="text-[10px] xl:text-sm xl:uppercase xl:tracking-wide leading-tight">
                Herói
              </span>
            </button>
          </nav>

          {/* Audio, Voice & Switcher at bottom of sidebar */}
          <div className="mt-auto space-y-2 pt-3 border-t-2 border-duo-creamBorder">
            <button
              type="button"
              onClick={handleToggleSound}
              title={soundEnabled ? 'Desativar som' : 'Ativar som'}
              className="w-full flex flex-col xl:flex-row items-center justify-center xl:justify-start gap-0.5 xl:gap-2.5 px-2 xl:px-3 py-2 rounded-2xl bg-white border-2 border-slate-200 border-b-4 font-display font-bold text-[10px] xl:text-xs text-duo-ink hover:border-duo-blue"
            >
              {soundEnabled ? (
                <Volume2 className="w-4 h-4 text-duo-blueDark" />
              ) : (
                <VolumeX className="w-4 h-4 text-slate-400" />
              )}
              <span className="xl:hidden">{soundEnabled ? 'Som' : 'Mudo'}</span>
              <span className="hidden xl:inline">
                {soundEnabled ? 'Som Ativado' : 'Som Mudo'}
              </span>
            </button>

            <button
              type="button"
              onClick={handleToggleVoicePersona}
              title="Trocar guia e voz (Léo ou Maya)"
              className="w-full flex flex-col xl:flex-row items-center justify-center xl:justify-start gap-0.5 xl:gap-2.5 px-2 xl:px-3 py-2 rounded-2xl bg-sky-50 border-2 border-sky-200 border-b-4 font-display font-bold text-[10px] xl:text-xs text-sky-800 hover:border-duo-blue"
            >
              <Sparkles className="w-4 h-4 text-sky-600" />
              <span className="xl:hidden">{voicePersona === 'maya' ? 'Maya' : 'Léo'}</span>
              <span className="hidden xl:inline">
                Guia: {voicePersona === 'maya' ? 'Maya' : 'Léo'}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setPortalModal({ open: true, tab: 'select' })}
              title="Trocar perfil"
              className="w-full flex flex-col xl:flex-row items-center justify-center xl:justify-start gap-1 xl:gap-2.5 p-2 rounded-2xl bg-white border-2 border-slate-200 hover:border-duo-blue transition-colors"
            >
              <span className="w-8 h-8 rounded-full bg-amber-100 border border-amber-400 overflow-hidden shrink-0">
                <AvatarGraphic avatarKey={hero.avatar} className="w-full h-full" />
              </span>
              <span className="xl:hidden font-display font-bold text-[10px] text-duo-ink truncate max-w-full">
                {hero.name}
              </span>
              <div className="hidden xl:block text-left min-w-0">
                <div className="font-display font-extrabold text-xs text-duo-ink truncate flex items-center gap-1">
                  {equippedBadge && <span>{equippedBadge.emoji}</span>}
                  <span>{hero.name}</span>
                </div>
                <div className="font-body text-[11px] font-bold text-duo-blueDark">
                  Trocar perfil
                </div>
              </div>
            </button>
          </div>
        </aside>

        {/* CENTER MAIN CONTENT STAGE */}
        <main className="flex-1 min-w-0 max-w-[680px] mx-auto w-full pt-4 md:pt-6 pb-28 md:pb-12">
          {/* Tablet & Small-Laptop Inline HUD Bar (md..xl only, zero duplicate logos!) */}
          <div className="hidden md:flex xl:hidden items-center justify-between gap-3 mb-5 bg-white rounded-[20px] border-2 border-slate-200 border-b-[5px] px-4 py-2.5">
            <button
              type="button"
              onClick={() => setProfileOpen(true)}
              className="flex items-center gap-2.5 min-w-0 hover:opacity-90"
            >
              <span className="w-9 h-9 rounded-full bg-amber-100 border-2 border-amber-400 overflow-hidden shrink-0">
                <AvatarGraphic avatarKey={hero.avatar} className="w-full h-full" />
              </span>
              <div className="text-left min-w-0">
                <div className="font-display font-extrabold text-sm text-duo-ink truncate flex items-center gap-1">
                  {equippedBadge && <span>{equippedBadge.emoji}</span>}
                  <span>{hero.name}</span>
                </div>
                <div className="font-body text-[11px] font-bold text-slate-500">
                  {getHeroRankTitle(hero.unlockedLevel)} • {totalStars} ★
                </div>
              </div>
            </button>

            <div className="flex items-center gap-3 shrink-0">
              <div className="flex items-center gap-1 font-display font-extrabold text-sm" title="Ofensiva">
                <FlameIcon className="w-5 h-5" />
                <span>{hero.streak}</span>
              </div>
              <button
                type="button"
                onClick={() => handleSwitchTab('shop')}
                className="flex items-center gap-1 font-display font-extrabold text-sm hover:scale-105 transition-transform"
                title="Ir para a Loja"
              >
                <GemIcon className="w-5 h-5" />
                <span>{hero.gems}</span>
              </button>
              <div className="flex items-center gap-1 font-display font-extrabold text-sm" title="Vidas">
                <HeartIcon className="w-5 h-5" />
                <span>{hero.hearts}</span>
              </div>
            </div>
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
              hero={hero}
              isVIP={isVipUnlocked}
              onOpenVipGuardian={() =>
                requestParentGate(() => setPortalModal({ open: true, tab: 'guardian' }))
              }
              onBuyHearts={handleBuyHearts}
              onBuyOrEquipReward={handleBuyOrEquipReward}
            />
          )}

          {activeTab === 'workbooks' && (
            <WorkbooksView
              isVIP={isVipUnlocked}
              onOpenUnlock={() =>
                requestParentGate(() => setPortalModal({ open: true, tab: 'guardian' }))
              }
            />
          )}
        </main>

        {/* RIGHT STICKY WIDGET PANEL (Large Desktop >= xl, 1280px+) */}
        <aside className="hidden xl:flex flex-col gap-5 sticky top-0 py-6 w-[308px] shrink-0">
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
              title="Gemas"
            >
              <GemIcon className="w-6 h-6" />
              <span>{hero.gems}</span>
            </button>
            <div className="flex items-center gap-1.5 font-display font-extrabold text-base" title="Vidas">
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
                <div className="font-display font-extrabold text-base text-duo-ink truncate flex items-center gap-1">
                  {equippedBadge && <span>{equippedBadge.emoji}</span>}
                  <span>{hero.name}</span>
                </div>
                <div className="font-body text-xs font-bold text-slate-500">
                  {getHeroRankTitle(hero.unlockedLevel)} • {hero.xp} XP
                </div>
              </div>
            </div>

            <div className="mb-3">
              <div className="flex justify-between text-xs font-bold text-slate-500 mb-1">
                <span>Progresso na Liga</span>
                <span>{masteryPct}% ({totalStars} ★)</span>
              </div>
              <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                <div
                  style={{ width: `${masteryPct}%` }}
                  className="h-full bg-duo-green rounded-full transition-all duration-300"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={() => setProfileOpen(true)}
              className="toy-btn w-full py-2.5 rounded-xl bg-white border-2 border-slate-200 border-b-4 text-duo-blueDark text-xs uppercase hover:border-duo-blue"
            >
              Meu Perfil de Herói
            </button>
          </div>

          {/* Dica Card */}
          <div className="bg-amber-50/80 rounded-[22px] border-2 border-amber-200 p-4">
            <div className="flex items-center gap-2.5 mb-1.5">
              <img
                src={
                  tipOfMoment.hero === 'Maya'
                    ? '/tabuada-assets/avatar-maya.png'
                    : '/tabuada-assets/avatar-leo.png'
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

          {/* Discreet Parent-Gated VIP Link */}
          <div className="bg-purple-50 rounded-[22px] border-2 border-purple-200 p-4">
            <div className="flex items-center gap-2.5 mb-1.5">
              <div className="w-8 h-8 rounded-xl bg-purple-600 flex items-center justify-center shrink-0">
                <CrownIcon className="w-5 h-4" />
              </div>
              <span className="font-display font-extrabold text-xs uppercase text-purple-900">
                Área dos Pais 🔒
              </span>
            </div>
            <p className="font-body text-xs font-semibold text-purple-800/80 mb-3">
              Sincronização na nuvem e gestão do Passe VIP da família.
            </p>
            <button
              type="button"
              onClick={() =>
                requestParentGate(() => setPortalModal({ open: true, tab: 'guardian' }))
              }
              className="toy-btn w-full py-2 rounded-xl bg-duo-purple border-b-4 border-duo-purpleDark text-white text-xs uppercase"
            >
              Acessar Área dos Pais
            </button>
          </div>
        </aside>
      </div>

      {/* ================================================================
          MOBILE FIXED BOTTOM TAB BAR (Hidden >= md where sidebar takes over)
          ================================================================ */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white border-t-2 border-slate-200 px-2 pt-1.5 pb-[calc(8px+env(safe-area-inset-bottom))] flex items-center justify-around shadow-[0_-4px_14px_rgba(0,0,0,0.05)]">
        {NAV_ITEMS.map((item) => {
          const isActive = activeTab === item.key;
          const IconComp = item.Icon;
          return (
            <button
              key={item.key}
              type="button"
              onClick={() => handleSwitchTab(item.key)}
              className={`flex-1 flex flex-col items-center gap-0.5 py-1.5 rounded-xl font-display font-bold text-[11px] transition-colors ${
                isActive ? 'text-duo-blueDark bg-sky-50' : 'text-slate-400'
              }`}
            >
              <IconComp className="w-5 h-5" strokeWidth={2.5} />
              <span>{item.mobileLabel}</span>
            </button>
          );
        })}
        <button
          type="button"
          onClick={() => setProfileOpen(true)}
          className="flex-1 flex flex-col items-center gap-0.5 py-1.5 rounded-xl font-display font-bold text-[11px] text-slate-400"
        >
          <Award className="w-5 h-5" strokeWidth={2.5} />
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
        parentUnlocked={parentUnlocked}
        onRequestParentGate={requestParentGate}
        onClose={() => setPortalModal({ open: false, tab: 'select' })}
        onSelectHero={(heroId) => {
          setAppData((prev) => ({ ...prev, activeHeroId: heroId }));
          playFanfareSound();
          setPortalModal({ open: false, tab: 'select' });
        }}
        onCreateHero={handleCreateHero}
        onSyncGuardian={(email, code) => {
          if (!email || !email.includes('@')) {
            playLockedSound();
            showToast('✉️', 'Informe o e-mail', 'Digite um e-mail de responsável válido.');
            return;
          }
          const cleanCode = String(code || '').trim().toUpperCase();
          if (cleanCode !== 'LIGA27') {
            playLockedSound();
            showToast(
              '🔐',
              'Código VIP inválido',
              'Confira o código enviado no seu e-mail de compra.'
            );
            return;
          }
          setVipAccessStorage(true);
          setAppData((prev) => ({
            ...prev,
            profiles: Object.fromEntries(
              Object.entries(prev.profiles).map(([id, profile]) => [
                id,
                { ...profile, isVIP: true },
              ])
            ),
          }));
          playFanfareSound();
          setPortalModal({ open: false, tab: 'select' });
          showToast('👑', 'Passe VIP ativado!', `Apostilas liberadas para ${email}.`);
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
                ? 'Oi! Agora a Maya vai te ajudar nas missões!'
                : 'Tudo pronto! Agora o Léo vai te ajudar nas missões!',
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
          showToast('✅', 'Nome salvo!', `Seu herói agora se chama ${newName}.`);
        }}
        onSwitchHero={() => {
          setProfileOpen(false);
          setPortalModal({ open: true, tab: 'select' });
        }}
      />

      <ParentalGateModal
        isOpen={parentGateState.open}
        onCancel={() => setParentGateState({ open: false, onPass: null })}
        onPassed={() => {
          setParentUnlocked(true);
          const fn = parentGateState.onPass;
          setParentGateState({ open: false, onPass: null });
          fn?.();
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
        earnedStars={victoryState.stars}
        gemsEarned={victoryState.gemsEarned}
        xpEarned={victoryState.xpEarned}
        onClose={() =>
          setVictoryState({
            open: false,
            level: 1,
            stars: 3,
            gemsEarned: 15,
            xpEarned: 30,
          })
        }
      />
    </div>
  );
}
