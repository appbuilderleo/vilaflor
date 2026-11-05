import fs from 'node:fs';

let content = fs.readFileSync('e:/Art DPIC/projectos/vilaflor/assets/js/gallery-data.js', 'utf-8');

// Replace all em dashes with hyphen or colon
content = content.replace(/—/g, '-');

fs.writeFileSync('e:/Art DPIC/projectos/vilaflor/assets/js/gallery-data.js', content, 'utf-8');
console.log('Replaced em dashes in gallery-data.js');

