// autocrop_assets.js
const { Jimp } = require('jimp');
const path = require('path');
const fs = require('fs');

async function autocrop(filename, outname) {
  const img = await Jimp.read(path.join('assets', filename));
  const w = img.bitmap.width;
  const h = img.bitmap.height;
  const data = img.bitmap.data;

  let minX = w, maxX = 0, minY = h, maxY = 0;

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const idx = (y * w + x) * 4;
      const alpha = data[idx + 3];
      if (alpha > 10) { // non-transparent
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  // Add 4px padding
  minX = Math.max(0, minX - 4);
  minY = Math.max(0, minY - 4);
  maxX = Math.min(w - 1, maxX + 4);
  maxY = Math.min(h - 1, maxY + 4);

  const cropW = maxX - minX + 1;
  const cropH = maxY - minY + 1;

  console.log(`${filename}: original ${w}x${h} -> cropped ${cropW}x${cropH} at (${minX},${minY})`);
  img.crop({ x: minX, y: minY, w: cropW, h: cropH });
  await img.write(path.join('assets', outname));
}

async function run() {
  await autocrop('heroi_menino_trans.png', 'heroi_menino_cropped.png');
  await autocrop('heroi_menina_trans.png', 'heroi_menina_cropped.png');
  await autocrop('monstro_trans.png', 'monstro_cropped.png');
  await autocrop('logo_trans.png', 'logo_cropped.png');
  await autocrop('lapis_heroi_trans.png', 'lapis_heroi_cropped.png');
  console.log('All cropped!');
}
run();
