import fs from 'node:fs';

const url = 'https://www.airbnb.com.br/rooms/1133096153786064159';

async function main() {
  console.log('Fetching Airbnb listing:', url);
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7'
      }
    });

    console.log('Status:', res.status, res.statusText);
    const html = await res.text();
    console.log('HTML length:', html.length);
    fs.writeFileSync('e:/Art DPIC/projectos/vilaflor/airbnb.html', html, 'utf-8');
    console.log('Saved to airbnb.html');
  } catch (err) {
    console.error('Error fetching:', err);
  }
}

main();

