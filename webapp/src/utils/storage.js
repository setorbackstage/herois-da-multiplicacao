export const STORAGE_KEY = 'missao_tabuada_v2_data';
const AUDIO_PREFS_KEY = 'missao_tabuada_audio_prefs';

function normalizeHeroProfile(hero, fallbackId = 'hero_1') {
  return {
    id: hero?.id || fallbackId,
    name: hero?.name || 'Pedro',
    avatar: hero?.avatar || 'leo',
    pin: hero?.pin || '',
    hearts: typeof hero?.hearts === 'number' ? hero.hearts : 5,
    streak: typeof hero?.streak === 'number' ? hero.streak : 1,
    gems: typeof hero?.gems === 'number' ? hero.gems : 20,
    xp: typeof hero?.xp === 'number' ? hero.xp : 0,
    unlockedLevel: typeof hero?.unlockedLevel === 'number' ? hero.unlockedLevel : 1,
    openedChests: Array.isArray(hero?.openedChests) ? hero.openedChests : [],
    levelStars:
      hero?.levelStars && typeof hero.levelStars === 'object' ? hero.levelStars : {},
    ownedRewards: Array.isArray(hero?.ownedRewards) ? hero.ownedRewards : [],
    equippedReward: hero?.equippedReward || null,
    isVIP: Boolean(hero?.isVIP),
  };
}

export function createDefaultAppData() {
  return {
    activeHeroId: 'hero_1',
    profiles: {
      hero_1: normalizeHeroProfile(
        {
          id: 'hero_1',
          name: 'Pedro',
          avatar: 'leo',
          hearts: 5,
          streak: 1,
          gems: 20,
          xp: 0,
          unlockedLevel: 1,
        },
        'hero_1'
      ),
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
        const normalizedProfiles = {};
        for (const [id, prof] of Object.entries(parsed.profiles)) {
          normalizedProfiles[id] = normalizeHeroProfile(prof, id);
        }
        return {
          activeHeroId: normalizedProfiles[parsed.activeHeroId]
            ? parsed.activeHeroId
            : Object.keys(normalizedProfiles)[0],
          profiles: normalizedProfiles,
        };
      }
    }

    const legacyDuo = localStorage.getItem('missao_tabuada_duo');
    const legacyHero = localStorage.getItem('missao_tabuada_hero_profile');
    if (legacyHero || legacyDuo) {
      const h = legacyHero ? JSON.parse(legacyHero) : {};
      const d = legacyDuo ? JSON.parse(legacyDuo) : {};
      base.profiles.hero_1 = normalizeHeroProfile(
        {
          id: 'hero_1',
          name: h.name || 'Pedro',
          avatar: h.mascot || 'leo',
          hearts: typeof d.hearts === 'number' ? d.hearts : 5,
          streak: typeof d.streak === 'number' ? d.streak : 1,
          gems: typeof d.gems === 'number' ? d.gems : 20,
          xp: typeof d.xp === 'number' ? d.xp : 0,
          unlockedLevel: typeof d.unlockedLevel === 'number' ? d.unlockedLevel : 1,
        },
        'hero_1'
      );
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
  if (unlockedLevel >= 10) return 'Mestre da Liga';
  if (unlockedLevel >= 7) return 'Guardião dos Números';
  if (unlockedLevel >= 4) return 'Explorador da Lógica';
  return 'Iniciante da Liga';
}

export function getTotalStars(levelStars = {}) {
  return Object.values(levelStars || {}).reduce(
    (sum, val) => sum + (typeof val === 'number' ? val : 0),
    0
  );
}
