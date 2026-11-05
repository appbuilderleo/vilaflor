import fs from 'node:fs';
import path from 'node:path';

const base = 'e:/Art DPIC/projectos/vilaflor';
const scriptsDir = path.join(base, 'scripts');
fs.mkdirSync(scriptsDir, { recursive: true });

// Clean temp chrome directories
['.chrome-tmp', '.chrome-tmp-audit', '.chrome-tmp-scrolls'].forEach(dir => {
  const p = path.join(base, dir);
  if (fs.existsSync(p)) {
    try { fs.rmSync(p, { recursive: true, force: true }); } catch(e) {}
  }
});

// Remove temp screenshot test files
['section-acomodacoes.png', 'section-avaliacoes.png', 'section-experiencias.png', 'section-galeria.png', 'section-localizacao.png'].forEach(file => {
  const p = path.join(base, file);
  if (fs.existsSync(p)) {
    try { fs.unlinkSync(p); } catch(e) {}
  }
});

console.log('Cleanup completed.');

