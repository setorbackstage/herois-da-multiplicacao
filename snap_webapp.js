const path = require('path');
const { execSync } = require('child_process');
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const htmlUrl = 'file:///' + path.resolve('index.html').replace(/\\/g, '/');
const outPng = path.resolve('preview_webapp.png');
execSync(`"${chromePath}" --headless=new --disable-gpu --screenshot="${outPng}" --window-size=1200,900 "${htmlUrl}"`);
console.log('Captured preview_webapp.png to', outPng);
