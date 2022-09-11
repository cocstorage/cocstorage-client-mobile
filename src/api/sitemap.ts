import axios from 'axios';

export async function fetchSitemap() {
  const { data } = await axios.get('https://api.cocstorage.com/sitemap-mobile.xml', {
    headers: {
      'X-Api-Key': process.env.X_API_KEY as string
    }
  });

  return data;
}
