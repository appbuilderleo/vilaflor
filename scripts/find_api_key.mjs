import fs from 'node:fs';

const html = fs.readFileSync('e:/Art DPIC/projectos/vilaflor/airbnb.html', 'utf-8');

const apiKeyMatch = html.match(/"api_config":\{"key":"([^"]+)"/i) || html.match(/"key":"([a-zA-Z0-9]{30,})"/i) || html.match(/client_id=([a-zA-Z0-9]+)/i);
console.log('API key match:', apiKeyMatch ? apiKeyMatch[1] : null);

// Also search for any "api_key"
const matches = html.match(/api_key["':\s]+([a-zA-Z0-9_\-]+)/gi);
console.log('Matches:', matches);

// Let's search for "key" in script tags
const keyMatches = html.match(/"[A-Za-z0-9_-]{32}"/g);
console.log('Candidates:', keyMatches ? keyMatches.slice(0, 5) : null);

