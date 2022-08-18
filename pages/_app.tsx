import { AppProps } from 'next/app';
import Head from 'next/head';

import { ThemeProvider } from 'cocstorage-ui';

import '@styles/base.css';

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <meta httpEquiv="content-language" content="ko" />
      </Head>
      <ThemeProvider theme="light">
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default App;
