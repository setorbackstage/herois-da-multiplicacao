// encode_assets.js
const fs = require('fs');
const path = require('path');

const assets = {
  cover: 'c:/Users/Admin/Downloads/Criança Segurando Livro (1)/WhatsApp Image 2026-11-06 at 19.00.50.jpeg',
  logo: 'c:/Users/Admin/Downloads/Criativos/assets/logo_cropped.png',
  heroiMenino: 'c:/Users/Admin/Downloads/Criativos/assets/heroi_menino_cropped.png',
  heroiMenina: 'c:/Users/Admin/Downloads/Criativos/assets/heroi_menina_cropped.png',
  monstro: 'c:/Users/Admin/Downloads/Criativos/assets/monstro_cropped.png',
  lapisHeroi: 'c:/Users/Admin/Downloads/Criativos/assets/lapis_heroi_cropped.png'
};

const output = {};
for (const [key, p] of Object.entries(assets)) {
  const mime = p.endsWith('.jpeg') || p.endsWith('.jpg') ? 'image/jpeg' : 'image/png';
  const data = fs.readFileSync(p).toString('base64');
  output[key] = `data:${mime};base64,${data}`;
  console.log(`Encoded ${key}: ${output[key].length} chars`);
}

fs.writeFileSync('assets_base64.js', `module.exports = ${JSON.stringify(output, null, 2)};`);
console.log('Saved assets_base64.js with tightly cropped assets!');
