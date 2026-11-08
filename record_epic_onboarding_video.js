const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');

async function recordEpicOnboardingVideo() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const ffmpegPath = 'C:\\ffmpeg\\bin\\ffmpeg.exe';
  
  const framesDir = path.resolve(__dirname, 'temp_epic_frames');
  if (!fs.existsSync(framesDir)) fs.mkdirSync(framesDir, { recursive: true });
  fs.readdirSync(framesDir).forEach(f => fs.unlinkSync(path.join(framesDir, f)));

  console.log('Iniciando gravação cinemática da Jornada do Duolingo dos Heróis...');

  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  // Resolução 540x960 (perfeito para Reels/Stories que depois escalamos para 1080x1920)
  await page.setViewport({ width: 540, height: 960, isMobile: true, hasTouch: true });

  const fileUrl = 'file:///' + path.resolve(__dirname, 'duolingo_tabuada.html').replace(/\\/g, '/');
  await page.goto(fileUrl, { waitUntil: 'domcontentloaded' });

  // Garante que o localStorage está limpo para exibir o onboarding completo
  await page.evaluate(() => {
    localStorage.clear();
    if (typeof goToStep === 'function') goToStep(1);
    document.getElementById('onboarding-overlay').style.display = 'flex';
  });

  let frameCount = 0;
  async function grab(repeat = 1) {
    for (let r = 0; r < repeat; r++) {
      frameCount++;
      const num = String(frameCount).padStart(4, '0');
      await page.screenshot({ path: path.join(framesDir, `frame_${num}.png`) });
    }
  }

  // ========================================================
  // CENA 1: BOAS-VINDAS & ESCOLHA DO MASCOTE (1.5s = 18 frames)
  // ========================================================
  console.log('Cena 1: Boas-vindas...');
  await grab(12);

  // Seleciona Léo
  await page.evaluate(() => selectMascot('leo'));
  await grab(6);

  // ========================================================
  // CENA 2: DADOS DO PEQUENO HERÓI (2s = 24 frames)
  // ========================================================
  console.log('Cena 2: Perfil do aluno...');
  await page.evaluate(() => goToStep(2));
  await grab(8);

  // Digita o nome e seleciona idade e série
  await page.evaluate(() => {
    document.getElementById('input-child-name').value = 'Pedro';
    const ageBtn = document.querySelectorAll('#age-pills .pill-btn')[2]; // 8 anos
    if (ageBtn) selectPill('age', 8, ageBtn);
    const gradeBtn = document.querySelectorAll('#grade-pills .pill-btn')[2]; // 3º Ano
    if (gradeBtn) selectPill('grade', '3º Ano', gradeBtn);
  });
  await grab(16);

  // ========================================================
  // CENA 3: O GUARDIÃO & META DE 15 MIN (2s = 24 frames)
  // ========================================================
  console.log('Cena 3: Guardião e meta...');
  await page.evaluate(() => goToStep(3));
  await grab(8);

  await page.evaluate(() => {
    document.getElementById('input-guardian-name').value = 'Camila';
  });
  await grab(16);

  // ========================================================
  // CENA 4: EMISSÃO DA CARTEIRINHA OFICIAL (3s = 36 frames)
  // ========================================================
  console.log('Cena 4: Emissão da Carteirinha Holográfica com Confetti...');
  await page.evaluate(() => generateBadgeCard());
  await grab(36);

  // ========================================================
  // CENA 5: ENTRADA NO APP & JOGO INTERATIVO (3.5s = 42 frames)
  // ========================================================
  console.log('Cena 5: Início da jornada no jogo...');
  await page.evaluate(() => {
    finishOnboarding();
    startLesson(1);
  });
  await grab(12);

  // Responde pergunta "Quanto é 2 x 3?" -> Seleciona 6
  console.log('Respondendo pergunta 1...');
  await page.evaluate(() => {
    const q = currentLesson.questions[currentQIndex];
    if (q) {
      const btns = Array.from(document.querySelectorAll('.option-card'));
      const targetBtn = btns.find(b => parseInt(b.innerText) === q.correct) || btns[0];
      if (targetBtn) targetBtn.click();
    }
  });
  await grab(8);

  // Verifica -> Confetti e Feedback de Resposta Certa!
  await page.evaluate(() => checkAnswer());
  await grab(22);

  await browser.close();
  console.log(`Gravação finalizada! Total de ${frameCount} frames gravados.`);

  // Compilação com FFMPEG em 1080x1920 vertical com alta qualidade
  const outputVideo = path.resolve(__dirname, 'midias', 'anuncios_prontos', 'video_criativo_05_duolingo_jornada_completa.mp4');
  console.log('Compilando vídeo final MP4 com FFMPEG...');

  const cmd = `"${ffmpegPath}" -y -framerate 12 -i "${path.join(framesDir, 'frame_%04d.png')}" -c:v libx264 -pix_fmt yuv420p -vf "scale=1080:1920:force_original_aspect_ratio=decrease,pad=1080:1920:(ow-iw)/2:(oh-ih)/2:color=141f36" -r 30 "${outputVideo}"`;
  execSync(cmd, { stdio: 'inherit' });

  console.log('VÍDEO CINEMÁTICO COMPILADO COM SUCESSO:', outputVideo);

  // Limpa frames
  fs.readdirSync(framesDir).forEach(f => fs.unlinkSync(path.join(framesDir, f)));
  fs.rmdirSync(framesDir);
}

recordEpicOnboardingVideo().catch(err => {
  console.error('Erro na gravação épica:', err);
  process.exit(1);
});
