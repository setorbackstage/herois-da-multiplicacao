/**
 * HeroAudioEngine — Cartoon Game Sound Effects + Expressive PT-BR Heroic Voice Tutor
 * Ready for both instant Web Audio cartoon synth / tuned PT-BR neural voices
 * AND pre-generated studio MP3 dubbing clips in `/tabuada-assets/audio/<persona>/<clipKey>.mp3`.
 */

let audioCtx = null;
let soundEnabled = true;
let activePersona = 'leo'; // 'leo' | 'maya'
let activeAudioEl = null;

// Register generated studio MP3 keys here once generated (prevents 404 console noise before generation)
export const AVAILABLE_STUDIO_CLIPS = new Set([]);

const CORRECT_PRAISES = {
  leo: [
    'Isso aí super herói! Multiplicação certeira!',
    'Mandou bem demais! Mais força para a Liga!',
    'Sensacional! Você acertou em cheio!',
  ],
  maya: [
    'Brilhante! Cálculo perfeito de heroína!',
    'Uau! Sua mente mágica acertou na hora!',
    'Espetacular! A Liga dos Heróis vibrou com você!',
  ],
};

const LIGHTNING_PRAISES = {
  leo: [
    'Velocidade da luz! Resposta relâmpago incrível!',
    'Turbo dos heróis ativado! Rápido e perfeito!',
  ],
  maya: [
    'Caramba, que velocidade mágica! Resposta relâmpago!',
    'Super poder relâmpago! Acertou num piscar de olhos!',
  ],
};

