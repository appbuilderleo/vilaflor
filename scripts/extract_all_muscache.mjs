import fs from 'node:fs';

const html = fs.readFileSync('e:/Art DPIC/projectos/vilaflor/airbnb.html', 'utf-8');

const imgUrlRegex = /https:\/\/a0\.muscache\.com\/im\/pictures\/[^\s"'<>]+/gi;
const allMuscacheImages = [...new Set(html.match(imgUrlRegex) || [])];

console.log('Total Muscache URLs:', allMuscacheImages.length);

const cleanUrls = new Map();
for (let u of allMuscacheImages) {
  // unescape html entities like &amp;
  u = u.replace(/&amp;/g, '&');
  const base = u.split('?')[0];
  if (!cleanUrls.has(base)) {
    cleanUrls.set(base, u);
  }
}

console.log('Unique base image URLs:', cleanUrls.size);
for (const [base, full] of cleanUrls.entries()) {
  console.log(base);
}

fs.writeFileSync('e:/Art DPIC/projectos/vilaflor/all_unique_images.json', JSON.stringify([...cleanUrls.keys()], null, 2), 'utf-8');

