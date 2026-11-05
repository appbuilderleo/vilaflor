import fs from 'node:fs';

const html = fs.readFileSync('e:/Art DPIC/projectos/vilaflor/airbnb.html', 'utf-8');
const files = JSON.parse(fs.readFileSync('e:/Art DPIC/projectos/vilaflor/images_dimension_inventory.json', 'utf-8'));

for (const item of files) {
  const uuid = item.file.match(/[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}/)[0];
  const idx = html.indexOf(uuid);
  let snippet = '';
  if (idx !== -1) {
    snippet = html.slice(Math.max(0, idx - 150), Math.min(html.length, idx + 250))
      .replace(/\s+/g, ' ');
  }
  item.uuid = uuid;
  item.snippet = snippet;
}

fs.writeFileSync('e:/Art DPIC/projectos/vilaflor/photo_snippets.json', JSON.stringify(files, null, 2), 'utf-8');
console.log('Saved photo_snippets.json');

