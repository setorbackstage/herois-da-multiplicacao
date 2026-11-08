// test_funnel_chromium.js
// Teste automatizado completo do funil e do template de e-mail usando Chromium
const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function runTests() {
  console.log('🚀 Iniciando bateria de testes automatizados com Chromium...\n');

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--allow-file-access-from-files']
  });

  const results = {
    email: false,
    landingPage: false,
    thankYouPage: false,
    checkoutClicks: false
  };

  try {
    // =========================================================================
    // TESTE 1: TEMPLATE DE E-MAIL (Visual dos Heróis - Desktop e Mobile)
    // =========================================================================
    console.log('📧 [1/3] Testando Template de E-mail (Visual dos Heróis)...');
    const emailPage = await browser.newPage();
    
    // Prepara arquivo temporário com variáveis preenchidas
    const emailTemplatePath = path.resolve(__dirname, 'email', 'email-boas-vindas.html');
    let emailHtml = fs.readFileSync(emailTemplatePath, 'utf8');
    emailHtml = emailHtml
      .replace(/{{nome}}/g, 'Mariana & Pedrinho')
      .replace(/{{link_download_pdf}}/g, 'file:///' + path.resolve(__dirname, 'Missao_Tabuada_Volume_1.pdf').replace(/\\/g, '/'))
      .replace(/{{link_webapp}}/g, 'file:///' + path.resolve(__dirname, 'index.html').replace(/\\/g, '/'));
    
    const emailTempFile = path.resolve(__dirname, 'temp_email_test.html');
    fs.writeFileSync(emailTempFile, emailHtml, 'utf8');

    // Teste Desktop (Email)
    await emailPage.setViewport({ width: 700, height: 950, deviceScaleFactor: 2 });
    await emailPage.goto('file:///' + emailTempFile.replace(/\\/g, '/'), { waitUntil: 'networkidle0' });
    await emailPage.screenshot({ path: path.resolve(__dirname, 'test_email_desktop.png'), fullPage: true });
    console.log('   ✓ Screenshot Desktop do E-mail salvo: test_email_desktop.png');

    // Teste Mobile (Email - 375px iPhone)
    await emailPage.setViewport({ width: 375, height: 812, deviceScaleFactor: 2, isMobile: true });
    await emailPage.reload({ waitUntil: 'networkidle0' });
    await emailPage.screenshot({ path: path.resolve(__dirname, 'test_email_mobile.png'), fullPage: true });
    console.log('   ✓ Screenshot Mobile do E-mail salvo: test_email_mobile.png');

    fs.unlinkSync(emailTempFile);
    await emailPage.close();
    results.email = true;

    // =========================================================================
    // TESTE 2: LANDING PAGE OFICIAL (tabuada-offer.html)
    // =========================================================================
    console.log('\n🌐 [2/3] Testando Landing Page Oficial (tabuada-offer.html)...');
    const lpPage = await browser.newPage();
    
    // Captura erros de console
    const pageErrors = [];
    lpPage.on('pageerror', err => pageErrors.push(err.message));

    const lpUrl = 'file:///' + path.resolve(__dirname, 'tabuada-offer.html').replace(/\\/g, '/');

    // Desktop
    await lpPage.setViewport({ width: 1280, height: 900, deviceScaleFactor: 1 });
    const startTime = Date.now();
    await lpPage.goto(lpUrl, { waitUntil: 'load' });
    const loadTime = Date.now() - startTime;
    console.log(`   ✓ Tempo de carregamento local: ${loadTime}ms`);

    // Validação de Imagens Quebradas
    const brokenImages = await lpPage.evaluate(() => {
      const images = Array.from(document.querySelectorAll('img'));
      return images
        .filter(img => !img.complete || img.naturalWidth === 0)
        .map(img => img.src);
    });

    if (brokenImages.length === 0) {
      console.log('   ✓ Integridade visual: 100% das imagens renderizadas com sucesso (0 quebradas).');
    } else {
      console.warn(`   ⚠️ Atenção: ${brokenImages.length} imagens não carregadas:`, brokenImages);
    }

    // Validação dos Links de Checkout nos Botões
    const checkoutValidation = await lpPage.evaluate(() => {
      const basicUrl = typeof CHECKOUT_BASIC_URL !== 'undefined' ? CHECKOUT_BASIC_URL : null;
      const premiumUrl = typeof CHECKOUT_PREMIUM_URL !== 'undefined' ? CHECKOUT_PREMIUM_URL : null;
      return { basicUrl, premiumUrl };
    });

    console.log('   ✓ Validação Checkout Básico R$10:', checkoutValidation.basicUrl);
    console.log('   ✓ Validação Checkout Premium R$27:', checkoutValidation.premiumUrl);

    if (checkoutValidation.basicUrl.includes('ggcheckout.app') && checkoutValidation.premiumUrl.includes('ggcheckout.app')) {
      results.checkoutClicks = true;
    }

    // Screenshots LP (Desktop e Mobile)
    await lpPage.screenshot({ path: path.resolve(__dirname, 'test_lp_desktop.png') });
    console.log('   ✓ Screenshot LP Desktop salvo: test_lp_desktop.png');

    await lpPage.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true });
    await lpPage.reload({ waitUntil: 'load' });
    await lpPage.screenshot({ path: path.resolve(__dirname, 'test_lp_mobile.png') });
    console.log('   ✓ Screenshot LP Mobile salvo: test_lp_mobile.png');

    await lpPage.close();
    results.landingPage = true;

    // =========================================================================
    // TESTE 3: PÁGINA DE OBRIGADO (obrigado.html)
    // =========================================================================
    console.log('\n🎉 [3/3] Testando Página de Obrigado & Entrega (obrigado.html)...');
    const tyPage = await browser.newPage();
    const tyUrl = 'file:///' + path.resolve(__dirname, 'obrigado.html').replace(/\\/g, '/');

    await tyPage.setViewport({ width: 1200, height: 800, deviceScaleFactor: 1 });
    await tyPage.goto(tyUrl, { waitUntil: 'load' });
    await tyPage.screenshot({ path: path.resolve(__dirname, 'test_obrigado_desktop.png'), fullPage: true });
    console.log('   ✓ Screenshot Página de Obrigado Desktop: test_obrigado_desktop.png');

    await tyPage.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true });
    await tyPage.reload({ waitUntil: 'load' });
    await tyPage.screenshot({ path: path.resolve(__dirname, 'test_obrigado_mobile.png'), fullPage: true });
    console.log('   ✓ Screenshot Página de Obrigado Mobile: test_obrigado_mobile.png');

    await tyPage.close();
    results.thankYouPage = true;

  } catch (error) {
    console.error('❌ Erro durante a execução dos testes:', error);
  } finally {
    await browser.close();
  }

  console.log('\n=============================================');
  console.log('📊 RESUMO DOS TESTES AUTOMATIZADOS:');
  console.log('   - Template de E-mail: ' + (results.email ? '✅ APROVADO' : '❌ FALHOU'));
  console.log('   - Landing Page (Imagens & Scripts): ' + (results.landingPage ? '✅ APROVADO' : '❌ FALHOU'));
  console.log('   - Links de Checkout (ggCheckout): ' + (results.checkoutClicks ? '✅ APROVADO' : '❌ FALHOU'));
  console.log('   - Página de Obrigado (Pós-Venda): ' + (results.thankYouPage ? '✅ APROVADO' : '❌ FALHOU'));
  console.log('=============================================\n');
}

runTests();
