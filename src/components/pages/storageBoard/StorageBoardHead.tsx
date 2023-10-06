import Head from 'next/head';
import { useRouter } from 'next/router';

import { useTheme } from '@cocstorage/ui';
import { useQuery } from '@tanstack/react-query';

import { fetchStorageBoard } from '@api/v1/storage-boards';
import { fetchStorage } from '@api/v1/storages';
import queryKeys from '@constants/queryKeys';

function StorageBoardHead() {
  const { query: { path = '', id = 0 } = {} } = useRouter();

  const {
    theme: {
      palette: { background }
    }
  } = useTheme();

  const { data: { id: storageId } = {} } = useQuery(
    queryKeys.storages.storageById(String(path)),
    () => fetchStorage(String(path))
  );

  const { data: { storage, subject, user, nickname, description, thumbnailUrl } = {} } = useQuery(
    queryKeys.storageBoards.storageBoardById(Number(id)),
    () => fetchStorageBoard(Number(storageId), Number(id))
  );

  return (
    <Head>
      <meta name="author" content={nickname || (user || {}).nickname} />
      <meta name="title" content={`${subject} : ${(storage || {}).name} : 개념글 저장소`} />
      <meta name="description" content={description.trim().substring(0, 159)} />
      <meta property="og:title" content={`${subject} : ${(storage || {}).name} : 개념글 저장소`} />
      <meta property="og:description" content={description.trim().substring(0, 159)} />
      <meta property="og:type" content="article" />
      {thumbnailUrl && <meta property="og:image" content={thumbnailUrl} />}
      <meta property="og:url" content={`https://m.cocstorage.com/storages/${path}/${id}`} />
      <meta property="og:site_name" content="개념글 저장소" />
      <meta property="og:locale" content="ko_KR" />
      <meta
        property="twitter:title"
        content={`${subject} : ${(storage || {}).name} : 개념글 저장소`}
      />
      <meta property="twitter:description" content={description.trim().substring(0, 159)} />
      <meta property="twitter:creator" content={nickname || (user || {}).nickname} />
      {thumbnailUrl && <meta property="twitter:image" content={thumbnailUrl} />}
      <meta property="twitter:url" content={`https://m.cocstorage.com/storages/${path}/${id}`} />
      <meta property="twitter:card" content="summary" />
      <meta
        name="apple-mobile-web-app-title"
        content={`${subject} : ${(storage || {}).name} : 개념글 저장소`}
      />
      <meta name="theme-color" content={background.bg} />
      <meta name="msapplication-TileColor" content={background.bg} />
      <title>{`${subject} : ${(storage || {}).name} : 개념글 저장소`}</title>
      <link rel="canonical" href={`https://www.cocstorage.com/storages/${path}/${id}`} />
    </Head>
  );
}

export default StorageBoardHead;
