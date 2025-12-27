// Script para generar logo PNG desde SVG
// Requiere: npm install sharp
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function generateLogo() {
  const svgPath = path.join(__dirname, '../public/logo-simple.svg');
  const outputPath = path.join(__dirname, '../public/logo.png');
  const faviconPath = path.join(__dirname, '../public/favicon.png');
  
  const svgBuffer = fs.readFileSync(svgPath);
  
  // Generar logo principal (512x512)
  await sharp(svgBuffer)
    .resize(512, 512)
    .png()
    .toFile(outputPath);
  
  // Generar favicon (32x32)
  await sharp(svgBuffer)
    .resize(32, 32)
    .png()
    .toFile(faviconPath);
  
  console.log('✅ Logo generado:', outputPath);
  console.log('✅ Favicon generado:', faviconPath);
}

generateLogo().catch(console.error);

