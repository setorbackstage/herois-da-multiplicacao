/**
 * HeroAudioEngine — Cartoon Game Sound Effects + Natural PT-BR Voice Tutor
 */

let audioCtx = null;
let soundEnabled = true;
let activePersona = 'leo'; // 'leo' | 'maya'
let activeAudioEl = null;

export const AVAILABLE_STUDIO_CLIPS = new Set([]);

const CORRECT_PRAISES = {
  leo: [
    'Boa! Mandou muito bem!',
    'Isso mesmo! Conta certa!',
    'Show! Você está ficando craque!',
    'Acertou em cheio!',
  ],
  maya: [
    'Isso aí! Resposta certinha!',
    'Muito bem! Raciocínio rápido!',
    'Perfeito! Mais uma conquistada!',
    'Excelente! Continue assim!',
  ],
};

const COMBO_PRAISES = {
  leo: [
    'Sequência incrível! Acertou várias seguidas!',
    'Você pegou o jeito da tabuada!',
  ],
  maya: [
    'Que sequência boa! Sem errar nenhuma!',
    'Mandando super bem em sequência!',
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

export function playPopSound() {
  playGlideTone({
    startFreq: 380,
    endFreq: 660,
    duration: 0.065,
    type: 'sine',
    volume: 0.1,
  });
}

export function playSuccessSound() {
  playGlideTone({ startFreq: 523.25, endFreq: 523.25, duration: 0.09, delay: 0, volume: 0.12 });
  playGlideTone({ startFreq: 659.25, endFreq: 659.25, duration: 0.09, delay: 0.07, volume: 0.12 });
  playGlideTone({ startFreq: 783.99, endFreq: 783.99, duration: 0.1, delay: 0.14, volume: 0.13 });
  playGlideTone({ startFreq: 1046.5, endFreq: 1060, duration: 0.22, delay: 0.21, type: 'sine', volume: 0.14 });
}

export function playLightningSound() {
  playGlideTone({ startFreq: 440, endFreq: 1100, duration: 0.14, delay: 0, type: 'sine', volume: 0.12 });
  playGlideTone({ startFreq: 783.99, endFreq: 783.99, duration: 0.09, delay: 0.11, volume: 0.12 });
  playGlideTone({ startFreq: 1046.5, endFreq: 1046.5, duration: 0.11, delay: 0.18, volume: 0.13 });
  playGlideTone({ startFreq: 1318.5, endFreq: 1318.5, duration: 0.22, delay: 0.26, type: 'sine', volume: 0.14 });
}

export function playErrorSound() {
  playGlideTone({ startFreq: 310, endFreq: 215, duration: 0.14, delay: 0, type: 'triangle', volume: 0.11 });
  playGlideTone({ startFreq: 235, endFreq: 155, duration: 0.2, delay: 0.11, type: 'sine', volume: 0.12 });
}

export function playLockedSound() {
  playGlideTone({ startFreq: 260, endFreq: 210, duration: 0.07, delay: 0, type: 'triangle', volume: 0.09 });
  playGlideTone({ startFreq: 240, endFreq: 180, duration: 0.08, delay: 0.08, type: 'triangle', volume: 0.09 });
}

export function playChestSound() {
  [659.25, 783.99, 987.77, 1318.5, 1567.98].forEach((freq, i) => {
    playGlideTone({
      startFreq: freq,
      endFreq: freq,
      duration: 0.15,
      delay: i * 0.065,
      type: 'sine',
      volume: 0.11,
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
    { f: 1046.5, d: 0.38, t: 0.62 },
  ];
  notes.forEach((n) =>
    playGlideTone({
      startFreq: n.f,
      endFreq: n.f,
      duration: n.d,
      delay: n.t,
      type: 'triangle',
      volume: 0.14,
    })
  );
}

export function humanizeMathForKids(rawText) {
  if (!rawText) return '';
  return rawText
    .replace(/\[\s*\?\s*\]/g, 'qual número')
    .replace(/Golpe Final da Liga:/gi, 'Desafio final!')
    .replace(/Desafio clássico:/gi, 'Atenção:')
    .replace(/->/g, ', que dá ')
    .replace(/×/g, ' vezes ')
    .replace(/−/g, ' menos ')
    .replace(/\+/g, ' mais ')
    .replace(/=/g, ' é igual a ')
    .replace(/é igual a\s*\?/g, 'é igual a quanto?')
    .replace(/[•⭐🎉💎❤️🔥⚡🎲📝🎨⏱️📅📚🗺️🏅🔊🔇✖🚀☁️✨🛡️👑💡🎯🔒]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function selectBestPtBrVoice(persona) {
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
          'antonio online',
          'thalita online',
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

  const scopedClip = clipKey ? `${persona}/${clipKey}` : null;
  if (scopedClip && AVAILABLE_STUDIO_CLIPS.has(scopedClip)) {
    const audio = new Audio(`/tabuada-assets/audio/${scopedClip}.mp3`);
    audio.volume = 0.95;
    activeAudioEl = audio;
    audio.play().catch(() => {});
    return;
  }

  if (!('speechSynthesis' in window)) return;
  const spoken = humanizeMathForKids(text);
  if (!spoken) return;

  try {
    const utt = new SpeechSynthesisUtterance(spoken);
    utt.lang = 'pt-BR';
    // Natural, warm pitch (avoid overly synthetic high pitch)
    utt.pitch = persona === 'maya' ? 1.15 : 1.08;
    utt.rate = 1.02;

    const chosenVoice = selectBestPtBrVoice(persona);
    if (chosenVoice) {
      utt.voice = chosenVoice;
      const lowerName = chosenVoice.name.toLowerCase();
      if (lowerName.includes('thalita') || lowerName.includes('google')) {
        utt.pitch = persona === 'maya' ? 1.08 : 1.02;
      }
    }
    window.speechSynthesis.speak(utt);
  } catch {
    // ignore speech exceptions
  }
}

export function getRandomPraise(isCombo, persona = activePersona) {
  const pool = isCombo ? COMBO_PRAISES[persona] : CORRECT_PRAISES[persona];
  return pool[Math.floor(Math.random() * pool.length)];
}