function getAudioContext() {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (AudioCtx) audioCtx = new AudioCtx();
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

export function setAudioSettings({ enabled, persona }) {
  if (typeof enabled === 'boolean') {
    soundEnabled = enabled;
    if (!enabled) stopAllSpeech();
  }
  if (persona === 'leo' || persona === 'maya') {
    activePersona = persona;
  }
}

export function stopAllSpeech() {
  try {
    if (activeAudioEl) {
      activeAudioEl.pause();
      activeAudioEl.currentTime = 0;
      activeAudioEl = null;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  } catch {
    // ignore speech cancel errors
  }
}

function playGlideTone({
  startFreq,
  endFreq,
  duration = 0.12,
  delay = 0,
  type = 'triangle',
  volume = 0.14,
}) {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const t0 = ctx.currentTime + delay;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(startFreq, t0);
  if (endFreq !== startFreq) {
    osc.frequency.exponentialRampToValueAtTime(Math.max(40, endFreq), t0 + duration);
  }

  gain.gain.setValueAtTime(0.001, t0);
  gain.gain.linearRampToValueAtTime(volume, t0 + 0.012);
  gain.gain.exponentialRampToValueAtTime(0.001, t0 + duration);

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(t0);
  osc.stop(t0 + duration + 0.02);
}

/** Tactile bubbly pop when tapping UI tiles or buttons */
export function playPopSound() {
  playGlideTone({
    startFreq: 380,
    endFreq: 660,
    duration: 0.065,
    type: 'sine',
    volume: 0.11,
  });
}

export function playSuccessSound() {
  playGlideTone({ startFreq: 523.25, endFreq: 523.25, duration: 0.09, delay: 0, volume: 0.13 });
  playGlideTone({ startFreq: 659.25, endFreq: 659.25, duration: 0.09, delay: 0.07, volume: 0.13 });
  playGlideTone({ startFreq: 783.99, endFreq: 783.99, duration: 0.1, delay: 0.14, volume: 0.14 });
  playGlideTone({ startFreq: 1046.5, endFreq: 1060, duration: 0.24, delay: 0.21, type: 'sine', volume: 0.15 });
}

export function playLightningSound() {
  playGlideTone({ startFreq: 420, endFreq: 1180, duration: 0.16, delay: 0, type: 'sine', volume: 0.13 });
  playGlideTone({ startFreq: 783.99, endFreq: 783.99, duration: 0.1, delay: 0.12, volume: 0.13 });
  playGlideTone({ startFreq: 1046.5, endFreq: 1046.5, duration: 0.12, delay: 0.19, volume: 0.14 });
  playGlideTone({ startFreq: 1318.5, endFreq: 1318.5, duration: 0.26, delay: 0.27, type: 'sine', volume: 0.15 });
}

/** Friendly comic cartoon bounce (never a harsh buzzer) */
export function playErrorSound() {
  playGlideTone({ startFreq: 310, endFreq: 215, duration: 0.14, delay: 0, type: 'triangle', volume: 0.12 });
  playGlideTone({ startFreq: 235, endFreq: 155, duration: 0.2, delay: 0.11, type: 'sine', volume: 0.13 });
}

export function playLockedSound() {
  playGlideTone({ startFreq: 260, endFreq: 210, duration: 0.07, delay: 0, type: 'triangle', volume: 0.1 });
  playGlideTone({ startFreq: 240, endFreq: 180, duration: 0.08, delay: 0.08, type: 'triangle', volume: 0.1 });
}

export function playChestSound() {
  [659.25, 783.99, 987.77, 1318.5, 1567.98].forEach((freq, i) => {
    playGlideTone({
      startFreq: freq,
      endFreq: freq,
      duration: 0.16,
      delay: i * 0.065,
      type: 'sine',
      volume: 0.12,
    });
  });
}

export function playFanfareSound() {
  const notes = [
    { f: 523.25, d: 0.1, t: 0 },
    { f: 523.25, d: 0.09, t: 0.11 },
    { f: 659.25, d: 0.1, t: 0.22 },
    { f: 783.99, d: 0.16, t: 0.34 },
    { f: 659.25, d: 0.1, t: 0.5 },
    { f: 1046.5, d: 0.42, t: 0.62 },
  ];
  notes.forEach((n) =>
    playGlideTone({
      startFreq: n.f,
      endFreq: n.f,
      duration: n.d,
      delay: n.t,
      type: 'triangle',
      volume: 0.15,
    })
  );
}

/** Converts math equations & symbols into playful spoken Brazilian Portuguese */
export function humanizeMathForKids(rawText) {
  if (!rawText) return '';
  return rawText
    .replace(/\[\s*\?\s*\]/g, 'qual número')
    .replace(/GOLPE FINAL NO CHEFÃO:/gi, 'Golpe final no Monstrinho!')
    .replace(/Batalha do Chefão:/gi, 'Batalha do Chefão!')
    .replace(/Desafio Relâmpago:/gi, 'Desafio relâmpago!')
    .replace(/O Terror da Tabuada:/gi, 'Atenção, herói!')
    .replace(/Dica da Liga:/gi, 'Dica secreta da Liga!')
    .replace(/Dica da Maya:/gi, 'Dica mágica da Maya!')
    .replace(/Dica do Léo:/gi, 'Dica do Léo!')
    .replace(/Dica:/gi, 'Dica rápida!')
    .replace(/->/g, ', que dá ')
    .replace(/×/g, ' vezes ')
    .replace(/\+/g, ' mais ')
    .replace(/=/g, ' é igual a ')
    .replace(/é igual a\s*\?/g, 'é igual a quanto?')
    .replace(/[•⭐🎉💎❤️🔥⚡🎲📝🎨⏱️📅📚🗺️🏅🔊🔇✖🚀☁️✨]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function selectBestPtBrCartoonVoice(persona) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;
  const voices = window.speechSynthesis.getVoices() || [];
  const ptVoices = voices.filter((v) => (v.lang || '').toLowerCase().startsWith('pt'));
  if (!ptVoices.length) return null;

  const preferredOrder =
    persona === 'maya'
      ? [
          'thalita online',
          'francisca online',
          'google português',
          'luciana',
          'maria',
          'natural',
          'online',
        ]
      : [
          'google português',
          'thalita online',
          'antonio online',
          'francisca online',
          'luciana',
          'maria',
          'natural',
          'online',
        ];

  let bestVoice = null;
  let bestScore = -1;

  for (const voice of ptVoices) {
    const nameLower = `${voice.name} ${voice.voiceURI}`.toLowerCase();
    let score = voice.lang.toLowerCase() === 'pt-br' ? 10 : 5;
    preferredOrder.forEach((keyword, idx) => {
      if (nameLower.includes(keyword)) {
        score += 100 - idx * 10;
      }
    });
    if (nameLower.includes('daniel') && persona === 'leo') {
      // Old desktop SAPI Daniel sounds adult/robotic even pitched up; rank below neural voices
      score -= 15;
    }
    if (score > bestScore) {
      bestScore = score;
      bestVoice = voice;
    }
  }
  return bestVoice;
}

if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  window.speechSynthesis.getVoices();
  window.speechSynthesis.onvoiceschanged = () => {
    window.speechSynthesis.getVoices();
  };
}

export function speakHeroLine(text, { clipKey = null, personaOverride = null } = {}) {
  if (!soundEnabled || typeof window === 'undefined') return;
  const persona = personaOverride || activePersona;

  stopAllSpeech();

  // 1) Try pre-generated studio cartoon MP3 if registered
  const scopedClip = clipKey ? `${persona}/${clipKey}` : null;
  if (scopedClip && AVAILABLE_STUDIO_CLIPS.has(scopedClip)) {
    const audio = new Audio(`/tabuada-assets/audio/${scopedClip}.mp3`);
    audio.volume = 0.95;
    activeAudioEl = audio;
    audio.play().catch(() => {});
    return;
  }

  // 2) Play expressive PT-BR cartoon-tuned Web Speech fallback
  if (!('speechSynthesis' in window)) return;
  const spoken = humanizeMathForKids(text);
  if (!spoken) return;

  try {
    const utt = new SpeechSynthesisUtterance(spoken);
    utt.lang = 'pt-BR';
    utt.pitch = persona === 'maya' ? 1.38 : 1.28;
    utt.rate = persona === 'maya' ? 1.07 : 1.1;

    const chosenVoice = selectBestPtBrCartoonVoice(persona);
    if (chosenVoice) {
      utt.voice = chosenVoice;
      const lowerName = chosenVoice.name.toLowerCase();
      // Slightly soften pitch if voice itself is already very high-pitched
      if (lowerName.includes('thalita') || lowerName.includes('google')) {
        utt.pitch = persona === 'maya' ? 1.24 : 1.16;
      }
    }
    window.speechSynthesis.speak(utt);
  } catch {
    // ignore speech exceptions
  }
}

export function getRandomPraise(isLightning, persona = activePersona) {
  const pool = isLightning ? LIGHTNING_PRAISES[persona] : CORRECT_PRAISES[persona];
  return pool[Math.floor(Math.random() * pool.length)];
}
