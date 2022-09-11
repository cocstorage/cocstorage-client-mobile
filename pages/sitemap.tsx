import { GetServerSidePropsContext } from 'next';

import { fetchSitemap } from '@api/sitemap';

function Sitemap() {
  return null;
}

export async function getServerSideProps({ res }: GetServerSidePropsContext) {
  const xml = await fetchSitemap();

  res.setHeader('Content-Type', 'text/xml');
  res.write(xml);
  res.end();

  return {
    props: {}
  };
}

export default Sitemap;
