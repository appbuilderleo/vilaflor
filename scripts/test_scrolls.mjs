import { execSync } from 'node:child_process';
import http from 'node:http';

const browser = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

// We can take screenshots of pages or fragments using a tiny test script
const offsets = [
  { name: 'section_house_rooms', y: 1000 },
  { name: 'section_experiences_atmosphere', y: 2200 },
  { name: 'section_gallery', y: 3400 },
  { name: 'section_reputation_location', y: 4600 }
];

console.log('Done script definition.');

