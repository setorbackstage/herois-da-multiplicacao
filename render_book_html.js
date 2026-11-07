// render_book_html.js
const fs = require('fs');
const path = require('path');
const curriculum = require('./curriculum.json');
const assets = require('./assets_base64.js');

function renderPage(page) {
  switch (page.type) {
    case 'cover':
      return renderCover(page);
    case 'guide':
      return renderGuide(page);
    case 'tracker':
      return renderTracker(page);
    case 'worksheet_a':
      return renderWorksheetA(page);
    case 'worksheet_b':
      return renderWorksheetB(page);
    case 'worksheet_c':
      return renderWorksheetC(page);
    case 'mega_battle':
      return renderMegaBattle(page);
    case 'epic_battle':
      return renderEpicBattle(page);
    case 'answer_key':
      return renderAnswerKey(page);
    case 'answer_key_battles':
      return renderAnswerKeyBattles(page);
    case 'certificate':
      return renderCertificate(page);
    default:
      return `<div class="page">Página ${page.pageNumber}</div>`;
  }
}

function renderHeader(page, title, subtitle, color) {
  const badgeLabel = page.n ? `Tabuada do ${page.n}` : (page.tier === 'gold' ? 'Fase Ouro' : (page.tier === 'diamond' ? 'Fase Diamante' : 'Batalha Épica'));
  return `
    <div class="page-top-bar">
      <div class="top-left">
        <img src="${assets.logo}" class="top-mini-logo" alt="Logo" />
        <div class="top-book-meta">
          <span class="meta-vol">MISSÃO TABUADA • VOLUME 1</span>
          <span class="meta-num">PÁGINA ${page.pageNumber} DE 43</span>
        </div>
      </div>
      <div class="hero-timer-box" style="border-color: ${color};">
        <div class="timer-title" style="background: ${color};">⚡ CRONÔMETRO DE HERÓI</div>
        <div class="timer-fields">
          <div class="t-field">
            <span class="t-label">Início:</span>
            <span class="t-line">___ : ___</span>
          </div>
          <div class="t-field">
            <span class="t-label">Fim:</span>
            <span class="t-line">___ : ___</span>
          </div>
          <div class="t-field t-total">
            <span class="t-label">Tempo:</span>
            <span class="t-line highlight">___ min</span>
          </div>
        </div>
      </div>
    </div>
    <div class="page-banner" style="border-left-color: ${color};">
      <div class="banner-text">
        <h1 class="page-title" style="color: ${color};">${title}</h1>
        <p class="page-subtitle">${subtitle}</p>
      </div>
      <div class="banner-badge" style="background: ${color};">${badgeLabel}</div>
    </div>
  `;
}

// 1. CAPA OFICIAL
function renderCover(page) {
  return `
  <div class="page page-cover">
    <div class="cover-image-wrap">
      <img src="${assets.cover}" class="cover-hero-img" alt="Capa Oficial" />
    </div>
    <div class="cover-overlay-box">
      <div class="cover-info-card">
        <div class="card-hero-row">
          <div class="input-group full">
            <label>NOME DO(A) HERÓI(NA) MIRIM:</label>
            <div class="fill-line"></div>
          </div>
        </div>
        <div class="card-hero-row split">
          <div class="input-group">
            <label>ESCOLA / TURMA:</label>
            <div class="fill-line"></div>
          </div>
          <div class="input-group">
            <label>GUARDIÃO RESPONSÁVEL (PAI/MÃE):</label>
            <div class="fill-line"></div>
          </div>
        </div>
      </div>
    </div>
  </div>`;
}

