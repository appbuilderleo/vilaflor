import fs from 'node:fs';
import path from 'node:path';

const photoUrls = JSON.parse(fs.readFileSync('e:/Art DPIC/projectos/vilaflor/verified_listing_photos.json', 'utf-8'));
const outDir = 'e:/Art DPIC/projectos/vilaflor/public/images/vila-flor/original';

fs.mkdirSync(outDir, { recursive: true });

async function downloadAll() {
  console.log(`Starting download of ${photoUrls.length} photos...`);
  const results = [];

  for (let i = 0; i < photoUrls.length; i++) {
    const url = photoUrls[i];
    const filename = `photo_${String(i + 1).padStart(2, '0')}_${path.basename(url)}`;
    const dest = path.join(outDir, filename);

    if (fs.existsSync(dest) && fs.statSync(dest).size > 1000) {
      console.log(`[${i + 1}/${photoUrls.length}] Already downloaded: ${filename}`);
      results.push({ index: i + 1, url, filename, size: fs.statSync(dest).size });
      continue;
    }

    try {
      const res = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      });
      if (!res.ok) {
        console.error(`Failed ${url}: ${res.status}`);
        continue;
      }
      const buffer = Buffer.from(await res.arrayBuffer());
      fs.writeFileSync(dest, buffer);
      console.log(`[${i + 1}/${photoUrls.length}] Downloaded ${filename} (${(buffer.length / 1024).toFixed(1)} KB)`);
      results.push({ index: i + 1, url, filename, size: buffer.length });
    } catch (err) {
      console.error(`Error downloading ${url}:`, err);
    }
  }

  fs.writeFileSync('e:/Art DPIC/projectos/vilaflor/downloaded_photos.json', JSON.stringify(results, null, 2), 'utf-8');
  console.log('Finished downloading photos. Total:', results.length);
}

downloadAll();

