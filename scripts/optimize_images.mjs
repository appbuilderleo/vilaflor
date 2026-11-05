import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const inventory = JSON.parse(fs.readFileSync('e:/Art DPIC/projectos/vilaflor/public/images/vila-flor/inventory.json', 'utf-8'));
const baseDir = 'e:/Art DPIC/projectos/vilaflor/public/images/vila-flor';
const assetsDir = 'e:/Art DPIC/projectos/vilaflor/assets/images/vila-flor';

async function optimize() {
  console.log(`Starting image optimization & WebP generation for ${inventory.length} photos...`);
  
  for (const item of inventory) {
    const srcJpeg = path.join(baseDir, item.category, item.filename);
    const destWebp = srcJpeg.replace(/\.jpeg$/i, '.webp');
    const thumbJpeg = srcJpeg.replace(/\.jpeg$/i, '-thumb.jpeg');
    const thumbWebp = srcJpeg.replace(/\.jpeg$/i, '-thumb.webp');

    if (!fs.existsSync(srcJpeg)) {
      console.warn('Missing file:', srcJpeg);
      continue;
    }

    try {
      // 1. Generate full-res WebP
      await sharp(srcJpeg)
        .webp({ quality: 82 })
        .toFile(destWebp);

      // 2. Generate thumbnail WebP (max width 600px)
      await sharp(srcJpeg)
        .resize({ width: 600, withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(thumbWebp);

      // 3. Generate thumbnail Jpeg (max width 600px)
      await sharp(srcJpeg)
        .resize({ width: 600, withoutEnlargement: true })
        .jpeg({ quality: 80 })
        .toFile(thumbJpeg);

      // Also mirror to assetsDir
      const mirrorCategory = path.join(assetsDir, item.category);
      fs.mkdirSync(mirrorCategory, { recursive: true });
      fs.copyFileSync(srcJpeg, path.join(mirrorCategory, item.filename));
      fs.copyFileSync(destWebp, path.join(mirrorCategory, path.basename(destWebp)));
      fs.copyFileSync(thumbJpeg, path.join(mirrorCategory, path.basename(thumbJpeg)));
      fs.copyFileSync(thumbWebp, path.join(mirrorCategory, path.basename(thumbWebp)));

      console.log(`[${item.index}/${inventory.length}] Optimized: ${item.filename} -> WebP (${(fs.statSync(destWebp).size / 1024).toFixed(1)} KB)`);
    } catch (err) {
      console.error(`Error optimizing ${item.filename}:`, err);
    }
  }

  // Update inventory with webp and thumb paths
  const updatedInventory = inventory.map(item => {
    const webpFilename = item.filename.replace(/\.jpeg$/i, '.webp');
    const thumbFilename = item.filename.replace(/\.jpeg$/i, '-thumb.webp');
    return {
      ...item,
      webpFilename,
      thumbFilename,
      webpPath: `assets/images/vila-flor/${item.category}/${webpFilename}`,
      thumbPath: `assets/images/vila-flor/${item.category}/${thumbFilename}`,
      jpegPath: `assets/images/vila-flor/${item.category}/${item.filename}`
    };
  });

  fs.writeFileSync(path.join(baseDir, 'inventory.json'), JSON.stringify(updatedInventory, null, 2), 'utf-8');
  fs.writeFileSync('e:/Art DPIC/projectos/vilaflor/gallery_inventory.json', JSON.stringify(updatedInventory, null, 2), 'utf-8');
  console.log('Optimization complete!');
}

optimize();

