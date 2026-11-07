// test_puppeteer.js
const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

async function test() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 1 });
  
  const fileUrl = 'file:///' + path.resolve('test.html').replace(/\\/g, '/');
  await page.goto(fileUrl, { waitUntil: 'networkidle0' });
  
  const title = await page.title();
  console.log('Puppeteer connected! Page title:', title);
  
  await browser.close();
}
test();
