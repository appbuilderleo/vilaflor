import fs from 'node:fs';

const items = JSON.parse(fs.readFileSync('e:/Art DPIC/projectos/vilaflor/photo_snippets.json', 'utf-8'));

for (let i = 0; i < items.length; i++) {
  const it = items[i];
  const alt = it.snippet.match(/alt="([^"]+)"/)?.[1] || '';
  const cap = it.snippet.match(/"caption":"([^"]+)"/)?.[1] || '';
  const label = it.snippet.match(/"accessibilityLabel":"([^"]+)"/)?.[1] || '';
  console.log(`${String(i + 1).padStart(2, '0')}: ${it.file.slice(0, 30)}... | Alt: ${alt} | Cap: ${cap} | Acc: ${label}`);
}

