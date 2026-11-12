import React from 'react';
import { WORKBOOKS_DATA } from '../data/gameData';

export default function WorkbooksView({ isVIP = false, onOpenUnlock }) {
  if (!isVIP) {
    return (
      <section className="w-full pb-8">
        <div className="mb-5">
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-duo-ink">
            Biblioteca da Liga dos Heróis
          </h1>
          <p className="font-body text-sm sm:text-base text-duo-muted font-semibold mt-1">
            Os 6 livros em PDF tamanho A4 ficam liberados exclusivamente para alunos do Combo Liga dos Heróis (R$ 27,00).
          </p>
        </div>

        <div className="rounded-[24px] bg-white border-2 border-purple-200 border-b-[6px] border-b-purple-300 p-6 text-center shadow-sm">
          <div className="text-4xl mb-2">🔒</div>
          <h2 className="font-display font-extrabold text-xl text-duo-ink mb-2">
            Biblioteca VIP Protegida
          </h2>
          <p className="font-body text-sm text-slate-600 font-semibold max-w-lg mx-auto mb-5">
            Se você já adquiriu o Combo Liga dos Heróis, abra pelo botão da sua página de compra ou insira o código de acesso VIP abaixo.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-left max-w-xl mx-auto mb-6">
            {WORKBOOKS_DATA.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700"
              >
                <span>{item.emoji}</span>
                <span className="truncate">{item.title}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-lg mx-auto">
            <button
              type="button"
              onClick={onOpenUnlock}
              className="toy-btn flex-1 py-3 px-4 rounded-xl bg-duo-purple border-b-[5px] border-duo-purpleDark text-white text-xs sm:text-sm uppercase"
            >
              🔑 Já Comprei • Liberar Código VIP
            </button>
            <a
              href="https://ggcheckout.app/checkout/buJIuO7Th5tjHRGQB8dIQ8?utm_source=webapp_workbooks"
              target="_blank"
              rel="noopener noreferrer"
              className="toy-btn flex-1 py-3 px-4 rounded-xl bg-duo-gold border-b-[5px] border-duo-goldDark text-amber-950 text-xs sm:text-sm uppercase text-center"
            >
              ⚡ Adquirir Combo (R$ 27,00)
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full pb-8">
      <div className="mb-5">
        <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-duo-ink">
          Biblioteca da Liga dos Heróis
        </h1>
        <p className="font-body text-sm sm:text-base text-duo-muted font-semibold mt-1">
          Materiais oficiais da franquia Heróis da Multiplicação prontos para imprimir em A4!
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
