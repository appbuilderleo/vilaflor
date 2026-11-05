import { execSync } from 'node:child_process';

const browser = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const sections = ['acomodacoes', 'experiencias', 'galeria', 'localizacao', 'avaliacoes'];

for (const s of sections) {
  try {
    const out = `e:\\Art DPIC\\projectos\\vilaflor\\section-${s}.png`;
    execSync(`"${browser}" --headless --disable-gpu --window-size=1440,900 --screenshot="${out}" http://127.0.0.1:3000/index.html#${s}`);
    console.log(`Saved ${out}`);
  } catch (e) {
    console.error(e.message);
  }
}

