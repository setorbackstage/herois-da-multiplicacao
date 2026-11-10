// capture_all_views.js
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log("Capturing all views for inspection...");

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const appHtmlPath = path.resolve('app.html');
const baseFileUrl = 'file:///' + appHtmlPath.replace(/\\/g, '/');

const views = [
  { name: 'map_trail', query: '?view=map' },
  { name: 'popover_node', query: '?popover=1' },
  { name: 'portal_select', query: '?portal=select' },
  { name: 'hero_profile', query: '?profile=true' },
  { name: 'lesson_runner', query: '?lesson=1' },
  { name: 'apostilas_hub', query: '?tab=workbooks' }
];

views.forEach(v => {
  const url = baseFileUrl + v.query;
  const outPath = path.resolve(`screenshot_${v.name}.png`);
  try {
    execSync(`"${chromePath}" --headless=new --disable-gpu --screenshot="${outPath}" --window-size=430,932 "${url}"`);
    console.log(`Captured ${v.name}: ${outPath} (${fs.statSync(outPath).size} bytes)`);
  } catch(e) {
    console.error(`Failed ${v.name}:`, e.message);
  }
});

console.log("All screenshots captured!");
