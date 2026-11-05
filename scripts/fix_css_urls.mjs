import fs from 'node:fs';

let css = fs.readFileSync('e:/Art DPIC/projectos/vilaflor/assets/css/style.css', 'utf-8');

// Replace url('assets/images/ with url('../images/
css = css.replace(/url\(['"]?assets\/images\//g, "url('../images/");

fs.writeFileSync('e:/Art DPIC/projectos/vilaflor/assets/css/style.css', css, 'utf-8');
console.log('Fixed relative CSS image paths in style.css');

