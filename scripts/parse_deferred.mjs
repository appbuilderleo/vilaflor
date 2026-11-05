import fs from 'node:fs';

const html = fs.readFileSync('e:/Art DPIC/projectos/vilaflor/airbnb.html', 'utf-8');

const match = html.match(/<script\b[^>]*id="data-deferred-state-0"[^>]*>([\s\S]*?)<\/script>/i);
if (!match) {
  console.log('No data-deferred-state-0 found');
  process.exit(1);
}

const data = JSON.parse(match[1]);
fs.writeFileSync('e:/Art DPIC/projectos/vilaflor/deferred_state.json', JSON.stringify(data, null, 2), 'utf-8');
console.log('Saved deferred_state.json. Keys:', Object.keys(data));

// Now recursively search for photos, reviews, descriptions, amenities
const photos = [];
const reviews = [];
let description = '';
let title = '';
let subtitle = '';
let rating = null;
let reviewCount = null;
let locationDesc = '';
let amenities = [];

function search(obj) {
  if (!obj || typeof obj !== 'object') return;

  if (obj.__typename === 'Photo' || obj.__typename === 'Picture' || obj.__typename === 'ListingPhoto') {
    if (obj.baseUrl || obj.large || obj.picture) {
      photos.push(obj);
    }
  }

  if (obj.caption && typeof obj.caption === 'string' && (obj.baseUrl || obj.pictureUrl || obj.large)) {
    photos.push(obj);
  }

  if (obj.title && typeof obj.title === 'string' && obj.title.includes('Vila Flor')) {
    title = obj.title;
  }

  if (obj.htmlDescription && obj.htmlDescription.htmlText) {
    description = obj.htmlDescription.htmlText;
  }

  if (obj.overallRating) {
    rating = obj.overallRating;
  }

  if (obj.visibleReviewCount) {
    reviewCount = obj.visibleReviewCount;
  }

  if (Array.isArray(obj)) {
    for (const item of obj) search(item);
  } else {
    for (const key of Object.keys(obj)) {
      search(obj[key]);
    }
  }
}

search(data);

console.log('Title found:', title);
console.log('Rating:', rating, 'Reviews:', reviewCount);
console.log('Photos found count:', photos.length);

// Let's filter unique photo URLs and see their captions
const uniquePhotos = new Map();
for (const p of photos) {
  const url = p.baseUrl || p.large || p.pictureUrl || p.picture;
  if (url && typeof url === 'string' && url.includes('Hosting-1133096153786064159')) {
    // clean url
    const cleanUrl = url.split('?')[0];
    if (!uniquePhotos.has(cleanUrl)) {
      uniquePhotos.set(cleanUrl, {
        url: cleanUrl,
        caption: p.caption || p.accessibilityLabel || '',
        orientation: p.orientation || '',
        id: p.id || ''
      });
    } else if (p.caption && !uniquePhotos.get(cleanUrl).caption) {
      uniquePhotos.get(cleanUrl).caption = p.caption;
    }
  }
}

const photoList = Array.from(uniquePhotos.values());
console.log(`Unique listing photos with captions: ${photoList.length}`);
fs.writeFileSync('e:/Art DPIC/projectos/vilaflor/extracted_photos.json', JSON.stringify(photoList, null, 2), 'utf-8');


