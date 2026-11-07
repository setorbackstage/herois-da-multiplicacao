const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { PDFDocument } = require('pdf-lib');

const htmlPath = path.resolve('test_input.html');
const pdfPath = path.resolve('test_input.pdf');
fs.writeFileSync(htmlPath, '<!DOCTYPE html><html><body><form><input type="text" name="testfield" value="Hello" /></form></body></html>');
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
execSync(`"${chromePath}" --headless=new --disable-gpu --print-to-pdf="${pdfPath}" --no-pdf-header-footer "file:///${htmlPath.replace(/\\/g, '/')}"`);

async function testForm() {
  const data = fs.readFileSync(pdfPath);
  const doc = await PDFDocument.load(data);
  const form = doc.getForm();
  console.log('Fields count in Chrome PDF:', form.getFields().length);
}
testForm();
