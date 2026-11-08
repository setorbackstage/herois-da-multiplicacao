const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const duolingoHtmlPath = 'file:///' + path.resolve(__dirname, 'duolingo_tabuada.html').replace(/\\/g, '/');
const outputDir = path.resolve(__dirname, 'test_screenshots');
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

async function runTests() {
  console.log('🚀 Iniciando bateria de testes do Duolingo Webapp...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--allow-file-access-from-files']
  });

  const page = await browser.newPage();

  // 1. TESTE MOBILE (390 x 844)
  console.log('\n📱 1. Testando Viewport Mobile (390x844)...');
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
  
  // Limpa localStorage para abrir onboarding limpo
  await page.goto(duolingoHtmlPath, { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 600));

  await page.screenshot({ path: path.join(outputDir, '01_mobile_onboarding_step1.png') });
  console.log('   📸 01_mobile_onboarding_step1.png capturado.');

  // Preenche Step 2
  await page.evaluate(() => goToStep(2));
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: path.join(outputDir, '02_mobile_onboarding_step2.png') });
  console.log('   📸 02_mobile_onboarding_step2.png capturado.');

  // Preenche Step 3
  await page.evaluate(() => goToStep(3));
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: path.join(outputDir, '03_mobile_onboarding_step3.png') });
  console.log('   📸 03_mobile_onboarding_step3.png capturado.');

  // Gera Carteirinha (Step 4)
  await page.evaluate(() => generateBadgeCard());
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(outputDir, '04_mobile_badge_carteirinha.png') });
  console.log('   📸 04_mobile_badge_carteirinha.png capturado.');

  // Entra no Mapa
  await page.evaluate(() => finishOnboarding());
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: path.join(outputDir, '05_mobile_map_screen.png') });
  console.log('   📸 05_mobile_map_screen.png capturado.');

  // Abre Loja / VIP
  await page.evaluate(() => switchTab('shop'));
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: path.join(outputDir, '06_mobile_shop_vip.png') });
  console.log('   📸 06_mobile_shop_vip.png capturado.');

  // Inicia Lição 1
  await page.evaluate(() => {
    switchTab('map');
    startLesson(1);
  });
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: path.join(outputDir, '07_mobile_lesson_question.png') });
  console.log('   📸 07_mobile_lesson_question.png capturado.');

  // Responde corretamente (2 x 3 = 6)
  await page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll('.option-card'));
    const correctCard = cards.find(c => c.innerText.trim().startsWith('6'));
    if (correctCard) correctCard.click();
    document.getElementById('btn-verify').click();
  });
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: path.join(outputDir, '08_mobile_lesson_correct.png') });
  console.log('   📸 08_mobile_lesson_correct.png capturado.');

  // Testa Game Over (vidas = 0)
  await page.evaluate(() => {
    playerState.hearts = 0;
    showGameOver();
  });
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: path.join(outputDir, '09_mobile_game_over.png') });
  console.log('   📸 09_mobile_game_over.png capturado.');

  // 2. TESTE TABLET (768 x 1024)
  console.log('\n📟 2. Testando Viewport Tablet (768x1024)...');
  await page.setViewport({ width: 768, height: 1024, deviceScaleFactor: 2 });
  await page.evaluate(() => {
    closeGameOver();
    closeLessonView();
    finishOnboarding();
  });
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: path.join(outputDir, '10_tablet_map_screen.png') });
  console.log('   📸 10_tablet_map_screen.png capturado.');

  await page.evaluate(() => switchTab('shop'));
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: path.join(outputDir, '11_tablet_shop_screen.png') });
  console.log('   📸 11_tablet_shop_screen.png capturado.');

  // 3. TESTE DESKTOP PC (1440 x 900)
  console.log('\n💻 3. Testando Viewport Desktop PC (1440x900)...');
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1.5 });
  await page.evaluate(() => switchTab('map'));
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: path.join(outputDir, '12_desktop_map_screen.png') });
  console.log('   📸 12_desktop_map_screen.png capturado.');

  await page.evaluate(() => openBadgeModal());
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: path.join(outputDir, '13_desktop_badge_modal.png') });
  console.log('   📸 13_desktop_badge_modal.png capturado.');

  await browser.close();
  console.log('\n✅ BATERIA DE TESTES CONCLUÍDA COM SUCESSO! Todos os prints em:', outputDir);
}

runTests().catch(err => {
  console.error('❌ Erro no teste:', err);
  process.exit(1);
});
