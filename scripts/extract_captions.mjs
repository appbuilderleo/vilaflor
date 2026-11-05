import fs from 'node:fs';

const html = fs.readFileSync('e:/Art DPIC/projectos/vilaflor/airbnb.html', 'utf-8');

// Let's find every image tag or picture element or JSON containing these photos
const photoRegex = /https:\/\/a0\.muscache\.com\/im\/pictures\/(?:miso|hosting)\/Hosting-1133096153786064159\/[a-zA-Z0-9_\-\/]+\.(?:jpeg|jpg|png|webp)/gi;
const allPhotos = [...new Set(html.match(photoRegex) || [])];

console.log(`Found ${allPhotos.length} unique photos.`);

// Let's search around each photo in HTML to extract alt text / caption / context
const photoMetadata = [];

for (const photoUrl of allPhotos) {
  const filename = photoUrl.split('/').pop();
  const id = filename.split('.')[0];
  
  // Find where this url or id appears in html
  let idx = 0;
  let captions = [];
  while ((idx = html.indexOf(id, idx)) !== -1) {
    // take a window of 400 characters around this occurrence
    const start = Math.max(0, idx - 200);
    const end = Math.min(html.length, idx + 300);
    const snippet = html.slice(start, end);
    
    // search for alt="..." or caption="..." or accessibilityLabel="..."
    const altM = snippet.match(/alt="([^"]+)"/i);
    if (altM) captions.push(altM[1]);
    const capM = snippet.match(/"caption":"([^"]+)"/i);
    if (capM) captions.push(capM[1]);
    const accM = snippet.match(/"accessibilityLabel":"([^"]+)"/i);
    if (accM) captions.push(accM[1]);

    idx += id.length;
  }

  photoMetadata.push({
    url: photoUrl,
    filename: filename,
    captions: [...new Set(captions)]
  });
}

fs.writeFileSync('e:/Art DPIC/projectos/vilaflor/photos_with_context.json', JSON.stringify(photoMetadata, null, 2), 'utf-8');
console.log('Saved photos_with_context.json');
for (const p of photoMetadata) {
  console.log(`- ${p.filename}: ${p.captions.join(' | ') || 'No explicit alt'}`);
}

