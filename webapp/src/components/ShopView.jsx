import React from 'react';
import { CrownIcon, GemIcon, HeartIcon } from './HeroSvgs';

export default function ShopView({
  isVIP = false,
  onOpenVipGuardian,
  onBuyHearts,
  onAddGems,
}) {
  return (
    <section className="w-full pb-8">
      <div className="mb-5">
        <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-duo-ink">
          Loja dos Heróis
        </h1>
        <p className="font-body text-sm sm:text-base text-duo-muted font-semibold mt-1">
          Recarregue vidas, ganhe gemas e libere o Passe VIP da Liga dos Heróis!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* VIP Hero Pass Card */}
        <div className="md:col-span-2 relative overflow-hidden rounded-[22px] bg-gradient-to-br from-purple-700 via-purple-600 to-fuchsia-600 p-5 text-white border-b-[7px] border-purple-950 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="pointer-events-none absolute top-0 bottom-0 -left-1/2 w-1/2 bg-gradient-to-r from-transparent via-white/25 to-transparent animate-sheen" />
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-white/15 border border-white/25 flex items-center justify-center shrink-0">
              <CrownIcon className="w-8 h-7" />
            </div>
            <div>
              <h2 className="font-display font-extrabold text-lg sm:text-xl">
                Passe VIP • Liga dos Heróis
              </h2>
              <p className="font-body text-xs sm:text-sm text-purple-100 font-semibold mt-0.5">
                Vidas Infinitas + Todas as 10 Fases + 6 Livros Digitais em A4!
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onOpenVipGuardian}
            className="toy-btn relative z-10 px-5 py-3 rounded-2xl bg-duo-gold border-b-[5px] border-duo-goldDark text-amber-950 text-sm uppercase shrink-0"
          >
            {isVIP ? '✓ Passe VIP Ativo' : 'Liberar R$ 27,00'}
          </button>
        </div>

        {/* Refill Hearts */}
        <div className="bg-white rounded-[22px] border-2 border-slate-200 border-b-[6px] border-b-slate-300 p-4 flex flex-col justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 p-2.5 rounded-2xl bg-rose-50 border-2 border-rose-200 flex items-center justify-center shrink-0">
              <HeartIcon className="w-7 h-7" />
            </div>
            <div>
              <h3 className="font-display font-extrabold text-base text-duo-ink">
                Recarregar 5 Vidas
              </h3>
              <p className="font-body text-xs text-slate-500 font-semibold mt-0.5">
                Volte a treinar com o Léo e a Maya imediatamente!
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onBuyHearts}
            className="toy-btn w-full py-2.5 rounded-xl bg-duo-blue border-b-[5px] border-duo-blueDark text-white text-sm uppercase"
          >
            Trocar por 20 💎
          </button>
        </div>

        {/* Gem Pack 50 */}
        <div className="bg-white rounded-[22px] border-2 border-slate-200 border-b-[6px] border-b-slate-300 p-4 flex flex-col justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 p-2.5 rounded-2xl bg-cyan-50 border-2 border-cyan-200 flex items-center justify-center shrink-0">
              <GemIcon className="w-7 h-7" />
            </div>
            <div>
              <h3 className="font-display font-extrabold text-base text-duo-ink">
                Saco com 50 Gemas
              </h3>
              <p className="font-body text-xs text-slate-500 font-semibold mt-0.5">
                Bônus rápido para ajudar nas próximas fases!
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onAddGems(50)}
            className="toy-btn w-full py-2.5 rounded-xl bg-duo-green border-b-[5px] border-duo-greenDark text-white text-sm uppercase"
          >
            Resgatar +50 💎
          </button>
        </div>

        {/* Gem Pack 200 */}
        <div className="md:col-span-2 bg-white rounded-[22px] border-2 border-amber-200 border-b-[6px] border-b-amber-300 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 p-2.5 rounded-2xl bg-amber-50 border-2 border-amber-300 flex items-center justify-center shrink-0">
              <GemIcon className="w-7 h-7" />
            </div>
            <div>
              <h3 className="font-display font-extrabold text-base text-duo-ink">
                Baú Lendário com 200 Gemas
              </h3>
              <p className="font-body text-xs sm:text-sm text-slate-500 font-semibold mt-0.5">
                Recompensa especial dos Super-Heróis da Tabuada!
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onAddGems(200)}
            className="toy-btn sm:w-auto w-full px-6 py-3 rounded-xl bg-duo-gold border-b-[5px] border-duo-goldDark text-amber-950 text-sm uppercase shrink-0"
          >
            Resgatar +200 💎
          </button>
        </div>
      </div>
    </section>
  );
}
