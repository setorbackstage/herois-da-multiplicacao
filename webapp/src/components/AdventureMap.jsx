import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { LESSONS_DATA, UNITS_DATA } from '../data/gameData';
import {
  ChestGraphic,
  KawaiiGoldStar,
  KawaiiLock,
  KawaiiStar,
  UnitDecalBg,
} from './HeroSvgs';
import { playLockedSound, playPopSound } from '../utils/heroAudio';

const MASCOT_IMAGES = {
  leo: {
    src: '/tabuada-assets/heroi-menino-oficial.png',
    alt: 'Léo Herói',
    title: 'Léo Herói — O Guardião do X',
  },
  maya: {
    src: '/tabuada-assets/heroi-menina-oficial.png',
    alt: 'Maya Heroína',
    title: 'Maya Heroína — A Maga da Multiplicação',
  },
  monstro: {
    src: '/tabuada-assets/monstro-oficial.png',
    alt: 'Monstrinho dos Números',
    title: 'O Monstrinho dos Números — Chefão Final',
  },
};

function UnitTrailTrack({
  unit,
  hero,
  shakingLevel,
  onNodeClick,
  onChestClick,
  nodeBtnRefs,
}) {
  const trackRef = useRef(null);
  const chestRef = useRef(null);
  const [svgSize, setSvgSize] = useState({ width: 0, height: 0 });
  const [segments, setSegments] = useState([]);

  const computePaths = () => {
    const track = trackRef.current;
    if (!track) return;
    const trackRect = track.getBoundingClientRect();
    if (!trackRect.width || !trackRect.height) return;

    const points = [];
    unit.levels.forEach((lvl) => {
      const btn = nodeBtnRefs.current[lvl.num];
      if (btn) {
        const r = btn.getBoundingClientRect();
        points.push({
          x: r.left - trackRect.left + r.width / 2,
          y: r.top - trackRect.top + r.height / 2,
          level: lvl.num,
        });
      }
    });

    if (chestRef.current && unit.chestAfter) {
      const cr = chestRef.current.getBoundingClientRect();
      points.push({
        x: cr.left - trackRect.left + cr.width / 2,
        y: cr.top - trackRect.top + cr.height / 2,
        level: unit.chestAfter + 0.5,
      });
    }

    const nextSegments = [];
    for (let i = 0; i < points.length - 1; i++) {
      const p1 = points[i];
      const p2 = points[i + 1];
      const dy = (p2.y - p1.y) / 2;
      nextSegments.push({
        id: `${unit.id}-${i}`,
        d: `M ${p1.x} ${p1.y} C ${p1.x} ${p1.y + dy}, ${p2.x} ${p2.y - dy}, ${p2.x} ${p2.y}`,
        unlocked: p2.level <= hero.unlockedLevel,
      });
    }

    setSvgSize({ width: trackRect.width, height: trackRect.height });
    setSegments(nextSegments);
  };

  useLayoutEffect(() => {
    computePaths();
    const track = trackRef.current;
    if (!track || typeof ResizeObserver === 'undefined') return undefined;
    const ro = new ResizeObserver(() => computePaths());
    ro.observe(track);
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hero.unlockedLevel, unit.id]);

  useEffect(() => {
    const t = setTimeout(computePaths, 90);
    if (document.fonts?.ready) {
      document.fonts.ready.then(computePaths).catch(() => {});
    }
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hero.unlockedLevel]);

  const isChestUnlocked = hero.unlockedLevel > unit.chestAfter;
  const isChestOpened =
    Array.isArray(hero.openedChests) && hero.openedChests.includes(unit.chestAfter);

  return (
    <div
      ref={trackRef}
      className="relative w-full max-w-[520px] mx-auto flex flex-col items-center gap-12 pt-8 pb-6"
    >
      <UnitDecalBg type={unit.decalType} />

      {/* Scoped Trail SVG — strictly inside this unit track, never crossing banners */}
      {svgSize.width > 0 && svgSize.height > 0 && (
        <svg
          width={svgSize.width}
          height={svgSize.height}
          viewBox={`0 0 ${svgSize.width} ${svgSize.height}`}
          className="pointer-events-none absolute inset-0 z-0"
          aria-hidden="true"
        >
          {segments.map((seg) => (
            <path
              key={seg.id}
              d={seg.d}
              fill="none"
              strokeWidth="10"
              strokeLinecap="round"
              stroke={seg.unlocked ? unit.strokeColor : '#E2E8F0'}
              strokeDasharray={seg.unlocked ? undefined : '8 9'}
            />
          ))}
        </svg>
      )}

      {unit.levels.map((lvl) => {
        const isUnlocked = lvl.num <= hero.unlockedLevel;
        const isCompleted = lvl.num < hero.unlockedLevel;
        const isCurrentActive = lvl.num === hero.unlockedLevel;
        const isShaking = shakingLevel === lvl.num;

        const shiftClass =
          lvl.shift === 'left'
            ? '-translate-x-10 sm:-translate-x-16'
            : lvl.shift === 'right'
            ? 'translate-x-10 sm:translate-x-16'
            : 'translate-x-0';

        const nodePaletteClass = !isUnlocked
          ? 'bg-[#E5E5E5] border-b-[8px] border-[#AFAFAF]'
          : isCompleted
          ? 'bg-duo-gold border-b-[8px] border-duo-goldDark'
          : unit.id === 1
          ? 'bg-duo-green border-b-[8px] border-duo-greenDark'
          : unit.id === 2
          ? 'bg-duo-blue border-b-[8px] border-duo-blueDark'
          : unit.id === 3
          ? 'bg-duo-orange border-b-[8px] border-duo-orangeDark'
          : 'bg-duo-purple border-b-[8px] border-duo-purpleDark';

        const mascotMeta = lvl.mascotKey ? MASCOT_IMAGES[lvl.mascotKey] : null;

        return (
          <div
            key={lvl.num}
            className={`relative w-full flex justify-center items-center z-10 ${
              isCurrentActive ? 'pt-7' : ''
            }`}
          >
            {/* Brand Hero Mascot safely anchored inside track width, immune to node translateX */}
            {mascotMeta && (
              <div
                title={mascotMeta.title}
                className={`pointer-events-none absolute top-1/2 -translate-y-1/2 z-10 ${
                  lvl.mascotSide === 'left'
                    ? 'left-2 sm:left-5'
                    : 'right-2 sm:right-5'
                }`}
              >
                <div className="animate-floatSlow">
                  <img
                    src={mascotMeta.src}
                    alt={mascotMeta.alt}
                    className={`${
                      lvl.isBoss
                        ? 'w-20 h-20 sm:w-28 sm:h-28 drop-shadow-[0_10px_18px_rgba(147,51,234,0.38)]'
                        : 'w-[76px] h-[88px] sm:w-24 sm:h-28 drop-shadow-[0_8px_14px_rgba(0,0,0,0.16)]'
                    } object-contain`}
                  />
                </div>
              </div>
            )}

            {/* Stage Button Container with offset */}
            <div className={`relative flex items-center justify-center transition-transform ${shiftClass}`}>
              {/* Floating "COMEÇAR" Bounce Bubble */}
              {isCurrentActive && (
                <div className="pointer-events-none absolute -top-14 left-1/2 -translate-x-1/2 z-20">
                  <div className="relative bg-white text-duo-greenDark font-display font-extrabold text-xs sm:text-sm px-3.5 py-1.5 rounded-2xl border-2 border-slate-200 shadow-md whitespace-nowrap animate-tagBounce">
                    COMEÇAR
                    <span className="absolute -bottom-[7px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[7px] border-r-[7px] border-t-[7px] border-l-transparent border-r-transparent border-t-white" />
                  </div>
                </div>
              )}

              {/* Animated SVG Progress Ring around Active Node */}
              {isCurrentActive && (
                <svg
                  viewBox="0 0 100 100"
                  className="pointer-events-none absolute -top-[9px] left-1/2 -translate-x-1/2 -rotate-90 w-[104px] h-[104px] z-10"
                  aria-hidden="true"
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="44"
                    fill="none"
                    stroke="#FFC800"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray="280"
                    strokeDashoffset="68"
                  />
                </svg>
              )}

              <button
                ref={(el) => {
                  nodeBtnRefs.current[lvl.num] = el;
                }}
                type="button"
                onClick={(e) => onNodeClick(lvl.num, e)}
                aria-label={`Fase ${lvl.num}: ${LESSONS_DATA[lvl.num]?.title || ''}`}
                className={`toy-node-gloss relative w-[86px] h-[82px] rounded-full flex items-center justify-center cursor-pointer select-none transition-all duration-100 active:translate-y-1.5 active:border-b-[3px] z-10 ${nodePaletteClass} ${
                  isShaking ? 'animate-shakeX' : ''
                }`}
              >
                {lvl.num === 10 ? (
                  isUnlocked ? (
                    <img
                      src="/tabuada-assets/monstro-oficial.png"
                      alt="Monstrinho Chefão"
                      className="w-14 h-14 object-contain drop-shadow"
                    />
                  ) : (
                    <KawaiiLock className="w-9 h-9" />
                  )
                ) : !isUnlocked ? (
                  <KawaiiLock className="w-9 h-9" />
                ) : isCompleted ? (
                  <div className="flex flex-col items-center justify-center z-10 leading-none">
                    <KawaiiStar className="w-8 h-8" />
                    <span className="text-xs font-extrabold text-amber-950 -mt-0.5">
                      {lvl.num}
                    </span>
                  </div>
                ) : (
                  <span className="text-[28px] font-extrabold text-white drop-shadow-sm z-10">
                    {lvl.num}
                  </span>
                )}
              </button>
            </div>
          </div>
        );
      })}

      {/* Intercalated Treasure Chest at end of unit */}
      {unit.chestAfter && (
        <div className="relative flex flex-col items-center z-10 pt-1">
          <button
            ref={chestRef}
            type="button"
            onClick={() => onChestClick(unit.chestAfter)}
            aria-label={`Baú da Unidade ${unit.id}`}
            className={`relative w-20 h-[72px] rounded-[22px] bg-white border-2 flex items-center justify-center transition-all duration-100 active:translate-y-1 cursor-pointer ${
              isChestUnlocked && !isChestOpened
                ? 'border-yellow-400 border-b-[7px] border-b-yellow-600 animate-chestWobble shadow-md'
                : 'border-slate-200 border-b-[7px] border-b-slate-300'
            }`}
          >
            <ChestGraphic open={isChestOpened} className="w-14 h-12" />
          </button>
          <span
            className={`mt-2 text-xs font-extrabold px-2.5 py-0.5 rounded-lg border ${
              isChestOpened
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                : 'bg-amber-100 text-amber-900 border-amber-300'
            }`}
          >
            {isChestOpened ? '✓ Resgatado' : '+25 💎'}
          </span>
        </div>
      )}
    </div>
  );
}

