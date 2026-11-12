import React from 'react';

export function BrandLogo({ compact = false }) {
  return (
    <div className="inline-flex items-center gap-2.5 select-none">
      <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-300 via-amber-400 to-orange-500 border-2 border-amber-600 border-b-[4px] flex items-center justify-center shadow-sm shrink-0">
        <svg viewBox="0 0 32 32" className="w-6 h-6" aria-hidden="true">
          <path
            d="M 9 9 L 23 23 M 23 9 L 9 23"
            stroke="#FFFFFF"
            strokeWidth="5"
            strokeLinecap="round"
          />
        </svg>
      </div>
      {!compact && (
        <div className="text-left leading-none">
          <div className="font-display font-extrabold text-[15px] tracking-tight text-duo-ink">
            Heróis da
          </div>
          <div className="font-display font-extrabold text-[13px] tracking-tight text-duo-greenDark">
            Multiplicação
          </div>
        </div>
      )}
    </div>
  );
}

export function AvatarGraphic({ avatarKey = 'leo', className = 'w-full h-full' }) {
  if (avatarKey === 'leo') {
    return (
      <img
        src="/tabuada-assets/avatar-leo.png"
        alt="Léo Herói"
        className={`${className} object-cover rounded-full`}
      />
    );
  }

  if (avatarKey === 'maya') {
    return (
      <img
        src="/tabuada-assets/avatar-maya.png"
        alt="Maya Heroína"
        className={`${className} object-cover rounded-full`}
      />
    );
  }

  if (avatarKey === 'monstro') {
    return (
      <img
        src="/tabuada-assets/avatar-monstro.png"
        alt="Monstrinho Amigo"
        className={`${className} object-cover rounded-full`}
      />
    );
  }

  if (avatarKey === 'fox') {
    return (
      <svg viewBox="0 0 100 100" className={className} aria-label="Raposinha Esperta">
        <defs>
          <radialGradient id="foxBg" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#FFF7ED" />
            <stop offset="100%" stopColor="#FED7AA" />
          </radialGradient>
        </defs>
        <circle cx="50" cy="50" r="48" fill="url(#foxBg)" />
        <polygon points="18,16 40,38 14,42" fill="#EA580C" />
        <polygon points="22,22 36,36 18,38" fill="#FDA4AF" />
        <polygon points="82,16 60,38 86,42" fill="#EA580C" />
        <polygon points="78,22 64,36 82,38" fill="#FDA4AF" />
        <ellipse cx="50" cy="58" rx="35" ry="31" fill="#F97316" />
        <path d="M 15 58 Q 32 72 50 77 Q 68 72 85 58 Q 82 85 50 87 Q 18 85 15 58 Z" fill="#FFFBEB" />
        <ellipse cx="26" cy="63" rx="6.5" ry="3.8" fill="#FB7185" opacity="0.45" />
        <ellipse cx="74" cy="63" rx="6.5" ry="3.8" fill="#FB7185" opacity="0.45" />
        <circle cx="35" cy="50" r="7" fill="#1E293B" />
        <circle cx="33" cy="47" r="2.6" fill="#FFFFFF" />
        <circle cx="37" cy="53" r="1.2" fill="#FFFFFF" />
        <circle cx="65" cy="50" r="7" fill="#1E293B" />
        <circle cx="63" cy="47" r="2.6" fill="#FFFFFF" />
        <circle cx="67" cy="53" r="1.2" fill="#FFFFFF" />
        <polygon points="50,65 45,59 55,59" fill="#0F172A" />
        <path d="M 45 67 Q 50 72 50 68 Q 50 72 55 67" fill="none" stroke="#0F172A" strokeWidth="2.4" strokeLinecap="round" />
      </svg>
    );
  }

  if (avatarKey === 'robot') {
    return (
      <svg viewBox="0 0 100 100" className={className} aria-label="Robô X">
        <defs>
          <radialGradient id="botBg" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#F0F9FF" />
            <stop offset="100%" stopColor="#BAE6FD" />
          </radialGradient>
        </defs>
        <circle cx="50" cy="50" r="48" fill="url(#botBg)" />
        <line x1="50" y1="10" x2="50" y2="23" stroke="#475569" strokeWidth="4" strokeLinecap="round" />
        <circle cx="50" cy="10" r="5.5" fill="#FACC15" stroke="#CA8A04" strokeWidth="1.5" />
        <rect x="10" y="45" width="8" height="16" rx="4" fill="#64748B" />
        <rect x="82" y="45" width="8" height="16" rx="4" fill="#64748B" />
        <rect x="16" y="23" width="68" height="58" rx="19" fill="#0284C7" />
        <rect x="24" y="31" width="52" height="39" rx="13" fill="#0F172A" />
        <circle cx="37" cy="47" r="6" fill="#4ADE80" />
        <circle cx="39" cy="45" r="2" fill="#FFFFFF" />
        <circle cx="63" cy="47" r="6" fill="#4ADE80" />
        <circle cx="65" cy="45" r="2" fill="#FFFFFF" />
        <path d="M 40 58 Q 50 66 60 58" fill="none" stroke="#4ADE80" strokeWidth="3.2" strokeLinecap="round" />
        <rect x="38" y="83" width="24" height="10" rx="4" fill="#F59E0B" />
      </svg>
    );
  }

  if (avatarKey === 'cat') {
    return (
      <svg viewBox="0 0 100 100" className={className} aria-label="Gatinho Estelar">
        <defs>
          <radialGradient id="catBg" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#FAF5FF" />
            <stop offset="100%" stopColor="#E9D5FF" />
          </radialGradient>
        </defs>
        <circle cx="50" cy="50" r="48" fill="url(#catBg)" />
        <polygon points="18,18 39,37 15,43" fill="#7C3AED" />
        <polygon points="22,24 35,36 19,40" fill="#F472B6" />
        <polygon points="82,18 61,37 85,43" fill="#7C3AED" />
        <polygon points="78,24 65,36 81,40" fill="#F472B6" />
        <ellipse cx="50" cy="57" rx="34" ry="30" fill="#A855F7" />
        <circle cx="35" cy="52" r="7" fill="#1E1B4B" />
        <circle cx="33" cy="49" r="2.5" fill="#FDE047" />
        <circle cx="37" cy="55" r="1.2" fill="#FFFFFF" />
        <circle cx="65" cy="52" r="7" fill="#1E1B4B" />
        <circle cx="63" cy="49" r="2.5" fill="#FDE047" />
        <circle cx="67" cy="55" r="1.2" fill="#FFFFFF" />
        <ellipse cx="25" cy="61" rx="5.5" ry="3.2" fill="#F472B6" opacity="0.6" />
        <ellipse cx="75" cy="61" rx="5.5" ry="3.2" fill="#F472B6" opacity="0.6" />
        <polygon points="50,61 47,57 53,57" fill="#F472B6" />
        <path d="M 45 64 Q 50 68 50 65 Q 50 68 55 64" fill="none" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" />
        <polygon points="50,33 52,37 56,37 53,40 54,44 50,41 46,44 47,40 44,37 48,37" fill="#FDE047" />
      </svg>
    );
  }

  if (avatarKey === 'dino') {
    return (
      <svg viewBox="0 0 100 100" className={className} aria-label="Dino Forte">
        <defs>
          <radialGradient id="dinoBg" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#ECFDF5" />
            <stop offset="100%" stopColor="#BBF7D0" />
          </radialGradient>
        </defs>
        <circle cx="50" cy="50" r="48" fill="url(#dinoBg)" />
        <polygon points="50,7 44,20 56,20" fill="#FACC15" />
        <polygon points="35,12 31,23 43,23" fill="#FACC15" />
        <polygon points="65,12 57,23 69,23" fill="#FACC15" />
        <rect x="20" y="20" width="60" height="64" rx="26" fill="#16A34A" />
        <circle cx="37" cy="43" r="7.5" fill="#0F172A" />
        <circle cx="35" cy="40" r="2.8" fill="#FFFFFF" />
        <circle cx="39" cy="46" r="1.2" fill="#FFFFFF" />
        <circle cx="63" cy="43" r="7.5" fill="#0F172A" />
        <circle cx="61" cy="40" r="2.8" fill="#FFFFFF" />
        <circle cx="65" cy="46" r="1.2" fill="#FFFFFF" />
        <ellipse cx="26" cy="54" rx="5.5" ry="3.5" fill="#FB7185" opacity="0.45" />
        <ellipse cx="74" cy="54" rx="5.5" ry="3.5" fill="#FB7185" opacity="0.45" />
        <ellipse cx="50" cy="63" rx="20" ry="13" fill="#86EFAC" />
        <path d="M 40 65 Q 50 74 60 65" fill="#15803D" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 100 100" className={className} aria-label="Corujinha Sábia">
      <defs>
        <radialGradient id="owlBg" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#FFFBEB" />
          <stop offset="100%" stopColor="#FDE68A" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill="url(#owlBg)" />
      <polygon points="22,20 37,33 18,39" fill="#B45309" />
      <polygon points="78,20 63,33 82,39" fill="#B45309" />
      <ellipse cx="50" cy="56" rx="35" ry="32" fill="#D97706" />
      <ellipse cx="50" cy="67" rx="20" ry="15" fill="#FEF3C7" />
      <circle cx="35" cy="49" r="13" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2.8" />
      <circle cx="65" cy="49" r="13" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2.8" />
      <line x1="48" y1="49" x2="52" y2="49" stroke="#0F172A" strokeWidth="2.8" />
      <circle cx="35" cy="49" r="6.5" fill="#0F172A" />
      <circle cx="33" cy="46" r="2.3" fill="#FFFFFF" />
      <circle cx="65" cy="49" r="6.5" fill="#0F172A" />
      <circle cx="63" cy="46" r="2.3" fill="#FFFFFF" />
      <polygon points="50,60 46,53 54,53" fill="#EA580C" />
    </svg>
  );
}

/** Concrete visual grouping blocks to help kids understand multiplication visually */
export function VisualMultiplicationGroups({ groups = 2, perGroup = 3, icon = 'star' }) {
  const safeGroups = Math.min(5, Math.max(1, groups));
  const safePerGroup = Math.min(5, Math.max(1, perGroup));

  const renderDot = (idx) => {
    if (icon === 'gem') {
      return (
        <span
          key={idx}
          className="inline-block w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-[4px] rotate-45 bg-cyan-400 border border-cyan-600 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]"
        />
      );
    }
    if (icon === 'shield') {
      return (
        <span
          key={idx}
          className="inline-block w-3.5 h-4 sm:w-4 sm:h-4 rounded-t-sm rounded-b-full bg-duo-blue border border-duo-blueDark shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]"
        />
      );
    }
    if (icon === 'bolt') {
      return (
        <span
          key={idx}
          className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-amber-400 border border-amber-600 text-[9px] font-black text-amber-950"
        >
          ⚡
        </span>
      );
    }
    return (
      <span
        key={idx}
        className="inline-block w-4 h-4 rounded-full bg-duo-gold border-2 border-amber-500 shadow-[inset_0_2px_0_rgba(255,255,255,0.7)]"
      />
    );
  };

  return (
    <div
      className="mb-4 sm:mb-5 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5"
      aria-label={`${safeGroups} grupos com ${safePerGroup} itens cada`}
    >
      {Array.from({ length: safeGroups }).map((_, gIdx) => (
        <div
          key={gIdx}
          className="inline-flex items-center gap-1.5 bg-white border-2 border-amber-200 border-b-[4px] rounded-2xl px-2.5 py-1.5 shadow-sm"
        >
          {Array.from({ length: safePerGroup }).map((__, iIdx) => renderDot(iIdx))}
        </div>
      ))}
    </div>
  );
}

export function KawaiiStar({ className = 'w-7 h-7' }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <path
        d="M 20 3 L 24.5 13.5 L 36 14.5 L 27.5 22.5 L 30 34 L 20 28 L 10 34 L 12.5 22.5 L 4 14.5 L 15.5 13.5 Z"
        fill="#FFFBEB"
        stroke="#B45309"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <circle cx="17" cy="18" r="1.8" fill="#1E293B" />
      <circle cx="16.3" cy="17.3" r="0.6" fill="#FFF" />
      <circle cx="23" cy="18" r="1.8" fill="#1E293B" />
      <circle cx="22.3" cy="17.3" r="0.6" fill="#FFF" />
      <path d="M 18.5 22 Q 20 23.5 21.5 22" fill="none" stroke="#B45309" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export function KawaiiGoldStar({ filled = true, className = 'w-6 h-6' }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <path
        d="M 20 3 L 24.5 13.5 L 36 14.5 L 27.5 22.5 L 30 34 L 20 28 L 10 34 L 12.5 22.5 L 4 14.5 L 15.5 13.5 Z"
        fill={filled ? '#FFC800' : '#E2E8F0'}
        stroke={filled ? '#D97706' : '#94A3B8'}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {filled && (
        <>
          <circle cx="17" cy="18" r="1.8" fill="#1E293B" />
          <circle cx="16.3" cy="17.3" r="0.6" fill="#FFF" />
          <circle cx="23" cy="18" r="1.8" fill="#1E293B" />
          <circle cx="22.3" cy="17.3" r="0.6" fill="#FFF" />
          <path d="M 18.5 22 Q 20 23.5 21.5 22" fill="none" stroke="#B45309" strokeWidth="1.3" strokeLinecap="round" />
        </>
      )}
    </svg>
  );
}

export function KawaiiLock({ className = 'w-8 h-8' }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <rect x="8" y="16" width="24" height="20" rx="6" fill="#CBD5E1" stroke="#64748B" strokeWidth="2.5" />
      <path d="M 13 16 V 11 C 13 7.1 16.1 4 20 4 C 23.9 4 27 7.1 27 11 V 16" fill="none" stroke="#64748B" strokeWidth="3" strokeLinecap="round" />
      <circle cx="20" cy="24" r="3" fill="#475569" />
      <rect x="18.5" y="24" width="3" height="6" rx="1" fill="#475569" />
    </svg>
  );
}

