const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const outputDir = path.resolve(__dirname, 'midias', 'anuncios_prontos');
const artifactsDir = "C:\\Users\\setor\\.gemini\\antigravity\\brain\\0a97aaa4-d5c1-4b52-af01-b5d50191a11e";

const photoFeed = path.resolve(__dirname, 'midias', 'foto_menino_segurando_livro_2k.jpg').replace(/\\/g, '/');
const photoStories = path.resolve(__dirname, 'midias', 'foto_menino_estudando_vertical_2k.jpg').replace(/\\/g, '/');

async function render2kCreatives() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // 1. AD 2K FEED (1080x1080)
  console.log('Rendering 2K Photo Feed Creative (1080x1080)...');
  await page.setViewport({ width: 1080, height: 1080, deviceScaleFactor: 1 });
  
  const htmlFeed = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@600;700;800;900&family=Plus+Jakarta+Sans:wght@700;800;900&display=swap" rel="stylesheet">
    <style>
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body {
        width: 1080px; height: 1080px;
        position: relative;
        overflow: hidden;
        font-family: 'Plus Jakarta Sans', sans-serif;
        background: #000;
      }
      .bg-img {
        width: 100%; height: 100%;
        object-fit: cover;
        position: absolute;
        top: 0; left: 0;
      }
      .gradient-top {
        position: absolute;
        top: 0; left: 0; right: 0; height: 380px;
        background: linear-gradient(180deg, rgba(15,23,42,0.92) 0%, rgba(15,23,42,0.6) 60%, rgba(15,23,42,0) 100%);
      }
      .gradient-bottom {
        position: absolute;
        bottom: 0; left: 0; right: 0; height: 340px;
        background: linear-gradient(0deg, rgba(15,23,42,0.95) 0%, rgba(15,23,42,0.7) 60%, rgba(15,23,42,0) 100%);
      }
      .header-badge {
        position: absolute;
        top: 48px; left: 54px;
        background: #FEF08A;
        border: 3px solid #EAB308;
        color: #713F12;
        padding: 10px 24px;
        border-radius: 999px;
        font-size: 20px;
        font-weight: 900;
        letter-spacing: 0.5px;
        display: flex;
        align-items: center;
        gap: 10px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.3);
      }
      .header-title {
        position: absolute;
        top: 120px; left: 54px; right: 54px;
        color: #FFFFFF;
        font-family: 'Fredoka', sans-serif;
        font-size: 50px;
        font-weight: 800;
        line-height: 1.15;
        text-shadow: 0 4px 18px rgba(0,0,0,0.8);
      }
      .header-title span {
        color: #FACC15;
      }
      .bottom-bar {
        position: absolute;
        bottom: 48px; left: 54px; right: 54px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .price-box {
        display: flex;
        flex-direction: column;
      }
      .price-old {
        color: #94A3B8;
        font-size: 22px;
        text-decoration: line-through;
        font-weight: 700;
      }
      .price-current {
        color: #FFFFFF;
        font-family: 'Fredoka', sans-serif;
        font-size: 48px;
        font-weight: 800;
      }
      .price-current span {
        color: #4ADE80;
      }
      .cta-btn {
        background: linear-gradient(135deg, #22C55E 0%, #16A34A 100%);
        border: none;
        color: #FFFFFF;
        font-family: 'Fredoka', sans-serif;
        font-size: 28px;
        font-weight: 800;
        padding: 20px 42px;
        border-radius: 20px;
        box-shadow: 0 12px 30px rgba(34, 197, 94, 0.45);
        display: flex;
        align-items: center;
        gap: 12px;
      }
      .floating-tag {
        position: absolute;
        bottom: 160px; left: 54px;
        background: rgba(15, 23, 42, 0.85);
        backdrop-filter: blur(8px);
        border: 2px solid rgba(255,255,255,0.15);
        padding: 10px 22px;
        border-radius: 999px;
        color: #E2E8F0;
        font-size: 20px;
        font-weight: 700;
      }
    </style>
  </head>
  <body>
    <img src="file:///${photoFeed}" class="bg-img">
    <div class="gradient-top"></div>
    <div class="gradient-bottom"></div>

    <div class="header-badge">
      <span>⭐</span> MÉTODO COMPROVADO PARA CRIANÇAS DE 7 A 10 ANOS
    </div>

    <h1 class="header-title">
      Seu filho travou na Tabuada? Transforme o estudo em <span>Missão de Super-Herói!</span>
    </h1>

    <div class="floating-tag">
      🎮 Livro Digital + Webapp Interativo estilo Duolingo
    </div>

    <div class="bottom-bar">
      <div class="price-box">
        <span class="price-old">De R$ 67,00 por</span>
        <span class="price-current">Apenas <span>R$ 19,90</span></span>
      </div>
      <div class="cta-btn">
        QUERO MEU FILHO CRAQUE ➔
      </div>
    </div>
  </body>
  </html>
  `;

  await page.setContent(htmlFeed);
  await new Promise(r => setTimeout(r, 600));
  const feedOut = path.join(outputDir, 'ad_criativo_01_menino_heroi_2k_feed.png');
  await page.screenshot({ path: feedOut });
  fs.copyFileSync(feedOut, path.join(artifactsDir, 'ad_criativo_01_menino_heroi_2k_feed.png'));
  console.log('Saved:', feedOut);

  // 2. AD 2K STORIES (1080x1920)
  console.log('Rendering 2K Photo Stories Creative (1080x1920)...');
  await page.setViewport({ width: 1080, height: 1920, deviceScaleFactor: 1 });

  const htmlStories = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@600;700;800;900&family=Plus+Jakarta+Sans:wght@700;800;900&display=swap" rel="stylesheet">
    <style>
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body {
        width: 1080px; height: 1920px;
        position: relative;
        overflow: hidden;
        font-family: 'Plus Jakarta Sans', sans-serif;
        background: #000;
      }
      .bg-img {
        width: 100%; height: 100%;
        object-fit: cover;
        position: absolute;
        top: 0; left: 0;
      }
      .gradient-top {
        position: absolute;
        top: 0; left: 0; right: 0; height: 550px;
        background: linear-gradient(180deg, rgba(15,23,42,0.95) 0%, rgba(15,23,42,0.7) 60%, rgba(15,23,42,0) 100%);
      }
      .gradient-bottom {
        position: absolute;
        bottom: 0; left: 0; right: 0; height: 500px;
        background: linear-gradient(0deg, rgba(15,23,42,0.95) 0%, rgba(15,23,42,0.7) 60%, rgba(15,23,42,0) 100%);
      }
      .header-box {
        position: absolute;
        top: 100px; left: 60px; right: 60px;
      }
      .badge {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        background: #FEF08A;
        border: 3px solid #EAB308;
        color: #713F12;
        padding: 12px 28px;
        border-radius: 999px;
        font-size: 22px;
        font-weight: 900;
        margin-bottom: 24px;
      }
      .headline {
        color: #FFFFFF;
        font-family: 'Fredoka', sans-serif;
        font-size: 64px;
        font-weight: 800;
        line-height: 1.12;
        text-shadow: 0 4px 20px rgba(0,0,0,0.8);
      }
      .headline span { color: #FACC15; }
      .subhead {
        margin-top: 16px;
        color: #E2E8F0;
        font-size: 26px;
        font-weight: 600;
        line-height: 1.4;
      }
      .bottom-box {
        position: absolute;
        bottom: 110px; left: 60px; right: 60px;
        display: flex;
        flex-direction: column;
        gap: 20px;
      }
      .features-row {
        display: flex;
        gap: 14px;
      }
      .feature-tag {
        background: rgba(15, 23, 42, 0.85);
        backdrop-filter: blur(10px);
        border: 2px solid rgba(255,255,255,0.2);
        padding: 12px 20px;
        border-radius: 16px;
        color: #FFFFFF;
        font-size: 22px;
        font-weight: 800;
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .cta-card {
        background: #FFFFFF;
        border-radius: 28px;
        padding: 24px 32px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-shadow: 0 20px 40px rgba(0,0,0,0.5);
      }
      .cta-info {
        display: flex;
        flex-direction: column;
      }
      .cta-preco-de {
        color: #64748B;
        font-size: 20px;
        text-decoration: line-through;
        font-weight: 700;
      }
      .cta-preco-por {
        font-family: 'Fredoka', sans-serif;
        color: #0F172A;
        font-size: 42px;
        font-weight: 900;
      }
      .cta-preco-por span {
        color: #16A34A;
      }
      .cta-button {
        background: linear-gradient(135deg, #22C55E 0%, #16A34A 100%);
        color: #FFFFFF;
        font-family: 'Fredoka', sans-serif;
        font-size: 28px;
        font-weight: 900;
        padding: 18px 36px;
        border-radius: 20px;
        box-shadow: 0 10px 25px rgba(34, 197, 94, 0.4);
      }
    </style>
  </head>
  <body>
    <img src="file:///${photoStories}" class="bg-img">
    <div class="gradient-top"></div>
    <div class="gradient-bottom"></div>

    <div class="header-box">
      <div class="badge">
        <span>⚡</span> APENAS 15 MINUTOS POR DIA
      </div>
      <h1 class="headline">
        Adeus choro na hora do dever de casa! <span>Ele aprendeu rindo.</span>
      </h1>
      <p class="subhead">
        Método lúdico gamificado com livro digital ilustrado + aplicativo interativo no celular.
      </p>
    </div>

    <div class="bottom-box">
      <div class="features-row">
        <div class="feature-tag">📚 Livro Digital em PDF</div>
        <div class="feature-tag">📱 App Estilo Duolingo</div>
      </div>
      <div class="cta-card">
        <div class="cta-info">
          <span class="cta-preco-de">De R$ 67,00</span>
          <span class="cta-preco-por">Por apenas <span>R$ 19,90</span></span>
        </div>
        <div class="cta-button">
          COMEÇAR AGORA ➔
        </div>
      </div>
    </div>
  </body>
  </html>
  `;

  await page.setContent(htmlStories);
  await new Promise(r => setTimeout(r, 600));
  const storiesOut = path.join(outputDir, 'ad_criativo_01_menino_heroi_2k_stories.png');
  await page.screenshot({ path: storiesOut });
  fs.copyFileSync(storiesOut, path.join(artifactsDir, 'ad_criativo_01_menino_heroi_2k_stories.png'));
  console.log('Saved:', storiesOut);

  await browser.close();
  console.log('All 2K creatives generated successfully!');
}

render2kCreatives().catch(err => {
  console.error(err);
  process.exit(1);
});
