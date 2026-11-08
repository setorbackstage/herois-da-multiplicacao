const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');

async function generateDuolingoVideo() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const ffmpegPath = 'C:\\ffmpeg\\bin\\ffmpeg.exe';
  
  const framesDir = path.resolve(__dirname, 'temp_video_frames');
  if (!fs.existsSync(framesDir)) {
    fs.mkdirSync(framesDir, { recursive: true });
  }

  // Limpa frames antigos se existirem
  fs.readdirSync(framesDir).forEach(f => fs.unlinkSync(path.join(framesDir, f)));

  console.log('Iniciando gravação de vídeo do Duolingo da Tabuada...');

  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1080, height: 1920, deviceScaleFactor: 1 });

  const duolingoPath = path.resolve(__dirname, 'duolingo_tabuada.html').replace(/\\/g, '/');

  // Página mestre com moldura de celular e headline de alta conversão
  const masterHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@700;800;900&family=Fredoka:wght@600;700&display=swap" rel="stylesheet">
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
          width: 1080px; height: 1920px;
          background: radial-gradient(circle at 50% 25%, #1E1B4B 0%, #0F172A 60%, #020617 100%);
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
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #58CC02;
          color: #FFF;
          font-size: 26px;
          font-weight: 900;
          padding: 10px 30px;
          border-radius: 999px;
          text-transform: uppercase;
          margin-bottom: 18px;
          box-shadow: 0 8px 25px rgba(88, 204, 2, 0.4);
          border: 3px solid #FFF;
        }
        .main-title {
          font-size: 46px;
          font-weight: 900;
          line-height: 1.2;
          color: #FFF;
          text-shadow: 0 4px 15px rgba(0,0,0,0.6);
        }
        .main-title span {
          color: #FFC800;
        }
        .subtitle {
          font-size: 26px;
          font-weight: 700;
          color: #94A3B8;
          margin-top: 10px;
        }

        /* Smartphone Frame (iPhone 15 Pro) */
        .phone-wrapper {
          position: absolute;
          top: 360px;
          left: 50%;
          transform: translateX(-50%);
          width: 620px;
          height: 1240px;
          background: #1E293B;
          border-radius: 60px;
          padding: 18px;
          box-shadow: 0 35px 80px rgba(0,0,0,0.8), 0 0 0 4px #334155, 0 0 50px rgba(88, 204, 2, 0.25);
          z-index: 10;
        }
        .phone-screen {
          width: 100%;
          height: 100%;
          border-radius: 46px;
          overflow: hidden;
          background: #FFF;
          position: relative;
        }
        iframe {
          width: 100%;
          height: 100%;
          border: none;
        }

        /* Simulated Touch Cursor */
        .touch-cursor {
          position: absolute;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: rgba(88, 204, 2, 0.6);
          border: 3px solid #FFF;
          box-shadow: 0 4px 15px rgba(0,0,0,0.4);
          pointer-events: none;
          z-index: 9999;
          transform: translate(-50%, -50%) scale(0);
          transition: transform 0.2s, opacity 0.2s;
          display: none;
        }
        .touch-cursor.active {
          display: block;
          transform: translate(-50%, -50%) scale(1);
        }

        /* Bottom CTA */
        .bottom-cta-container {
          position: absolute;
          bottom: 70px;
          left: 50%;
          transform: translateX(-50%);
          width: 90%;
          z-index: 30;
        }
        .cta-card {
          background: linear-gradient(135deg, #1E1B4B 0%, #312E81 100%);
          border: 4px solid #58CC02;
          border-radius: 26px;
          padding: 22px 30px;
          box-shadow: 0 20px 50px rgba(0,0,0,0.6);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .cta-info {
          text-align: left;
        }
        .cta-sub {
          color: #FBBF24;
          font-size: 20px;
          font-weight: 800;
          text-transform: uppercase;
        }
        .cta-price {
          font-size: 46px;
          font-weight: 900;
          color: #10B981;
          font-family: 'Fredoka', sans-serif;
        }
        .cta-btn {
          background: linear-gradient(180deg, #58CC02 0%, #46A302 100%);
          color: #FFF;
          font-size: 28px;
          font-weight: 900;
          padding: 18px 36px;
          border-radius: 18px;
          text-transform: uppercase;
          box-shadow: 0 10px 24px rgba(88, 204, 2, 0.4);
          letter-spacing: 0.5px;
        }
      </style>
    </head>
    <body>
      <div class="top-container">
        <div class="top-badge">🎮 O DUOLINGO DA TABUADA</div>
        <div class="main-title">Seu filho vai pedir para treinar <span>todos os dias</span>!</div>
        <div class="subtitle">Método gamificado com fases, estrelas e desafios dos heróis.</div>
      </div>

      <div class="phone-wrapper">
        <div class="phone-screen">
          <iframe id="app-frame" src="file:///${duolingoPath}"></iframe>
          <div id="cursor" class="touch-cursor"></div>
        </div>
      </div>

      <div class="bottom-cta-container">
        <div class="cta-card">
          <div class="cta-info">
            <div class="cta-sub">⚡ Kit Completo (App + Livro PDF)</div>
            <div class="cta-price">R$ 19,90</div>
          </div>
          <div class="cta-btn">QUERO BAIXAR 👉</div>
        </div>
      </div>
    </body>
    </html>
  `;

  await page.setContent(masterHtml, { waitUntil: 'networkidle0' });

  // Pega o frame do app
  const frameHandle = await page.$('iframe#app-frame');
  const frame = await frameHandle.contentFrame();

  console.log('App carregado no iframe. Iniciando gravação de frames interativos...');

  let frameCount = 0;
  async function snap() {
    frameCount++;
    const num = String(frameCount).padStart(4, '0');
    await page.screenshot({ path: path.join(framesDir, `frame_${num}.png`), type: 'png' });
  }

  // 1. Home / Mapa das Fases (1.5 segundos = 15 frames chave)
  for (let i = 0; i < 15; i++) {
    await snap();
  }

  // 2. Inicia Lição 1
  console.log('Iniciando Lição 1...');
  await frame.evaluate(() => {
    if (typeof startLesson === 'function') startLesson(1);
  });

  // Grava transição para a pergunta (10 frames)
  for (let i = 0; i < 10; i++) {
    await snap();
  }

  // 3. Simula seleção da resposta correta na pergunta 1
  console.log('Respondendo Pergunta 1...');
  await frame.evaluate(() => {
    const q = currentLesson.questions[currentQIndex];
    const correctVal = q.correct;
    const buttons = Array.from(document.querySelectorAll('.option-card'));
    const targetBtn = buttons.find(b => parseInt(b.innerText) === correctVal) || buttons[0];
    if (targetBtn) {
      targetBtn.click();
    }
  });

  // Espera seleção aparecer (8 frames)
  for (let i = 0; i < 8; i++) {
    await snap();
  }

  // 4. Clica em "Verificar" (Dispara Resposta Certa + Confetti!)
  console.log('Verificando resposta (dispara confetti)...');
  await frame.evaluate(() => {
    if (typeof checkAnswer === 'function') checkAnswer();
  });

  // Grava animação do confetti e barra verde (20 frames)
  for (let i = 0; i < 20; i++) {
    await snap();
  }

  // 5. Clica em "Continuar" para pergunta 2
  console.log('Avançando para Pergunta 2...');
  await frame.evaluate(() => {
    if (typeof nextQuestion === 'function') nextQuestion();
  });

  for (let i = 0; i < 10; i++) {
    await snap();
  }

  // 6. Responde Pergunta 2 com sucesso!
  console.log('Respondendo Pergunta 2...');
  await frame.evaluate(() => {
    const q = currentLesson.questions[currentQIndex];
    if (q) {
      const correctVal = q.correct;
      const buttons = Array.from(document.querySelectorAll('.option-card'));
      const targetBtn = buttons.find(b => parseInt(b.innerText) === correctVal) || buttons[0];
      if (targetBtn) targetBtn.click();
    }
  });

  for (let i = 0; i < 8; i++) {
    await snap();
  }

  // Verifica Pergunta 2
  await frame.evaluate(() => {
    if (typeof checkAnswer === 'function') checkAnswer();
  });

  // Mais confetti e celebração (25 frames)
  for (let i = 0; i < 25; i++) {
    await snap();
  }

  await browser.close();
  console.log(`Gravação finalizada! Total de ${frameCount} frames capturados.`);

  // Compila com ffmpeg
  const outputVideo = path.resolve(__dirname, 'midias', 'anuncios_prontos', 'video_criativo_05_duolingo_gameplay_stories.mp4');
  console.log('Compilando vídeo MP4 com FFMPEG...');
  
  const ffmpegCmd = `"${ffmpegPath}" -y -framerate 15 -i "${path.join(framesDir, 'frame_%04d.png')}" -c:v libx264 -pix_fmt yuv420p -r 30 "${outputVideo}"`;
  execSync(ffmpegCmd, { stdio: 'inherit' });

  console.log('VÍDEO CRIATIVO 05 PRONTO COM SUCESSO:', outputVideo);

  // Limpa frames temporários para liberar espaço
  fs.readdirSync(framesDir).forEach(f => fs.unlinkSync(path.join(framesDir, f)));
  fs.rmdirSync(framesDir);
}

generateDuolingoVideo().catch(err => {
  console.error('Erro gerando vídeo:', err);
  process.exit(1);
});
