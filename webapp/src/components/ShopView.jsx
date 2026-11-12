import React from 'react';
import { SHOP_REWARDS } from '../data/gameData';
import { CrownIcon, HeartIcon } from './HeroSvgs';

export default function ShopView({
  hero,
  isVIP = false,
  onOpenVipGuardian,
  onBuyHearts,
  onBuyOrEquipReward,
}) {
  const ownedRewards = Array.isArray(hero.ownedRewards) ? hero.ownedRewards : [];

  return (
    <section className="w-full pb-8">
      <div className="mb-5">
        <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-duo-ink">
          Loja de Recompensas
        </h1>
        <p className="font-body text-sm sm:text-base text-duo-muted font-semibold mt-1">
          Use suas gemas conquistadas nas fases para recarregar vidas e colecionar medalhas!
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Refill Hearts */}
        <div className="sm:col-span-2 bg-white rounded-[22px] border-2 border-slate-200 border-b-[6px] border-b-slate-300 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 p-2.5 rounded-2xl bg-rose-50 border-2 border-rose-200 flex items-center justify-center shrink-0">
              <HeartIcon className="w-7 h-7" />
            </div>
            <div>
              <h2 className="font-display font-extrabold text-base text-duo-ink">
                Recarregar 5 Vidas
              </h2>
              <p className="font-body text-xs sm:text-sm text-slate-500 font-semibold mt-0.5">
                Encha seus corações para continuar tentando qualquer desafio.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onBuyHearts}
            disabled={hero.hearts >= 5}
            className={`toy-btn sm:w-auto w-full px-5 py-2.5 rounded-xl text-xs sm:text-sm uppercase shrink-0 ${
              hero.hearts >= 5
                ? 'bg-slate-200 border-b-[5px] border-slate-300 text-slate-400 cursor-not-allowed'
                : 'bg-duo-blue border-b-[5px] border-duo-blueDark text-white'
            }`}
          >
            {hero.hearts >= 5 ? 'Vidas Cheias ❤️' : 'Trocar • 20 💎'}
          </button>
        </div>

        {/* Collectible Hero Badges */}
        {SHOP_REWARDS.map((item) => {
          const isOwned = ownedRewards.includes(item.id);
          const isEquipped = hero.equippedReward === item.id;
          const canAfford = hero.gems >= item.price;

          return (
            <div
              key={item.id}
              className="bg-white rounded-[22px] border-2 border-slate-200 border-b-[6px] border-b-slate-300 p-4 flex flex-col justify-between gap-4"
            >
              <div className="flex items-center gap-3.5">
                <div
                  className={`w-14 h-14 rounded-2xl border-2 flex items-center justify-center text-2xl shrink-0 ${item.bgClass}`}
                >
                  {item.emoji}
                </div>
                <div>
                  <h3 className="font-display font-extrabold text-base text-duo-ink">
                    {item.name}
                  </h3>
                  <p className="font-body text-xs text-slate-500 font-semibold mt-0.5">
                    {item.desc}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onBuyOrEquipReward(item)}
                className={`toy-btn w-full py-2.5 rounded-xl text-xs sm:text-sm uppercase ${
                  isEquipped
                    ? 'bg-emerald-50 border-2 border-duo-green border-b-[5px] border-b-duo-greenDark text-duo-greenDark'
                    : isOwned
                    ? 'bg-duo-blue border-b-[5px] border-duo-blueDark text-white'
                    : canAfford
                    ? 'bg-duo-gold border-b-[5px] border-duo-goldDark text-amber-950'
                    : 'bg-slate-100 border-2 border-slate-200 border-b-[5px] border-b-slate-300 text-slate-500'
                }`}
              >
                {isEquipped
                  ? '✓ Equipada no Perfil'
                  : isOwned
                  ? 'Equipar Medalha'
                  : `Desbloquear • ${item.price} 💎`}
              </button>
            </div>
          );
        })}

        {/* Discreet Parent-Gated VIP Area */}
        <div className="sm:col-span-2 mt-2 relative overflow-hidden rounded-[22px] bg-gradient-to-br from-purple-700 via-purple-600 to-fuchsia-600 p-5 text-white border-b-[7px] border-purple-950 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-white/15 border border-white/25 flex items-center justify-center shrink-0">
              <CrownIcon className="w-7 h-6" />
            </div>
            <div>
              <div className="font-display font-bold text-[11px] uppercase tracking-wider text-purple-200">
                Espaço dos Pais 🔒
              </div>
              <h2 className="font-display font-extrabold text-lg">
                Passe VIP • Liga dos Heróis
              </h2>
              <p className="font-body text-xs sm:text-sm text-purple-100 font-semibold mt-0.5">
                Vincular acesso da família e sincronização na nuvem.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onOpenVipGuardian}
            className={`toy-btn relative z-10 px-5 py-3 rounded-2xl border-b-[5px] text-xs sm:text-sm uppercase shrink-0 ${
              isVIP
                ? 'bg-emerald-500 border-emerald-700 text-white'
                : 'bg-duo-gold border-duo-goldDark text-amber-950'
            }`}
          >
            {isVIP ? '✓ Passe VIP Ativo' : 'Ativar VIP 🔒'}
          </button>
        </div>
      </div>
    </section>
  );
}
