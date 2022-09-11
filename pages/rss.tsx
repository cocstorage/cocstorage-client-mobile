import { GetServerSidePropsContext } from 'next';

import { fetchRSS } from '@api/rss';

function RSSMobile() {
  return null;
}

export async function getServerSideProps({ res }: GetServerSidePropsContext) {
  const xml = await fetchRSS();

  res.setHeader('Content-Type', 'text/xml');
  res.write(xml);
  res.end();

  return {
    props: {}
  };
}

export default RSSMobile;
