import { GetServerSidePropsContext } from 'next';

import { fetchRSSMobile } from '@api/rss';

function RSSMobile() {
  return null;
}

export async function getServerSideProps({ res }: GetServerSidePropsContext) {
  const xml = await fetchRSSMobile();

  res.setHeader('Content-Type', 'text/xml');
  res.write(xml);
  res.end();

  return {
    props: {}
  };
}

export default RSSMobile;
