// verify_duolingo_app.js
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log("Verifying app.html and duolingo_tabuada.html...");

const appHtmlPath = path.resolve('app.html');
const duoHtmlPath = path.resolve('duolingo_tabuada.html');

const appContent = fs.readFileSync(appHtmlPath, 'utf8');
const duoContent = fs.readFileSync(duoHtmlPath, 'utf8');

if (appContent !== duoContent) {
  console.error("ERROR: app.html and duolingo_tabuada.html do not match!");
  process.exit(1);
} else {
  console.log("SUCCESS: app.html and duolingo_tabuada.html are in 100% parity! Length: " + appContent.length);
}

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const fileUrl = 'file:///' + appHtmlPath.replace(/\\/g, '/');
const outScreenshot = path.resolve('screenshot_app_adventure.png');

console.log("Capturing headless screenshot to " + outScreenshot + "...");
try {
  execSync(`"${chromePath}" --headless=new --disable-gpu --screenshot="${outScreenshot}" --window-size=430,932 "${fileUrl}"`, { stdio: 'inherit' });
  if (fs.existsSync(outScreenshot)) {
    console.log("SUCCESS: Screenshot created successfully (" + fs.statSync(outScreenshot).size + " bytes)!");
  } else {
    console.warn("WARNING: Screenshot file not found at " + outScreenshot);
  }
} catch (err) {
  console.error("Error executing chrome:", err.message);
}
