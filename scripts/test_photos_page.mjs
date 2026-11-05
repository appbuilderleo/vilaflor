async function testPhotos() {
  const url = 'https://www.airbnb.com.br/rooms/1133096153786064159/photos';
  console.log('Fetching', url);
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7'
    }
  });
  console.log('Status:', res.status);
  const html = await res.text();
  console.log('Length:', html.length);
  
  const hostingPhotoRegex = /https:\/\/a0\.muscache\.com\/im\/pictures\/(?:miso|hosting)\/Hosting-1133096153786064159\/[a-zA-Z0-9_\-\/]+\.(?:jpeg|jpg|png|webp)/gi;
  const matches = [...new Set(html.match(hostingPhotoRegex) || [])];
  console.log('Photos in /photos:', matches.length);
  
  // also check modal=PHOTO_TOUR_SCROLLABLE
  const url2 = 'https://www.airbnb.com.br/rooms/1133096153786064159?modal=PHOTO_TOUR_SCROLLABLE';
  console.log('Fetching', url2);
  const res2 = await fetch(url2, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7'
    }
  });
  console.log('Status2:', res2.status);
  const html2 = await res2.text();
  console.log('Length2:', html2.length);
  const matches2 = [...new Set(html2.match(hostingPhotoRegex) || [])];
  console.log('Photos in modal=PHOTO_TOUR_SCROLLABLE:', matches2.length);

  // Combine all unique
  const combined = [...new Set([...matches, ...matches2])];
  console.log('Combined photos:', combined.length);
}

testPhotos();

