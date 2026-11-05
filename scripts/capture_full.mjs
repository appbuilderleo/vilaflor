import fs from 'node:fs';
import { execSync } from 'node:child_process';

const browser = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

// Take screenshot with full page or specific height
try {
  // Desktop full scroll
  execSync(`"${browser}" --headless --disable-gpu --window-size=1440,4000 --screenshot="e:\\Art DPIC\\projectos\\vilaflor\\preview-full-desktop.png" http://127.0.0.1:3000/index.html`);
  console.log('Full desktop screenshot saved');
} catch (e) {
  console.error(e.message);
}

