import React from 'react';
import { WORKBOOKS_DATA } from '../data/gameData';

export default function WorkbooksView({ isVIP = false, onOpenUnlock }) {
  return (
    <section className="w-full pb-8">
      <div className="mb-5">
        <span className="inline-block font-display font-bold text-xs px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 mb-2">
          Para imprimir em A4 com o papai e a mamãe
        </span>
        <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-duo-ink">
          Apostilas & Jogos para Papel
        </h1>
        <p className="font-body text-sm sm:text-base text-duo-muted font-semibold mt-1">
          Atividades ilustradas da Liga dos Heróis para treinar longe das telas.
        </p>
      </div>

      {!isVIP ? (
        <div className="space-y-5">
          <div className="rounded-[26px] bg-gradient-to-br from-indigo-950 via-purple-900 to-duo-purpleDark border-2 border-b-[6px] border-purple-400/50 p-5 sm:p-6 text-white shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="inline-block font-display font-bold text-[11px] uppercase tracking-wider px-3 py-1 rounded-full bg-amber-400/20 text-duo-gold border border-amber-300/40 mb-2">
                  🔒 Biblioteca VIP Protegida
                </span>
                <h2 className="font-display font-extrabold text-xl sm:text-2xl text-white">
                  Libere as 6 Apostilas em PDF para Imprimir
                </h2>
                <p className="font-body text-sm text-purple-100/90 mt-1.5 max-w-2xl leading-relaxed">
                  Os downloads dos livros ilustrados, manual dos pais, gabarito, cronograma de 12 semanas, caderno de pintura e jogos de tabuleiro fazem parte do Combo Liga dos Heróis.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 shrink-0">
                <button
                  type="button"
                  onClick={onOpenUnlock}
                  className="toy-btn px-5 py-3 rounded-2xl bg-duo-gold border-b-[5px] border-duo-goldDark text-amber-950 text-xs sm:text-sm uppercase"
                >
                  🔑 Já Comprei • Liberar VIP
                </button>
                <a
                  href="https://ggcheckout.app/checkout/buJIuO7Th5tjHRGQB8dIQ8?utm_source=webapp_workbooks"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="toy-btn px-5 py-3 rounded-2xl bg-emerald-500 border-b-[5px] border-emerald-700 text-white text-xs sm:text-sm uppercase text-center"
                >
                  ⚡ Adquirir Combo (R$ 27,00)
                </a>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {WORKBOOKS_DATA.map((item) => (
              <article
                key={item.id}
                className="rounded-[22px] bg-white/80 border-2 border-b-[6px] border-slate-200 border-b-slate-300 p-4 flex flex-col justify-between gap-4"
              >
                <div className="flex items-start gap-3.5">
                  <div
                    className={`w-14 h-14 rounded-2xl border-2 flex items-center justify-center text-2xl shrink-0 opacity-85 ${item.accentBg}`}
                  >
                    {item.emoji}
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="inline-block font-display font-bold text-[11px] px-2.5 py-0.5 rounded-lg bg-slate-100 text-slate-600 mb-1">
                      🔒 {item.badge}
                    </span>
                    <h2 className="font-display font-extrabold text-base text-duo-ink leading-snug">
                      {item.title}
                    </h2>
                    <p className="font-body text-xs sm:text-sm text-slate-500 font-semibold mt-1 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onOpenUnlock}
                  className="toy-btn w-full py-2.5 rounded-xl bg-slate-100 border-b-[5px] border-slate-300 text-slate-700 text-xs sm:text-sm uppercase"
                >
                  🔒 Liberar com Código VIP
                </button>
              </article>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="rounded-2xl bg-emerald-50 border-2 border-emerald-200 px-4 py-3 flex flex-wrap items-center justify-between gap-2">
            <span className="font-display font-bold text-xs sm:text-sm text-emerald-900">
              ✓ Passe VIP Liga dos Heróis Ativo — Todas as apostilas liberadas!
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {WORKBOOKS_DATA.map((item) => (
              <article
                key={item.id}
                className={`rounded-[22px] bg-white border-2 border-b-[6px] p-4 flex flex-col justify-between gap-4 ${
                  item.featured
                    ? 'md:col-span-2 border-amber-300 border-b-amber-400 bg-gradient-to-br from-white to-amber-50/50'
                    : 'border-slate-200 border-b-slate-300'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div
                    className={`w-14 h-14 rounded-2xl border-2 flex items-center justify-center text-2xl shrink-0 ${item.accentBg}`}
                  >
                    {item.emoji}
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="inline-block font-display font-bold text-[11px] px-2.5 py-0.5 rounded-lg bg-sky-50 text-sky-700 mb-1">
                      {item.badge}
                    </span>
                    <h2 className="font-display font-extrabold text-base text-duo-ink leading-snug">
                      {item.title}
                    </h2>
                    <p className="font-body text-xs sm:text-sm text-slate-500 font-semibold mt-1 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>

                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`toy-btn w-full py-2.5 rounded-xl text-xs sm:text-sm uppercase ${
                    item.featured
                      ? 'bg-duo-gold border-b-[5px] border-duo-goldDark text-amber-950'
                      : 'bg-duo-blue border-b-[5px] border-duo-blueDark text-white'
                  }`}
                >
                  {item.cta}
                </a>
              </article>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
