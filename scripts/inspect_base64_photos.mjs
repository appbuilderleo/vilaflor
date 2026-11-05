import fs from 'node:fs';

const html = fs.readFileSync('e:/Art DPIC/projectos/vilaflor/airbnb.html', 'utf-8');
const files = JSON.parse(fs.readFileSync('e:/Art DPIC/projectos/vilaflor/photo_snippets.json', 'utf-8'));

const base64Indexes = [11, 12, 18, 20, 21, 22, 24, 29, 30, 31, 33, 35]; // 0-indexed

for (const idx of base64Indexes) {
  const item = files[idx];
  const uuid = item.uuid;
  const pos = html.indexOf(uuid);
  const context = html.slice(Math.max(0, pos - 300), Math.min(html.length, pos + 400));
  console.log(`--- [Photo ${idx + 1}] UUID: ${uuid} ---`);
  // search for room / space / title
  const roomMatch = context.match(/"title":"([^"]+)"/g) || [];
  const typeMatch = context.match(/"__typename":"([^"]+)"/g) || [];
  console.log('Titles near it:', roomMatch);
  console.log('Snippet:', context.slice(0, 200).replace(/\s+/g, ' '));
}

