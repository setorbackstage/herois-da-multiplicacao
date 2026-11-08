const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');

async function buildFullArsenal() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const ffmpegPath = 'C:\\ffmpeg\\bin\\ffmpeg.exe';
  const assetsDir = path.resolve(__dirname, 'tabuada-assets');
  const outDir = path.resolve(__dirname, 'midias', 'anuncios_prontos');

  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  function getBase64(filename) {
    const filePath = path.join(assetsDir, filename);
    if (!fs.existsSync(filePath)) return '';
    const ext = path.extname(filename).toLowerCase();
    const mime = ext === '.png' ? 'image/png' : 'image/jpeg';
    return `data:${mime};base64,${fs.readFileSync(filePath).toString('base64')}`;
  }

  const capa = getBase64('capa-missao-tabuada.jpg');
  const pageWorksheet = getBase64('preview_clean_p4_worksheetA.png');
  const pageBoss = getBase64('preview_clean_p6_bossC.png');
  const pageCert = getBase64('preview_clean_p43_certificate.png');
  const pageTracker = getBase64('preview_clean_p3_tracker.png');
  const mascotMenino = getBase64('heroi-menino-oficial.png');
  const mascotMenina = getBase64('heroi-menina-oficial.png');
  const screenDuolingoMapa = getBase64('duolingo_app_mapa_screen.png');
  const screenDuolingoLicao = getBase64('duolingo_app_licao_screen.png');

  console.log('Iniciando construção do Arsenal dos 20 Criativos...');

  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // Helper de renderização de pares (Feed + Stories)
  async function renderPair(numStr, slug, generateFeedHtml, generateStoriesHtml) {
    console.log(`Renderizando Criativo ${numStr}: ${slug}...`);

    // Stories (1080x1920)
    await page.setViewport({ width: 1080, height: 1920 });
    await page.setContent(generateStoriesHtml(), { waitUntil: 'domcontentloaded' });
    const storiesPath = path.join(outDir, `ad_criativo_${numStr}_${slug}_stories.png`);
    await page.screenshot({ path: storiesPath, type: 'png' });

    // Feed (1080x1080)
    await page.setViewport({ width: 1080, height: 1080 });
    await page.setContent(generateFeedHtml(), { waitUntil: 'domcontentloaded' });
    const feedPath = path.join(outDir, `ad_criativo_${numStr}_${slug}_feed.png`);
    await page.screenshot({ path: feedPath, type: 'png' });

    console.log(`✓ Criativo ${numStr} finalizado (Feed + Stories)`);
  }

  // Common CSS Snippets
  const baseFonts = `
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@700;800;900&family=Fredoka:wght@600;700;800&display=swap" rel="stylesheet">
    <style>
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body { font-family: 'Nunito', sans-serif; overflow: hidden; position: relative; }
    </style>
  `;

  // ==========================================
  // CRIATIVO 06: MOCKUP CELULAR DUOLINGO
  // ==========================================
  await renderPair('06', 'duolingo_mockup_celular',
    () => `
      <!DOCTYPE html><html><head><meta charset="UTF-8">${baseFonts}
      <style>
        body { width: 1080px; height: 1080px; background: radial-gradient(circle at 50% 25%, #14532D 0%, #064E3B 60%, #022C22 100%); color: #FFF; }
        .top-badge { position: absolute; top: 32px; left: 50%; transform: translateX(-50%); width: 92%; text-align: center; }
        .tag { display: inline-block; background: #58CC02; color: #FFF; font-size: 20px; font-weight: 900; padding: 6px 22px; border-radius: 999px; text-transform: uppercase; border: 2px solid #FFF; margin-bottom: 8px; }
        .title { font-size: 36px; font-weight: 900; line-height: 1.2; }
        .title span { color: #FFC800; }
        .center-stage { position: absolute; top: 160px; left: 50%; transform: translateX(-50%); width: 1000px; height: 750px; display: flex; align-items: center; justify-content: center; gap: 40px; }
        .phone { width: 340px; height: 680px; background: #1E293B; border-radius: 46px; padding: 12px; box-shadow: 0 25px 60px rgba(0,0,0,0.8), 0 0 40px rgba(88,204,2,0.35); border: 3px solid #334155; }
        .phone img { width: 100%; height: 100%; object-fit: cover; border-radius: 36px; }
        .hero-side { width: 440px; }
        .feature-card { background: rgba(15,23,42,0.85); border: 2px solid #58CC02; border-radius: 18px; padding: 16px 20px; margin-bottom: 14px; display: flex; align-items: center; gap: 14px; }
        .feature-icon { font-size: 32px; }
        .feature-text h4 { font-size: 20px; font-weight: 900; color: #FFF; }
        .feature-text p { font-size: 15px; color: #94A3B8; font-weight: 700; }
        .mascot-mini { width: 140px; position: absolute; bottom: 120px; right: 50px; filter: drop-shadow(0 10px 20px rgba(0,0,0,0.6)); }
        .bottom-bar { position: absolute; bottom: 24px; left: 50%; transform: translateX(-50%); width: 92%; background: rgba(2,44,34,0.95); border: 3px solid #58CC02; border-radius: 20px; padding: 14px 24px; display: flex; align-items: center; justify-content: space-between; }
        .price { font-size: 38px; font-weight: 900; color: #10B981; font-family: 'Fredoka', sans-serif; }
        .btn { background: #58CC02; color: #FFF; font-size: 24px; font-weight: 900; padding: 14px 28px; border-radius: 14px; text-transform: uppercase; }
      </style></head><body>
        <div class="top-badge"><div class="tag">🎮 O DUOLINGO DA MATEMÁTICA</div><div class="title">Criamos o <span>Duolingo da Tabuada</span> para seu filho amar estudar!</div></div>
        <div class="center-stage">
          <div class="phone"><img src="${screenDuolingoMapa}" /></div>
          <div class="hero-side">
            <div class="feature-card"><span class="feature-icon">⭐</span><div class="feature-text"><h4>Fases Gamificadas</h4><p>10 Ilhas dos Heróis com estrelas e progresso.</p></div></div>
            <div class="feature-card"><span class="feature-icon">⏱️</span><div class="feature-text"><h4>15 Minutos Diários</h4><p>Sem choro, sem cansaço, no celular ou no papel.</p></div></div>
            <div class="feature-card"><span class="feature-icon">🎉</span><div class="feature-text"><h4>Feedback Imediato</h4><p>Sons de vitória e celebrações a cada acerto.</p></div></div>
          </div>
        </div>
        <img class="mascot-mini" src="${mascotMenino}" />
        <div class="bottom-bar"><div><div style="color:#FFC800;font-size:16px;font-weight:800;">⚡ ACESSO IMEDIATO AO APP + LIVRO PDF</div><div class="price">R$ 19,90</div></div><div class="btn">QUERO BAIXAR 👉</div></div>
      </body></html>
    `,
    () => `
      <!DOCTYPE html><html><head><meta charset="UTF-8">${baseFonts}
      <style>
        body { width: 1080px; height: 1920px; background: radial-gradient(circle at 50% 25%, #14532D 0%, #064E3B 60%, #022C22 100%); color: #FFF; }
        .top-badge { position: absolute; top: 100px; left: 50%; transform: translateX(-50%); width: 90%; text-align: center; }
        .tag { display: inline-block; background: #58CC02; color: #FFF; font-size: 26px; font-weight: 900; padding: 10px 30px; border-radius: 999px; text-transform: uppercase; border: 3px solid #FFF; margin-bottom: 16px; }
        .title { font-size: 46px; font-weight: 900; line-height: 1.2; }
        .title span { color: #FFC800; }
        .subtitle { font-size: 26px; font-weight: 700; color: #A7F3D0; margin-top: 10px; }
        .phone { position: absolute; top: 400px; left: 50%; transform: translateX(-50%); width: 560px; height: 1100px; background: #1E293B; border-radius: 56px; padding: 16px; box-shadow: 0 35px 80px rgba(0,0,0,0.8), 0 0 50px rgba(88,204,2,0.4); border: 4px solid #334155; }
        .phone img { width: 100%; height: 100%; object-fit: cover; border-radius: 44px; }
        .mascot-side { position: absolute; bottom: 420px; right: 40px; width: 230px; filter: drop-shadow(0 15px 30px rgba(0,0,0,0.8)); z-index: 20; }
        .bottom-bar { position: absolute; bottom: 80px; left: 50%; transform: translateX(-50%); width: 90%; background: #022C22; border: 4px solid #58CC02; border-radius: 26px; padding: 24px 30px; text-align: center; }
        .price { font-size: 52px; font-weight: 900; color: #10B981; font-family: 'Fredoka', sans-serif; margin-bottom: 12px; }
        .btn { display: block; width: 100%; background: #58CC02; color: #FFF; font-size: 32px; font-weight: 900; padding: 18px; border-radius: 16px; text-transform: uppercase; }
      </style></head><body>
        <div class="top-badge"><div class="tag">🎮 O DUOLINGO DA MATEMÁTICA</div><div class="title">Seu filho vai zerar a tabuada <span>brincando no celular</span>!</div><div class="subtitle">Disponível em qualquer smartphone, tablet ou para imprimir.</div></div>
        <div class="phone"><img src="${screenDuolingoLicao}" /></div>
        <img class="mascot-side" src="${mascotMenino}" />
        <div class="bottom-bar"><div class="price"><span style="font-size:26px;color:#94A3B8;text-decoration:line-through;margin-right:12px;">De R$ 47</span> R$ 19,90</div><div class="btn">👉 BAIXAR AGORA</div></div>
      </body></html>
    `
  );

  // ==========================================
  // CRIATIVO 07: NOTIFICAÇÃO PUSH DUOLINGO
  // ==========================================
  await renderPair('07', 'duolingo_notificacao_push',
    () => `
      <!DOCTYPE html><html><head><meta charset="UTF-8">${baseFonts}
      <style>
        body { width: 1080px; height: 1080px; background: #0F172A; color: #FFF; }
        .top-container { position: absolute; top: 40px; left: 50%; transform: translateX(-50%); width: 92%; text-align: center; }
        .tag { display: inline-block; background: #3B82F6; color: #FFF; font-size: 20px; font-weight: 900; padding: 6px 20px; border-radius: 999px; text-transform: uppercase; margin-bottom: 10px; }
        .title { font-size: 34px; font-weight: 900; }
        .center-lockscreen { position: absolute; top: 180px; left: 50%; transform: translateX(-50%); width: 880px; }
        .push-card { background: rgba(30,41,59,0.95); backdrop-filter: blur(12px); border: 2px solid rgba(255,255,255,0.15); border-radius: 24px; padding: 22px 28px; margin-bottom: 18px; box-shadow: 0 15px 35px rgba(0,0,0,0.5); display: flex; gap: 20px; align-items: flex-start; }
        .push-icon { width: 55px; height: 55px; border-radius: 14px; background: #58CC02; display: flex; align-items: center; justify-content: center; font-size: 30px; flex-shrink: 0; }
        .push-content h4 { font-size: 22px; font-weight: 900; color: #F8FAFC; margin-bottom: 4px; display: flex; justify-content: space-between; }
        .push-content p { font-size: 19px; color: #CBD5E1; line-height: 1.35; font-weight: 700; }
        .time { font-size: 16px; color: #64748B; font-weight: 600; }
        .bottom-bar { position: absolute; bottom: 30px; left: 50%; transform: translateX(-50%); width: 92%; background: #1E293B; border: 3px solid #10B981; border-radius: 20px; padding: 14px 24px; display: flex; align-items: center; justify-content: space-between; }
        .price { font-size: 38px; font-weight: 900; color: #10B981; font-family: 'Fredoka', sans-serif; }
        .btn { background: #10B981; color: #FFF; font-size: 24px; font-weight: 900; padding: 14px 28px; border-radius: 14px; text-transform: uppercase; }
      </style></head><body>
        <div class="top-container"><div class="tag">📲 ALERTA NO SEU CELULAR</div><div class="title">A notificação que os pais mais amam receber!</div></div>
        <div class="center-lockscreen">
          <div class="push-card">
            <div class="push-icon">⚡</div>
            <div class="push-content">
              <h4><span>Missão Tabuada • Léo Herói</span><span class="time">agora</span></h4>
              <p>"Hora da Missão Diária! São apenas 15 minutos de treino para manter sua sequência de 7 dias invicto! 🦸‍♂️"</p>
            </div>
          </div>
          <div class="push-card">
            <div class="push-icon" style="background:#25D366;">💬</div>
            <div class="push-content">
              <h4><span>Professora Juliana • Colégio</span><span class="time">há 12 min</span></h4>
              <p>"Mãe, parabéns! O Pedro foi o primeiro a terminar a prova da tabuada hoje e acertou 100% das contas! 👏"</p>
            </div>
          </div>
        </div>
        <div class="bottom-bar"><div><div style="color:#FBBF24;font-size:16px;font-weight:800;">⚡ MÉTODO COMPLETO (APP + LIVRO)</div><div class="price">R$ 19,90</div></div><div class="btn">COMEÇAR HOJE 👉</div></div>
      </body></html>
    `,
    () => `
      <!DOCTYPE html><html><head><meta charset="UTF-8">${baseFonts}
      <style>
        body { width: 1080px; height: 1920px; background: radial-gradient(circle at 50% 20%, #1E1B4B 0%, #0F172A 70%, #020617 100%); color: #FFF; }
        .top-container { position: absolute; top: 120px; left: 50%; transform: translateX(-50%); width: 90%; text-align: center; }
        .tag { display: inline-block; background: #3B82F6; color: #FFF; font-size: 26px; font-weight: 900; padding: 10px 28px; border-radius: 999px; text-transform: uppercase; margin-bottom: 16px; }
        .title { font-size: 46px; font-weight: 900; line-height: 1.25; }
        .center-lockscreen { position: absolute; top: 460px; left: 50%; transform: translateX(-50%); width: 920px; }
        .push-card { background: rgba(30,41,59,0.95); backdrop-filter: blur(14px); border: 3px solid rgba(255,255,255,0.18); border-radius: 28px; padding: 30px; margin-bottom: 24px; box-shadow: 0 20px 45px rgba(0,0,0,0.6); display: flex; gap: 24px; }
        .push-icon { width: 75px; height: 75px; border-radius: 20px; background: #58CC02; display: flex; align-items: center; justify-content: center; font-size: 40px; flex-shrink: 0; }
        .push-content h4 { font-size: 28px; font-weight: 900; color: #F8FAFC; margin-bottom: 8px; display: flex; justify-content: space-between; }
        .push-content p { font-size: 24px; color: #CBD5E1; line-height: 1.35; font-weight: 700; }
        .time { font-size: 20px; color: #64748B; font-weight: 600; }
        .mascot-bottom { position: absolute; bottom: 380px; left: 50%; transform: translateX(-50%); width: 280px; filter: drop-shadow(0 20px 40px rgba(0,0,0,0.8)); }
        .bottom-bar { position: absolute; bottom: 80px; left: 50%; transform: translateX(-50%); width: 90%; background: #0F172A; border: 4px solid #10B981; border-radius: 26px; padding: 24px; text-align: center; }
        .price { font-size: 52px; font-weight: 900; color: #10B981; font-family: 'Fredoka', sans-serif; margin-bottom: 12px; }
        .btn { display: block; width: 100%; background: #10B981; color: #FFF; font-size: 32px; font-weight: 900; padding: 18px; border-radius: 16px; text-transform: uppercase; }
      </style></head><body>
        <div class="top-container"><div class="tag">📲 ALERTA NO SEU CELULAR</div><div class="title">A notificação que transformou a rotina de mais de 3.000 famílias!</div></div>
        <div class="center-lockscreen">
          <div class="push-card">
            <div class="push-icon">⚡</div>
            <div class="push-content">
              <h4><span>Missão Tabuada • App dos Heróis</span><span class="time">agora</span></h4>
              <p>"Missão diária pronta! Apenas 15 minutos no aplicativo para desbloquear a Fase do Chefão! 🦸‍♂️"</p>
            </div>
          </div>
          <div class="push-card">
            <div class="push-icon" style="background:#25D366;">💬</div>
            <div class="push-content">
              <h4><span>Professora Débora • 4º Ano</span><span class="time">há 15 min</span></h4>
              <p>"Mãe, parabéns pelo apoio! Seu filho gabaritou a tabuada na lousa hoje sem nenhuma dificuldade! 🌟"</p>
            </div>
          </div>
        </div>
        <img class="mascot-bottom" src="${mascotMenino}" />
        <div class="bottom-bar"><div class="price">R$ 19,90</div><div class="btn">👉 ARRASTE PARA BAIXAR</div></div>
      </body></html>
    `
  );

  // ==========================================
  // CRIATIVO 08: COMBO DUPLO (APP + PAPEL)
  // ==========================================
  await renderPair('08', 'combo_app_e_papel',
    () => `
      <!DOCTYPE html><html><head><meta charset="UTF-8">${baseFonts}
      <style>
        body { width: 1080px; height: 1080px; background: radial-gradient(circle at 50% 30%, #1E1B4B 0%, #0F172A 70%, #020617 100%); color: #FFF; }
        .top-container { position: absolute; top: 32px; left: 50%; transform: translateX(-50%); width: 92%; text-align: center; }
        .tag { display: inline-block; background: #F59E0B; color: #FFF; font-size: 20px; font-weight: 900; padding: 6px 20px; border-radius: 999px; text-transform: uppercase; margin-bottom: 8px; }
        .title { font-size: 36px; font-weight: 900; }
        .title span { color: #FBBF24; }
        .split-stage { position: absolute; top: 160px; left: 50%; transform: translateX(-50%); width: 980px; height: 500px; display: flex; align-items: center; justify-content: center; gap: 40px; }
        .side-box { width: 440px; height: 460px; background: rgba(30,41,59,0.8); border: 3px solid #3B82F6; border-radius: 24px; padding: 20px; text-align: center; position: relative; }
        .side-box h3 { font-size: 22px; font-weight: 900; color: #38BDF8; margin-bottom: 12px; }
        .side-box img { width: 220px; height: 340px; object-fit: contain; border-radius: 14px; margin: 0 auto; }
        .plus-badge { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 60px; height: 60px; background: #F59E0B; border: 4px solid #FFF; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 36px; font-weight: 900; z-index: 20; }
        .bottom-bar { position: absolute; bottom: 26px; left: 50%; transform: translateX(-50%); width: 92%; background: #0F172A; border: 3px solid #10B981; border-radius: 20px; padding: 14px 24px; display: flex; align-items: center; justify-content: space-between; }
        .price { font-size: 38px; font-weight: 900; color: #10B981; font-family: 'Fredoka', sans-serif; }
        .btn { background: #10B981; color: #FFF; font-size: 24px; font-weight: 900; padding: 14px 28px; border-radius: 14px; text-transform: uppercase; }
      </style></head><body>
        <div class="top-container"><div class="tag">⚡ O COMBO DEFINITIVO</div><div class="title">O único método que une o <span>Digital</span> e o <span>Físico</span>!</div></div>
        <div class="split-stage">
          <div class="side-box"><h3>1. App Gamificado (Duolingo)</h3><img src="${screenDuolingoLicao}" /></div>
          <div class="plus-badge">+</div>
          <div class="side-box" style="border-color:#F59E0B;"><h3 style="color:#FBBF24;">2. Livro 43 Págs em PDF</h3><img src="${capa}" /></div>
        </div>
        <div class="bottom-bar"><div><div style="color:#FBBF24;font-size:16px;font-weight:800;">TUDO INCLUSO POR APENAS</div><div class="price">R$ 19,90</div></div><div class="btn">GARANTIR COMBO 👉</div></div>
      </body></html>
    `,
    () => `
      <!DOCTYPE html><html><head><meta charset="UTF-8">${baseFonts}
      <style>
        body { width: 1080px; height: 1920px; background: radial-gradient(circle at 50% 25%, #1E1B4B 0%, #0F172A 70%, #020617 100%); color: #FFF; }
        .top-container { position: absolute; top: 120px; left: 50%; transform: translateX(-50%); width: 90%; text-align: center; }
        .tag { display: inline-block; background: #F59E0B; color: #FFF; font-size: 26px; font-weight: 900; padding: 10px 30px; border-radius: 999px; text-transform: uppercase; margin-bottom: 16px; }
        .title { font-size: 46px; font-weight: 900; line-height: 1.25; }
        .title span { color: #FBBF24; }
        .stack-vertical { position: absolute; top: 440px; left: 50%; transform: translateX(-50%); width: 900px; display: flex; flex-direction: column; gap: 30px; align-items: center; }
        .item-box { width: 100%; background: rgba(30,41,59,0.9); border: 3px solid #3B82F6; border-radius: 24px; padding: 24px 30px; display: flex; align-items: center; gap: 30px; }
        .item-box img { width: 160px; height: 230px; object-fit: contain; border-radius: 12px; }
        .item-text h3 { font-size: 30px; font-weight: 900; color: #38BDF8; margin-bottom: 8px; }
        .item-text p { font-size: 22px; color: #CBD5E1; font-weight: 700; line-height: 1.3; }
        .bottom-bar { position: absolute; bottom: 80px; left: 50%; transform: translateX(-50%); width: 90%; background: #0F172A; border: 4px solid #10B981; border-radius: 26px; padding: 24px; text-align: center; }
        .price { font-size: 52px; font-weight: 900; color: #10B981; font-family: 'Fredoka', sans-serif; margin-bottom: 12px; }
        .btn { display: block; width: 100%; background: #10B981; color: #FFF; font-size: 32px; font-weight: 900; padding: 18px; border-radius: 16px; text-transform: uppercase; }
      </style></head><body>
        <div class="top-container"><div class="tag">⚡ O COMBO DEFINITIVO</div><div class="title">Treine no <span>Celular</span>, fixe no <span>Papel</span>!</div></div>
        <div class="stack-vertical">
          <div class="item-box"><img src="${screenDuolingoLicao}" /><div class="item-text"><h3>📱 App Interativo dos Heróis</h3><p>O Duolingo da Tabuada com fases, estrelas e sons para praticar em qualquer lugar.</p></div></div>
          <div class="item-box" style="border-color:#F59E0B;"><img src="${capa}" /><div class="item-text"><h3 style="color:#FBBF24;">📖 Livro de Atividades 43 Págs</h3><p>Para imprimir em casa e exercitar a escrita manual sem telas nem distrações.</p></div></div>
        </div>
        <div class="bottom-bar"><div class="price"><span style="font-size:26px;color:#94A3B8;text-decoration:line-through;margin-right:12px;">De R$ 47</span> R$ 19,90</div><div class="btn">👉 ARRASTE PARA BAIXAR</div></div>
      </body></html>
    `
  );

  // ==========================================
  // CRIATIVO 10: WHATSAPP DA PROFESSORA
  // ==========================================
  await renderPair('10', 'whatsapp_professora',
    () => `
      <!DOCTYPE html><html><head><meta charset="UTF-8">${baseFonts}
      <style>
        body { width: 1080px; height: 1080px; background: #0C1317; color: #FFF; }
        .top-container { position: absolute; top: 32px; left: 50%; transform: translateX(-50%); width: 92%; text-align: center; }
        .tag { display: inline-block; background: #25D366; color: #FFF; font-size: 20px; font-weight: 900; padding: 6px 22px; border-radius: 999px; text-transform: uppercase; margin-bottom: 8px; }
        .title { font-size: 34px; font-weight: 900; }
        .chat-container { position: absolute; top: 160px; left: 50%; transform: translateX(-50%); width: 880px; background: #111B21; border: 2px solid #202C33; border-radius: 24px; padding: 24px; box-shadow: 0 20px 50px rgba(0,0,0,0.8); }
        .chat-header { display: flex; align-items: center; gap: 16px; padding-bottom: 16px; border-bottom: 1px solid #222E35; margin-bottom: 20px; }
        .avatar { width: 60px; height: 60px; border-radius: 50%; background: #64748B; display: flex; align-items: center; justify-content: center; font-size: 30px; }
        .chat-header h4 { font-size: 22px; font-weight: 800; color: #E9EDEF; }
        .chat-header span { font-size: 15px; color: #8696A0; }
        .bubble-in { background: #202C33; color: #E9EDEF; padding: 18px 22px; border-radius: 18px 18px 18px 4px; max-width: 80%; font-size: 20px; line-height: 1.4; margin-bottom: 16px; font-weight: 600; }
        .bubble-time { display: block; text-align: right; font-size: 14px; color: #8696A0; margin-top: 6px; }
        .bubble-out { background: #005C4B; color: #E9EDEF; padding: 18px 22px; border-radius: 18px 18px 4px 18px; max-width: 80%; margin-left: auto; font-size: 20px; line-height: 1.4; font-weight: 600; }
        .bottom-bar { position: absolute; bottom: 26px; left: 50%; transform: translateX(-50%); width: 92%; background: #111B21; border: 3px solid #25D366; border-radius: 20px; padding: 14px 24px; display: flex; align-items: center; justify-content: space-between; }
        .price { font-size: 38px; font-weight: 900; color: #25D366; font-family: 'Fredoka', sans-serif; }
        .btn { background: #25D366; color: #FFF; font-size: 24px; font-weight: 900; padding: 14px 28px; border-radius: 14px; text-transform: uppercase; }
      </style></head><body>
        <div class="top-container"><div class="tag">💬 CONVERSA REAL</div><div class="title">A mensagem que toda mãe merece receber da escola!</div></div>
        <div class="chat-container">
          <div class="chat-header"><div class="avatar">👩‍🏫</div><div><h4>Professora Juliana (Escola)</h4><span>online</span></div></div>
          <div class="bubble-in">Boa tarde mãe! Queria te dar os parabéns... O Léo foi o único da turma que tirou 10 na tabuada hoje! Ele falou que estuda com uns heróis em casa 👏❤️<span class="bubble-time">14:32</span></div>
          <div class="bubble-out">Sério pró?! Nem acredito! Ele fazia escândalo pra estudar, agora faz 15 minutinhos por dia no livro dos Heróis da Multiplicação! Melhor coisa que já comprei 🙏<span class="bubble-time">14:35 ✓✓</span></div>
        </div>
        <div class="bottom-bar"><div><div style="color:#FBBF24;font-size:16px;font-weight:800;">LIVRO DIGITAL EM PDF + BÔNUS</div><div class="price">R$ 19,90</div></div><div class="btn">QUERO MEU FILHO ASSIM 👉</div></div>
      </body></html>
    `,
    () => `
      <!DOCTYPE html><html><head><meta charset="UTF-8">${baseFonts}
      <style>
        body { width: 1080px; height: 1920px; background: #0C1317; color: #FFF; }
        .top-container { position: absolute; top: 120px; left: 50%; transform: translateX(-50%); width: 90%; text-align: center; }
        .tag { display: inline-block; background: #25D366; color: #FFF; font-size: 26px; font-weight: 900; padding: 10px 30px; border-radius: 999px; text-transform: uppercase; margin-bottom: 16px; }
        .title { font-size: 46px; font-weight: 900; line-height: 1.25; }
        .chat-container { position: absolute; top: 380px; left: 50%; transform: translateX(-50%); width: 920px; background: #111B21; border: 3px solid #202C33; border-radius: 28px; padding: 32px; box-shadow: 0 25px 60px rgba(0,0,0,0.85); }
        .chat-header { display: flex; align-items: center; gap: 20px; padding-bottom: 20px; border-bottom: 1px solid #222E35; margin-bottom: 28px; }
        .avatar { width: 80px; height: 80px; border-radius: 50%; background: #64748B; display: flex; align-items: center; justify-content: center; font-size: 42px; }
        .chat-header h4 { font-size: 30px; font-weight: 800; color: #E9EDEF; }
        .chat-header span { font-size: 20px; color: #8696A0; }
        .bubble-in { background: #202C33; color: #E9EDEF; padding: 24px 28px; border-radius: 22px 22px 22px 4px; max-width: 85%; font-size: 25px; line-height: 1.45; margin-bottom: 24px; font-weight: 600; }
        .bubble-time { display: block; text-align: right; font-size: 18px; color: #8696A0; margin-top: 8px; }
        .bubble-out { background: #005C4B; color: #E9EDEF; padding: 24px 28px; border-radius: 22px 22px 4px 22px; max-width: 85%; margin-left: auto; font-size: 25px; line-height: 1.45; font-weight: 600; }
        .mascot-side { position: absolute; bottom: 380px; right: 60px; width: 240px; filter: drop-shadow(0 15px 30px rgba(0,0,0,0.8)); }
        .bottom-bar { position: absolute; bottom: 80px; left: 50%; transform: translateX(-50%); width: 90%; background: #111B21; border: 4px solid #25D366; border-radius: 26px; padding: 24px; text-align: center; }
        .price { font-size: 52px; font-weight: 900; color: #25D366; font-family: 'Fredoka', sans-serif; margin-bottom: 12px; }
        .btn { display: block; width: 100%; background: #25D366; color: #FFF; font-size: 32px; font-weight: 900; padding: 18px; border-radius: 16px; text-transform: uppercase; }
      </style></head><body>
        <div class="top-container"><div class="tag">💬 CONVERSA REAL</div><div class="title">O fim da vergonha nas reuniões de pais!</div></div>
        <div class="chat-container">
          <div class="chat-header"><div class="avatar">👩‍🏫</div><div><h4>Professora Débora (4º Ano)</h4><span>online</span></div></div>
          <div class="bubble-in">Mãe, boa tarde! Gostaria de parabenizar pelo avanço... O Léo acertou toda a chamada oral de tabuada hoje na lousa! Foi um dos melhores da sala! 👏🌟<span class="bubble-time">15:10</span></div>
          <div class="bubble-out">Muito obrigada professora! Ele está fazendo 15 minutos do livro Heróis da Multiplicação todo dia depois do almoço. A confiança dele mudou da água pro vinho! ❤️<span class="bubble-time">15:14 ✓✓</span></div>
        </div>
        <img class="mascot-side" src="${mascotMenino}" />
        <div class="bottom-bar"><div class="price">R$ 19,90</div><div class="btn">👉 ARRASTE PARA BAIXAR</div></div>
      </body></html>
    `
  );

  // ==========================================
  // CRIATIVO 11: BOLETIM ANTES VS DEPOIS
  // ==========================================
  await renderPair('11', 'boletim_antes_depois',
    () => `
      <!DOCTYPE html><html><head><meta charset="UTF-8">${baseFonts}
      <style>
        body { width: 1080px; height: 1080px; background: #0F172A; color: #FFF; }
        .top-container { position: absolute; top: 32px; left: 50%; transform: translateX(-50%); width: 92%; text-align: center; }
        .tag { display: inline-block; background: #EF4444; color: #FFF; font-size: 20px; font-weight: 900; padding: 6px 20px; border-radius: 999px; text-transform: uppercase; margin-bottom: 8px; }
        .title { font-size: 36px; font-weight: 900; }
        .cards-stage { position: absolute; top: 160px; left: 50%; transform: translateX(-50%); width: 960px; display: flex; gap: 30px; }
        .report-card { flex: 1; background: #FFF; border-radius: 20px; padding: 24px; color: #1E293B; box-shadow: 0 15px 35px rgba(0,0,0,0.4); border-top: 10px solid #EF4444; }
        .report-card.after { border-top-color: #10B981; }
        .report-title { font-size: 20px; font-weight: 800; color: #64748B; text-transform: uppercase; margin-bottom: 12px; }
        .grade-box { font-size: 64px; font-weight: 900; font-family: 'Fredoka', sans-serif; color: #EF4444; margin: 10px 0; }
        .report-card.after .grade-box { color: #10B981; }
        .stamp { display: inline-block; padding: 8px 16px; border: 3px dashed #EF4444; color: #EF4444; font-size: 20px; font-weight: 900; border-radius: 8px; transform: rotate(-5deg); text-transform: uppercase; }
        .report-card.after .stamp { border-color: #10B981; color: #10B981; transform: rotate(5deg); }
        .desc { font-size: 16px; color: #475569; margin-top: 16px; font-weight: 700; line-height: 1.35; }
        .bottom-bar { position: absolute; bottom: 26px; left: 50%; transform: translateX(-50%); width: 92%; background: #1E293B; border: 3px solid #10B981; border-radius: 20px; padding: 14px 24px; display: flex; align-items: center; justify-content: space-between; }
        .price { font-size: 38px; font-weight: 900; color: #10B981; font-family: 'Fredoka', sans-serif; }
        .btn { background: #10B981; color: #FFF; font-size: 24px; font-weight: 900; padding: 14px 28px; border-radius: 14px; text-transform: uppercase; }
      </style></head><body>
        <div class="top-container"><div class="tag">📊 TRANSFORMAÇÃO ESCOLAR</div><div class="title">De <span>Recuperação</span> para <span>Destaque da Turma</span> em 3 semanas!</div></div>
        <div class="cards-stage">
          <div class="report-card">
            <div class="report-title">1º Bimestre (Antes dos Heróis)</div>
            <div class="grade-box">4.2</div>
            <div class="stamp">REPROVADO / RECUPERAÇÃO</div>
            <div class="desc">Choro na hora da lição, desânimo total com matemática e ansiedade nas provas.</div>
          </div>
          <div class="report-card after">
            <div class="report-title">2º Bimestre (Com 15 Minutos Diários)</div>
            <div class="grade-box">10.0</div>
            <div class="stamp">HERÓI DA TABUADA 🏆</div>
            <div class="desc">Gabaritou a prova de multiplicação, autoconfiança no teto e elogiado pela professora!</div>
          </div>
        </div>
        <div class="bottom-bar"><div><div style="color:#FBBF24;font-size:16px;font-weight:800;">LIVRO EM PDF + APP GAMIFICADO</div><div class="price">R$ 19,90</div></div><div class="btn">DESTRAVAR NOTA 10 👉</div></div>
      </body></html>
    `,
    () => `
      <!DOCTYPE html><html><head><meta charset="UTF-8">${baseFonts}
      <style>
        body { width: 1080px; height: 1920px; background: radial-gradient(circle at 50% 20%, #1E1B4B 0%, #0F172A 70%, #020617 100%); color: #FFF; }
        .top-container { position: absolute; top: 120px; left: 50%; transform: translateX(-50%); width: 90%; text-align: center; }
        .tag { display: inline-block; background: #EF4444; color: #FFF; font-size: 26px; font-weight: 900; padding: 10px 30px; border-radius: 999px; text-transform: uppercase; margin-bottom: 16px; }
        .title { font-size: 46px; font-weight: 900; line-height: 1.25; }
        .cards-stage { position: absolute; top: 400px; left: 50%; transform: translateX(-50%); width: 920px; display: flex; flex-direction: column; gap: 30px; }
        .report-card { background: #FFF; border-radius: 24px; padding: 30px; color: #1E293B; box-shadow: 0 20px 45px rgba(0,0,0,0.5); border-left: 14px solid #EF4444; display: flex; align-items: center; justify-content: space-between; }
        .report-card.after { border-left-color: #10B981; }
        .info h3 { font-size: 26px; font-weight: 800; color: #64748B; margin-bottom: 6px; }
        .info p { font-size: 22px; color: #334155; font-weight: 700; max-width: 500px; }
        .grade { font-size: 72px; font-weight: 900; font-family: 'Fredoka', sans-serif; color: #EF4444; text-align: right; }
        .report-card.after .grade { color: #10B981; }
        .mascot-side { position: absolute; bottom: 380px; right: 60px; width: 240px; filter: drop-shadow(0 15px 30px rgba(0,0,0,0.8)); }
        .bottom-bar { position: absolute; bottom: 80px; left: 50%; transform: translateX(-50%); width: 90%; background: #0F172A; border: 4px solid #10B981; border-radius: 26px; padding: 24px; text-align: center; }
        .price { font-size: 52px; font-weight: 900; color: #10B981; font-family: 'Fredoka', sans-serif; margin-bottom: 12px; }
        .btn { display: block; width: 100%; background: #10B981; color: #FFF; font-size: 32px; font-weight: 900; padding: 18px; border-radius: 16px; text-transform: uppercase; }
      </style></head><body>
        <div class="top-container"><div class="tag">📊 TRANSFORMAÇÃO ESCOLAR</div><div class="title">Como transformar a nota de matemática em <span>15 minutos por dia</span>!</div></div>
        <div class="cards-stage">
          <div class="report-card">
            <div class="info"><h3>ANTES DOS HERÓIS</h3><p>Ansiedade, choro nas provas e recuperação bimestral.</p></div>
            <div class="grade">4.2<br><span style="font-size:18px;font-family:'Nunito';font-weight:900;">RECUPERAÇÃO</span></div>
          </div>
          <div class="report-card after">
            <div class="info"><h3>DEPOIS DOS HERÓIS</h3><p>Gabaritou a tabuada, confiança máxima e elogios na escola!</p></div>
            <div class="grade">10.0<br><span style="font-size:18px;font-family:'Nunito';font-weight:900;">HERÓI DA SALA</span></div>
          </div>
        </div>
        <img class="mascot-side" src="${mascotMenino}" />
        <div class="bottom-bar"><div class="price">R$ 19,90</div><div class="btn">👉 ARRASTE PARA BAIXAR</div></div>
      </body></html>
    `
  );

  // ==========================================
  // CRIATIVO 14: O CRONÔMETRO DOS 15 MINUTOS
  // ==========================================
  await renderPair('14', 'relogio_15minutos',
    () => `
      <!DOCTYPE html><html><head><meta charset="UTF-8">${baseFonts}
      <style>
        body { width: 1080px; height: 1080px; background: radial-gradient(circle at 50% 25%, #1E1B4B 0%, #0F172A 70%, #020617 100%); color: #FFF; }
        .top-container { position: absolute; top: 32px; left: 50%; transform: translateX(-50%); width: 92%; text-align: center; }
        .tag { display: inline-block; background: #F59E0B; color: #FFF; font-size: 20px; font-weight: 900; padding: 6px 20px; border-radius: 999px; text-transform: uppercase; margin-bottom: 8px; }
        .title { font-size: 36px; font-weight: 900; }
        .title span { color: #FBBF24; }
        .timeline-stage { position: absolute; top: 160px; left: 50%; transform: translateX(-50%); width: 940px; display: flex; flex-direction: column; gap: 16px; }
        .step-card { background: rgba(30,41,59,0.9); border: 2px solid #38BDF8; border-radius: 20px; padding: 18px 24px; display: flex; align-items: center; gap: 24px; }
        .step-time { width: 90px; height: 90px; border-radius: 50%; background: #0284C7; display: flex; align-items: center; justify-content: center; font-size: 26px; font-weight: 900; font-family: 'Fredoka', sans-serif; color: #FFF; border: 3px solid #FFF; flex-shrink: 0; }
        .step-info h3 { font-size: 24px; font-weight: 900; color: #F8FAFC; margin-bottom: 4px; }
        .step-info p { font-size: 18px; color: #94A3B8; font-weight: 700; line-height: 1.3; }
        .bottom-bar { position: absolute; bottom: 26px; left: 50%; transform: translateX(-50%); width: 92%; background: #0F172A; border: 3px solid #10B981; border-radius: 20px; padding: 14px 24px; display: flex; align-items: center; justify-content: space-between; }
        .price { font-size: 38px; font-weight: 900; color: #10B981; font-family: 'Fredoka', sans-serif; }
        .btn { background: #10B981; color: #FFF; font-size: 24px; font-weight: 900; padding: 14px 28px; border-radius: 14px; text-transform: uppercase; }
      </style></head><body>
        <div class="top-container"><div class="tag">⏱️ MÉTODO DOS 15 MINUTOS</div><div class="title">Como dominar a tabuada em <span>apenas 15 minutos por dia</span>!</div></div>
        <div class="timeline-stage">
          <div class="step-card"><div class="step-time">5 MIN</div><div class="step-info"><h3>1. Aventura em Gibi dos Heróis</h3><p>Histórias em quadrinhos divertidas que ensinam a lógica por trás da multiplicação.</p></div></div>
          <div class="step-card" style="border-color:#58CC02;"><div class="step-time" style="background:#58CC02;">5 MIN</div><div class="step-info"><h3 style="color:#A7F3D0;">2. Jogo Gamificado no App</h3><p>Desafio rápido no estilo Duolingo para praticar com feedback e sons de vitória.</p></div></div>
          <div class="step-card" style="border-color:#F59E0B;"><div class="step-time" style="background:#F59E0B;">5 MIN</div><div class="step-info"><h3 style="color:#FDE68A;">3. Fixação Prática no Papel</h3><p>1 folha por dia com exercícios lúdicos que gravam o aprendizado na memória.</p></div></div>
        </div>
        <div class="bottom-bar"><div><div style="color:#FBBF24;font-size:16px;font-weight:800;">KIT COMPLETO EM PDF + APP</div><div class="price">R$ 19,90</div></div><div class="btn">COMEÇAR HOJE 👉</div></div>
      </body></html>
    `,
    () => `
      <!DOCTYPE html><html><head><meta charset="UTF-8">${baseFonts}
      <style>
        body { width: 1080px; height: 1920px; background: radial-gradient(circle at 50% 20%, #1E1B4B 0%, #0F172A 70%, #020617 100%); color: #FFF; }
        .top-container { position: absolute; top: 120px; left: 50%; transform: translateX(-50%); width: 90%; text-align: center; }
        .tag { display: inline-block; background: #F59E0B; color: #FFF; font-size: 26px; font-weight: 900; padding: 10px 30px; border-radius: 999px; text-transform: uppercase; margin-bottom: 16px; }
        .title { font-size: 46px; font-weight: 900; line-height: 1.25; }
        .title span { color: #FBBF24; }
        .timeline-stage { position: absolute; top: 420px; left: 50%; transform: translateX(-50%); width: 900px; display: flex; flex-direction: column; gap: 24px; }
        .step-card { background: rgba(30,41,59,0.9); border: 3px solid #38BDF8; border-radius: 26px; padding: 26px 30px; display: flex; align-items: center; gap: 30px; }
        .step-time { width: 110px; height: 110px; border-radius: 50%; background: #0284C7; display: flex; align-items: center; justify-content: center; font-size: 32px; font-weight: 900; font-family: 'Fredoka', sans-serif; color: #FFF; border: 4px solid #FFF; flex-shrink: 0; }
        .step-info h3 { font-size: 30px; font-weight: 900; color: #F8FAFC; margin-bottom: 6px; }
        .step-info p { font-size: 22px; color: #94A3B8; font-weight: 700; line-height: 1.35; }
        .bottom-bar { position: absolute; bottom: 80px; left: 50%; transform: translateX(-50%); width: 90%; background: #0F172A; border: 4px solid #10B981; border-radius: 26px; padding: 24px; text-align: center; }
        .price { font-size: 52px; font-weight: 900; color: #10B981; font-family: 'Fredoka', sans-serif; margin-bottom: 12px; }
        .btn { display: block; width: 100%; background: #10B981; color: #FFF; font-size: 32px; font-weight: 900; padding: 18px; border-radius: 16px; text-transform: uppercase; }
      </style></head><body>
        <div class="top-container"><div class="tag">⏱️ O DESAFIO DOS 15 MINUTOS</div><div class="title">Sem brigas, sem cansaço: <span>15 minutos diários</span> bastam!</div></div>
        <div class="timeline-stage">
          <div class="step-card"><div class="step-time">5 MIN</div><div class="step-info"><h3>📖 História em Quadrinhos</h3><p>A criança entende a multiplicação através da aventura dos heróis.</p></div></div>
          <div class="step-card" style="border-color:#58CC02;"><div class="step-time" style="background:#58CC02;">5 MIN</div><div class="step-info"><h3 style="color:#A7F3D0;">🎮 Desafio no Duolingo</h3><p>Jogo gamificado no celular com estrelas e celebrações a cada acerto.</p></div></div>
          <div class="step-card" style="border-color:#F59E0B;"><div class="step-time" style="background:#F59E0B;">5 MIN</div><div class="step-info"><h3 style="color:#FDE68A;">✍️ Fixação na Folha</h3><p>Exercício rápido de caneta para garantir a fixação cerebral duradoura.</p></div></div>
        </div>
        <div class="bottom-bar"><div class="price">R$ 19,90</div><div class="btn">👉 ARRASTE PARA BAIXAR</div></div>
      </body></html>
    `
  );

  // ==========================================
  // CRIATIVO 18: MAYA - A HEROÍNA DOS NÚMEROS
  // ==========================================
  await renderPair('18', 'heroina_maya_meninas',
    () => `
      <!DOCTYPE html><html><head><meta charset="UTF-8">${baseFonts}
      <style>
        body { width: 1080px; height: 1080px; background: radial-gradient(circle at 60% 40%, #831843 0%, #4C0519 60%, #1E020A 100%); color: #FFF; }
        .top-container { position: absolute; top: 32px; left: 50%; transform: translateX(-50%); width: 92%; text-align: center; }
        .tag { display: inline-block; background: #EC4899; color: #FFF; font-size: 20px; font-weight: 900; padding: 6px 20px; border-radius: 999px; text-transform: uppercase; margin-bottom: 8px; border: 2px solid #FFF; }
        .title { font-size: 36px; font-weight: 900; }
        .title span { color: #F472B6; }
        .content-stage { position: absolute; top: 160px; left: 50%; transform: translateX(-50%); width: 940px; display: flex; align-items: center; justify-content: space-between; }
        .left-info { width: 500px; }
        .left-info h2 { font-size: 34px; font-weight: 900; color: #FFF; line-height: 1.25; margin-bottom: 14px; }
        .benefit-box { background: rgba(255,255,255,0.1); border: 2px solid rgba(244,114,182,0.4); border-radius: 18px; padding: 16px 20px; margin-bottom: 12px; font-size: 18px; font-weight: 700; color: #FCE7F3; }
        .maya-img { width: 380px; filter: drop-shadow(0 20px 40px rgba(0,0,0,0.8)); }
        .bottom-bar { position: absolute; bottom: 26px; left: 50%; transform: translateX(-50%); width: 92%; background: #4C0519; border: 3px solid #EC4899; border-radius: 20px; padding: 14px 24px; display: flex; align-items: center; justify-content: space-between; }
        .price { font-size: 38px; font-weight: 900; color: #F472B6; font-family: 'Fredoka', sans-serif; }
        .btn { background: #EC4899; color: #FFF; font-size: 24px; font-weight: 900; padding: 14px 28px; border-radius: 14px; text-transform: uppercase; }
      </style></head><body>
        <div class="top-container"><div class="tag">🦸‍♀️ HEROÍNAS DA MATEMÁTICA</div><div class="title">Meninas também são <span>Super-Heroínas dos Números</span>!</div></div>
        <div class="content-stage">
          <div class="left-info">
            <h2>Maya ensina sua filha a dominar a tabuada com orgulho e poder!</h2>
            <div class="benefit-box">✨ Protagonismo feminino e incentivo à matemática</div>
            <div class="benefit-box">⚡ 15 minutos diários com atividades ilustradas</div>
            <div class="benefit-box">🏆 Certificado Oficial de Heroína da Tabuada</div>
          </div>
          <img class="maya-img" src="${mascotMenina}" />
        </div>
        <div class="bottom-bar"><div><div style="color:#FBBF24;font-size:16px;font-weight:800;">LIVRO DIGITAL + APP DA MAYA</div><div class="price">R$ 19,90</div></div><div class="btn">INSPIRAR MINHA FILHA 👉</div></div>
      </body></html>
    `,
    () => `
      <!DOCTYPE html><html><head><meta charset="UTF-8">${baseFonts}
      <style>
        body { width: 1080px; height: 1920px; background: radial-gradient(circle at 60% 35%, #831843 0%, #4C0519 60%, #1E020A 100%); color: #FFF; }
        .top-container { position: absolute; top: 120px; left: 50%; transform: translateX(-50%); width: 90%; text-align: center; }
        .tag { display: inline-block; background: #EC4899; color: #FFF; font-size: 26px; font-weight: 900; padding: 10px 30px; border-radius: 999px; text-transform: uppercase; margin-bottom: 16px; border: 3px solid #FFF; }
        .title { font-size: 46px; font-weight: 900; line-height: 1.25; }
        .title span { color: #F472B6; }
        .maya-big { position: absolute; top: 400px; left: 50%; transform: translateX(-50%); width: 480px; filter: drop-shadow(0 25px 50px rgba(0,0,0,0.8)); }
        .pills-container { position: absolute; bottom: 360px; left: 50%; transform: translateX(-50%); width: 900px; display: flex; flex-direction: column; gap: 14px; }
        .pill-item { background: rgba(255,255,255,0.12); border: 2px solid rgba(244,114,182,0.4); border-radius: 18px; padding: 18px 24px; font-size: 24px; font-weight: 800; color: #FFF; text-align: center; }
        .bottom-bar { position: absolute; bottom: 80px; left: 50%; transform: translateX(-50%); width: 90%; background: #4C0519; border: 4px solid #EC4899; border-radius: 26px; padding: 24px; text-align: center; }
        .price { font-size: 52px; font-weight: 900; color: #F472B6; font-family: 'Fredoka', sans-serif; margin-bottom: 12px; }
        .btn { display: block; width: 100%; background: #EC4899; color: #FFF; font-size: 32px; font-weight: 900; padding: 18px; border-radius: 16px; text-transform: uppercase; }
      </style></head><body>
        <div class="top-container"><div class="tag">🦸‍♀️ HEROÍNAS DA MATEMÁTICA</div><div class="title">Sua filha confiante e <span>destravando a tabuada</span> sem medo!</div></div>
        <img class="maya-big" src="${mascotMenina}" />
        <div class="pills-container">
          <div class="pill-item">💖 Método lúdico desenhado especialmente para inspirar meninas</div>
          <div class="pill-item">⚡ 15 minutos diários com desafios, bônus e gibi</div>
        </div>
        <div class="bottom-bar"><div class="price">R$ 19,90</div><div class="btn">👉 ARRASTE PARA BAIXAR</div></div>
      </body></html>
    `
  );

  // ==========================================
  // CRIATIVO 20: BIG STACK OFERTA COMPLETA VIP
  // ==========================================
  await renderPair('20', 'big_stack_oferta_vip',
    () => `
      <!DOCTYPE html><html><head><meta charset="UTF-8">${baseFonts}
      <style>
        body { width: 1080px; height: 1080px; background: radial-gradient(circle at 50% 20%, #1E1B4B 0%, #0F172A 70%, #030712 100%); color: #FFF; }
        .top-container { position: absolute; top: 32px; left: 50%; transform: translateX(-50%); width: 92%; text-align: center; }
        .tag { display: inline-block; background: #DC2626; color: #FFF; font-size: 20px; font-weight: 900; padding: 6px 22px; border-radius: 999px; text-transform: uppercase; margin-bottom: 8px; border: 2px solid #FFF; }
        .title { font-size: 36px; font-weight: 900; }
        .title span { color: #FBBF24; }
        .stack-stage { position: absolute; top: 160px; left: 50%; transform: translateX(-50%); width: 960px; display: flex; align-items: center; justify-content: center; gap: 20px; }
        .item-mockup { width: 180px; border-radius: 12px; box-shadow: 0 15px 35px rgba(0,0,0,0.6); }
        .center-hero { width: 230px; border: 4px solid #F59E0B; border-radius: 14px; box-shadow: 0 25px 50px rgba(0,0,0,0.8), 0 0 30px rgba(245,158,11,0.4); transform: scale(1.1); z-index: 10; }
        .bottom-bar { position: absolute; bottom: 26px; left: 50%; transform: translateX(-50%); width: 92%; background: #0F172A; border: 3px solid #10B981; border-radius: 20px; padding: 14px 24px; display: flex; align-items: center; justify-content: space-between; }
        .price { font-size: 38px; font-weight: 900; color: #10B981; font-family: 'Fredoka', sans-serif; }
        .btn { background: #10B981; color: #FFF; font-size: 24px; font-weight: 900; padding: 14px 28px; border-radius: 14px; text-transform: uppercase; }
      </style></head><body>
        <div class="top-container"><div class="tag">🔥 OFERTA COMPLETA DE LANÇAMENTO</div><div class="title">Leve o <span>Kit Completo dos Heróis</span> + 4 Bônus Exclusivos!</div></div>
        <div class="stack-stage">
          <img class="item-mockup" src="${screenDuolingoMapa}" />
          <img class="item-mockup" src="${pageBoss}" />
          <img class="center-hero" src="${capa}" />
          <img class="item-mockup" src="${pageWorksheet}" />
          <img class="item-mockup" src="${pageCert}" />
        </div>
        <div class="bottom-bar"><div><div style="color:#FBBF24;font-size:16px;font-weight:800;">DE R$ 97,00 POR APENAS</div><div class="price">R$ 19,90</div></div><div class="btn">GARANTIR TUDO AGORA 👉</div></div>
      </body></html>
    `,
    () => `
      <!DOCTYPE html><html><head><meta charset="UTF-8">${baseFonts}
      <style>
        body { width: 1080px; height: 1920px; background: radial-gradient(circle at 50% 20%, #1E1B4B 0%, #0F172A 70%, #030712 100%); color: #FFF; }
        .top-container { position: absolute; top: 120px; left: 50%; transform: translateX(-50%); width: 90%; text-align: center; }
        .tag { display: inline-block; background: #DC2626; color: #FFF; font-size: 26px; font-weight: 900; padding: 10px 30px; border-radius: 999px; text-transform: uppercase; margin-bottom: 16px; border: 3px solid #FFF; }
        .title { font-size: 46px; font-weight: 900; line-height: 1.25; }
        .title span { color: #FBBF24; }
        .stack-stage { position: absolute; top: 440px; left: 50%; transform: translateX(-50%); width: 920px; height: 600px; display: flex; align-items: center; justify-content: center; gap: 14px; }
        .item-mockup { width: 200px; border-radius: 14px; box-shadow: 0 20px 40px rgba(0,0,0,0.6); }
        .center-hero { width: 280px; border: 4px solid #F59E0B; border-radius: 16px; box-shadow: 0 30px 60px rgba(0,0,0,0.85), 0 0 35px rgba(245,158,11,0.45); transform: scale(1.15); z-index: 10; }
        .pills { position: absolute; bottom: 360px; left: 50%; transform: translateX(-50%); width: 900px; display: flex; flex-direction: column; gap: 12px; }
        .pill { background: rgba(30,41,59,0.9); border: 2px solid #F59E0B; border-radius: 16px; padding: 16px 24px; font-size: 22px; font-weight: 800; color: #FFF; text-align: center; }
        .bottom-bar { position: absolute; bottom: 80px; left: 50%; transform: translateX(-50%); width: 90%; background: #0F172A; border: 4px solid #10B981; border-radius: 26px; padding: 24px; text-align: center; }
        .price { font-size: 52px; font-weight: 900; color: #10B981; font-family: 'Fredoka', sans-serif; margin-bottom: 12px; }
        .btn { display: block; width: 100%; background: #10B981; color: #FFF; font-size: 32px; font-weight: 900; padding: 18px; border-radius: 16px; text-transform: uppercase; }
      </style></head><body>
        <div class="top-container"><div class="tag">🔥 OFERTA COMPLETA VIP</div><div class="title">Tudo o que seu filho precisa para <span>nunca mais chorar</span> com matemática!</div></div>
        <div class="stack-stage">
          <img class="item-mockup" src="${screenDuolingoMapa}" />
          <img class="item-mockup" src="${pageBoss}" />
          <img class="center-hero" src="${capa}" />
          <img class="item-mockup" src="${pageWorksheet}" />
          <img class="item-mockup" src="${pageCert}" />
        </div>
        <div class="pills">
          <div class="pill">✅ Livro 43 Páginas + App Gamificado Duolingo</div>
          <div class="pill">✅ Desafio Diário dos 15 Minutos + Certificado Oficial</div>
        </div>
        <div class="bottom-bar"><div class="price"><span style="font-size:26px;color:#94A3B8;text-decoration:line-through;margin-right:12px;">De R$ 97</span> R$ 19,90</div><div class="btn">👉 ARRASTE PARA BAIXAR</div></div>
      </body></html>
    `
  );

  await browser.close();
  console.log('TODOS OS CRIATIVOS FORAM RENDERIZADOS COM SUCESSO!');
}

buildFullArsenal().catch(err => {
  console.error('Erro na renderização do arsenal:', err);
  process.exit(1);
});
