import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const publicDir = path.join(root, 'public');
fs.mkdirSync(publicDir, { recursive: true });

// Ensure index.html is in public as well
const srcIndex = path.join(root, 'index.html');
const destIndex = path.join(publicDir, 'index.html');
if (fs.existsSync(srcIndex)) {
  fs.copyFileSync(srcIndex, destIndex);
  console.log('Copied index.html to public/index.html');
}

// Copy assets to public/assets as well
function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

const srcAssets = path.join(root, 'assets');
const destAssets = path.join(publicDir, 'assets');
if (fs.existsSync(srcAssets)) {
  copyDir(srcAssets, destAssets);
  console.log('Synced assets to public/assets');
}

console.log('Vila Flor build complete for Vercel!');
