const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');

async function recordDuolingoVideo() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const ffmpegPath = 'C:\\ffmpeg\\bin\\ffmpeg.exe';
  
  const framesDir = path.resolve(__dirname, 'temp_video_frames');
  if (!fs.existsSync(framesDir)) fs.mkdirSync(framesDir, { recursive: true });
  fs.readdirSync(framesDir).forEach(f => fs.unlinkSync(path.join(framesDir, f)));

  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  // Viewport 540x960 (perfeito para Reels/Stories em 9:16)
  await page.setViewport({ width: 540, height: 960, isMobile: true, hasTouch: true });

  const duolingoUrl = 'file:///' + path.resolve(__dirname, 'duolingo_tabuada.html').replace(/\\/g, '/');
  await page.goto(duolingoUrl, { waitUntil: 'domcontentloaded' });

  console.log('Gravando frames do Duolingo da Tabuada...');

  let count = 0;
  async function grab() {
    count++;
    const num = String(count).padStart(4, '0');
    await page.screenshot({ path: path.join(framesDir, `frame_${num}.png`) });
  }

  // 1. Home / Mapa (10 frames)
  for (let i = 0; i < 10; i++) await grab();

  // 2. Inicia Lição 1
  await page.evaluate(() => {
    if (typeof startLesson === 'function') startLesson(1);
  });
  for (let i = 0; i < 8; i++) await grab();

  // 3. Seleciona opção correta na pergunta 1
  await page.evaluate(() => {
    const q = currentLesson.questions[currentQIndex];
    if (q) {
      const btns = Array.from(document.querySelectorAll('.option-card'));
      const correctBtn = btns.find(b => parseInt(b.innerText) === q.correct) || btns[0];
      if (correctBtn) correctBtn.click();
    }
  });
  for (let i = 0; i < 6; i++) await grab();

  // 4. Verifica resposta (Confetti + Som)
  await page.evaluate(() => {
    if (typeof checkAnswer === 'function') checkAnswer();
  });
  // Grava animação do confetti (18 frames)
  for (let i = 0; i < 18; i++) await grab();

  // 5. Avança para Pergunta 2
  await page.evaluate(() => {
    if (typeof nextQuestion === 'function') nextQuestion();
  });
  for (let i = 0; i < 8; i++) await grab();

  // 6. Responde Pergunta 2
  await page.evaluate(() => {
    const q = currentLesson.questions[currentQIndex];
    if (q) {
      const btns = Array.from(document.querySelectorAll('.option-card'));
      const correctBtn = btns.find(b => parseInt(b.innerText) === q.correct) || btns[0];
      if (correctBtn) correctBtn.click();
    }
  });
  for (let i = 0; i < 6; i++) await grab();

  // 7. Verifica Pergunta 2 (Nova explosão de confetti)
  await page.evaluate(() => {
    if (typeof checkAnswer === 'function') checkAnswer();
  });
  for (let i = 0; i < 20; i++) await grab();

  await browser.close();
  console.log(`Gravação finalizada! Total de ${count} frames gravados.`);

  const outputVideo = path.resolve(__dirname, 'midias', 'anuncios_prontos', 'video_criativo_05_duolingo_gameplay.mp4');
  console.log('Compilando vídeo MP4 com FFMPEG...');

  const cmd = `"${ffmpegPath}" -y -framerate 12 -i "${path.join(framesDir, 'frame_%04d.png')}" -c:v libx264 -pix_fmt yuv420p -vf "scale=1080:1920:force_original_aspect_ratio=decrease,pad=1080:1920:(ow-iw)/2:(oh-ih)/2:color=black" -r 30 "${outputVideo}"`;
  execSync(cmd, { stdio: 'inherit' });

  console.log('VÍDEO MP4 COMPILADO COM SUCESSO:', outputVideo);

  // Limpa frames temporários
  fs.readdirSync(framesDir).forEach(f => fs.unlinkSync(path.join(framesDir, f)));
  fs.rmdirSync(framesDir);
}

recordDuolingoVideo().catch(err => {
  console.error('Erro na gravação:', err);
  process.exit(1);
});
