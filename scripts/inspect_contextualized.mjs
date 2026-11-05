import fs from 'node:fs';

const raw = fs.readFileSync('e:/Art DPIC/projectos/vilaflor/deferred_state.json', 'utf-8');
const data = JSON.parse(raw);

const node = data.niobeClientData[0][1].data.node;
console.log('node keys:', Object.keys(node));

if (node.contextualizedMedia) {
  console.log('contextualizedMedia keys:', Object.keys(node.contextualizedMedia));
  fs.writeFileSync('e:/Art DPIC/projectos/vilaflor/contextualized_media.json', JSON.stringify(node.contextualizedMedia, null, 2), 'utf-8');
}

// Let's inspect sections in pdpSections or similar
for (const key of Object.keys(node)) {
  if (key.includes('Section') || key.includes('pdp') || key.includes('presentation')) {
    console.log('Interesting key:', key);
  }
}

