// Script para generar logo VIP PNG desde SVG (versión abstracta)
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function generateVIPLogo() {
  // Usar la versión abstracta v2 como principal
  const svgPath = path.join(__dirname, '../public/logo-vip-abstract-v2.svg');
  const outputPath = path.join(__dirname, '../public/logo.png');
  const faviconPath = path.join(__dirname, '../public/favicon.png');
  
  // Si no existe la v2, usar la abstracta, y si no existe esa, usar la original
  let svgToUse = svgPath;
  if (!fs.existsSync(svgToUse)) {
    svgToUse = path.join(__dirname, '../public/logo-vip-abstract.svg');
    if (!fs.existsSync(svgToUse)) {
      svgToUse = path.join(__dirname, '../public/logo-vip.svg');
      if (!fs.existsSync(svgToUse)) {
        console.error('❌ No se encontró ningún archivo SVG de logo');
        return;
      }
    }
  }
  
  const svgBuffer = fs.readFileSync(svgToUse);
  
  try {
    // Generar logo principal (512x512)
    await sharp(svgBuffer)
      .resize(512, 512, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 1 }
      })
      .png()
      .toFile(outputPath);
    
    console.log('✅ Logo VIP abstracto generado:', outputPath);
    
    // Generar favicon (32x32)
    await sharp(svgBuffer)
      .resize(32, 32, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 1 }
      })
      .png()
      .toFile(faviconPath);
    
    console.log('✅ Favicon VIP abstracto generado:', faviconPath);
    
    // Generar también versiones adicionales
    const logo32Path = path.join(__dirname, '../public/logo-32.png');
    await sharp(svgBuffer)
      .resize(32, 32, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 1 }
      })
      .png()
      .toFile(logo32Path);
    
    console.log('✅ Logo 32x32 generado:', logo32Path);
    
    // Generar también la versión abstracta v1
    const abstractV1Path = path.join(__dirname, '../public/logo-vip-abstract.svg');
    if (fs.existsSync(abstractV1Path)) {
      const abstractV1Buffer = fs.readFileSync(abstractV1Path);
      const abstractV1Output = path.join(__dirname, '../public/logo-abstract-v1.png');
      await sharp(abstractV1Buffer)
        .resize(512, 512, {
          fit: 'contain',
          background: { r: 0, g: 0, b: 0, alpha: 1 }
        })
        .png()
        .toFile(abstractV1Output);
      console.log('✅ Logo abstracto v1 generado:', abstractV1Output);
    }
    
  } catch (error) {
    console.error('❌ Error generando logos:', error);
  }
}

generateVIPLogo().catch(console.error);

