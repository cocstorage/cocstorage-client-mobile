import Head from 'next/head';
import { useRouter } from 'next/router';

import { useQuery } from '@tanstack/react-query';

import { useTheme } from 'cocstorage-ui';

import { fetchStorage } from '@api/v1/storages';

import queryKeys from '@constants/queryKeys';

function StorageBoardsSearchHead() {
  const { query: { path = '' } = {} } = useRouter();

  const {
    theme: {
      palette: { background }
    }
  } = useTheme();

  const { data: { user, name, avatarUrl, description } = {} } = useQuery(
    queryKeys.storages.storageById(String(path)),
    () => fetchStorage(String(path))
  );

  return (
    <Head>
      <meta name="author" content={(user || {}).nickname} />
      <meta name="title" content={`${name} 검색 : 개념글 저장소`} />
      <meta name="description" content={description} />
      <meta property="og:title" content={`${name} 검색 : 개념글 저장소`} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      {avatarUrl && <meta property="og:image" content={avatarUrl} />}
      <meta property="og:url" content={`https://m.cocstorage.com/storages/${path}`} />
      <meta property="og:site_name" content="개념글 저장소" />
      <meta property="og:locale" content="ko_KR" />
      <meta property="twitter:title" content={`${name} 검색 : 개념글 저장소`} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:creator" content={(user || {}).nickname} />
      {avatarUrl && <meta property="twitter:image" content={avatarUrl} />}
      <meta property="twitter:url" content={`https://m.cocstorage.com/storages/${path}`} />
      <meta property="twitter:card" content="summary" />
      <meta name="apple-mobile-web-app-title" content={`${name} 검색 : 개념글 저장소`} />
      <meta name="theme-color" content={background.bg} />
      <meta name="msapplication-TileColor" content={background.bg} />
      <title>{`${name} 검색 : 개념글 저장소`}</title>
      <link rel="canonical" href={`https://m.cocstorage.com/storages/${path}`} />
    </Head>
  );
}

export default StorageBoardsSearchHead;