export function ChestGraphic({ open = false, className = 'w-12 h-11' }) {
  if (open) {
    return (
      <svg viewBox="0 0 60 54" className={className} aria-hidden="true">
        <circle cx="30" cy="22" r="18" fill="#FDE047" opacity="0.38" />
        <path d="M 4 14 Q 30 0 56 14 Q 50 18 30 18 Q 10 18 4 14 Z" fill="#D97706" stroke="#78350F" strokeWidth="2" />
        <circle cx="22" cy="18" r="4" fill="#38BDF8" />
        <circle cx="36" cy="17" r="4" fill="#F43F5E" />
        <circle cx="30" cy="14" r="5" fill="#FDE047" />
        <rect x="6" y="22" width="48" height="26" rx="6" fill="#F59E0B" stroke="#78350F" strokeWidth="2.5" />
        <rect x="16" y="22" width="6" height="26" fill="#FDE047" stroke="#78350F" strokeWidth="1.5" />
        <rect x="38" y="22" width="6" height="26" fill="#FDE047" stroke="#78350F" strokeWidth="1.5" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 60 50" className={className} aria-hidden="true">
      <rect x="6" y="20" width="48" height="26" rx="6" fill="#D97706" stroke="#78350F" strokeWidth="2.5" />
      <path d="M 4 20 Q 4 8 30 8 Q 56 8 56 20 Z" fill="#F59E0B" stroke="#78350F" strokeWidth="2.5" />
      <rect x="16" y="8" width="6" height="38" fill="#FDE047" stroke="#78350F" strokeWidth="1.5" />
      <rect x="38" y="8" width="6" height="38" fill="#FDE047" stroke="#78350F" strokeWidth="1.5" />
      <circle cx="30" cy="22" r="5" fill="#FDE047" stroke="#78350F" strokeWidth="1.5" />
      <circle cx="30" cy="22" r="1.5" fill="#451A03" />
    </svg>
  );
}

export function FlameIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <path
        d="M 16 2 C 16 2 21 8 21 14 C 21 17 24 18 24 22 C 24 27.5 19.5 30 16 30 C 12.5 30 8 27.5 8 22 C 8 16 12 11 12 11 C 12 11 13 16 16 17 C 16 13 16 2 16 2 Z"
        fill="#F97316"
      />
      <circle cx="14" cy="21" r="1.2" fill="#1E293B" />
      <circle cx="18" cy="21" r="1.2" fill="#1E293B" />
    </svg>
  );
}

