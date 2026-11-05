import fs from 'node:fs';

const raw = fs.readFileSync('e:/Art DPIC/projectos/vilaflor/deferred_state.json', 'utf-8');
const data = JSON.parse(raw);
const node = data.niobeClientData[0][1].data.node;

console.log('--- LISTING METADATA ---');
console.log('Person Capacity:', node.personCapacity);
console.log('Property Type:', node.propertyType);
console.log('Space Type:', node.spaceType);
console.log('Description:', node.description);
console.log('Metadata Description:', node.metadataDescription);
console.log('Location:', JSON.stringify(node.location, null, 2));
console.log('Primary Host:', JSON.stringify(node.contextualPrimaryHost, null, 2));
console.log('Listing Rating Stats:', JSON.stringify(node.listingRatingStats, null, 2));
console.log('Guest Favorites:', JSON.stringify(node.contextualizedGuestFavorites, null, 2));

// Rooms
console.log('Nav Property Rooms:', JSON.stringify(node.navPropertyRooms, null, 2));

// Media Edges
const edges = node.contextualizedMedia?.edges || [];
console.log('Media edges count:', edges.length);

const photosDetailed = [];
for (const edge of edges) {
  const item = edge.node;
  if (item) {
    photosDetailed.push({
      id: item.id,
      caption: item.caption,
      accessibilityLabel: item.accessibilityLabel,
      baseUrl: item.baseUrl,
      largeUrl: item.largeUrl,
      aspectRatio: item.aspectRatio,
      orientation: item.orientation
    });
  }
}

fs.writeFileSync('e:/Art DPIC/projectos/vilaflor/photos_detailed.json', JSON.stringify(photosDetailed, null, 2), 'utf-8');
console.log('Saved photos_detailed.json with', photosDetailed.length, 'photos');

// Also pdpPresentation sections
const pdpSections = node.pdpPresentation?.pdpSectionsRequest?.pdpSections || [];
console.log('PDP sections count:', pdpSections.length);
const sectionTitles = [];
for (const s of pdpSections) {
  sectionTitles.push(s.sectionComponentType || s.sectionId || s.__typename);
}
console.log('Section types:', sectionTitles);

// Save complete extracted listing info
fs.writeFileSync('e:/Art DPIC/projectos/vilaflor/extracted_listing_info.json', JSON.stringify({
  personCapacity: node.personCapacity,
  propertyType: node.propertyType,
  spaceType: node.spaceType,
  description: node.description,
  metadataDescription: node.metadataDescription,
  location: node.location,
  host: node.contextualPrimaryHost,
  ratingStats: node.listingRatingStats,
  guestFavorites: node.contextualizedGuestFavorites,
  rooms: node.navPropertyRooms,
  pdpSections: node.pdpPresentation
}, null, 2), 'utf-8');

