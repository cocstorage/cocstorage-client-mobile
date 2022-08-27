import { AppProps } from 'next/app';
import Head from 'next/head';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import dayjs from 'dayjs';
import RelativeTime from 'dayjs/plugin/relativeTime';

import { ThemeProvider } from 'cocstorage-ui';

import 'dayjs/locale/ko';
import '@styles/base.css';

dayjs.locale('ko');
dayjs.extend(RelativeTime);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      retry: 1
    }
  }
});

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <meta httpEquiv="content-language" content="ko" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme="light">
          <Component {...pageProps} />
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
