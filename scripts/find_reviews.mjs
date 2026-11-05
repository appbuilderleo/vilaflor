import fs from 'node:fs';

const raw = fs.readFileSync('e:/Art DPIC/projectos/vilaflor/deferred_state.json', 'utf-8');
const data = JSON.parse(raw);

const reviewList = [];
const amenitiesList = [];

function deepSearch(obj, path = '') {
  if (!obj || typeof obj !== 'object') return;

  if (obj.comments && typeof obj.comments === 'string') {
    reviewList.push({
      author: obj.author?.firstName || obj.reviewer?.firstName || 'Hóspede',
      date: obj.createdAt || obj.localizedDate || '',
      rating: obj.rating || 5,
      comments: obj.comments
    });
  }

  if (obj.title && typeof obj.title === 'string' && (obj.available !== undefined || obj.icon !== undefined)) {
    amenitiesList.push({
      title: obj.title,
      subtitle: obj.subtitle || '',
      available: obj.available
    });
  }

  // Also look for stayPDP / section / pdpPresentation items
  if (Array.isArray(obj)) {
    for (const item of obj) deepSearch(item, path);
  } else {
    for (const [k, v] of Object.entries(obj)) {
      deepSearch(v, `${path}.${k}`);
    }
  }
}

deepSearch(data);

console.log('Found reviews:', reviewList.length);
if (reviewList.length > 0) {
  console.log('Sample review:', reviewList[0]);
  fs.writeFileSync('e:/Art DPIC/projectos/vilaflor/real_reviews.json', JSON.stringify(reviewList, null, 2), 'utf-8');
}

console.log('Found amenities:', amenitiesList.length);
if (amenitiesList.length > 0) {
  console.log('Sample amenity:', amenitiesList.slice(0, 5));
  fs.writeFileSync('e:/Art DPIC/projectos/vilaflor/real_amenities.json', JSON.stringify(amenitiesList, null, 2), 'utf-8');
}

// Let's also search for any text containing "estrelas" or review author names
const reviewTokens = raw.match(/"comments":"([^"]+)"/g);
console.log('Regex "comments":', reviewTokens ? reviewTokens.length : 0);

