const puppeteer = require('puppeteer-core');

async function testNewCheckouts() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const checkouts = [
    { name: 'checkout_setorbackstage_10', url: 'https://ggcheckout.app/checkout/X7MW1ajXduVAyxH95jw6lT' },
    { name: 'checkout_setorbackstage_27', url: 'https://ggcheckout.app/checkout/buJIuO7Th5tjHRGQB8dIQ8' }
  ];

  for (const c of checkouts) {
    const page = await browser.newPage();
    await page.setViewport({ width: 375, height: 812, isMobile: true, hasTouch: true });
    // Emulate Dark mode to verify the worst-case contrast!
    await page.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: 'dark' }]);
    console.log(`Navigating to ${c.name} in Dark Mode...`);
    await page.goto(c.url, { waitUntil: 'networkidle0', timeout: 35000 });
    
    // Top view
    await page.screenshot({ path: `C:\\Users\\Admin\\.gemini\\antigravity\\brain\\aaa787a0-9a77-4904-8951-7a1fe3f50539\\scratch\\${c.name}_top.png` });

    // Scroll to bumps
    await page.evaluate(() => window.scrollBy(0, 430));
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: `C:\\Users\\Admin\\.gemini\\antigravity\\brain\\aaa787a0-9a77-4904-8951-7a1fe3f50539\\scratch\\${c.name}_bumps.png` });

    const info = await page.evaluate(() => {
      const h3s = Array.from(document.querySelectorAll('h3')).filter(h => h.textContent.includes('Mega Fichas') || h.textContent.includes('Gabarito'));
      return h3s.map(h => ({
        text: h.textContent.trim(),
        styleAttr: h.getAttribute('style'),
        computedColor: window.getComputedStyle(h).color,
        cardBg: h.closest('.rounded-lg') ? window.getComputedStyle(h.closest('.rounded-lg')).backgroundColor : null
      }));
    });

    console.log(`${c.name} evaluation:`, JSON.stringify(info, null, 2));
    await page.close();
  }

  await browser.close();
}

testNewCheckouts().catch(console.error);
