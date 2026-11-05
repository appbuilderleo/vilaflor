const apiKey = 'd306zoyjsyarp7ifhu67rjxn52tv0t20';
const listingId = '1133096153786064159';

async function fetchReviews() {
  const url = `https://www.airbnb.com.br/api/v2/reviews?key=${apiKey}&currency=BRL&locale=pt-BR&listing_id=${listingId}&role=guest&_format=for_p3&limit=20`;
  console.log('Fetching reviews from:', url);
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        'X-Airbnb-API-Key': apiKey
      }
    });
    console.log('Status:', res.status);
    const data = await res.json();
    console.log('Reviews count:', data.reviews?.length);
    if (data.reviews && data.reviews.length > 0) {
      console.log('First review author:', data.reviews[0].author?.first_name);
      console.log('First review comments:', data.reviews[0].comments?.slice(0, 100));
      import('node:fs').then(fs => {
        fs.writeFileSync('e:/Art DPIC/projectos/vilaflor/real_reviews.json', JSON.stringify(data.reviews, null, 2), 'utf-8');
      });
    }
  } catch (e) {
    console.error('Error:', e);
  }
}

fetchReviews();

