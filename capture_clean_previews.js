// capture_clean_previews.js
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const curriculum = require('./curriculum.json');
const { renderPage } = require('./render_book_html.js');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

function capture(pageNum, outName) {
  const pageObj = curriculum.find(p => p.pageNumber === pageNum);
  if (!pageObj) {
    console.error('Page not found:', pageNum);
    return;
  }
  const pageHtml = renderPage(pageObj);
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

  const tmpHtml = path.resolve(`temp_clean_${pageNum}.html`);
  const tmpImg = path.resolve(outName);
  fs.writeFileSync(tmpHtml, testDoc);

  const fileUrl = 'file:///' + tmpHtml.replace(/\\/g, '/');
  execSync(`"${chromePath}" --headless=new --disable-gpu --screenshot="${tmpImg}" --window-size=794,1123 "${fileUrl}"`);
  console.log(`Successfully captured ${outName}`);
  fs.unlinkSync(tmpHtml);
}

// Capture representative pages:
capture(1, 'preview_clean_p1_cover.png');
capture(2, 'preview_clean_p2_guide.png');
capture(3, 'preview_clean_p3_tracker.png');
capture(4, 'preview_clean_p4_worksheetA.png');
capture(6, 'preview_clean_p6_bossC.png');
capture(34, 'preview_clean_p34_mega1.png');
capture(36, 'preview_clean_p36_epic.png');
capture(37, 'preview_clean_p37_gabarito.png');
capture(43, 'preview_clean_p43_certificate.png');
