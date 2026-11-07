const { Jimp } = require('jimp');

async function cropPencil() {
  const img = await Jimp.read('c:/Users/Admin/Downloads/Criança Segurando Livro (1)/WhatsApp Image 2026-11-06 at 19.00.38.jpeg');
  // Crop around Lapis Heroi
  const cropped = img.clone().crop({ x: 540, y: 640, w: 160, h: 180 });
  await cropped.write('lapis_crop_test.png');
  console.log('Saved lapis_crop_test.png');
}
cropPencil();
