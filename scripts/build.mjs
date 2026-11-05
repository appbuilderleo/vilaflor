import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const publicDir = path.join(root, 'public');
fs.mkdirSync(publicDir, { recursive: true });

// Ensure index.html and 404.html are in public as well
for (const file of ['index.html', '404.html']) {
  const src = path.join(root, file);
  const dest = path.join(publicDir, file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`Copied ${file} to public/${file}`);
  }
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