export function GemIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <polygon points="10,4 22,4 28,11 16,29 4,11" fill="#06B6D4" stroke="#0891B2" strokeWidth="1.5" />
      <polygon points="10,4 16,11 22,4" fill="#A5F3FC" opacity="0.6" />
      <polygon points="4,11 16,11 16,29" fill="#0891B2" opacity="0.4" />
      <polygon points="28,11 16,11 16,29" fill="#155E75" opacity="0.5" />
    </svg>
  );
}

export function HeartIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <path
        d="M 16 28 C 16 28 4 20 4 11 C 4 6 7.5 3 12 3 C 14.5 3 16 5 16 5 C 16 5 17.5 3 20 3 C 24.5 3 28 6 28 11 C 28 20 16 28 16 28 Z"
        fill="#F43F5E"
        stroke="#BE123C"
        strokeWidth="1.5"
      />
      <ellipse cx="10" cy="9" rx="3" ry="1.8" fill="#FFF" opacity="0.5" transform="rotate(-30 10 9)" />
    </svg>
  );
}

export function CrownIcon({ className = 'w-7 h-6' }) {
  return (
    <svg viewBox="0 0 36 30" className={className} aria-hidden="true">
      <polygon
        points="2,24 6,8 14,16 18,6 22,16 30,8 34,24"
        fill="#FACC15"
        stroke="#CA8A04"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <rect x="2" y="23" width="32" height="5" rx="2" fill="#CA8A04" />
      <circle cx="18" cy="6" r="2.5" fill="#EF4444" />
      <circle cx="6" cy="8" r="2" fill="#3B82F6" />
      <circle cx="30" cy="8" r="2" fill="#10B981" />
    </svg>
  );
}