// 2. MANUAL DO GUARDIÃO
function renderGuide(page) {
  const icons = ['⏱️', '✏️', '📅', '🎯', '🏆'];
  const rulesHtml = page.rules.map((r, i) => `
    <div class="guide-card">
      <div class="guide-card-header">
        <span class="guide-card-badge">${icons[i] || r.number}</span>
        <h3 class="guide-card-title">${r.title}</h3>
      </div>
      <p class="guide-card-desc">${r.desc}</p>
    </div>
  `).join('');

  return `
  <div class="page page-guide">
    <div class="guide-top">
      <img src="${assets.logo}" class="guide-logo" alt="Heróis da Multiplicação" />
      <h1 class="guide-main-title">MANUAL DO GUARDIÃO</h1>
      <p class="guide-intro">Instruções para Pais e Educadores • O Método Científico dos 15 Minutos Diários</p>
    </div>

    <div class="guide-mascots-intro">
      <img src="${assets.heroiMenino}" class="guide-mascot-img" alt="Herói Menino" />
      <div class="guide-welcome-bubble">
        <strong>Olá, Guardião da Matemática!</strong>
        Este livro foi estruturado pela neurociência da repetição espaçada e micro-passos. O objetivo não é a decoreba cansativa, mas o despertar da confiança e agilidade mental com alegria. Siga as 5 regras de ouro abaixo:
      </div>
      <img src="${assets.heroiMenina}" class="guide-mascot-img" alt="Herói Menina" />
    </div>

    <div class="guide-rules-grid">
      ${rulesHtml}
    </div>

    <div class="guide-footer-banner">
      <div class="footer-badge">LEMBRE-SE SEMPRE</div>
      <p>A agilidade mental surge com a repetição alegre e consistente. Cada erro corrigido de caneta vermelha é uma conexão neural fortalecida. Bom treinamento aos heróis!</p>
    </div>
  </div>`;
}

// 3. MAPA DE CONQUISTAS (TRACKER)
function renderTracker(page) {
  const shieldsHtml = page.shields.map(s => `
    <div class="tracker-shield-card" style="--badge-color: ${s.badgeColor};">
      <div class="shield-badge-top" style="background: ${s.badgeColor};">TABUADA ${s.number}</div>
      <div class="shield-icon-wrap">
        <svg class="shield-svg" viewBox="0 0 100 120">
          <defs>
            <linearGradient id="shieldGrad${s.number}" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#FFFFFF"/>
              <stop offset="100%" stop-color="#F8FAFC"/>
            </linearGradient>
          </defs>
          <path d="M 50 3 Q 92 3 95 36 Q 95 86 50 118 Q 5 86 5 36 Q 8 3 50 3 Z" fill="url(#shieldGrad${s.number})" stroke="${s.badgeColor}" stroke-width="5"/>
          <path d="M 50 13 Q 82 13 85 40 Q 85 80 50 106 Q 15 80 15 40 Q 18 13 50 13 Z" fill="none" stroke="${s.badgeColor}" stroke-dasharray="4,3" stroke-width="2"/>
          <text x="50" y="66" font-family="'Fredoka', sans-serif" font-size="44" font-weight="800" fill="${s.badgeColor}" text-anchor="middle" dominant-baseline="middle">${s.number}</text>
        </svg>
        <div class="shield-star-badge">⭐</div>
      </div>
      <div class="shield-bottom-info">
        <div class="shield-boss-name">${s.bossName}</div>
        <div class="shield-action-hint">Pinte ao Vencer!</div>
        <div class="shield-stamp-row">
          <span>Data: <b>__/__</b></span>
          <span>Tempo: <b>__:__</b></span>
        </div>
      </div>
    </div>
  `).join('');

  return `
  <div class="page page-tracker">
    <div class="tracker-header">
      <div class="top-row">
        <img src="${assets.logo}" class="tracker-logo" alt="Logo" />
        <div class="tracker-badge-vol">PÁGINA 3 • MAPA DE CONQUISTAS</div>
      </div>
      <h1 class="tracker-title">MAPA DE CONQUISTAS DO HERÓI</h1>
      <p class="tracker-subtitle">Pinte cada Escudo de Poder com suas cores favoritas assim que derrotar o Chefão de cada número!</p>
    </div>

    <div class="tracker-grid">
      ${shieldsHtml}
    </div>

    <div class="tracker-footer-card">
      <img src="${assets.heroiMenino}" class="tracker-mascot-img" alt="Herói Menino" />
      <img src="${assets.lapisHeroi}" class="tracker-pencil-img" alt="Lápis Herói" />
      <div class="tracker-footer-text">
        <strong>Missão dos 10 Escudos de Poder:</strong>
        <p>A cada Chefão derrotado na Página C, venha aqui pintar seu escudo! Ao completar os 10 escudos, você desbloqueará as <strong>Mega Batalhas (Ouro e Diamante)</strong> e a <strong>Batalha Épica do Monstro Gigante</strong> para assinar o seu <strong>Diploma Oficial de Herói</strong>!</p>
      </div>
      <img src="${assets.heroiMenina}" class="tracker-mascot-img" alt="Herói Menina" />
    </div>
  </div>`;
}

