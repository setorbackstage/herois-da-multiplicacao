// generate_duolingo_masterpiece.js
const fs = require('fs');
const path = require('path');

// --- 1. HEROES & KAWAII AVATARS ---
// Léo and Maya are the primary brand heroes of "Heróis da Multiplicação", accompanied by the 6 kawaii mascot squad.
const avatars = {
  leo: `
    <div class="avatar-png-wrapper hero-brand-avatar" title="Léo — O Herói do X">
      <img src="tabuada-assets/heroi-menino-oficial.png" alt="Léo Herói" class="avatar-img-round">
    </div>
  `,

  maya: `
    <div class="avatar-png-wrapper hero-brand-avatar" title="Maya — A Heroína dos Números">
      <img src="tabuada-assets/heroi-menina-oficial.png" alt="Maya Heroína" class="avatar-img-round">
    </div>
  `,

  fox: `
    <svg viewBox="0 0 100 100" class="avatar-svg" title="Raposinha Calculista">
      <!-- Ears -->
      <polygon points="18,12 40,36 12,38" fill="#EA580C"/>
      <polygon points="22,18 36,34 16,35" fill="#FDA4AF"/>
      <polygon points="82,12 60,36 88,38" fill="#EA580C"/>
      <polygon points="78,18 64,34 84,35" fill="#FDA4AF"/>
      <!-- Head -->
      <ellipse cx="50" cy="56" rx="38" ry="34" fill="#FF9600"/>
      <!-- Cheeks (white fur) -->
      <path d="M 12 56 Q 30 72 50 78 Q 70 72 88 56 Q 86 86 50 88 Q 14 86 12 56 Z" fill="#FFFBEB"/>
      <!-- Blush -->
      <ellipse cx="25" cy="62" rx="7" ry="4" fill="#F43F5E" opacity="0.45"/>
      <ellipse cx="75" cy="62" rx="7" ry="4" fill="#F43F5E" opacity="0.45"/>
      <!-- Big Kawaii Eyes -->
      <circle cx="34" cy="48" r="7.5" fill="#1E293B"/>
      <circle cx="32" cy="45" r="2.8" fill="#FFFFFF"/>
      <circle cx="36" cy="51" r="1.2" fill="#FFFFFF"/>
      <circle cx="66" cy="48" r="7.5" fill="#1E293B"/>
      <circle cx="64" cy="45" r="2.8" fill="#FFFFFF"/>
      <circle cx="68" cy="51" r="1.2" fill="#FFFFFF"/>
      <!-- Cute Snout & Mouth -->
      <polygon points="50,64 45,58 55,58" fill="#0F172A"/>
      <path d="M 45 66 Q 50 71 50 67 Q 50 71 55 66" fill="none" stroke="#0F172A" stroke-width="2.5" stroke-linecap="round"/>
      <!-- Math Bowtie -->
      <polygon points="38,87 46,92 46,82" fill="#2563EB"/>
      <polygon points="62,87 54,92 54,82" fill="#2563EB"/>
      <circle cx="50" cy="87" r="4" fill="#1D4ED8"/>
    </svg>
  `,

  robot: `
    <svg viewBox="0 0 100 100" class="avatar-svg" title="Robô Multiplicador">
      <!-- Antenna -->
      <line x1="50" y1="8" x2="50" y2="22" stroke="#64748B" stroke-width="4" stroke-linecap="round"/>
      <circle cx="50" cy="8" r="6" fill="#FACC15"/>
      <!-- Ears / Bolts -->
      <rect x="8" y="44" width="8" height="18" rx="4" fill="#64748B"/>
      <rect x="84" y="44" width="8" height="18" rx="4" fill="#64748B"/>
      <!-- Head Chassis -->
      <rect x="14" y="22" width="72" height="62" rx="20" fill="#0284C7"/>
      <rect x="22" y="30" width="56" height="42" rx="14" fill="#0F172A"/>
      <!-- LED Glowing Smiley Eyes -->
      <circle cx="36" cy="46" r="6.5" fill="#4ADE80"/>
      <circle cx="38" cy="44" r="2.2" fill="#FFFFFF"/>
      <circle cx="64" cy="46" r="6.5" fill="#4ADE80"/>
      <circle cx="66" cy="44" r="2.2" fill="#FFFFFF"/>
      <!-- Cute LED Smile -->
      <path d="M 40 58 Q 50 67 60 58" fill="none" stroke="#4ADE80" stroke-width="3.5" stroke-linecap="round"/>
      <!-- Multiply Badge -->
      <rect x="40" y="86" width="20" height="10" rx="3" fill="#F59E0B"/>
      <text x="50" y="94" font-family="'Fredoka', sans-serif" font-size="10" font-weight="900" fill="#FFFFFF" text-anchor="middle">×</text>
    </svg>
  `,

  cat: `
    <svg viewBox="0 0 100 100" class="avatar-svg" title="Gatinho Cósmico">
      <!-- Ears -->
      <polygon points="16,16 38,36 12,42" fill="#7C3AED"/>
      <polygon points="20,22 34,35 17,39" fill="#F472B6"/>
      <polygon points="84,16 62,36 88,42" fill="#7C3AED"/>
      <polygon points="80,22 66,35 83,39" fill="#F472B6"/>
      <!-- Helmet Outer Glass Halo -->
      <circle cx="50" cy="54" r="42" fill="none" stroke="#67E8F9" stroke-width="3.5" stroke-dasharray="5,2" opacity="0.75"/>
      <!-- Head -->
      <ellipse cx="50" cy="56" rx="36" ry="32" fill="#A855F7"/>
      <!-- Kawaii Eyes -->
      <circle cx="34" cy="50" r="7.5" fill="#1E1B4B"/>
      <circle cx="32" cy="47" r="2.6" fill="#FDE047"/>
      <circle cx="36" cy="53" r="1.2" fill="#FFFFFF"/>
      <circle cx="66" cy="50" r="7.5" fill="#1E1B4B"/>
      <circle cx="64" cy="47" r="2.6" fill="#FDE047"/>
      <circle cx="68" cy="53" r="1.2" fill="#FFFFFF"/>
      <!-- Blush -->
      <ellipse cx="24" cy="60" rx="6" ry="3.5" fill="#F472B6" opacity="0.6"/>
      <ellipse cx="76" cy="60" rx="6" ry="3.5" fill="#F472B6" opacity="0.6"/>
      <!-- Nose & Mouth -->
      <polygon points="50,60 47,56 53,56" fill="#F472B6"/>
      <path d="M 45 63 Q 50 67 50 64 Q 50 67 55 63" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"/>
      <!-- Whiskers -->
      <line x1="14" y1="56" x2="26" y2="58" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" opacity="0.8"/>
      <line x1="14" y1="64" x2="26" y2="62" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" opacity="0.8"/>
      <line x1="86" y1="56" x2="74" y2="58" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" opacity="0.8"/>
      <line x1="86" y1="64" x2="74" y2="62" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" opacity="0.8"/>
      <!-- Cosmic Star on Forehead -->
      <polygon points="50,30 52,35 57,35 53,38 55,43 50,40 45,43 47,38 43,35 48,35" fill="#FDE047"/>
    </svg>
  `,

  dino: `
    <svg viewBox="0 0 100 100" class="avatar-svg" title="Dino dos Números">
      <!-- Dino Spikes -->
      <polygon points="50,4 44,18 56,18" fill="#FACC15"/>
      <polygon points="34,10 30,22 42,22" fill="#FACC15"/>
      <polygon points="66,10 58,22 70,22" fill="#FACC15"/>
      <!-- Head -->
      <rect x="18" y="18" width="64" height="68" rx="28" fill="#16A34A"/>
      <!-- Big Kawaii Eyes -->
      <circle cx="36" cy="42" r="8" fill="#0F172A"/>
      <circle cx="34" cy="39" r="3" fill="#FFFFFF"/>
      <circle cx="39" cy="45" r="1.3" fill="#FFFFFF"/>
      <circle cx="64" cy="42" r="8" fill="#0F172A"/>
      <circle cx="62" cy="39" r="3" fill="#FFFFFF"/>
      <circle cx="67" cy="45" r="1.3" fill="#FFFFFF"/>
      <!-- Blush -->
      <ellipse cx="25" cy="54" rx="6" ry="4" fill="#F43F5E" opacity="0.45"/>
      <ellipse cx="75" cy="54" rx="6" ry="4" fill="#F43F5E" opacity="0.45"/>
      <!-- Snout / Smile with Cute Teeth -->
      <ellipse cx="50" cy="62" rx="22" ry="14" fill="#86EFAC"/>
      <circle cx="44" cy="58" r="2" fill="#15803D"/>
      <circle cx="56" cy="58" r="2" fill="#15803D"/>
      <path d="M 40 64 Q 50 74 60 64" fill="#15803D"/>
      <!-- Little white fang -->
      <polygon points="46,65 48,70 50,65" fill="#FFFFFF"/>
      <polygon points="52,65 54,70 56,65" fill="#FFFFFF"/>
    </svg>
  `,

  owl: `
    <svg viewBox="0 0 100 100" class="avatar-svg" title="Corujinha Sábia">
      <!-- Ear Tufts -->
      <polygon points="20,18 36,32 16,38" fill="#B45309"/>
      <polygon points="80,18 64,32 84,38" fill="#B45309"/>
      <!-- Body -->
      <ellipse cx="50" cy="56" rx="38" ry="35" fill="#D97706"/>
      <!-- Belly Feather Ring -->
      <ellipse cx="50" cy="68" rx="22" ry="16" fill="#FEF3C7"/>
      <!-- Big Round Spectacles (Glasses) -->
      <circle cx="34" cy="48" r="14" fill="#FFFFFF" stroke="#0F172A" stroke-width="3"/>
      <circle cx="66" cy="48" r="14" fill="#FFFFFF" stroke="#0F172A" stroke-width="3"/>
      <line x1="48" y1="48" x2="52" y2="48" stroke="#0F172A" stroke-width="3"/>
      <!-- Wise Pupils -->
      <circle cx="34" cy="48" r="7" fill="#0F172A"/>
      <circle cx="32" cy="45" r="2.5" fill="#FFFFFF"/>
      <circle cx="66" cy="48" r="7" fill="#0F172A"/>
      <circle cx="64" cy="45" r="2.5" fill="#FFFFFF"/>
      <!-- Beak -->
      <polygon points="50,60 46,52 54,52" fill="#EA580C"/>
      <!-- Graduation Cap (Mortarboard) -->
      <polygon points="50,8 82,18 50,26 18,18" fill="#1E293B"/>
      <rect x="40" y="23" width="20" height="7" rx="3" fill="#0F172A"/>
      <line x1="72" y1="20" x2="76" y2="34" stroke="#FACC15" stroke-width="2.5"/>
      <circle cx="76" cy="35" r="2.5" fill="#FACC15"/>
    </svg>
  `,

  dragon: `
    <svg viewBox="0 0 100 100" class="avatar-svg" title="Dragãozinho Dourado">
      <!-- Baby Wings -->
      <path d="M 18 52 C 4 36 2 24 16 32 C 12 40 18 48 24 50 Z" fill="#0284C7"/>
      <path d="M 82 52 C 96 36 98 24 84 32 C 88 40 82 48 76 50 Z" fill="#0284C7"/>
      <!-- Golden Horns -->
      <path d="M 28 26 C 24 12 18 8 20 6 C 24 10 32 18 36 28 Z" fill="#F97316"/>
      <path d="M 72 26 C 76 12 82 8 80 6 C 76 10 68 18 64 28 Z" fill="#F97316"/>
      <!-- Head -->
      <ellipse cx="50" cy="54" rx="36" ry="32" fill="#EAB308"/>
      <!-- Golden Crown -->
      <polygon points="38,20 42,12 50,18 58,12 62,20" fill="#EF4444" stroke="#B91C1C" stroke-width="1.5"/>
      <circle cx="50" cy="14" r="2" fill="#FACC15"/>
      <!-- Big Kawaii Eyes -->
      <circle cx="35" cy="46" r="7.5" fill="#0F172A"/>
      <circle cx="33" cy="43" r="2.8" fill="#FFFFFF"/>
      <circle cx="37" cy="49" r="1.2" fill="#FFFFFF"/>
      <circle cx="65" cy="46" r="7.5" fill="#0F172A"/>
      <circle cx="63" cy="43" r="2.8" fill="#FFFFFF"/>
      <circle cx="67" cy="49" r="1.2" fill="#FFFFFF"/>
      <!-- Snout & Tiny Fire Spark -->
      <ellipse cx="50" cy="62" rx="18" ry="12" fill="#FEF08A"/>
      <circle cx="45" cy="59" r="2" fill="#CA8A04"/>
      <circle cx="55" cy="59" r="2" fill="#CA8A04"/>
      <path d="M 44 65 Q 50 71 56 65" fill="none" stroke="#CA8A04" stroke-width="2.5" stroke-linecap="round"/>
      <!-- Blush -->
      <ellipse cx="25" cy="56" rx="5.5" ry="3.5" fill="#F43F5E" opacity="0.45"/>
      <ellipse cx="75" cy="56" rx="5.5" ry="3.5" fill="#F43F5E" opacity="0.45"/>
    </svg>
  `
};