export function UnitDecalBg({ type }) {
  if (type === 'clouds') {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-45" aria-hidden="true">
        <svg className="absolute top-12 left-4 w-24 text-emerald-100" viewBox="0 0 120 60" fill="currentColor">
          <path d="M25 50h70a16 16 0 0 0 2-31.9A22 22 0 0 0 54 12a18 18 0 0 0-32 9A14 14 0 0 0 25 50z" />
        </svg>
        <svg className="absolute bottom-24 right-4 w-20 text-emerald-100" viewBox="0 0 120 60" fill="currentColor">
          <path d="M25 50h70a16 16 0 0 0 2-31.9A22 22 0 0 0 54 12a18 18 0 0 0-32 9A14 14 0 0 0 25 50z" />
        </svg>
      </div>
    );
  }
  if (type === 'shields') {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-35" aria-hidden="true">
        <svg className="absolute top-16 right-6 w-16 text-sky-100" viewBox="0 0 64 64" fill="currentColor">
          <path d="M32 6L10 14v16c0 14.5 9.4 25.6 22 29 12.6-3.4 22-14.5 22-29V14L32 6z" />
        </svg>
        <svg className="absolute bottom-24 left-6 w-14 text-sky-100" viewBox="0 0 64 64" fill="currentColor">
          <path d="M32 6L10 14v16c0 14.5 9.4 25.6 22 29 12.6-3.4 22-14.5 22-29V14L32 6z" />
        </svg>
      </div>
    );
  }
  if (type === 'crystals') {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-35" aria-hidden="true">
        <svg className="absolute top-12 left-6 w-14 text-amber-100" viewBox="0 0 64 64" fill="currentColor">
          <polygon points="32,4 52,24 32,60 12,24" />
        </svg>
        <svg className="absolute bottom-20 right-6 w-12 text-orange-100" viewBox="0 0 64 64" fill="currentColor">
          <polygon points="32,4 52,24 32,60 12,24" />
        </svg>
      </div>
    );
  }
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-45" aria-hidden="true">
      <svg className="absolute top-10 right-6 w-14 text-purple-100" viewBox="0 0 40 40" fill="currentColor">
        <path d="M 20 3 L 24.5 13.5 L 36 14.5 L 27.5 22.5 L 30 34 L 20 28 L 10 34 L 12.5 22.5 L 4 14.5 L 15.5 13.5 Z" />
      </svg>
      <svg className="absolute bottom-14 left-8 w-10 text-yellow-100" viewBox="0 0 40 40" fill="currentColor">
        <path d="M 20 3 L 24.5 13.5 L 36 14.5 L 27.5 22.5 L 30 34 L 20 28 L 10 34 L 12.5 22.5 L 4 14.5 L 15.5 13.5 Z" />
      </svg>
    </div>
  );
}
