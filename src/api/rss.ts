import axios from 'axios';

export async function fetchRSS() {
  const { data } = await axios.get('https://api.cocstorage.com/rss', {
    headers: {
      'X-Api-Key': process.env.X_API_KEY as string
    }
  });

  return data;
}

export async function fetchRSSRoot() {
  const { data } = await axios.get('https://api.cocstorage.com/rss/root', {
    headers: {
      'X-Api-Key': process.env.X_API_KEY as string
    }
  });

  return data;
}

export async function fetchRSSMobile() {
  const { data } = await axios.get('https://api.cocstorage.com/rss/mobile', {
    headers: {
      'X-Api-Key': process.env.X_API_KEY as string
    }
  });

  return data;
}
