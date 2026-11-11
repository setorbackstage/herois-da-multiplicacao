const fs = require('fs');
let html = fs.readFileSync('obrigado.html', 'utf8');

const target = `      <!-- Card 2: Webapp Interativo -->
      <div class="access-card">
        <div class="card-top">
          <span class="card-tag tag-blue">Experiência Gamificada</span>
          <h3 class="card-title">🎮 Webapp de Desafios & Cronômetro</h3>
          <p class="card-desc">Ambiente digital interativo com som de acertos, cronômetro de 15 minutos em tempo real e validação instantânea para a rotina diária.</p>
        </div>
        <a href="/app" target="_blank" class="btn-action btn-blue">
          ⚡ ACESSAR WEBAPP AGORA
        </a>
      </div>
    </div>`;

const addition = `      <!-- Card 2: Webapp Interativo -->
      <div class="access-card">
        <div class="card-top">
          <span class="card-tag tag-blue">Experiência Gamificada</span>
          <h3 class="card-title">🎮 Webapp de Desafios & Cronômetro</h3>
          <p class="card-desc">Ambiente digital interativo com som de acertos, cronômetro de 15 minutos em tempo real e validação instantânea para a rotina diária.</p>
        </div>
        <a href="/app" target="_blank" class="btn-action btn-blue">
          ⚡ ACESSAR WEBAPP AGORA
        </a>
      </div>
    </div>

    <!-- Bônus e Materiais Complementares (PDFs Prontos para Imprimir) -->
    <h2 class="access-section-title" style="margin-top: 36px;">🎁 Seus Bônus Exclusivos & Jogos para Imprimir</h2>
    <div class="access-grid" style="grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); margin-bottom: 32px;">
      
      <div class="access-card" style="padding: 20px;">
        <span class="card-tag tag-green">Bônus #1</span>
        <h4 style="font-size: 1.05rem; font-weight: 800; color: var(--purple-dark); margin: 8px 0;">🗓️ Cronograma 12 Semanas</h4>
        <p style="font-size: 0.88rem; color: var(--text-muted); margin-bottom: 14px;">Planejamento passo a passo de 15 min diários para os pais acompanharem sem estresse.</p>
        <a href="Cronograma_Mestre_12_Semanas.pdf" download class="btn-action btn-green" style="padding: 10px 16px; font-size: 0.9rem;">
          📥 Baixar Cronograma
        </a>
      </div>

      <div class="access-card" style="padding: 20px;">
        <span class="card-tag tag-green">Bônus #2</span>
        <h4 style="font-size: 1.05rem; font-weight: 800; color: var(--purple-dark); margin: 8px 0;">📝 Fichas de Treino Diário</h4>
        <p style="font-size: 0.88rem; color: var(--text-muted); margin-bottom: 14px;">20 fichas destacáveis de treino rápido para fixação diária da tabuada.</p>
        <a href="Caderno_de_Atividades_Fichas_Diarias.pdf" download class="btn-action btn-green" style="padding: 10px 16px; font-size: 0.9rem;">
          📥 Baixar Fichas
        </a>
      </div>

      <div class="access-card" style="padding: 20px;">
        <span class="card-tag tag-green">Bônus #3</span>
        <h4 style="font-size: 1.05rem; font-weight: 800; color: var(--purple-dark); margin: 8px 0;">🎨 Pintura por Multiplicação</h4>
        <p style="font-size: 0.88rem; color: var(--text-muted); margin-bottom: 14px;">Color by number educativo para fixação visual das contas brincando.</p>
        <a href="Caderno_de_Pintura_Multiplicacao.pdf" download class="btn-action btn-green" style="padding: 10px 16px; font-size: 0.9rem;">
          📥 Baixar Pintura
        </a>
      </div>

      <div class="access-card" style="padding: 20px;">
        <span class="card-tag tag-green">Bônus #4</span>
        <h4 style="font-size: 1.05rem; font-weight: 800; color: var(--purple-dark); margin: 8px 0;">🎲 Kit Jogos de Tabuleiro</h4>
        <p style="font-size: 0.88rem; color: var(--text-muted); margin-bottom: 14px;">Trilha dos heróis, dominó, cartas e bingo prontos para recortar e jogar em família.</p>
        <a href="Jogos_da_Tabuada_Trilha_Domino_Bingo.pdf" download class="btn-action btn-green" style="padding: 10px 16px; font-size: 0.9rem;">
          📥 Baixar Jogos
        </a>
      </div>

      <div class="access-card" style="padding: 20px;">
        <span class="card-tag tag-green">Bônus #5</span>
        <h4 style="font-size: 1.05rem; font-weight: 800; color: var(--purple-dark); margin: 8px 0;">🏆 Desafios & Gabarito</h4>
        <p style="font-size: 0.88rem; color: var(--text-muted); margin-bottom: 14px;">12 provas de progresso contínuo e gabaritos completos para correção rápida.</p>
        <a href="Desafios_Semanais_Acompanhamento.pdf" download class="btn-action btn-green" style="padding: 10px 16px; font-size: 0.9rem;">
          📥 Baixar Desafios
        </a>
      </div>

    </div>`;

// Normalize \r\n to \n for replace, then save
const normHtml = html.replace(/\r\n/g, '\n');
const normTarget = target.replace(/\r\n/g, '\n');
if (normHtml.includes(normTarget)) {
  const updated = normHtml.replace(normTarget, addition.replace(/\r\n/g, '\n'));
  fs.writeFileSync('obrigado.html', updated, 'utf8');
  console.log('Successfully updated obrigado.html with all 5 bonus download cards!');
} else {
  console.log('Target not found in obrigado.html');
}
