import fs from 'node:fs';

const html = fs.readFileSync('e:/Art DPIC/projectos/vilaflor/airbnb.html', 'utf-8');

// Find all UUIDs that look like photo filenames: [a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}
const uuidRegex = /([a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12})/gi;
const allUuids = [...new Set(html.match(uuidRegex) || [])];
console.log('Total unique UUIDs in airbnb.html:', allUuids.length);

// Check which of these UUIDs appear in a muscache url or photo context
const photoUuids = [];
for (const uuid of allUuids) {
  if (html.includes(`${uuid}.jpeg`) || html.includes(`${uuid}.jpg`) || html.includes(`${uuid}.png`)) {
    photoUuids.push(uuid);
  }
}
console.log('UUIDs with image extensions:', photoUuids.length);

// Also search for any "picture" or "photo" or "thumbnail" in deferred_state.json
const raw = fs.readFileSync('e:/Art DPIC/projectos/vilaflor/deferred_state.json', 'utf-8');
const deferredUuids = [];
for (const uuid of allUuids) {
  if (raw.includes(uuid)) {
    deferredUuids.push(uuid);
  }
}
console.log('UUIDs inside deferred_state.json:', deferredUuids.length);

// Let's inspect all occurrences of "Hosting-1133096153786064159"
const hostingOccurrences = [...new Set(html.match(/\/Hosting-1133096153786064159\/[^\s"']+/g) || [])];
console.log('Hosting occurrences:', hostingOccurrences.length);
console.log(hostingOccurrences);