// --- 2. KAWAII SVG ICONS & GRAPHICS ---
const icons = {
  star: `
    <svg viewBox="0 0 40 40" class="svg-icon star-icon">
      <path d="M 20 3 L 24.5 13.5 L 36 14.5 L 27.5 22.5 L 30 34 L 20 28 L 10 34 L 12.5 22.5 L 4 14.5 L 15.5 13.5 Z" fill="#FFC800" stroke="#D97706" stroke-width="2" stroke-linejoin="round"/>
      <!-- Cute Eyes -->
      <circle cx="17" cy="18" r="1.8" fill="#1E293B"/>
      <circle cx="16.3" cy="17.3" r="0.6" fill="#FFF"/>
      <circle cx="23" cy="18" r="1.8" fill="#1E293B"/>
      <circle cx="22.3" cy="17.3" r="0.6" fill="#FFF"/>
      <!-- Smile -->
      <path d="M 18.5 22 Q 20 23.5 21.5 22" fill="none" stroke="#B45309" stroke-width="1.3" stroke-linecap="round"/>
    </svg>
  `,

  lock: `
    <svg viewBox="0 0 40 40" class="svg-icon lock-icon">
      <rect x="8" y="16" width="24" height="20" rx="6" fill="#CBD5E1" stroke="#64748B" stroke-width="2.5"/>
      <path d="M 13 16 V 11 C 13 7.1 16.1 4 20 4 C 23.9 4 27 7.1 27 11 V 16" fill="none" stroke="#64748B" stroke-width="3" stroke-linecap="round"/>
      <circle cx="20" cy="24" r="3" fill="#475569"/>
      <rect x="18.5" y="24" width="3" height="6" rx="1" fill="#475569"/>
    </svg>
  `,

  chest_closed: `
    <svg viewBox="0 0 60 50" class="svg-icon chest-icon chest-closed">
      <!-- Chest Base -->
      <rect x="6" y="20" width="48" height="26" rx="6" fill="#D97706" stroke="#78350F" stroke-width="2.5"/>
      <!-- Chest Lid -->
      <path d="M 4 20 Q 4 8 30 8 Q 56 8 56 20 Z" fill="#F59E0B" stroke="#78350F" stroke-width="2.5"/>
      <!-- Gold Straps -->
      <rect x="16" y="8" width="6" height="38" fill="#FDE047" stroke="#78350F" stroke-width="1.5"/>
      <rect x="38" y="8" width="6" height="38" fill="#FDE047" stroke="#78350F" stroke-width="1.5"/>
      <!-- Lock Latch -->
      <circle cx="30" cy="22" r="5" fill="#FDE047" stroke="#78350F" stroke-width="1.5"/>
      <circle cx="30" cy="22" r="1.5" fill="#451A03"/>
    </svg>
  `,

  chest_open: `
    <svg viewBox="0 0 60 54" class="svg-icon chest-icon chest-open">
      <!-- Burst Glow -->
      <circle cx="30" cy="22" r="18" fill="#FDE047" opacity="0.35"/>
      <!-- Open Lid Backwards -->
      <path d="M 4 14 Q 30 0 56 14 Q 50 18 30 18 Q 10 18 4 14 Z" fill="#D97706" stroke="#78350F" stroke-width="2"/>
      <!-- Sparkling Gems & Coins Spilling -->
      <circle cx="22" cy="18" r="4" fill="#38BDF8"/>
      <circle cx="36" cy="17" r="4" fill="#F43F5E"/>
      <circle cx="30" cy="14" r="5" fill="#FDE047"/>
      <!-- Chest Base -->
      <rect x="6" y="22" width="48" height="26" rx="6" fill="#F59E0B" stroke="#78350F" stroke-width="2.5"/>
      <rect x="16" y="22" width="6" height="26" fill="#FDE047" stroke="#78350F" stroke-width="1.5"/>
      <rect x="38" y="22" width="6" height="26" fill="#FDE047" stroke="#78350F" stroke-width="1.5"/>
    </svg>
  `,

  boss_monster: `
    <div class="boss-node-avatar">
      <img src="tabuada-assets/monstro-oficial.png" alt="Monstrinho Chefão" class="boss-img-node">
    </div>
  `,

  flame: `
    <svg viewBox="0 0 32 32" class="hud-svg flame-svg">
      <path d="M 16 2 C 16 2 21 8 21 14 C 21 17 24 18 24 22 C 24 27.5 19.5 30 16 30 C 12.5 30 8 27.5 8 22 C 8 16 12 11 12 11 C 12 11 13 16 16 17 C 16 13 16 2 16 2 Z" fill="#F97316"/>
      <circle cx="14" cy="21" r="1.2" fill="#1E293B"/>
      <circle cx="18" cy="21" r="1.2" fill="#1E293B"/>
    </svg>
  `,

  gem: `
    <svg viewBox="0 0 32 32" class="hud-svg gem-svg">
      <polygon points="10,4 22,4 28,11 16,29 4,11" fill="#06B6D4" stroke="#0891B2" stroke-width="1.5"/>
      <polygon points="10,4 16,11 22,4" fill="#A5F3FC" opacity="0.6"/>
      <polygon points="4,11 16,11 16,29" fill="#0891B2" opacity="0.4"/>
      <polygon points="28,11 16,11 16,29" fill="#155E75" opacity="0.5"/>
    </svg>
  `,

  heart: `
    <svg viewBox="0 0 32 32" class="hud-svg heart-svg">
      <path d="M 16 28 C 16 28 4 20 4 11 C 4 6 7.5 3 12 3 C 14.5 3 16 5 16 5 C 16 5 17.5 3 20 3 C 24.5 3 28 6 28 11 C 28 20 16 28 16 28 Z" fill="#F43F5E" stroke="#BE123C" stroke-width="1.5"/>
      <ellipse cx="10" cy="9" rx="3" ry="1.8" fill="#FFF" opacity="0.5" transform="rotate(-30 10 9)"/>
    </svg>
  `,

  crown: `
    <svg viewBox="0 0 36 30" class="svg-icon crown-svg">
      <polygon points="2,24 6,8 14,16 18,6 22,16 30,8 34,24" fill="#FACC15" stroke="#CA8A04" stroke-width="2" stroke-linejoin="round"/>
      <rect x="2" y="23" width="32" height="5" rx="2" fill="#CA8A04"/>
      <circle cx="18" cy="6" r="2.5" fill="#EF4444"/>
      <circle cx="6" cy="8" r="2" fill="#3B82F6"/>
      <circle cx="30" cy="8" r="2" fill="#10B981"/>
    </svg>
  `
};