export default function AdventureMap({
  hero,
  onStartLesson,
  onClaimChest,
  onLockedChestToast,
  initialPopoverLevel = null,
}) {
  const mapRootRef = useRef(null);
  const nodeBtnRefs = useRef({});
  const [shakingLevel, setShakingLevel] = useState(null);
  const [popover, setPopover] = useState(null); // { level, isLocked, x, y, tailLeft, flipBottom }

  const openPopoverForLevel = (levelNum) => {
    const btn = nodeBtnRefs.current[levelNum];
    const mapRoot = mapRootRef.current;
    if (!btn || !mapRoot) return;

    const isUnlocked = levelNum <= hero.unlockedLevel;
    const rect = btn.getBoundingClientRect();
    const mapRect = mapRoot.getBoundingClientRect();

    const rawCenterX = rect.left - mapRect.left + rect.width / 2;
    const cardHalfW = 134;
    const safeX = Math.max(
      cardHalfW + 8,
      Math.min(mapRect.width - cardHalfW - 8, rawCenterX)
    );
    const tailLeft = Math.max(24, Math.min(236, 130 + (rawCenterX - safeX)));

    const rawTop = rect.top - mapRect.top;
    const flipBottom = rawTop < 185;
    const y = flipBottom ? rect.bottom - mapRect.top + 14 : rawTop - 12;

    if (!isUnlocked) {
      playLockedSound();
      setShakingLevel(levelNum);
      setTimeout(() => setShakingLevel(null), 450);
    } else {
      playPopSound();
    }

    setPopover({
      level: levelNum,
      isLocked: !isUnlocked,
      x: safeX,
      y,
      tailLeft,
      flipBottom,
    });
  };

  const handleNodeClick = (levelNum, event) => {
    event.stopPropagation();
    openPopoverForLevel(levelNum);
  };

  useEffect(() => {
    if (initialPopoverLevel) {
      const t = setTimeout(() => openPopoverForLevel(initialPopoverLevel), 120);
      return () => clearTimeout(t);
    }
    return undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialPopoverLevel]);

  useEffect(() => {
    const closeOnOutsideClick = (e) => {
      if (popover && !e.target.closest('[data-popover-card="true"]')) {
        setPopover(null);
      }
    };
    const closeOnEscape = (e) => {
      if (e.key === 'Escape') setPopover(null);
    };
    document.addEventListener('click', closeOnOutsideClick);
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('click', closeOnOutsideClick);
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [popover]);

  const popoverLesson = popover ? LESSONS_DATA[popover.level] : null;

  return (
    <div ref={mapRootRef} className="relative w-full flex flex-col items-center pb-8">
      {/* Floating Duolingo Node Popover Card */}
      {popover && popoverLesson && (
        <div
          data-popover-card="true"
          style={{
            left: `${popover.x}px`,
            top: `${popover.y}px`,
            transform: popover.flipBottom
              ? 'translate(-50%, 0)'
              : 'translate(-50%, -100%)',
          }}
          className={`absolute z-30 w-[268px] rounded-[22px] p-4 border-2 shadow-xl animate-popIn text-center ${
            popover.isLocked
              ? 'bg-slate-50 border-slate-300 border-b-[6px] border-b-slate-300'
              : 'bg-white border-slate-200 border-b-[6px] border-b-slate-200'
          }`}
        >
          {/* Directional tail */}
          <span
            style={{ left: `${popover.tailLeft}px` }}
            className={`absolute -translate-x-1/2 w-0 h-0 border-l-[10px] border-r-[10px] border-l-transparent border-r-transparent ${
              popover.flipBottom
                ? `-top-[10px] border-b-[10px] ${
                    popover.isLocked ? 'border-b-slate-50' : 'border-b-white'
                  }`
                : `-bottom-[10px] border-t-[10px] ${
                    popover.isLocked ? 'border-t-slate-50' : 'border-t-white'
                  }`
            }`}
          />

          {popover.isLocked ? (
            <>
              <div className="font-display font-extrabold text-base text-slate-800">
                🔒 Desafio Bloqueado
              </div>
              <p className="font-body text-xs sm:text-sm text-slate-500 mt-1 mb-3">
                Complete a fase anterior para liberar este poder!
              </p>
              <button
                type="button"
                onClick={() => setPopover(null)}
                className="toy-btn w-full py-2.5 rounded-2xl bg-slate-200 border-b-[5px] border-slate-400 text-slate-700 text-sm uppercase"
              >
                Fechar
              </button>
            </>
          ) : (
            <>
              <div className="font-display font-extrabold text-base text-duo-ink">
                Fase {popover.level} • {popoverLesson.title.split('•')[0].trim()}
              </div>
              <p className="font-body text-xs sm:text-sm text-slate-500 mt-1">
                {popoverLesson.subtitle}
              </p>
              <div className="flex items-center justify-center gap-1 my-3">
                <KawaiiGoldStar className="w-6 h-6" />
                <KawaiiGoldStar className="w-6 h-6" />
                <KawaiiGoldStar className="w-6 h-6" />
              </div>
              <button
                type="button"
                onClick={() => {
                  setPopover(null);
                  onStartLesson(popover.level);
                }}
                className="toy-btn w-full py-3 rounded-2xl bg-duo-green border-b-[6px] border-duo-greenDark text-white text-sm uppercase"
              >
                COMEÇAR +10 💎
              </button>
            </>
          )}
        </div>
      )}

      {/* 4 Units Stack */}
      <div className="w-full flex flex-col gap-6">
        {UNITS_DATA.map((unit) => (
          <section key={unit.id} className="w-full flex flex-col items-center">
            {/* Unit Header Banner — always above trail paths */}
            <div
              className={`relative z-20 w-full rounded-[22px] px-5 py-4 text-white flex items-center justify-between shadow-sm ${unit.themeBg} ${unit.themeBorder}`}
            >
              <div>
                <h2 className="font-display font-extrabold text-sm sm:text-base uppercase tracking-wide">
                  {unit.title}
                </h2>
                <p className="font-body text-xs sm:text-sm text-white/95 mt-0.5 font-semibold">
                  {unit.desc}
                </p>
              </div>
              <div className="hidden sm:flex items-center justify-center w-11 h-11 rounded-2xl bg-white/20 font-display font-extrabold text-lg">
                ×
              </div>
            </div>

            <UnitTrailTrack
              unit={unit}
              hero={hero}
              shakingLevel={shakingLevel}
              onNodeClick={handleNodeClick}
              onChestClick={(chestNum) => {
                if (hero.unlockedLevel <= chestNum) {
                  playLockedSound();
                  onLockedChestToast();
                  return;
                }
                onClaimChest(chestNum);
              }}
              nodeBtnRefs={nodeBtnRefs}
            />
          </section>
        ))}
      </div>
    </div>
  );
}
