import axios from 'axios';

export async function fetchSitemap() {
  const { data } = await axios.get('https://api.cocstorage.com/sitemap.xml', {
    headers: {
      'X-Api-Key': process.env.X_API_KEY as string
    }
  });

  return data;
}

export async function fetchSitemapRoot() {
  const { data } = await axios.get('https://api.cocstorage.com/sitemap-root.xml', {
    headers: {
      'X-Api-Key': process.env.X_API_KEY as string
    }
  });

  return data;
}

export async function fetchSitemapMobile() {
  const { data } = await axios.get('https://api.cocstorage.com/sitemap-mobile.xml', {
    headers: {
      'X-Api-Key': process.env.X_API_KEY as string
    }
  });

  return data;
}
