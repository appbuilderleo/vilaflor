import fs from 'node:fs';
import { execSync } from 'node:child_process';

const browserPaths = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe'
];

let foundBrowser = null;
for (const p of browserPaths) {
  if (fs.existsSync(p)) {
    console.log('Found browser:', p);
    foundBrowser = p;
    break;
  }
}

if (foundBrowser) {
  console.log('Taking headless screenshot with', foundBrowser);
  const outDesktop = 'e:\\Art DPIC\\projectos\\vilaflor\\preview-desktop.png';
  const outMobile = 'e:\\Art DPIC\\projectos\\vilaflor\\preview-mobile.png';

  try {
    execSync(`"${foundBrowser}" --headless --disable-gpu --window-size=1440,900 --screenshot="${outDesktop}" http://127.0.0.1:3000/index.html`);
    console.log('Desktop screenshot saved to', outDesktop);

    execSync(`"${foundBrowser}" --headless --disable-gpu --window-size=375,812 --screenshot="${outMobile}" http://127.0.0.1:3000/index.html`);
    console.log('Mobile screenshot saved to', outMobile);
  } catch (err) {
    console.error('Screenshot error:', err.message);
  }
} else {
  console.log('No Chromium browser found in standard paths.');
}

