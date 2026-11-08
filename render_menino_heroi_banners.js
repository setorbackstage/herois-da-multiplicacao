const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

async function renderMeninoHeroiAds() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  
  // Imagens 2K salvas
  const imgFeedPath = path.resolve(__dirname, 'tabuada-assets', 'ad_criativo_01_menino_heroi_feed_2k.jpg');
  const imgStoriesPath = path.resolve(__dirname, 'tabuada-assets', 'ad_criativo_01_menino_heroi_stories_2k.jpg');

  const base64Feed = fs.readFileSync(imgFeedPath).toString('base64');
  const base64Stories = fs.readFileSync(imgStoriesPath).toString('base64');

  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // 1. Render Stories / Reels (1080x1920)
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
          background: #0f172a;
          position: relative;
          font-family: 'Nunito', sans-serif;
          overflow: hidden;
        }
        .bg-img {
          width: 100%; height: 100%;
          object-fit: cover;
          position: absolute; top: 0; left: 0;
        }
        .top-badge-container {
          position: absolute;
          top: 130px;
          left: 50%;
          transform: translateX(-50%);
          width: 90%;
          z-index: 10;
        }
        .headline-card {
          background: rgba(255, 255, 255, 0.96);
          border: 4px solid #F59E0B;
          border-radius: 28px;
          padding: 26px 34px;
          box-shadow: 0 16px 40px rgba(0,0,0,0.3);
          text-align: center;
        }
        .headline-tag {
          display: inline-block;
          background: #FEF3C7;
          color: #B45309;
          font-size: 26px;
          font-weight: 900;
          padding: 8px 22px;
          border-radius: 999px;
          margin-bottom: 14px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .headline-title {
          font-size: 42px;
          font-weight: 900;
          color: #1E1B4B;
          line-height: 1.22;
        }
        .headline-title span {
          color: #2563EB;
          text-decoration: underline wavy #F59E0B;
        }
        .headline-subtitle {
          font-size: 28px;
          font-weight: 700;
          color: #475569;
          margin-top: 10px;
        }
        .bottom-cta-container {
          position: absolute;
          bottom: 120px;
          left: 50%;
          transform: translateX(-50%);
          width: 90%;
          z-index: 10;
        }
        .cta-card {
          background: linear-gradient(135deg, #1E1B4B 0%, #312E81 100%);
          border: 4px solid #F59E0B;
          border-radius: 28px;
          padding: 30px;
          box-shadow: 0 20px 50px rgba(0,0,0,0.5);
          text-align: center;
          color: #FFF;
        }
        .cta-highlight {
          color: #FBBF24;
          font-size: 30px;
          font-weight: 900;
          text-transform: uppercase;
          margin-bottom: 6px;
        }
        .cta-price-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          margin: 12px 0 20px;
        }
        .price-from {
          font-size: 26px;
          color: #94A3B8;
          text-decoration: line-through;
        }
        .price-to {
          font-size: 52px;
          font-weight: 900;
          color: #10B981;
          font-family: 'Fredoka', sans-serif;
        }
        .cta-button {
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
      <img class="bg-img" src="data:image/jpeg;base64,${base64Stories}" />
      
      <div class="top-badge-container">
        <div class="headline-card">
          <div class="headline-tag">🦸 MISSÃO TABUADA DOS HERÓIS</div>
          <div class="headline-title">Chega de choro na hora do dever de matemática!</div>
          <div class="headline-subtitle">Apenas 15 min por dia para destravar a tabuada brincando.</div>
        </div>
      </div>

      <div class="bottom-cta-container">
        <div class="cta-card">
          <div class="cta-highlight">⚡ LIVRO COMPLETO EM PDF + BÔNUS</div>
          <div class="cta-price-row">
            <span class="price-from">De R$ 47,00</span>
            <span class="price-to">R$ 19,90</span>
          </div>
          <div class="cta-button">👉 ARRASTE PARA BAIXAR</div>
        </div>
      </div>
    </body>
    </html>
  `;

  await page.setContent(htmlStories, { waitUntil: 'domcontentloaded' });
  const storiesOutputPath = path.resolve(__dirname, 'midias', 'anuncios_prontos', 'ad_criativo_01_menino_heroi_stories.png');
  await page.screenshot({ path: storiesOutputPath, type: 'png' });
  console.log('Stories Ad Rendered:', storiesOutputPath);

  // 2. Render Feed (1080x1080)
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
          background: #0f172a;
          position: relative;
          font-family: 'Nunito', sans-serif;
          overflow: hidden;
        }
        .bg-img {
          width: 100%; height: 100%;
          object-fit: cover;
          position: absolute; top: 0; left: 0;
        }
        .top-badge-container {
          position: absolute;
          top: 36px;
          left: 50%;
          transform: translateX(-50%);
          width: 92%;
          z-index: 10;
        }
        .headline-card {
          background: rgba(255, 255, 255, 0.96);
          border: 4px solid #2563EB;
          border-radius: 22px;
          padding: 18px 26px;
          box-shadow: 0 12px 30px rgba(0,0,0,0.25);
          text-align: center;
        }
        .headline-tag {
          display: inline-block;
          background: #EFF6FF;
          color: #1D4ED8;
          font-size: 20px;
          font-weight: 900;
          padding: 5px 18px;
          border-radius: 999px;
          margin-bottom: 8px;
          text-transform: uppercase;
        }
        .headline-title {
          font-size: 34px;
          font-weight: 900;
          color: #1E1B4B;
          line-height: 1.22;
        }
        .headline-title span {
          color: #2563EB;
        }
        .bottom-cta-container {
          position: absolute;
          bottom: 36px;
          left: 50%;
          transform: translateX(-50%);
          width: 92%;
          z-index: 10;
        }
        .cta-card {
          background: rgba(15, 23, 42, 0.95);
          border: 3px solid #F59E0B;
          border-radius: 20px;
          padding: 14px 24px;
          box-shadow: 0 14px 35px rgba(0,0,0,0.45);
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: #FFF;
        }
        .cta-info {
          text-align: left;
        }
        .cta-label {
          color: #FBBF24;
          font-size: 18px;
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
      <img class="bg-img" src="data:image/jpeg;base64,${base64Feed}" />
      
      <div class="top-badge-container">
        <div class="headline-card">
          <div class="headline-tag">🦸 MÉTODO DOS HERÓIS DA MULTIPLICAÇÃO</div>
          <div class="headline-title">O fim do sofrimento com a tabuada em <span>15 minutos por dia</span>!</div>
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
  const feedOutputPath = path.resolve(__dirname, 'midias', 'anuncios_prontos', 'ad_criativo_01_menino_heroi_feed.png');
  await page.screenshot({ path: feedOutputPath, type: 'png' });
  console.log('Feed Ad Rendered:', feedOutputPath);

  await browser.close();
  console.log('Finished rendering both banners successfully!');
}

renderMeninoHeroiAds().catch(err => {
  console.error('Error rendering ads:', err);
  process.exit(1);
});
