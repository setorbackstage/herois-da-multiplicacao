const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');

async function recordEpicJourneyVideo() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const ffmpegPath = 'C:\\ffmpeg\\bin\\ffmpeg.exe';
  
  const framesDir = path.resolve(__dirname, 'temp_epic_frames');
  if (!fs.existsSync(framesDir)) fs.mkdirSync(framesDir, { recursive: true });
  fs.readdirSync(framesDir).forEach(f => fs.unlinkSync(path.join(framesDir, f)));

  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  // Viewport 540x960 para gravação nítida em proporção 9:16 (será escalado para 1080x1920)
  await page.setViewport({ width: 540, height: 960, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });

  const duolingoUrl = 'file:///' + path.resolve(__dirname, 'duolingo_tabuada.html').replace(/\\/g, '/');
  await page.goto(duolingoUrl, { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 600));

  console.log('🎬 Iniciando gravação da Jornada Épica do Duolingo da Tabuada...');

  let count = 0;
  async function grab(n = 1) {
    for (let i = 0; i < n; i++) {
      count++;
      const num = String(count).padStart(4, '0');
      await page.screenshot({ path: path.join(framesDir, `frame_${num}.png`) });
    }
  }

  // 1. Onboarding Step 1: Boas-vindas e Escolha de Mascote (Léo vs Maya)
  await grab(12);
  // Alterna para Maya
  await page.evaluate(() => selectMascot('maya'));
  await grab(8);
  // Volta para Léo
  await page.evaluate(() => selectMascot('leo'));
  await grab(8);

  // 2. Onboarding Step 2: Nome, Idade, Ano Escolar
  await page.evaluate(() => goToStep(2));
  await grab(10);
  // Clica na idade 8 anos e 3º ano
  await page.evaluate(() => {
    const agePills = document.querySelectorAll('#age-pills .pill-btn');
    const age8 = Array.from(agePills).find(b => b.innerText.includes('8'));
    if (age8) age8.click();
    const gradePills = document.querySelectorAll('#grade-pills .pill-btn');
    const grade3 = Array.from(gradePills).find(b => b.innerText.includes('3º'));
    if (grade3) grade3.click();
  });
  await grab(10);

  // 3. Onboarding Step 3: Guardião e Meta de Estudo (15 min)
  await page.evaluate(() => goToStep(3));
  await grab(12);

  // 4. Onboarding Step 4: Emissão da Carteirinha Holográfica de Herói
  await page.evaluate(() => generateBadgeCard());
  // Confetti rolando na tela da carteirinha
  await grab(20);

  // 5. Entrada Triunfal no Mapa de Missões (10 fases)
  await page.evaluate(() => finishOnboarding());
  await grab(12);

  // 6. Inicia Missão 1: Tabuada do 2
  await page.evaluate(() => startLesson(1));
  await grab(10);

  // 7. Seleciona resposta correta: 2 x 3 = 6
  await page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll('.option-card'));
    const correctCard = cards.find(c => c.innerText.trim().startsWith('6'));
    if (correctCard) correctCard.click();
  });
  await grab(8);

  // 8. Clica em Verificar (Drawer Verde de Acerto com Confetti)
  await page.evaluate(() => {
    document.getElementById('btn-verify').click();
  });
  await grab(22);

  // 9. Demonstração do Game Over e Sistema de Vidas/Recuperação
  await page.evaluate(() => {
    playerState.hearts = 0;
    showGameOver();
  });
  await grab(16);

  // 10. Demonstração da Loja dos Heróis & Assinatura VIP Recorrente
  await page.evaluate(() => {
    closeGameOver();
    closeLessonView();
    finishOnboarding();
    switchTab('shop');
  });
  await grab(20);

  await browser.close();
  console.log(`Gravação finalizada! Total de ${count} frames capturados.`);

  const outputVideo = path.resolve(__dirname, 'midias', 'anuncios_prontos', 'video_criativo_05_duolingo_jornada_completa.mp4');
  console.log('Compilando vídeo MP4 vertical 1080x1920 H.264...');

  const cmd = `"${ffmpegPath}" -y -framerate 14 -i "${path.join(framesDir, 'frame_%04d.png')}" -c:v libx264 -pix_fmt yuv420p -vf "scale=1080:1920:force_original_aspect_ratio=decrease,pad=1080:1920:(ow-iw)/2:(oh-ih)/2:color=black" -r 30 "${outputVideo}"`;
  execSync(cmd, { stdio: 'inherit' });

  console.log('🎉 VÍDEO DA JORNADA COMPLETA COMPILADO COM SUCESSO:', outputVideo);

  // Copia para artifacts
  const artifactVideo = 'C:\\Users\\setor\\.gemini\\antigravity\\brain\\0a97aaa4-d5c1-4b52-af01-b5d50191a11e\\video_criativo_05_duolingo_jornada_completa.mp4';
  fs.copyFileSync(outputVideo, artifactVideo);
  console.log('Copiado para artifacts:', artifactVideo);

  // Limpa frames
  fs.readdirSync(framesDir).forEach(f => fs.unlinkSync(path.join(framesDir, f)));
  fs.rmdirSync(framesDir);
}

recordEpicJourneyVideo().catch(err => {
  console.error('Erro na gravação do vídeo épico:', err);
  process.exit(1);
});
