async function testEndpoints() {
  const urls = [
    'http://127.0.0.1:3000/index.html',
    'http://127.0.0.1:3000/assets/css/style.css',
    'http://127.0.0.1:3000/assets/js/main.js',
    'http://127.0.0.1:3000/assets/js/gallery-data.js',
    'http://127.0.0.1:3000/assets/js/booking.js',
    'http://127.0.0.1:3000/assets/images/vila-flor/exterior/04-beachfront-colonial-estate-lawn.webp',
    'http://127.0.0.1:3000/assets/images/vila-flor/swimming-pool/05-private-swimming-pool-and-sundeck.webp',
    'http://127.0.0.1:3000/assets/images/vila-flor/bedrooms/18-bedroom-1-master-queen-bed.webp'
  ];

  console.log('Testing endpoints...');
  for (const url of urls) {
    try {
      const res = await fetch(url);
      console.log(`[${res.status}] ${url} (${res.headers.get('content-type')}, ${res.headers.get('content-length') || 'streamed'} bytes)`);
    } catch (e) {
      console.error(`Failed ${url}:`, e.message);
    }
  }
}

testEndpoints();

