import React from 'react';
import { WORKBOOKS_DATA } from '../data/gameData';

export default function WorkbooksView() {
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
    </section>
  );
}
