import fs from 'node:fs';
import path from 'node:path';

const root = 'e:/Art DPIC/projectos/vilaflor';
const scriptsDir = path.join(root, 'scripts');
fs.mkdirSync(scriptsDir, { recursive: true });

// Move mjs helper scripts to scripts/ except server.mjs
const files = fs.readdirSync(root);
for (const f of files) {
  if (f.endsWith('.mjs') && f !== 'server.mjs') {
    const src = path.join(root, f);
    const dest = path.join(scriptsDir, f);
    fs.renameSync(src, dest);
  }
}

// Remove temporary text and png files
const tempFiles = [
  'script_data_0.txt',
  'script_data_1.txt',
  'script_data_2.txt',
  'script_data_3.txt',
  'preview-desktop.png',
  'preview-mobile.png',
  'preview-full-desktop.png'
];

for (const tf of tempFiles) {
  const p = path.join(root, tf);
  if (fs.existsSync(p)) fs.unlinkSync(p);
}

console.log('Organized helper scripts into scripts/ and cleaned temporary files.');
