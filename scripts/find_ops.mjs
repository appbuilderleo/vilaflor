import fs from 'node:fs';

const html = fs.readFileSync('e:/Art DPIC/projectos/vilaflor/airbnb.html', 'utf-8');

const opMatches = [...new Set(html.match(/"operationName":"([^"]+)"/g) || [])];
console.log('Operations found:', opMatches);

const shaMatches = [...new Set(html.match(/"sha256Hash":"([a-f0-9]{64})"/g) || [])];
console.log('Sha256 hashes found:', shaMatches);

