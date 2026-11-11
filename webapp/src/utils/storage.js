export const STORAGE_KEY = 'missao_tabuada_v2_data';
const AUDIO_PREFS_KEY = 'missao_tabuada_audio_prefs';

export function createDefaultAppData() {
  return {
    activeHeroId: 'hero_1',
    profiles: {
      hero_1: {
        id: 'hero_1',
        name: 'Pedro',
        avatar: 'leo',
        pin: '',
        hearts: 5,
        streak: 3,
        gems: 120,
        xp: 100,
        unlockedLevel: 1,
        openedChests: [],
        isVIP: false,
      },
    },
  };
}

export function loadAppData() {
  const base = createDefaultAppData();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.profiles && Object.keys(parsed.profiles).length > 0) {
        return {
          activeHeroId: parsed.profiles[parsed.activeHeroId]
            ? parsed.activeHeroId
            : Object.keys(parsed.profiles)[0],
          profiles: parsed.profiles,
        };
      }
    }

    const legacyDuo = localStorage.getItem('missao_tabuada_duo');
    const legacyHero = localStorage.getItem('missao_tabuada_hero_profile');
    if (legacyHero || legacyDuo) {
      const h = legacyHero ? JSON.parse(legacyHero) : {};
      const d = legacyDuo ? JSON.parse(legacyDuo) : {};
      base.profiles.hero_1 = {
        ...base.profiles.hero_1,
        name: h.name || 'Pedro',
        avatar: h.mascot || 'leo',
        hearts: typeof d.hearts === 'number' ? d.hearts : 5,
        streak: typeof d.streak === 'number' ? d.streak : 3,
        gems: typeof d.gems === 'number' ? d.gems : 120,
        xp: typeof d.xp === 'number' ? d.xp : 100,
        unlockedLevel: typeof d.unlockedLevel === 'number' ? d.unlockedLevel : 1,
      };
      saveAppData(base);
    }
  } catch {
    return base;
  }
  return base;
}

export function saveAppData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    const currentHero =
      data.profiles?.[data.activeHeroId] || Object.values(data.profiles || {})[0];
    if (currentHero) {
      localStorage.setItem(
        'missao_tabuada_duo',
        JSON.stringify({
          hearts: currentHero.hearts,
          streak: currentHero.streak,
          gems: currentHero.gems,
          xp: currentHero.xp,
          unlockedLevel: currentHero.unlockedLevel,
        })
      );
      localStorage.setItem(
        'missao_tabuada_hero_profile',
        JSON.stringify({
          name: currentHero.name,
          mascot: currentHero.avatar,
        })
      );
    }
  } catch {
    // Ignore storage quota errors cleanly
  }
}

export function hasSavedSession() {
  try {
    return Boolean(
      localStorage.getItem(STORAGE_KEY) || localStorage.getItem('missao_tabuada_duo')
    );
  } catch {
    return false;
  }
}

export function loadAudioPrefs() {
  try {
    const raw = localStorage.getItem(AUDIO_PREFS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        soundEnabled: parsed.soundEnabled !== false,
        persona: parsed.persona === 'maya' ? 'maya' : 'leo',
      };
    }
  } catch {
    // fallback defaults
  }
  return { soundEnabled: true, persona: 'leo' };
}

export function saveAudioPrefs(prefs) {
  try {
    localStorage.setItem(AUDIO_PREFS_KEY, JSON.stringify(prefs));
  } catch {
    // ignore storage errors
  }
}

export function getHeroRankTitle(unlockedLevel = 1) {
  if (unlockedLevel >= 10) return 'Mestre Lendário da Liga';
  if (unlockedLevel >= 7) return 'Guardião Supremo';
  if (unlockedLevel >= 4) return 'Explorador da Lógica';
  return 'Agente da Liga dos Heróis';
}