// 4. PÁGINA A: O Início do Poder (Micro-passos 1 ao 5)
function renderWorksheetA(page) {
  const blocksHtml = page.blocks.map((block, bIdx) => `
    <div class="micro-step-card">
      <div class="step-card-header" style="background: ${page.themeColor};">
        <span class="step-badge">${bIdx + 1}</span>
        <span class="step-title">${block.label}</span>
      </div>
      <div class="equations-col">
        ${block.items.map((eq, eIdx) => `
          <div class="equation-row">
            <span class="eq-num">${eq.a}</span>
            <span class="eq-op">×</span>
            <span class="eq-num">${eq.b}</span>
            <span class="eq-eq">=</span>
            <div class="eq-box" data-page="${page.pageNumber}" data-q="${bIdx}_${eIdx}" data-ans="${eq.ans}"></div>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');

  const invasionHtml = page.invasion.items.map((eq, iIdx) => `
    <div class="invasion-eq-pill">
      <span class="inv-num">${eq.a} × ${eq.b} =</span>
      <div class="inv-box" data-page="${page.pageNumber}" data-inv="${iIdx}" data-ans="${eq.ans}"></div>
    </div>
  `).join('');

  return `
  <div class="page page-worksheet">
    ${renderHeader(page, page.title, page.subtitle, page.themeColor)}

    <div class="worksheet-instruction">
      <strong>Instrução do Herói:</strong> Resolva cada bloco com concentração. Se errar, não apague: faça um círculo de caneta vermelha e anote o correto ao lado!
    </div>

    <div class="micro-steps-grid">
      ${blocksHtml}
    </div>

    <div class="invasion-box" style="border-color: ${page.themeColor};">
      <div class="invasion-header" style="background: ${page.themeColor};">
        <span class="inv-icon">⚡</span>
        <span class="inv-title">${page.invasion.title}</span>
        <span class="inv-desc">${page.invasion.desc}</span>
      </div>
      <div class="invasion-items-row">
        ${invasionHtml}
      </div>
    </div>

    <div class="worksheet-bottom-meta">
      <span class="mascot-tip">🚀 Dica do Lápis Herói: Treine 15 minutos hoje e seu cérebro gravará tudo durante o sono!</span>
      <span class="pg-id">Pág. ${page.pageNumber}</span>
    </div>
  </div>`;
}

// 5. PÁGINA B: Força Máxima (Micro-passos 6 ao 10)
function renderWorksheetB(page) {
  const blocksHtml = page.blocks.map((block, bIdx) => `
    <div class="micro-step-card">
      <div class="step-card-header" style="background: ${page.themeColor};">
        <span class="step-badge">${bIdx + 1}</span>
        <span class="step-title">${block.label}</span>
      </div>
      <div class="equations-col">
        ${block.items.map((eq, eIdx) => `
          <div class="equation-row">
            <span class="eq-num">${eq.a}</span>
            <span class="eq-op">×</span>
            <span class="eq-num">${eq.b}</span>
            <span class="eq-eq">=</span>
            <div class="eq-box" data-page="${page.pageNumber}" data-q="${bIdx}_${eIdx}" data-ans="${eq.ans}"></div>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');

  const invasionHtml = page.invasion.items.map((eq, iIdx) => `
    <div class="invasion-eq-pill">
      <span class="inv-num">${eq.a} × ${eq.b} =</span>
      <div class="inv-box" data-page="${page.pageNumber}" data-inv="${iIdx}" data-ans="${eq.ans}"></div>
    </div>
  `).join('');

  return `
  <div class="page page-worksheet">
    ${renderHeader(page, page.title, page.subtitle, page.themeColor)}

    <div class="worksheet-instruction">
      <strong>Instrução do Herói:</strong> Agora estamos nas contas maiores do ${page.n}! Mantenha o ritmo no cronômetro e conquiste sua força máxima!
    </div>

    <div class="micro-steps-grid">
      ${blocksHtml}
    </div>

    <div class="invasion-box" style="border-color: ${page.themeColor};">
      <div class="invasion-header" style="background: ${page.themeColor};">
        <span class="inv-icon">⚡</span>
        <span class="inv-title">${page.invasion.title}</span>
        <span class="inv-desc">${page.invasion.desc}</span>
      </div>
      <div class="invasion-items-row">
        ${invasionHtml}
      </div>
    </div>

    <div class="worksheet-bottom-meta">
      <span class="mascot-tip">🎯 Próximo passo: Prepare-se para a Página C, onde você enfrentará o Chefão do ${page.n}!</span>
      <span class="pg-id">Pág. ${page.pageNumber}</span>
    </div>
  </div>`;
}

// 6. PÁGINA C: O Chefão do Número (Revisão Geral e Monstro)
function renderWorksheetC(page) {
  const col1 = page.items.slice(0, 8);
  const col2 = page.items.slice(8, 16);
  const col3 = page.items.slice(16, 24);

  function renderBossCol(items, offset) {
    return items.map((eq, idx) => `
      <div class="boss-equation-row">
        <span class="b-index">${offset + idx + 1}.</span>
        <span class="b-num">${eq.a}</span>
        <span class="b-op">×</span>
        <span class="b-num">${eq.b}</span>
        <span class="b-eq">=</span>
        <div class="boss-box" data-page="${page.pageNumber}" data-q="${offset + idx}" data-ans="${eq.ans}"></div>
      </div>
    `).join('');
  }

  return `
  <div class="page page-boss">
    ${renderHeader(page, page.title, page.subtitle, page.themeColor)}

    <div class="boss-showdown-bar">
      <div class="boss-monster-card">
        <img src="${assets.monstro}" class="boss-monster-img" alt="Monstro Roxo" />
        <div class="boss-speech-bubble">
          <div class="speech-who">MONSTRO ROXO desafia você:</div>
          <p>"${page.bossTaunt}"</p>
        </div>
      </div>
      <div class="boss-stats-card" style="border-color: ${page.themeColor};">
        <div class="stats-badge" style="background: ${page.themeColor};">BATALHA DE CHEFÃO</div>
        <div class="stats-rules">
          <div>⚔️ <strong>Total:</strong> 24 contas misturadas</div>
          <div>🛡️ <strong>Alvo:</strong> Não desista de nenhuma!</div>
          <div>⏱️ <strong>Meta:</strong> Menos de 3 minutos</div>
        </div>
      </div>
    </div>

    <div class="boss-equations-grid">
      <div class="boss-col">${renderBossCol(col1, 0)}</div>
      <div class="boss-col">${renderBossCol(col2, 8)}</div>
      <div class="boss-col">${renderBossCol(col3, 16)}</div>
    </div>

    <div class="boss-victory-banner" style="border-color: ${page.themeColor};">
      <div class="victory-trophy">🏆</div>
      <div class="victory-text">
        <strong style="color: ${page.themeColor};">RECOMPENSA DE VITÓRIA:</strong>
        <p>${page.rewardText}</p>
      </div>
      <div class="victory-stamp">
        <span>CHEFÃO</span>
        <strong>DERROTADO!</strong>
      </div>
    </div>

    <div class="worksheet-bottom-meta">
      <span class="mascot-tip">🎉 Derrotou o Chefão? Vá para a Página 3 e pinte com orgulho seu Escudo de Poder número ${page.n}!</span>
      <span class="pg-id">Pág. ${page.pageNumber}</span>
    </div>
  </div>`;
}

// 7. MEGA BATALHAS (Páginas 34 e 35)
function renderMegaBattle(page) {
  const col1 = page.items.slice(0, 12);
  const col2 = page.items.slice(12, 24);
  const col3 = page.items.slice(24, 36);

  function renderCol(items, offset) {
    return items.map((eq, idx) => `
      <div class="battle-eq-row">
        <span class="bat-idx">${offset + idx + 1}.</span>
        <span class="bat-eq">${eq.a} × ${eq.b} =</span>
        <div class="bat-box" data-page="${page.pageNumber}" data-q="${offset + idx}" data-ans="${eq.ans}"></div>
      </div>
    `).join('');
  }

  const badgeIcon = page.tier === 'gold' ? '🥇' : '💎';
  const mascotImg = page.tier === 'gold' ? assets.heroiMenina : assets.heroiMenino;

  return `
  <div class="page page-mega-battle">
    ${renderHeader(page, page.title, page.subtitle, page.themeColor)}

    <div class="mega-hero-callout" style="border-color: ${page.themeColor};">
      <img src="${mascotImg}" class="mega-mascot-img" alt="Mascote" />
      <div class="mega-callout-text">
        <div class="mega-badge" style="background: ${page.themeColor};">${badgeIcon} ${page.title}</div>
        <p>${page.desc}</p>
      </div>
      <div class="mega-target-box">
        <span class="m-t-title">ACERTOS</span>
        <div class="m-t-score">___ / 36</div>
      </div>
    </div>

    <div class="battle-grid-3cols">
      <div class="battle-col">${renderCol(col1, 0)}</div>
      <div class="battle-col">${renderCol(col2, 12)}</div>
      <div class="battle-col">${renderCol(col3, 24)}</div>
    </div>

    <div class="mega-footer-banner" style="background: ${page.themeColor};">
      <span>⭐ CONQUISTA DESBLOQUEADA: Você dominou as tabuadas desta fase! Continue até a Batalha Épica!</span>
    </div>

    <div class="worksheet-bottom-meta">
      <span class="mascot-tip">🏆 Anote o seu tempo recorde no cronômetro do cabeçalho!</span>
      <span class="pg-id">Pág. ${page.pageNumber}</span>
    </div>
  </div>`;
}

// 8. BATALHA ÉPICA (Página 36)
function renderEpicBattle(page) {
  const col1 = page.items.slice(0, 12);
  const col2 = page.items.slice(12, 24);
  const col3 = page.items.slice(24, 36);

  function renderCol(items, offset) {
    return items.map((eq, idx) => `
      <div class="battle-eq-row epic-row">
        <span class="bat-idx">${offset + idx + 1}.</span>
        <span class="bat-eq">${eq.a} × ${eq.b} =</span>
        <div class="bat-box" data-page="${page.pageNumber}" data-q="${offset + idx}" data-ans="${eq.ans}"></div>
      </div>
    `).join('');
  }

  return `
  <div class="page page-epic-battle">
    ${renderHeader(page, page.title, page.subtitle, page.themeColor)}

    <div class="epic-hero-callout">
      <img src="${assets.lapisHeroi}" class="epic-pencil-img" alt="Lápis Herói" />
      <div class="epic-callout-text">
        <div class="epic-badge">🔥 A PROVA FINAL DO VOLUME 1</div>
        <p><strong>LÁPIS HERÓI CONVOCA:</strong> "O Monstro Gigante tentou embaralhar todas as 10 tabuadas! Mas nós temos o poder da constância e da mente brilhante. Resolva todas as 36 contas e liberte a Escola da Matemática!"</p>
      </div>
      <img src="${assets.monstro}" class="epic-monster-img" alt="Monstro Desafiado" />
    </div>

    <div class="battle-grid-3cols">
      <div class="battle-col">${renderCol(col1, 0)}</div>
      <div class="battle-col">${renderCol(col2, 12)}</div>
      <div class="battle-col">${renderCol(col3, 24)}</div>
    </div>

    <div class="epic-victory-box">
      <div class="epic-trophy-gold">👑</div>
      <div class="epic-victory-text">
        <strong>MISSÃO CUMPRIDA! VOCÊ DERROTOU O MONSTRO GIGANTE!</strong>
        <p>Parabéns! Você concluiu todos os desafios do Volume 1! Vá até a Página 43 e receba o seu <strong>Certificado Oficial de Herói da Multiplicação</strong>!</p>
      </div>
    </div>

    <div class="worksheet-bottom-meta">
      <span class="mascot-tip">🎖️ O maior herói é aquele que nunca desiste. Você é um verdadeiro campeão!</span>
      <span class="pg-id">Pág. ${page.pageNumber}</span>
    </div>
  </div>`;
}

// 9. O GABARITO SECRETO (Páginas 37 a 41)
function renderAnswerKey(page) {
  const sectionsHtml = page.sections.map(sec => {
    const color = getTabuadaColor(sec.n);
    return `
      <div class="gabarito-tabuada-card" style="border-top-color: ${color};">
        <div class="gabarito-card-header" style="background: ${color};">
          <span class="g-title">${sec.title}</span>
          <span class="g-pages">Págs. ${sec.pageA.num}, ${sec.pageB.num} e ${sec.pageC.num}</span>
        </div>
        <div class="gabarito-subsections">
          <!-- Página A -->
          <div class="g-sub">
            <div class="g-sub-title">PÁG. ${sec.pageA.num} (Início 1 ao 5)</div>
            <div class="g-answers-grid">
              ${sec.pageA.blocks.flat().map(eq => `<span class="g-pill">${eq.a}×${eq.b}=<b>${eq.ans}</b></span>`).join('')}
            </div>
            <div class="g-inv-title">Invasão Surpresa:</div>
            <div class="g-inv-grid">
              ${sec.pageA.invasion.map(eq => `<span class="g-pill-inv">${eq.a}×${eq.b}=<b>${eq.ans}</b></span>`).join('')}
            </div>
          </div>

          <!-- Página B -->
          <div class="g-sub">
            <div class="g-sub-title">PÁG. ${sec.pageB.num} (Força 6 ao 10)</div>
            <div class="g-answers-grid">
              ${sec.pageB.blocks.flat().map(eq => `<span class="g-pill">${eq.a}×${eq.b}=<b>${eq.ans}</b></span>`).join('')}
            </div>
            <div class="g-inv-title">Invasão Surpresa:</div>
            <div class="g-inv-grid">
              ${sec.pageB.invasion.map(eq => `<span class="g-pill-inv">${eq.a}×${eq.b}=<b>${eq.ans}</b></span>`).join('')}
            </div>
          </div>

          <!-- Página C -->
          <div class="g-sub g-sub-boss">
            <div class="g-sub-title">PÁG. ${sec.pageC.num} (Chefão do ${sec.n} - 24 Contas)</div>
            <div class="g-boss-answers-grid">
              ${sec.pageC.items.map((eq, i) => `<span class="g-pill-boss">${i+1}. ${eq.a}×${eq.b}=<b>${eq.ans}</b></span>`).join('')}
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');

  return `
  <div class="page page-gabarito">
    <div class="gabarito-header">
      <div class="gabarito-brand">
        <img src="${assets.logo}" class="gabarito-logo" alt="Logo" />
        <span class="gabarito-confidential-stamp">GABARITO SECRETO • AUTOCORREÇÃO</span>
      </div>
      <h1 class="gabarito-main-title">${page.title}</h1>
      <p class="gabarito-desc">Para o Guardião conferir ou para o herói treinar a autonomia! Use caneta vermelha ao lado dos erros e comemore cada acerto.</p>
    </div>

    <div class="gabarito-sections-container">
      ${sectionsHtml}
    </div>

    <div class="worksheet-bottom-meta">
      <span class="mascot-tip">🔴 Errou alguma? Não apague com borracha! Circule de caneta vermelha e anote o valor correto ao lado.</span>
      <span class="pg-id">Pág. ${page.pageNumber}</span>
    </div>
  </div>`;
}

// 10. GABARITO DAS MEGA BATALHAS (Página 42)
function renderAnswerKeyBattles(page) {
  const battlesHtml = page.sections.map((b, bIdx) => `
    <div class="battle-gabarito-card">
      <div class="battle-g-title">${b.title}</div>
      <div class="battle-g-grid">
        ${b.items.map((eq, i) => `
          <div class="b-g-pill">
            <span class="b-g-idx">${i + 1}.</span>
            <span class="b-g-calc">${eq.a} × ${eq.b} = <strong>${eq.ans}</strong></span>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');

  return `
  <div class="page page-gabarito">
    <div class="gabarito-header">
      <div class="gabarito-brand">
        <img src="${assets.logo}" class="gabarito-logo" alt="Logo" />
        <span class="gabarito-confidential-stamp">GABARITO DAS GRANDES BATALHAS</span>
      </div>
      <h1 class="gabarito-main-title">${page.title}</h1>
      <p class="gabarito-desc">Conferência completa das 36 contas de cada Mega Batalha e da Batalha Épica Final!</p>
    </div>

    <div class="battle-gabarito-list">
      ${battlesHtml}
    </div>

    <div class="worksheet-bottom-meta">
      <span class="mascot-tip">⭐ Você chegou ao fim de todas as respostas! Hora de receber o Certificado Oficial na Página 43!</span>
      <span class="pg-id">Pág. ${page.pageNumber}</span>
    </div>
  </div>`;
}

// 11. CERTIFICADO OFICIAL (Página 43)
function renderCertificate(page) {
  return `
  <div class="page page-certificate">
    <div class="cert-outer-border">
      <div class="cert-inner-border">
        
        <div class="cert-header">
          <img src="${assets.logo}" class="cert-logo" alt="Logo" />
          <div class="cert-order-label">ORDEM SUPREMA DOS HERÓIS DA MATEMÁTICA</div>
          <h1 class="cert-title">CERTIFICADO DE HERÓI DA MULTIPLICAÇÃO</h1>
          <div class="cert-vol-badge">★ VOLUME 1: A TABUADA COMPLETA DO 1 AO 10 ★</div>
        </div>

        <div class="cert-body">
          <p class="cert-text">Certificamos com a mais alta honra e distinção acadêmica que o(a) valoroso(a) estudante:</p>
          
          <div class="cert-name-field">
            <div class="cert-name-line"></div>
            <span class="cert-name-sub">★ NOME DO(A) HERÓI(NA) DA MULTIPLICAÇÃO ★</span>
          </div>

          <p class="cert-desc">
            completou com maestria todos os <strong>30 Treinamentos em Micro-passos</strong>, derrotou os <strong>10 Chefões do Reino dos Números</strong>, venceu com bravura as <strong>Mega Batalhas 1 e 2</strong> e triunfou gloriosamente sobre a <strong>Batalha Épica do Monstro Gigante</strong>, dominando de forma definitiva a tabuada do 1 ao 10!
          </p>

          <div class="cert-proclamation">
            Estando oficialmente graduado(a) e convocado(a) para a <strong>LIGA DOS HERÓIS DA MATEMÁTICA (VOLUME 2)</strong>!
          </div>
        </div>

        <div class="cert-mascots-row">
          <img src="${assets.heroiMenino}" class="cert-mascot left" alt="Herói Menino" />
          
          <div class="cert-seal-wrap">
            <div class="gold-seal">
              <div class="seal-inner">
                <span class="seal-star">★</span>
                <span class="seal-txt">MESTRE</span>
                <span class="seal-sub">DA TABUADA</span>
                <span class="seal-year">2026</span>
              </div>
            </div>
          </div>

          <img src="${assets.lapisHeroi}" class="cert-mascot center" alt="Lápis Herói" />
          <img src="${assets.heroiMenina}" class="cert-mascot right" alt="Herói Menina" />
        </div>

        <div class="cert-footer-signatures">
          <div class="sig-block">
            <div class="sig-line"></div>
            <span class="sig-label">DATA DA CONQUISTA</span>
          </div>
          <div class="sig-block">
            <div class="sig-line"></div>
            <span class="sig-label">ASSINATURA DO GUARDIÃO OFICIAL (PAI / MÃE)</span>
          </div>
          <div class="sig-block">
            <div class="sig-line"></div>
            <span class="sig-label">LÁPIS HERÓI • MENTOR DA LIGA</span>
          </div>
        </div>

      </div>
    </div>
  </div>`;
}

function getTabuadaColor(n) {
  const colors = {
    1: '#0284C7',
    2: '#EA580C',
    3: '#16A34A',
    4: '#9333EA',
    5: '#E11D48',
    6: '#0D9488',
    7: '#D97706',
    8: '#4F46E5',
    9: '#C026D3',
    10: '#2563EB'
  };
  return colors[n] || '#4F46E5';
}

function generateCompleteHtml() {
  const pagesHtml = curriculum.map(p => renderPage(p)).join('\n');

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Missão Tabuada - Volume 1 (A Tabuada Completa do 1 ao 10)</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;600;700;800&family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Cinzel:wght@700;900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="book_styles.css">
</head>
<body>
  ${pagesHtml}
</body>
</html>`;
}

module.exports = {
  renderPage,
  generateCompleteHtml
};

if (require.main === module) {
  const html = generateCompleteHtml();
  fs.writeFileSync('book.html', html);
  console.log(`Generated book.html (${html.length} chars) with all 43 pages!`);
}
