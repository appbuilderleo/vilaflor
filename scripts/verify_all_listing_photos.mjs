import fs from 'node:fs';

const html = fs.readFileSync('e:/Art DPIC/projectos/vilaflor/airbnb.html', 'utf-8');

const regex = /https:\/\/a0\.muscache\.com\/im\/pictures\/[^\s"'<>]+/gi;
const all = [...new Set(html.match(regex) || [])];

const listingPhotos = new Set();

for (let u of all) {
  u = u.replace(/&amp;/g, '&');
  if (u.includes('1133096153786064159') || u.includes('MTEzMzA5NjE1Mzc4NjA2NDE1OQ')) {
    // clean url to original
    let clean = u.split('?')[0];
    clean = clean.replace(/%3D/g, '=');
    listingPhotos.add(clean);
  }
}

console.log('Total verified listing property photos:', listingPhotos.size);
const list = [...listingPhotos];
fs.writeFileSync('e:/Art DPIC/projectos/vilaflor/verified_listing_photos.json', JSON.stringify(list, null, 2), 'utf-8');

for (let i = 0; i < list.length; i++) {
  console.log(`${i + 1}: ${list[i]}`);
}

