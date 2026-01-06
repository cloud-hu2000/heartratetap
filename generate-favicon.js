const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function generateFavicon() {
  try {
    // 从favicon-32x32.png生成favicon.ico
    const inputPath = path.join(__dirname, 'public', 'favicon-32x32.png');
    const outputPath = path.join(__dirname, 'public', 'favicon.ico');

    await sharp(inputPath)
      .resize(32, 32)
      .toFormat('ico')
      .toFile(outputPath);

    console.log('✅ favicon.ico generated successfully!');
  } catch (error) {
    console.error('❌ Error generating favicon.ico:', error);
  }
}

generateFavicon();
