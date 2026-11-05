import fs from 'node:fs';

const html = fs.readFileSync('e:/Art DPIC/projectos/vilaflor/airbnb.html', 'utf-8');

// Look for description text, amenities, reviews
// Search for portuguese text or english text related to Vila Flor
const textRegex = /"text":"([^"]{20,})"/g;
let match;
const longTexts = new Set();
while ((match = textRegex.exec(html)) !== null) {
  const t = match[1];
  if (!t.includes('http') && !t.includes('{') && !t.includes(';') && !t.includes('\\u003c')) {
    longTexts.add(t);
  }
}

console.log('Found long texts:', longTexts.size);
fs.writeFileSync('e:/Art DPIC/projectos/vilaflor/extracted_texts.json', JSON.stringify([...longTexts], null, 2), 'utf-8');

// Also search for "html":"..."
const htmlDescRegex = /"htmlText":"([^"]+)"/g;
const htmlTexts = [];
while ((match = htmlDescRegex.exec(html)) !== null) {
  htmlTexts.push(match[1]);
}
console.log('Found htmlTexts:', htmlTexts.length);
fs.writeFileSync('e:/Art DPIC/projectos/vilaflor/extracted_html_texts.json', JSON.stringify(htmlTexts, null, 2), 'utf-8');

// Search for reviews
const reviewRegex = /"comments":"([^"]+)"/g;
const reviews = [];
while ((match = reviewRegex.exec(html)) !== null) {
  reviews.push(match[1]);
}
console.log('Found reviews:', reviews.length);
fs.writeFileSync('e:/Art DPIC/projectos/vilaflor/extracted_reviews.json', JSON.stringify(reviews, null, 2), 'utf-8');

// Search for amenities
const amenityRegex = /"title":"([^"]+)","subtitle":/g;
const amenities = [];
while ((match = amenityRegex.exec(html)) !== null) {
  amenities.push(match[1]);
}
console.log('Found amenities / titles:', amenities.length);
fs.writeFileSync('e:/Art DPIC/projectos/vilaflor/extracted_amenities.json', JSON.stringify([...new Set(amenities)], null, 2), 'utf-8');