// --- 3. BRAND HEROES & MASCOTS ALONG THE TRAIL ---
const sideMascots = {
  // Léo Herói (Official Boy Mascot of "Heróis da Multiplicação")
  leo_cheering: `
    <div class="trail-hero-mascot" title="Léo Herói — O Guardião do X!">
      <img src="tabuada-assets/heroi-menino-oficial.png" alt="Léo Herói" class="trail-hero-img">
    </div>
  `,

  // Maya Heroína (Official Girl Mascot of "Heróis da Multiplicação")
  maya_cheering: `
    <div class="trail-hero-mascot" title="Maya Heroína — A Maga da Multiplicação!">
      <img src="tabuada-assets/heroi-menina-oficial.png" alt="Maya Heroína" class="trail-hero-img">
    </div>
  `,

  // Monstrinho Roxo Oficial (The Boss Monster of the franchise)
  monstro_boss: `
    <div class="trail-hero-mascot trail-boss-mascot" title="O Monstrinho dos Números — O Chefão Final!">
      <img src="tabuada-assets/monstro-oficial.png" alt="Monstrinho dos Números" class="trail-hero-img">
    </div>
  `,

  // Unit 1 companion: Smiling Number '2'
  two_waving: `
    <svg viewBox="0 0 80 80" class="side-mascot-svg">
      <ellipse cx="68" cy="26" rx="6" ry="6" fill="#4ADE80" stroke="#15803D" stroke-width="2"/>
      <path d="M 22 26 C 22 14 36 10 46 14 C 56 18 56 30 46 40 L 24 58 L 60 58 L 60 66 L 18 66 L 18 54 L 38 34 C 44 28 44 22 38 20 C 32 18 24 22 24 28 Z" fill="#22C55E" stroke="#15803D" stroke-width="3" stroke-linejoin="round"/>
      <circle cx="36" cy="22" r="3.2" fill="#0F172A"/>
      <circle cx="35" cy="21" r="1" fill="#FFF"/>
      <circle cx="46" cy="22" r="3.2" fill="#0F172A"/>
      <circle cx="45" cy="21" r="1" fill="#FFF"/>
      <ellipse cx="32" cy="27" rx="3" ry="1.8" fill="#F43F5E" opacity="0.4"/>
      <ellipse cx="50" cy="27" rx="3" ry="1.8" fill="#F43F5E" opacity="0.4"/>
      <path d="M 39 26 Q 41 29 43 26" fill="none" stroke="#15803D" stroke-width="2" stroke-linecap="round"/>
    </svg>
  `
};

module.exports = { avatars, icons, sideMascots };
