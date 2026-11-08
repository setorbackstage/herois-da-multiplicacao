const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, 'duolingo_tabuada.html');
let content = fs.readFileSync(filePath, 'utf8');

// Se já tiver restos errados da tentativa anterior, limpa
if (content.includes('/* =========================================\n       ONBOARDING LOGIC & PERSISTENCE')) {
  // Remove a parte sem script
  const start = content.indexOf('/* =========================================\n       ONBOARDING LOGIC & PERSISTENCE');
  const end = content.indexOf('// Inicialização do perfil', start) + 400;
  const sub = content.substring(start, end);
  const closingBrace = sub.indexOf('}');
  const fullSub = sub.substring(0, sub.indexOf('}', closingBrace + 1) + 1);
  content = content.replace(fullSub, '');
}

// 1. CSS
const onboardingCss = `
    /* =========================================
       ONBOARDING / JORNADA DO HERÓI (DUOLINGO)
       ========================================= */
    .onboarding-overlay {
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(15, 23, 42, 0.94);
      backdrop-filter: blur(8px);
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 16px;
      overflow-y: auto;
    }
    .onboarding-card {
      width: 100%;
      max-width: 500px;
      background: #FFFFFF;
      border-radius: 32px;
      padding: 30px 24px;
      box-shadow: 0 25px 60px rgba(0,0,0,0.5);
      border: 4px solid var(--duo-gray);
      text-align: center;
      position: relative;
      animation: modalPop 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    @keyframes modalPop {
      0% { opacity: 0; transform: scale(0.9) translateY(20px); }
      100% { opacity: 1; transform: scale(1) translateY(0); }
    }
    .onboard-step {
      display: none;
    }
    .onboard-step.active {
      display: block;
    }
    .onboard-hero-visual {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 16px;
    }
    .onboard-mascot-img {
      width: 140px;
      height: 140px;
      object-fit: contain;
      filter: drop-shadow(0 10px 20px rgba(0,0,0,0.2));
      animation: mascotFloat 3s ease-in-out infinite;
    }
    @keyframes mascotFloat {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-8px); }
    }
    .onboard-badge {
      display: inline-block;
      background: #EFF6FF;
      color: #1D4ED8;
      font-size: 14px;
      font-weight: 900;
      padding: 6px 18px;
      border-radius: 999px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      border: 2px solid #BFDBFE;
      margin-top: 10px;
    }
    .onboard-badge.gold {
      background: #FEF3C7;
      color: #B45309;
      border-color: #F59E0B;
    }
    .onboard-step-indicator {
      font-size: 13px;
      font-weight: 900;
      color: #64748B;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 10px;
    }
    .onboard-title {
      font-family: 'Fredoka', sans-serif;
      font-size: 26px;
      font-weight: 700;
      color: #1E293B;
      line-height: 1.25;
      margin-bottom: 10px;
    }
    .onboard-desc {
      font-size: 15px;
      color: #64748B;
      font-weight: 700;
      line-height: 1.45;
      margin-bottom: 24px;
    }
    .hero-selector-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      margin-bottom: 24px;
    }
    .hero-choice-card {
      background: #F8FAFC;
      border: 3px solid var(--duo-gray);
      border-radius: 20px;
      padding: 16px 12px;
      cursor: pointer;
      transition: all 0.2s ease;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .hero-choice-card:hover {
      border-color: #38BDF8;
      transform: translateY(-2px);
    }
    .hero-choice-card.selected {
      border-color: var(--duo-green);
      background: #F0FDF4;
      box-shadow: 0 0 0 2px var(--duo-green-dark), 0 8px 20px rgba(88, 204, 2, 0.2);
    }
    .hero-choice-card img {
      width: 90px;
      height: 90px;
      object-fit: contain;
      margin-bottom: 8px;
    }
    .hero-choice-card .hero-name {
      font-family: 'Fredoka', sans-serif;
      font-size: 20px;
      font-weight: 700;
      color: #1E293B;
    }
    .hero-choice-card .hero-tag {
      font-size: 12px;
      font-weight: 800;
      color: #64748B;
      margin-top: 4px;
    }
    .input-group {
      text-align: left;
      margin-bottom: 20px;
    }
    .input-group label {
      display: block;
      font-size: 14px;
      font-weight: 900;
      color: #334155;
      margin-bottom: 8px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .duo-input {
      width: 100%;
      height: 52px;
      border: 3px solid var(--duo-gray);
      border-radius: 16px;
      padding: 0 18px;
      font-family: 'Fredoka', sans-serif;
      font-size: 18px;
      color: #1E293B;
      outline: none;
      transition: border-color 0.2s;
    }
    .duo-input:focus {
      border-color: var(--duo-blue);
      box-shadow: 0 0 0 3px rgba(28, 176, 246, 0.2);
    }
    .pill-options-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    .pill-btn {
      flex: 1 1 calc(33.333% - 8px);
      min-width: 80px;
      padding: 12px 10px;
      background: #FFFFFF;
      border: 2px solid var(--duo-gray);
      border-radius: 14px;
      font-family: 'Nunito', sans-serif;
      font-size: 14px;
      font-weight: 900;
      color: #475569;
      cursor: pointer;
      box-shadow: 0 3px 0 var(--duo-gray);
      transition: all 0.15s ease;
    }
    .pill-btn:hover { background: #F8FAFC; }
    .pill-btn.selected {
      background: #EFF6FF;
      border-color: var(--duo-blue);
      color: var(--duo-blue-dark);
      box-shadow: 0 3px 0 var(--duo-blue-dark);
      transform: translateY(1px);
    }
    .btn-duo-next {
      width: 100%;
      height: 56px;
      background: var(--duo-green);
      border: none;
      border-radius: 18px;
      font-family: 'Fredoka', sans-serif;
      font-size: 20px;
      font-weight: 700;
      color: #FFFFFF;
      cursor: pointer;
      box-shadow: 0 5px 0 var(--duo-green-dark);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-top: 10px;
      transition: all 0.1s ease;
    }
    .btn-duo-next:active {
      transform: translateY(4px);
      box-shadow: 0 1px 0 var(--duo-green-dark);
    }
    .btn-duo-next.btn-gold {
      background: #F59E0B;
      box-shadow: 0 5px 0 #B45309;
    }
    .btn-duo-next.btn-gold:active {
      box-shadow: 0 1px 0 #B45309;
    }
    .hero-badge-card {
      background: linear-gradient(135deg, #1E1B4B 0%, #312E81 50%, #1E1B4B 100%);
      border: 4px solid #F59E0B;
      border-radius: 24px;
      padding: 20px;
      color: #FFF;
      box-shadow: 0 20px 40px rgba(0,0,0,0.5), 0 0 30px rgba(245, 158, 11, 0.4);
      position: relative;
      overflow: hidden;
      margin-bottom: 24px;
      text-align: left;
    }
    .hero-badge-card::before {
      content: '';
      position: absolute;
      top: -50%; left: -50%;
      width: 200%; height: 200%;
      background: linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%);
      animation: shine 4s infinite linear;
    }
    @keyframes shine {
      0% { transform: translateY(-100%) rotate(45deg); }
      100% { transform: translateY(100%) rotate(45deg); }
    }
    .badge-top-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 14px;
      border-bottom: 1px solid rgba(255,255,255,0.2);
      padding-bottom: 10px;
    }
    .badge-logo-text {
      font-family: 'Fredoka', sans-serif;
      font-size: 16px;
      font-weight: 700;
      color: #FBBF24;
      letter-spacing: 1px;
    }
    .badge-agent-id {
      font-size: 12px;
      font-weight: 800;
      color: #94A3B8;
    }
    .badge-body {
      display: flex;
      gap: 16px;
      align-items: center;
    }
    .badge-avatar-img {
      width: 85px;
      height: 85px;
      object-fit: contain;
      background: rgba(255,255,255,0.1);
      border: 2px solid #F59E0B;
      border-radius: 18px;
      padding: 4px;
    }
    .badge-info h3 {
      font-family: 'Fredoka', sans-serif;
      font-size: 22px;
      font-weight: 700;
      color: #FFF;
      line-height: 1.1;
      margin-bottom: 4px;
    }
    .badge-details {
      font-size: 13px;
      color: #CBD5E1;
      font-weight: 800;
      margin-bottom: 6px;
    }
    .badge-guardian-tag {
      display: inline-block;
      background: rgba(88, 204, 2, 0.2);
      border: 1px solid #58CC02;
      color: #86EFAC;
      font-size: 11px;
      font-weight: 800;
      padding: 3px 8px;
      border-radius: 6px;
      margin-bottom: 8px;
    }
    .badge-stats-row {
      display: flex;
      gap: 10px;
      font-size: 12px;
      font-weight: 900;
      color: #FDE047;
    }
    .badge-seal {
      position: absolute;
      bottom: 12px; right: 12px;
      font-size: 10px;
      font-weight: 900;
      background: #F59E0B;
      color: #78350F;
      padding: 3px 8px;
      border-radius: 6px;
      text-transform: uppercase;
      box-shadow: 0 2px 6px rgba(0,0,0,0.3);
    }
    .btn-badge-trigger {
      background: #FEF3C7;
      border: 2px solid #F59E0B;
      color: #B45309;
      font-size: 13px;
      font-weight: 900;
      padding: 4px 12px;
      border-radius: 999px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 4px;
    }
`;

