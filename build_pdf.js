// build_pdf.js
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const htmlPath = path.resolve('book.html');
const pdfPath = path.resolve('Missao_Tabuada_Volume_1.pdf');
const fileUrl = 'file:///' + htmlPath.replace(/\\/g, '/');
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

console.log('Generating PDF from book.html via Chrome headless...');
execSync(`"${chromePath}" --headless=new --disable-gpu --print-to-pdf="${pdfPath}" --no-pdf-header-footer "${fileUrl}"`, {
  maxBuffer: 1024 * 1024 * 50
});

console.log('PDF Generated! Checking size and page count...');
const { PDFDocument } = require('pdf-lib');

async function check() {
  const data = fs.readFileSync(pdfPath);
  const doc = await PDFDocument.load(data);
  console.log(`Success! PDF file: Missao_Tabuada_Volume_1.pdf`);
  console.log(`Total Pages in PDF: ${doc.getPageCount()}`);
  console.log(`File size: ${(data.length / (1024 * 1024)).toFixed(2)} MB`);
}
check();
