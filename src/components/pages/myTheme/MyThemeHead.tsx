import Head from 'next/head';

import { useTheme } from 'cocstorage-ui';

function MyThemeHead() {
  const {
    theme: {
      palette: { background }
    }
  } = useTheme();

  return (
    <Head>
      <meta name="author" content="개념글 저장소" />
      <meta name="title" content="테마 : 개념글 저장소" />
      <meta name="description" content="개념글 저장소의 이용약관을 안내해 드려요." />
      <meta property="og:title" content="테마 : 개념글 저장소" />
      <meta property="og:description" content="개념글 저장소의 이용약관을 안내해 드려요." />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://m.cocstorage.com/my/theme" />
      <meta property="og:site_name" content="개념글 저장소" />
      <meta property="og:locale" content="ko_KR" />
      <meta property="twitter:title" content="테마 : 개념글 저장소" />
      <meta property="twitter:description" content="개념글 저장소의 이용약관을 안내해 드려요." />
      <meta property="twitter:creator" content="개념글 저장소" />
      <meta property="twitter:url" content="https://m.cocstorage.com/my/theme" />
      <meta property="twitter:card" content="summary" />
      <meta name="apple-mobile-web-app-title" content="테마 : 개념글 저장소" />
      <meta name="theme-color" content={background.bg} />
      <meta name="msapplication-TileColor" content={background.bg} />
      <title>테마 : 개념글 저장소</title>
      <link rel="canonical" href="https://m.cocstorage.com/my/theme" />
    </Head>
  );
}

export default MyThemeHead;