if (!content.includes('.onboarding-overlay')) {
  content = content.replace('</style>', `${onboardingCss}\n</style>`);
}

// 2. HTML
if (!content.includes('id="onboarding-overlay"')) {
  const onboardingHtml = `
  <!-- MODAL DE ONBOARDING JORNADA DO HERÓI -->
  <div id="onboarding-overlay" class="onboarding-overlay" style="display:flex;">
    <div class="onboarding-card">
      
      <!-- PASSO 1: BOAS-VINDAS & ESCOLHA DO MASCOTE -->
      <div id="step-1" class="onboard-step active">
        <div class="onboard-hero-visual">
          <img src="tabuada-assets/heroi-menino-oficial.png" class="onboard-mascot-img" id="hero-preview-img" alt="Herói">
          <div class="onboard-badge">🚀 BEM-VINDO À MISSÃO TABUADA</div>
        </div>
        <h2 class="onboard-title">A Liga da Multiplicação convoca você!</h2>
        <p class="onboard-desc">Treine 15 minutos por dia, vença os desafios e torne-se um Mestre da Tabuada!</p>
        
        <div style="font-size:14px;font-weight:900;color:#334155;margin-bottom:12px;text-align:left;">ESCOLHA SEU HERÓI PARCEIRO:</div>
        <div class="hero-selector-grid">
          <div class="hero-choice-card selected" id="choice-leo" onclick="selectMascot('leo')">
            <img src="tabuada-assets/heroi-menino-oficial.png" alt="Léo">
            <div class="hero-name">LÉO</div>
            <div class="hero-tag">Raio da Agilidade ⚡</div>
          </div>
          <div class="hero-choice-card" id="choice-maya" onclick="selectMascot('maya')">
            <img src="tabuada-assets/heroi-menina-oficial.png" alt="Maya">
            <div class="hero-name">MAYA</div>
            <div class="hero-tag">Escudo da Sabedoria 🛡️</div>
          </div>
        </div>

        <button class="btn-duo-next" onclick="goToStep(2)">Continuar Missão ➔</button>
      </div>

      <!-- PASSO 2: DADOS DA CRIANÇA -->
      <div id="step-2" class="onboard-step">
        <div class="onboard-step-indicator">PASSO 1 DE 3 • PERFIL DO HERÓI</div>
        <h2 class="onboard-title">Quem é o Herói da Casa?</h2>
        
        <div class="input-group">
          <label>Qual o Primeiro Nome da Criança?</label>
          <input type="text" id="input-child-name" placeholder="Ex: Pedro, Sofia, Arthur..." class="duo-input" value="Pedro">
        </div>

        <div class="input-group">
          <label>Qual a Idade?</label>
          <div class="pill-options-grid" id="age-pills">
            <button type="button" class="pill-btn" onclick="selectPill('age', 6, this)">6 anos</button>
            <button type="button" class="pill-btn" onclick="selectPill('age', 7, this)">7 anos</button>
            <button type="button" class="pill-btn selected" onclick="selectPill('age', 8, this)">8 anos</button>
            <button type="button" class="pill-btn" onclick="selectPill('age', 9, this)">9 anos</button>
            <button type="button" class="pill-btn" onclick="selectPill('age', 10, this)">10 anos</button>
            <button type="button" class="pill-btn" onclick="selectPill('age', 11, this)">11+ anos</button>
          </div>
        </div>

        <div class="input-group">
          <label>Qual Ano na Escola?</label>
          <div class="pill-options-grid" id="grade-pills">
            <button type="button" class="pill-btn" onclick="selectPill('grade', '1º Ano', this)">1º Ano</button>
            <button type="button" class="pill-btn" onclick="selectPill('grade', '2º Ano', this)">2º Ano</button>
            <button type="button" class="pill-btn selected" onclick="selectPill('grade', '3º Ano', this)">3º Ano</button>
            <button type="button" class="pill-btn" onclick="selectPill('grade', '4º Ano', this)">4º Ano</button>
            <button type="button" class="pill-btn" onclick="selectPill('grade', '5º Ano', this)">5º Ano</button>
          </div>
        </div>

        <button class="btn-duo-next" onclick="goToStep(3)">Avançar ➔</button>
      </div>

      <!-- PASSO 3: GUARDIÃO / RESPONSÁVEL -->
      <div id="step-3" class="onboard-step">
        <div class="onboard-step-indicator">PASSO 2 DE 3 • O GUARDIÃO</div>
        <h2 class="onboard-title">Quem vai acompanhar os treinos?</h2>
        
        <div class="input-group">
          <label>Quem é o parceiro de estudos?</label>
          <div class="pill-options-grid">
            <button type="button" class="pill-btn selected" onclick="selectPill('guardianType', 'Mamãe', this)">Mamãe 👩‍👧</button>
            <button type="button" class="pill-btn" onclick="selectPill('guardianType', 'Papai', this)">Papai 👨‍👦</button>
            <button type="button" class="pill-btn" onclick="selectPill('guardianType', 'Vovó / Vovô', this)">Vovó / Vovô 👵</button>
            <button type="button" class="pill-btn" onclick="selectPill('guardianType', 'Responsável', this)">Responsável 🌟</button>
          </div>
        </div>

        <div class="input-group">
          <label>Nome do Responsável:</label>
          <input type="text" id="input-guardian-name" placeholder="Ex: Camila, Juliana, Marcos..." class="duo-input" value="Camila">
        </div>

        <div class="input-group">
          <label>Meta Diária de Treino:</label>
          <div class="pill-options-grid">
            <button type="button" class="pill-btn" onclick="selectPill('timeGoal', '10 min', this)">10 min (Rápido)</button>
            <button type="button" class="pill-btn selected" onclick="selectPill('timeGoal', '15 min', this)">15 min (Ideal ⭐)</button>
            <button type="button" class="pill-btn" onclick="selectPill('timeGoal', '20 min', this)">20 min (Avançado)</button>
          </div>
        </div>

        <button class="btn-duo-next btn-gold" onclick="generateBadgeCard()">Emitir Carteirinha Oficial ➔</button>
      </div>

      <!-- PASSO 4: CARTEIRINHA EMITIDA -->
      <div id="step-4" class="onboard-step">
        <div class="onboard-badge gold">🏅 CARTEIRINHA OFICIAL EMITIDA</div>
        <h2 class="onboard-title" style="margin-bottom:6px;">Parabéns, novo(a) Agente!</h2>
        <p class="onboard-desc" style="margin-bottom:18px;">Você foi oficialmente aprovado(a) para a Liga dos Heróis da Multiplicação!</p>
        
        <div class="hero-badge-card" id="hero-badge-result">
          <div class="badge-top-row">
            <span class="badge-logo-text">⚡ LIGA DOS HERÓIS</span>
            <span class="badge-agent-id">ID #2026-HEROI</span>
          </div>
          <div class="badge-body">
            <img src="tabuada-assets/heroi-menino-oficial.png" class="badge-avatar-img" id="badge-avatar-img" alt="Avatar">
            <div class="badge-info">
              <h3 id="badge-name-text">AGENTE PEDRO</h3>
              <div class="badge-details" id="badge-details-text">8 ANOS • 3º ANO ESCOLAR</div>
              <div class="badge-guardian-tag" id="badge-guardian-text">Guardião: Mamãe Camila</div>
              <div class="badge-stats-row">
                <span>⭐ Nível 1</span>
                <span>⚡ 100 XP</span>
                <span>❤️ 5 Vidas</span>
              </div>
            </div>
          </div>
          <div class="badge-seal">OFICIAL APROVADO</div>
        </div>

        <button class="btn-duo-next" onclick="finishOnboarding()">COMEÇAR MINHA JORNADA 🚀</button>
      </div>

    </div>
  </div>
  `;
  content = content.replace('<header class="app-header">', `${onboardingHtml}\n<header class="app-header">`);
}

