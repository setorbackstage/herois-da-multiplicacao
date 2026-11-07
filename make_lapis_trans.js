const { Jimp } = require('jimp');
const path = require('path');

async function floodFillTransparent(filename, outname) {
  const img = await Jimp.read(path.join('assets', filename));
  const w = img.bitmap.width;
  const h = img.bitmap.height;
  const data = img.bitmap.data;

  const visited = new Uint8Array(w * h);
  const queue = [];

  function isWhite(x, y) {
    const idx = (y * w + x) * 4;
    return data[idx] > 240 && data[idx + 1] > 240 && data[idx + 2] > 240;
  }

  for (let x = 0; x < w; x++) {
    if (isWhite(x, 0)) queue.push([x, 0]);
    if (isWhite(x, h - 1)) queue.push([x, h - 1]);
  }
  for (let y = 0; y < h; y++) {
    if (isWhite(0, y)) queue.push([0, y]);
    if (isWhite(w - 1, y)) queue.push([w - 1, y]);
  }

  for (let i = 0; i < queue.length; i++) {
    const [qx, qy] = queue[i];
    visited[qy * w + qx] = 1;
  }

  let head = 0;
  const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];

  while (head < queue.length) {
    const [cx, cy] = queue[head++];
    const cidx = (cy * w + cx) * 4;
    data[cidx + 3] = 0; // make transparent

    for (const [dx, dy] of dirs) {
      const nx = cx + dx;
      const ny = cy + dy;
      if (nx >= 0 && nx < w && ny >= 0 && ny < h) {
        const npos = ny * w + nx;
        if (!visited[npos] && isWhite(nx, ny)) {
          visited[npos] = 1;
          queue.push([nx, ny]);
        }
      }
    }
  }

  await img.write(path.join('assets', outname));
  console.log(`Created flood-filled transparent: ${outname}`);
}

floodFillTransparent('lapis_heroi.png', 'lapis_heroi_trans.png');
