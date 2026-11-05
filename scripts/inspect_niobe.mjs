import fs from 'node:fs';

const raw = fs.readFileSync('e:/Art DPIC/projectos/vilaflor/deferred_state.json', 'utf-8');
const data = JSON.parse(raw);

console.log('niobeClientData keys:', Object.keys(data.niobeClientData || {}));

// Save niobeClientData queries list
if (Array.isArray(data.niobeClientData)) {
  console.log('niobeClientData is Array, length:', data.niobeClientData.length);
  for (let i = 0; i < data.niobeClientData.length; i++) {
    const item = data.niobeClientData[i];
    console.log(`Item ${i}:`, Object.keys(item));
  }
}

// Let's search strings inside the raw deferred_state
const matches = raw.match(/"(https:[^"]*muscache\.com[^"]*)"/g) || [];
console.log('Muscache matches in deferred_state:', matches.length);

const hostingMatches = raw.match(/"(https:[^"]*Hosting-1133096153786064159[^"]*)"/g) || [];
const uniqueHosting = [...new Set(hostingMatches.map(s => s.replace(/"/g, '').split('?')[0]))];
console.log('Unique Hosting-1133096153786064159 in deferred_state:', uniqueHosting.length);
console.log(uniqueHosting);

// Let's search for photo objects or media arrays
function findMedia(obj, path = '') {
  if (!obj || typeof obj !== 'object') return;
  for (const [k, v] of Object.entries(obj)) {
    if (k.toLowerCase().includes('photo') || k.toLowerCase().includes('picture') || k.toLowerCase().includes('media')) {
      console.log(`Found candidate key: ${path}.${k} (type: ${typeof v}, isArray: ${Array.isArray(v)})`);
    }
    if (typeof v === 'object' && v !== null && path.split('.').length < 6) {
      findMedia(v, `${path}.${k}`);
    }
  }
}

findMedia(data);

