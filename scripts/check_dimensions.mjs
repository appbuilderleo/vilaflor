import fs from 'node:fs';
import path from 'node:path';

function getJpegSize(buffer) {
  let i = 0;
  if (buffer[i] !== 0xFF || buffer[i + 1] !== 0xD8) return null; // not SOI
  i += 2;
  while (i < buffer.length) {
    if (buffer[i] !== 0xFF) { i++; continue; }
    const marker = buffer[i + 1];
    if (marker === 0xC0 || marker === 0xC2) { // SOF0 or SOF2
      const height = buffer.readUInt16BE(i + 5);
      const width = buffer.readUInt16BE(i + 7);
      return { width, height };
    }
    i += 2 + buffer.readUInt16BE(i + 2);
  }
  return null;
}

const dir = 'e:/Art DPIC/projectos/vilaflor/public/images/vila-flor/original';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jpeg') || f.endsWith('.jpg'));

const inventory = [];
for (const file of files) {
  const buf = fs.readFileSync(path.join(dir, file));
  const size = getJpegSize(buf);
  inventory.push({
    file,
    bytes: buf.length,
    width: size ? size.width : null,
    height: size ? size.height : null,
    orientation: size ? (size.width > size.height ? 'landscape' : size.width < size.height ? 'portrait' : 'square') : 'unknown'
  });
}

console.log('Sample image dimensions:');
console.log(inventory.slice(0, 10));

fs.writeFileSync('e:/Art DPIC/projectos/vilaflor/images_dimension_inventory.json', JSON.stringify(inventory, null, 2), 'utf-8');