// 3. JS Injection (sempre antes do ÚLTIMO </script>)
const jsCode = `
    /* =========================================
       ONBOARDING LOGIC & PERSISTENCE
       ========================================= */
    window.heroProfile = {
      mascot: 'leo',
      name: 'Pedro',
      age: 8,
      grade: '3º Ano',
      guardianType: 'Mamãe',
      guardianName: 'Camila',
      timeGoal: '15 min'
    };

    window.selectMascot = function(type) {
      window.heroProfile.mascot = type;
      document.getElementById('choice-leo').classList.toggle('selected', type === 'leo');
      document.getElementById('choice-maya').classList.toggle('selected', type === 'maya');
      const imgSrc = type === 'leo' ? 'tabuada-assets/heroi-menino-oficial.png' : 'tabuada-assets/heroi-menina-oficial.png';
      document.getElementById('hero-preview-img').src = imgSrc;
      document.getElementById('badge-avatar-img').src = imgSrc;
      if (typeof playTone === 'function') playTone(520, 'sine', 0.08);
    };

    window.selectPill = function(category, value, el) {
      window.heroProfile[category] = value;
      el.parentElement.querySelectorAll('.pill-btn').forEach(b => b.classList.remove('selected'));
      el.classList.add('selected');
      if (typeof playTone === 'function') playTone(450, 'sine', 0.05);
    };

    window.goToStep = function(stepNum) {
      document.querySelectorAll('.onboard-step').forEach(s => s.classList.remove('active'));
      const target = document.getElementById('step-' + stepNum);
      if (target) target.classList.add('active');
      if (typeof playTone === 'function') playTone(600, 'triangle', 0.1);
    };

    window.generateBadgeCard = function() {
      const childName = document.getElementById('input-child-name').value.trim() || 'Herói';
      const guardianName = document.getElementById('input-guardian-name').value.trim() || 'Responsável';
      window.heroProfile.name = childName;
      window.heroProfile.guardianName = guardianName;

      document.getElementById('badge-name-text').innerText = 'AGENTE ' + childName.toUpperCase();
      document.getElementById('badge-details-text').innerText = window.heroProfile.age + ' ANOS • ' + window.heroProfile.grade.toUpperCase();
      document.getElementById('badge-guardian-text').innerText = 'Guardião: ' + window.heroProfile.guardianType + ' ' + guardianName;

      const imgSrc = window.heroProfile.mascot === 'leo' ? 'tabuada-assets/heroi-menino-oficial.png' : 'tabuada-assets/heroi-menina-oficial.png';
      document.getElementById('badge-avatar-img').src = imgSrc;

      try {
        if (typeof confetti === 'function') confetti({ particleCount: 70, spread: 70, origin: { y: 0.6 } });
        if (typeof playLevelUpFanfare === 'function') playLevelUpFanfare();
      } catch(e) {}

      window.goToStep(4);
    };

    window.finishOnboarding = function() {
      localStorage.setItem('missao_tabuada_hero_profile', JSON.stringify(window.heroProfile));
      document.getElementById('onboarding-overlay').style.display = 'none';
      const headerName = document.getElementById('header-hero-name');
      if (headerName) headerName.innerText = window.heroProfile.name;
      
      try {
        if (typeof confetti === 'function') confetti({ particleCount: 100, spread: 90, origin: { y: 0.5 } });
        if (typeof playSuccessSound === 'function') playSuccessSound();
      } catch(e) {}
    };

    window.openBadgeModal = function() {
      window.goToStep(4);
      document.getElementById('onboarding-overlay').style.display = 'flex';
    };

    // Auto-executa
    setTimeout(() => {
      const savedHero = localStorage.getItem('missao_tabuada_hero_profile');
      if (savedHero) {
        try {
          window.heroProfile = JSON.parse(savedHero);
          const headerName = document.getElementById('header-hero-name');
          if (headerName) headerName.innerText = window.heroProfile.name;
          document.getElementById('onboarding-overlay').style.display = 'none';
        } catch(e) {}
      } else {
        document.getElementById('onboarding-overlay').style.display = 'flex';
      }
    }, 100);
`;

const lastScriptIndex = content.lastIndexOf('</script>');
content = content.substring(0, lastScriptIndex) + `\n${jsCode}\n` + content.substring(lastScriptIndex);

fs.writeFileSync(filePath, content, 'utf8');
console.log('duolingo_tabuada.html re-injetado com sucesso!');
