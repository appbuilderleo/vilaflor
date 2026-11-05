import fs from 'node:fs';

const html = fs.readFileSync('e:/Art DPIC/projectos/vilaflor/airbnb.html', 'utf-8');

// Let's find JSON state blocks
const scriptRegex = /<script\b[^>]*id="([^"]*)"[^>]*>([\s\S]*?)<\/script>/gi;
let match;
const dataObjects = [];

while ((match = scriptRegex.exec(html)) !== null) {
  const [_, id, content] = match;
  try {
    const json = JSON.parse(content);
    dataObjects.push({ id, json });
    console.log(`Parsed JSON for script id: ${id}`);
  } catch (e) {
    // maybe not raw JSON
  }
}

// Let's search inside dataObjects or the raw HTML for photo items
const photoItems = [];
const photoRegex = /"baseUrl":"(https:[^"]+Hosting-1133096153786064159[^"]+)"/g;
let pMatch;
while ((pMatch = photoRegex.exec(html)) !== null) {
  photoItems.push(pMatch[1]);
}

// Also check for picture / photo objects with captions
const fullPhotoRegex = /\{"__typename":"(?:Picture|Photo|Image|ExplorePicture)"[^}]*"baseUrl":"([^"]+)"[^}]*\}/g;
let fpMatch;
const detailedPhotos = [];
while ((fpMatch = fullPhotoRegex.exec(html)) !== null) {
  try {
    detailedPhotos.push(JSON.parse(fpMatch[0]));
  } catch(e) {}
}

console.log(`Found ${photoItems.length} baseUrl photos, ${detailedPhotos.length} detailed photo objects`);

// Also extract all distinct Hosting-1133096153786064159 URLs:
const hostingPhotoRegex = /https:\/\/a0\.muscache\.com\/im\/pictures\/miso\/Hosting-1133096153786064159\/[a-zA-Z0-9_\-\/]+\.(?:jpeg|jpg|png|webp)/gi;
const allHostingPhotos = [...new Set(html.match(hostingPhotoRegex) || [])];
console.log(`Total unique Hosting-1133096153786064159 photos: ${allHostingPhotos.length}`);

fs.writeFileSync('e:/Art DPIC/projectos/vilaflor/listing_photos.json', JSON.stringify(allHostingPhotos, null, 2), 'utf-8');

// Let's search for listing details: description, section titles, reviews, rating, host
const listingDetailMatches = {};
const titleMatch = html.match(/<title>([^<]+)<\/title>/);
if (titleMatch) listingDetailMatches.title = titleMatch[1];

// Let's dump all text snippets with "Vila Flor" or description
fs.writeFileSync('e:/Art DPIC/projectos/vilaflor/listing_summary.json', JSON.stringify({
  title: listingDetailMatches.title,
  photoCount: allHostingPhotos.length,
  photos: allHostingPhotos
}, null, 2), 'utf-8');

console.log('Saved listing_summary.json');

