import fs from 'node:fs';

const html = fs.readFileSync('e:/Art DPIC/projectos/vilaflor/airbnb.html', 'utf-8');

// Search for images
const imgRegex = /https:\/\/[^"'\s]+muscache\.com\/[^"'\s]+(?:\.jpg|\.jpeg|\.png|\.webp)/gi;
const matches = [...new Set(html.match(imgRegex) || [])];

console.log(`Found ${matches.length} unique muscache image URLs.`);

// Also search for script tags containing JSON state
const scriptRegex = /<script\b[^>]*>([\s\S]*?)<\/script>/gi;
let match;
let jsonCount = 0;

while ((match = scriptRegex.exec(html)) !== null) {
  const content = match[1];
  if (content.includes('niobeMinimalClientData') || content.includes('data-deferred-state-0') || content.includes('bootstrapData') || content.includes('Vila Flor') || content.includes('Ponta do Ouro')) {
    console.log(`Matched script containing keywords. Length: ${content.length}`);
    fs.writeFileSync(`e:/Art DPIC/projectos/vilaflor/script_data_${jsonCount++}.txt`, content.slice(0, 50000), 'utf-8');
  }
}

// Write the image URLs list
fs.writeFileSync('e:/Art DPIC/projectos/vilaflor/image_urls.json', JSON.stringify(matches, null, 2), 'utf-8');
console.log('Sample image URLs:');
console.log(matches.slice(0, 10));

