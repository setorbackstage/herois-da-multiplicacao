const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

async function renderAds() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const imgPath = path.resolve(__dirname, 'tabuada-assets', 'ugc_mae_missao_tabuada_nanobanana.jpg');
  const base64Img = fs.readFileSync(imgPath).toString('base64');
  const imgSrc = `data:image/jpeg;base64,${base64Img}`;

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
          background: #000;
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
          border: 4px solid #713D9D;
          border-radius: 28px;
          padding: 26px 34px;
          box-shadow: 0 16px 40px rgba(0,0,0,0.25);
          text-align: center;
        }
        .headline-tag {
          display: inline-block;
          background: #DCFCE7;
          color: #15803D;
          font-size: 26px;
          font-weight: 900;
          padding: 8px 22px;
          border-radius: 999px;
          margin-bottom: 14px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .headline-title {
          font-size: 44px;
          line-height: 1.25;
          font-weight: 900;
          color: #1E293B;
        }
        .headline-title span {
          color: #713D9D;
        }
        .bottom-cta-container {
          position: absolute;
          bottom: 140px;
          left: 50%;
          transform: translateX(-50%);
          width: 90%;
          z-index: 10;
        }
        .cta-box {
          background: linear-gradient(135deg, #16A34A 0%, #15803D 100%);
          border-radius: 26px;
          padding: 22px 30px;
          box-shadow: 0 16px 36px rgba(22, 163, 74, 0.4);
          display: flex;
          align-items: center;
          justify-content: space-between;
          border: 3px solid #86EFAC;
        }
        .cta-text {
          color: #FFF;
        }
        .cta-price {
          font-size: 26px;
          font-weight: 700;
          opacity: 0.9;
        }
        .cta-value {
          font-size: 46px;
          font-weight: 900;
          font-family: 'Fredoka', sans-serif;
          color: #FEF08A;
        }
        .cta-btn {
          background: #FFFFFF;
          color: #15803D;
          font-size: 30px;
          font-weight: 900;
          padding: 16px 34px;
          border-radius: 18px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          box-shadow: 0 6px 16px rgba(0,0,0,0.15);
        }
      </style>
    </head>
    <body>
      <img src="${imgSrc}" class="bg-img">
      
      <div class="top-badge-container">
        <div class="headline-card">
          <div class="headline-tag">⭐ Relato de Mãe Real</div>
          <div class="headline-title">"Economizei <span>R$ 400 de reforço</span> com 15 minutinhos por dia!"</div>
        </div>
      </div>

      <div class="bottom-cta-container">
        <div class="cta-box">
          <div class="cta-text">
            <div class="cta-price">Livro em PDF + Desafios</div>
            <div class="cta-value">Por apenas R$ 10,00</div>
          </div>
          <div class="cta-btn">Baixar Agora ➔</div>
        </div>
      </div>
    </body>
    </html>
  `;

  await page.setContent(htmlStories, { waitUntil: 'domcontentloaded' });
  const outDir = path.resolve(__dirname, 'midias', 'anuncios_prontos');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const storiesPath = path.join(outDir, 'ad_nanobanana_mae_ugc_stories_1080x1920.png');
  await page.screenshot({ path: storiesPath, type: 'png' });
  console.log('Saved stories ad:', storiesPath);

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
          background: #000;
          position: relative;
          font-family: 'Nunito', sans-serif;
          overflow: hidden;
        }
        .bg-img {
          width: 100%; height: 100%;
          object-fit: cover;
          object-position: center 25%;
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
          border: 3px solid #713D9D;
          border-radius: 20px;
          padding: 16px 26px;
          box-shadow: 0 12px 30px rgba(0,0,0,0.22);
          text-align: center;
        }
        .headline-title {
          font-size: 34px;
          line-height: 1.25;
          font-weight: 900;
          color: #1E293B;
        }
        .headline-title span {
          color: #713D9D;
        }
        .bottom-cta-container {
          position: absolute;
          bottom: 36px;
          left: 50%;
          transform: translateX(-50%);
          width: 92%;
          z-index: 10;
        }
        .cta-box {
          background: linear-gradient(135deg, #16A34A 0%, #15803D 100%);
          border-radius: 20px;
          padding: 16px 24px;
          box-shadow: 0 12px 30px rgba(22, 163, 74, 0.4);
          display: flex;
          align-items: center;
          justify-content: space-between;
          border: 2px solid #86EFAC;
        }
        .cta-text {
          color: #FFF;
        }
        .cta-price {
          font-size: 19px;
          font-weight: 700;
          opacity: 0.9;
        }
        .cta-value {
          font-size: 36px;
          font-weight: 900;
          font-family: 'Fredoka', sans-serif;
          color: #FEF08A;
        }
        .cta-btn {
          background: #FFFFFF;
          color: #15803D;
          font-size: 22px;
          font-weight: 900;
          padding: 12px 26px;
          border-radius: 14px;
          text-transform: uppercase;
        }
      </style>
    </head>
    <body>
      <img src="${imgSrc}" class="bg-img">
      
      <div class="top-badge-container">
        <div class="headline-card">
          <div class="headline-title">"Economizei <span>R$ 400 de reforço</span> com 15 min por dia!"</div>
        </div>
      </div>

      <div class="bottom-cta-container">
        <div class="cta-box">
          <div class="cta-text">
            <div class="cta-price">43 Págs em PDF + Jogos</div>
            <div class="cta-value">Apenas R$ 10,00</div>
          </div>
          <div class="cta-btn">Baixar Agora ➔</div>
        </div>
      </div>
    </body>
    </html>
  `;

  await page.setContent(htmlFeed, { waitUntil: 'domcontentloaded' });
  const feedPath = path.join(outDir, 'ad_nanobanana_mae_ugc_feed_1080x1080.png');
  await page.screenshot({ path: feedPath, type: 'png' });
  console.log('Saved feed ad:', feedPath);

  await browser.close();
  console.log('Done rendering both ads!');
}

renderAds().catch(err => console.error(err));
