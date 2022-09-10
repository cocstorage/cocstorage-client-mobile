import Head from 'next/head';
import { useRouter } from 'next/router';

import { useQuery } from '@tanstack/react-query';

import { useTheme } from 'cocstorage-ui';

import { fetchNotice } from '@api/v1/notices';

import queryKeys from '@constants/queryKeys';

function NoticeHead() {
  const { query: { id } = {} } = useRouter();
  const {
    theme: {
      palette: { background }
    }
  } = useTheme();

  const { data: { user, subject = '', description = '', thumbnailUrl } = {} } = useQuery(
    queryKeys.notices.noticeById(Number(id)),
    () => fetchNotice(Number(id))
  );

  return (
    <Head>
      <meta name="author" content={(user || {}).nickname} />
      <meta name="title" content={`${subject} : 새로운 소식 : 개념글 저장소`} />
      <meta name="description" content={description.substring(0, 159)} />
      <meta property="og:title" content={`${subject} : 새로운 소식 : 개념글 저장소`} />
      <meta property="og:description" content={description.substring(0, 159)} />
      <meta property="og:type" content="article" />
      {thumbnailUrl && <meta property="og:image" content={thumbnailUrl} />}
      <meta property="og:url" content={`https://m.cocstorage.com/notices/${id}`} />
      <meta property="og:site_name" content="개념글 저장소" />
      <meta property="og:locale" content="ko_KR" />
      <meta property="twitter:title" content={`${subject} : 새로운 소식 : 개념글 저장소`} />
      <meta property="twitter:description" content={description.substring(0, 159)} />
      <meta property="twitter:creator" content={(user || {}).nickname} />
      {thumbnailUrl && <meta property="twitter:image" content={thumbnailUrl} />}
      <meta property="twitter:url" content={`https://m.cocstorage.com/notices/${id}`} />
      <meta property="twitter:card" content="summary" />
      <meta
        name="apple-mobile-web-app-title"
        content={`${subject} : 새로운 소식 : 개념글 저장소`}
      />
      <meta name="theme-color" content={background.bg} />
      <meta name="msapplication-TileColor" content={background.bg} />
      <title>{`${subject} : 새로운 소식 : 개념글 저장소`}</title>
      <link rel="canonical" href={`https://m.cocstorage.com/notices/${id}`} />
    </Head>
  );
}

export default NoticeHead;
