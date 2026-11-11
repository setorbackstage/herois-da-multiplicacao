const API_KEY = process.env.GGCHECKOUT_API_KEY || '';
const BASE_URL = 'https://ggcheckout.app';

async function main() {
  try {
    const resMe = await fetch(`${BASE_URL}/api/me`, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    if (!resMe.ok) {
      console.error('Failed /api/me:', resMe.status, await resMe.text());
      return;
    }

    const me = await resMe.json();
    console.log('API /api/me SUCCESS:', JSON.stringify(me, null, 2));

    const businessId = me.businessId;
    const resCheckouts = await fetch(`${BASE_URL}/api/checkouts?uuidOwner=${businessId}`, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const checkouts = await resCheckouts.json();
    console.log(`Found ${checkouts.length} checkouts in new business ${businessId}:`);
    for (const c of checkouts) {
      console.log(`- ${c.title} (Price: ${c.price}, PublicId: ${c.publicId}, UID: ${c.uid || c.id})`);
    }
  } catch (err) {
    console.error('Fetch error:', err.message);
  }
}

main();
