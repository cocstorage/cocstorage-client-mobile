import axios from 'axios';

export async function fetchRSS() {
  const { data } = await axios.get('https://api.cocstorage.com/rss/mobile', {
    headers: {
      'X-Api-Key': process.env.X_API_KEY as string
    }
  });

  return data;
}
