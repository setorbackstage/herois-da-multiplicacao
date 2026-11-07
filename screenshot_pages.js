// screenshot_pages.js
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const curriculum = require('./curriculum.json');
const assets = require('./assets_base64.js');

// Read the complete book.html and let's check its pages
// Or better: write a script that extracts .page from book.html and renders it
const fullHtml = fs.readFileSync('book.html', 'utf8');
const pages = fullHtml.split('<div class="page');

console.log('Total page splits found:', pages.length - 1);

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

function capturePage(pageIdx, outName) {
  const pageHtml = '<div class="page' + pages[pageIdx].split('</div>\n</body>')[0];
  const testDoc = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;600;700;800&family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Cinzel:wght@700;900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="book_styles.css">
  <style>
    body { background: white; margin: 0; padding: 0; }
    .page { margin: 0; box-shadow: none; }
  </style>
</head>
<body>
  ${pageHtml}
</body>
</html>`;
  
  const tmpHtml = path.resolve(`temp_page_${pageIdx}.html`);
  const tmpImg = path.resolve(outName);
  fs.writeFileSync(tmpHtml, testDoc);
  
  const fileUrl = 'file:///' + tmpHtml.replace(/\\/g, '/');
  execSync(`"${chromePath}" --headless=new --disable-gpu --screenshot="${tmpImg}" --window-size=794,1123 "${fileUrl}"`);
  console.log(`Captured ${outName}!`);
  fs.unlinkSync(tmpHtml);
}

// Let's capture Page 2 (Manual), Page 3 (Tracker), Page 6 (Chefão 1), Page 36 (Batalha Épica), Page 43 (Certificado)
capturePage(2, 'preview_page_2.png');
capturePage(3, 'preview_page_3.png');
capturePage(6, 'preview_page_6.png');
capturePage(36, 'preview_page_36.png');
capturePage(43, 'preview_page_43.png');
