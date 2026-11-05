import fs from 'node:fs';

const html = fs.readFileSync('e:/Art DPIC/projectos/vilaflor/airbnb.html', 'utf-8');

const regex = /"caption":"([^"]+)"/g;
let m;
const captions = [];
while ((m = regex.exec(html)) !== null) {
  captions.push(m[1]);
}

console.log('Total captions found:', captions.length);
console.log(captions);

