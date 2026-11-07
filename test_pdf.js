const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const htmlPath = path.resolve('test.html');
const pdfPath = path.resolve('test.pdf');
const fileUrl = 'file:///' + htmlPath.replace(/\\/g, '/');
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
execSync(`"${chromePath}" --headless=new --disable-gpu --print-to-pdf="${pdfPath}" --no-pdf-header-footer "${fileUrl}"`);
console.log('Success! PDF size:', fs.statSync(pdfPath).size);
