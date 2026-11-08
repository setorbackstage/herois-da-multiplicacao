const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

async function renderShowroomStack() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  
  const assetsDir = path.resolve(__dirname, 'tabuada-assets');
  
  function getBase64(filename) {
    const filePath = path.join(assetsDir, filename);
    return `data:image/png;base64,${fs.readFileSync(filePath).toString('base64')}`;
  }
  function getBase64Jpg(filename) {
    const filePath = path.join(assetsDir, filename);
    return `data:image/jpeg;base64,${fs.readFileSync(filePath).toString('base64')}`;
  }

  const capa = getBase64Jpg('capa-missao-tabuada.jpg');
  const pageWorksheet = getBase64('preview_clean_p4_worksheetA.png');
  const pageBoss = getBase64('preview_clean_p6_bossC.png');
  const pageCert = getBase64('preview_clean_p43_certificate.png');
  const pageTracker = getBase64('preview_clean_p3_tracker.png');
  const mascot = getBase64('heroi-menino-oficial.png');

  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // 1. Stories / Reels (1080x1920)
  await page.setViewport({ width: 1080, height: 1920 });
  const htmlStories = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@700;800;900&family=Fredoka:wght@600;700&display=swap" rel="stylesheet">
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
          width: 1080px; height: 1920px;
          background: radial-gradient(circle at 50% 30%, #1E1B4B 0%, #0F172A 70%, #030712 100%);
          position: relative;
          font-family: 'Nunito', sans-serif;
          overflow: hidden;
          color: #FFF;
        }

        /* Top Header */
        .top-container {
          position: absolute;
          top: 100px;
          left: 50%;
          transform: translateX(-50%);
          width: 90%;
          text-align: center;
          z-index: 20;
        }
        .top-badge {
          display: inline-block;
          background: #FEF3C7;
          color: #B45309;
          font-size: 26px;
          font-weight: 900;
          padding: 10px 28px;
          border-radius: 999px;
          text-transform: uppercase;
          margin-bottom: 18px;
          border: 2px solid #F59E0B;
        }
        .main-title {
          font-size: 46px;
          font-weight: 900;
          line-height: 1.2;
          color: #FFF;
          text-shadow: 0 4px 15px rgba(0,0,0,0.6);
        }
        .main-title span {
          color: #FBBF24;
        }
        .subtitle {
          font-size: 26px;
          font-weight: 700;
          color: #94A3B8;
          margin-top: 12px;
        }

        /* 3D Stack Mockup */
        .stack-stage {
          position: absolute;
          top: 480px;
          left: 50%;
          transform: translateX(-50%);
          width: 1000px;
          height: 650px;
          z-index: 10;
          perspective: 1200px;
        }
        .sheet {
          position: absolute;
          width: 340px;
          border-radius: 14px;
          background: #FFF;
          box-shadow: 0 20px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.2);
          transition: transform 0.3s;
        }
        .sheet-left2 {
          left: 40px;
          top: 60px;
          transform: rotate(-14deg) scale(0.9);
          z-index: 2;
          opacity: 0.9;
        }
        .sheet-left1 {
          left: 170px;
          top: 30px;
          transform: rotate(-7deg) scale(0.95);
          z-index: 3;
        }
        .book-cover-main {
          left: 310px;
          top: 0;
          width: 380px;
          z-index: 10;
          transform: rotate(0deg) scale(1.05);
          box-shadow: 0 30px 60px rgba(0,0,0,0.8), 0 0 30px rgba(245, 158, 11, 0.3);
          border: 4px solid #F59E0B;
        }
        .sheet-right1 {
          left: 480px;
          top: 30px;
          transform: rotate(7deg) scale(0.95);
          z-index: 3;
        }
        .sheet-right2 {
          left: 610px;
          top: 60px;
          transform: rotate(14deg) scale(0.9);
          z-index: 2;
          border: 3px solid #FBBF24;
        }

        /* Mascot cutout */
        .mascot-container {
          position: absolute;
          bottom: 480px;
          right: 30px;
          width: 250px;
          z-index: 25;
          filter: drop-shadow(0 15px 25px rgba(0,0,0,0.7));
        }

        /* Benefit Bullets Cards */
        .features-container {
          position: absolute;
          top: 1160px;
          left: 50%;
          transform: translateX(-50%);
          width: 90%;
          z-index: 20;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .feature-item {
          background: rgba(30, 41, 59, 0.85);
          backdrop-filter: blur(10px);
          border: 2px solid rgba(245, 158, 11, 0.4);
          border-radius: 20px;
          padding: 16px 24px;
          display: flex;
          align-items: center;
          gap: 18px;
        }
        .feature-icon {
          font-size: 36px;
          background: #1E1B4B;
          width: 60px;
          height: 60px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid #F59E0B;
        }
        .feature-text h4 {
          font-size: 26px;
          font-weight: 900;
          color: #FFF;
        }
        .feature-text p {
          font-size: 20px;
          font-weight: 700;
          color: #94A3B8;
        }

        /* Bottom CTA */
        .bottom-cta-container {
          position: absolute;
          bottom: 90px;
          left: 50%;
          transform: translateX(-50%);
          width: 90%;
          z-index: 30;
        }
        .cta-card {
          background: linear-gradient(135deg, #1E1B4B 0%, #312E81 100%);
          border: 4px solid #10B981;
          border-radius: 28px;
          padding: 26px 30px;
          box-shadow: 0 20px 50px rgba(0,0,0,0.6);
          text-align: center;
        }
        .cta-price-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          margin-bottom: 16px;
        }
        .price-from {
          font-size: 26px;
          color: #94A3B8;
          text-decoration: line-through;
        }
        .price-to {
          font-size: 54px;
          font-weight: 900;
          color: #10B981;
          font-family: 'Fredoka', sans-serif;
        }
        .cta-btn {
          display: block;
          width: 100%;
          background: linear-gradient(180deg, #10B981 0%, #059669 100%);
          color: #FFF;
          font-size: 34px;
          font-weight: 900;
          padding: 20px;
          border-radius: 18px;
          text-transform: uppercase;
          box-shadow: 0 10px 24px rgba(16, 185, 129, 0.4);
          letter-spacing: 1px;
        }
      </style>
    </head>
    <body>
      <div class="top-container">
        <div class="top-badge">📦 O QUE VEM NO SEU KIT COMPLETO</div>
        <div class="main-title">Livro Oficial dos <span>Heróis da Multiplicação</span></div>
        <div class="subtitle">PDF completo para imprimir quantas vezes quiser!</div>
      </div>

      <div class="stack-stage">
        <img class="sheet sheet-left2" src="${pageWorksheet}" />
        <img class="sheet sheet-left1" src="${pageBoss}" />
        <img class="sheet book-cover-main" src="${capa}" />
        <img class="sheet sheet-right1" src="${pageTracker}" />
        <img class="sheet sheet-right2" src="${pageCert}" />
      </div>

      <img class="mascot-container" src="${mascot}" />

      <div class="features-container">
        <div class="feature-item">
          <div class="feature-icon">📚</div>
          <div class="feature-text">
            <h4>Livro Digital com 43 Páginas</h4>
            <p>Atividades ilustradas do 1 ao 10 com os heróis.</p>
          </div>
        </div>
        <div class="feature-item">
          <div class="feature-icon">⏱️</div>
          <div class="feature-text">
            <h4>Desafio Diário dos 15 Minutos</h4>
            <p>Método rápido que destrava o aprendizado sem cansaço.</p>
          </div>
        </div>
        <div class="feature-item">
          <div class="feature-icon">🏆</div>
          <div class="feature-text">
            <h4>Certificado Oficial de Herói da Tabuada</h4>
            <p>Para premiar seu filho e celebrar a conquista!</p>
          </div>
        </div>
      </div>

      <div class="bottom-cta-container">
        <div class="cta-card">
          <div class="cta-price-row">
            <span class="price-from">De R$ 47,00</span>
            <span class="price-to">R$ 19,90</span>
          </div>
          <div class="cta-btn">👉 BAIXAR O KIT COMPLETO</div>
        </div>
      </div>
    </body>
    </html>
  `;

  await page.setContent(htmlStories, { waitUntil: 'domcontentloaded' });
  const storiesOutputPath = path.resolve(__dirname, 'midias', 'anuncios_prontos', 'ad_criativo_04_showroom_stack_stories.png');
  await page.screenshot({ path: storiesOutputPath, type: 'png' });
  console.log('Showroom Stack Stories Rendered:', storiesOutputPath);

  // 2. Feed (1080x1080)
  await page.setViewport({ width: 1080, height: 1080 });
  const htmlFeed = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@700;800;900&family=Fredoka:wght@600;700&display=swap" rel="stylesheet">
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
          width: 1080px; height: 1080px;
          background: radial-gradient(circle at 50% 30%, #1E1B4B 0%, #0F172A 70%, #030712 100%);
          position: relative;
          font-family: 'Nunito', sans-serif;
          overflow: hidden;
          color: #FFF;
        }

        .top-container {
          position: absolute;
          top: 36px;
          left: 50%;
          transform: translateX(-50%);
          width: 92%;
          text-align: center;
          z-index: 20;
        }
        .top-badge {
          display: inline-block;
          background: #FEF3C7;
          color: #B45309;
          font-size: 20px;
          font-weight: 900;
          padding: 6px 20px;
          border-radius: 999px;
          text-transform: uppercase;
          margin-bottom: 8px;
          border: 2px solid #F59E0B;
        }
        .main-title {
          font-size: 38px;
          font-weight: 900;
          line-height: 1.2;
          color: #FFF;
        }
        .main-title span {
          color: #FBBF24;
        }

        /* 3D Stack Mockup Feed */
        .stack-stage {
          position: absolute;
          top: 170px;
          left: 50%;
          transform: translateX(-50%);
          width: 1000px;
          height: 480px;
          z-index: 10;
        }
        .sheet {
          position: absolute;
          width: 290px;
          border-radius: 12px;
          background: #FFF;
          box-shadow: 0 16px 36px rgba(0,0,0,0.6);
        }
        .sheet-left2 {
          left: 60px;
          top: 40px;
          transform: rotate(-14deg) scale(0.9);
          z-index: 2;
          opacity: 0.9;
        }
        .sheet-left1 {
          left: 190px;
          top: 20px;
          transform: rotate(-7deg) scale(0.95);
          z-index: 3;
        }
        .book-cover-main {
          left: 330px;
          top: 0;
          width: 340px;
          z-index: 10;
          transform: rotate(0deg) scale(1.05);
          box-shadow: 0 25px 50px rgba(0,0,0,0.8), 0 0 25px rgba(245, 158, 11, 0.3);
          border: 4px solid #F59E0B;
        }
        .sheet-right1 {
          left: 480px;
          top: 20px;
          transform: rotate(7deg) scale(0.95);
          z-index: 3;
        }
        .sheet-right2 {
          left: 610px;
          top: 40px;
          transform: rotate(14deg) scale(0.9);
          z-index: 2;
          border: 3px solid #FBBF24;
        }

        /* Mascot */
        .mascot-container {
          position: absolute;
          top: 550px;
          left: 40px;
          width: 200px;
          z-index: 25;
          filter: drop-shadow(0 10px 20px rgba(0,0,0,0.7));
        }

        /* Pills row */
        .pills-container {
          position: absolute;
          top: 670px;
          left: 260px;
          right: 40px;
          z-index: 20;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        .pill-item {
          background: rgba(30, 41, 59, 0.85);
          border: 2px solid rgba(245, 158, 11, 0.35);
          border-radius: 14px;
          padding: 12px 16px;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .pill-icon {
          font-size: 24px;
        }
        .pill-text {
          font-size: 17px;
          font-weight: 800;
          color: #F1F5F9;
        }

        /* Bottom Bar */
        .bottom-cta-container {
          position: absolute;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%);
          width: 92%;
          z-index: 30;
        }
        .cta-card {
          background: rgba(15, 23, 42, 0.95);
          border: 3px solid #10B981;
          border-radius: 20px;
          padding: 14px 24px;
          box-shadow: 0 14px 35px rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .cta-info {
          text-align: left;
        }
        .cta-label {
          color: #FBBF24;
          font-size: 17px;
          font-weight: 800;
          text-transform: uppercase;
        }
        .cta-price-row {
          display: flex;
          align-items: baseline;
          gap: 10px;
        }
        .price-from {
          font-size: 19px;
          color: #94A3B8;
          text-decoration: line-through;
        }
        .price-to {
          font-size: 38px;
          font-weight: 900;
          color: #10B981;
          font-family: 'Fredoka', sans-serif;
        }
        .cta-btn {
          background: linear-gradient(180deg, #10B981 0%, #059669 100%);
          color: #FFF;
          font-size: 24px;
          font-weight: 900;
          padding: 14px 28px;
          border-radius: 14px;
          text-transform: uppercase;
          box-shadow: 0 8px 18px rgba(16, 185, 129, 0.35);
        }
      </style>
    </head>
    <body>
      <div class="top-container">
        <div class="top-badge">📦 O QUE VEM NO SEU KIT COMPLETO</div>
        <div class="main-title">Apostila Oficial dos <span>Heróis da Multiplicação</span></div>
      </div>

      <div class="stack-stage">
        <img class="sheet sheet-left2" src="${pageWorksheet}" />
        <img class="sheet sheet-left1" src="${pageBoss}" />
        <img class="sheet book-cover-main" src="${capa}" />
        <img class="sheet sheet-right1" src="${pageTracker}" />
        <img class="sheet sheet-right2" src="${pageCert}" />
      </div>

      <img class="mascot-container" src="${mascot}" />

      <div class="pills-container">
        <div class="pill-item">
          <span class="pill-icon">📚</span>
          <span class="pill-text">43 Páginas Coloridas</span>
        </div>
        <div class="pill-item">
          <span class="pill-icon">⏱️</span>
          <span class="pill-text">15 Minutos Diários</span>
        </div>
        <div class="pill-item">
          <span class="pill-icon">🎮</span>
          <span class="pill-text">Batalhas Gamificadas</span>
        </div>
        <div class="pill-item">
          <span class="pill-icon">🏆</span>
          <span class="pill-text">Certificado Oficial</span>
        </div>
      </div>

      <div class="bottom-cta-container">
        <div class="cta-card">
          <div class="cta-info">
            <div class="cta-label">⚡ Livro Digital (PDF) Pronto para Imprimir</div>
            <div class="cta-price-row">
              <span class="price-from">R$ 47,00</span>
              <span class="price-to">R$ 19,90</span>
            </div>
          </div>
          <div class="cta-btn">QUERO BAIXAR</div>
        </div>
      </div>
    </body>
    </html>
  `;

  await page.setContent(htmlFeed, { waitUntil: 'domcontentloaded' });
  const feedOutputPath = path.resolve(__dirname, 'midias', 'anuncios_prontos', 'ad_criativo_04_showroom_stack_feed.png');
  await page.screenshot({ path: feedOutputPath, type: 'png' });
  console.log('Showroom Stack Feed Rendered:', feedOutputPath);

  await browser.close();
  console.log('Finished rendering Showroom Stack master!');
}

renderShowroomStack().catch(err => {
  console.error('Error rendering stack:', err);
  process.exit(1);
});
