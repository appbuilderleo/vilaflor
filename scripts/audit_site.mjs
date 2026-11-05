import fs from 'node:fs';
import path from 'node:path';

const html = fs.readFileSync('e:/Art DPIC/projectos/vilaflor/index.html', 'utf-8');
const js = fs.readFileSync('e:/Art DPIC/projectos/vilaflor/assets/js/main.js', 'utf-8');
const css = fs.readFileSync('e:/Art DPIC/projectos/vilaflor/assets/css/style.css', 'utf-8');
const gallery = fs.readFileSync('e:/Art DPIC/projectos/vilaflor/assets/js/gallery-data.js', 'utf-8');

// 1. Check for banned stock words
const bannedWords = ['leverage', 'seamless', 'empower', 'unlock', 'robust', 'actionable', 'data-driven', 'solutions', 'testament', 'delve', 'elevate'];
console.log('--- AUDIT 1: BANNED STOCK WORDS ---');
for (const word of bannedWords) {
  const regex = new RegExp(`\\b${word}\\b`, 'gi');
  const matches = html.match(regex);
  if (matches) {
    console.error(`FOUND BANNED WORD "${word}" in index.html (${matches.length} times)!`);
  }
}

// 2. Check for em dashes
console.log('--- AUDIT 2: EM DASHES ---');
const emDashRegex = /—/g;
const emMatchesHtml = html.match(emDashRegex);
const emMatchesGallery = gallery.match(emDashRegex);
if (emMatchesHtml) {
  console.warn(`Found ${emMatchesHtml.length} em dashes in index.html. Need to replace with comma, period, or hyphen!`);
}
if (emMatchesGallery) {
  console.warn(`Found ${emMatchesGallery.length} em dashes in gallery-data.js. Need to replace!`);
}

// 3. Verify all image paths referenced in gallery-data.js exist on disk
console.log('--- AUDIT 3: IMAGE PATHS EXISTENCE ---');
const galleryData = JSON.parse(fs.readFileSync('e:/Art DPIC/projectos/vilaflor/gallery_inventory.json', 'utf-8'));
let missingCount = 0;
for (const item of galleryData) {
  const webpDisk = path.join('e:/Art DPIC/projectos/vilaflor', item.webpPath);
  const thumbDisk = path.join('e:/Art DPIC/projectos/vilaflor', item.thumbPath);
  const jpegDisk = path.join('e:/Art DPIC/projectos/vilaflor', item.jpegPath);

  if (!fs.existsSync(webpDisk)) {
    console.error('Missing WebP:', webpDisk);
    missingCount++;
  }
  if (!fs.existsSync(thumbDisk)) {
    console.error('Missing Thumb:', thumbDisk);
    missingCount++;
  }
  if (!fs.existsSync(jpegDisk)) {
    console.error('Missing JPEG:', jpegDisk);
    missingCount++;
  }
}
console.log(`Verified ${galleryData.length * 3} files. Missing: ${missingCount}`);

// 4. Verify hero background exists
const heroBgPath = 'e:/Art DPIC/projectos/vilaflor/assets/images/vila-flor/exterior/04-beachfront-colonial-estate-lawn.webp';
console.log('Hero background exists:', fs.existsSync(heroBgPath));


