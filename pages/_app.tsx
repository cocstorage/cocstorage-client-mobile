import { AppProps } from 'next/app';
import Head from 'next/head';

import { DehydratedState, Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import dayjs from 'dayjs';
import RelativeTime from 'dayjs/plugin/relativeTime';
import { RecoilRoot } from 'recoil';

import { FeedbackDialog, PageSkeleton } from '@components/UI/organisms';
import { ErrorBoundary, GoogleScript, ThemeRoot } from '@components/utils';

import HistoryProvider from '@provider/HistoryProvider';

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
      retry: 1,
      staleTime: 1000 * 60
    }
  }
});

function App({ Component, pageProps }: AppProps<{ dehydratedState: DehydratedState }>) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=0"
        />
        <meta httpEquiv="content-language" content="ko" />
        <meta name="keywords" content="커뮤니티" />
        <link rel="apple-touch-icon" sizes="57x57" href="/icons/apple-icon-57x57.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/icons/apple-icon-60x60.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/icons/apple-icon-72x72.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/icons/apple-icon-76x76.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="/icons/apple-icon-114x114.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/icons/apple-icon-120x120.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/icons/apple-icon-144x144.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/icons/apple-icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-icon-180x180.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/icons/android-icon-512x512.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icons/android-icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/icons/favicon-96x96.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
        <link rel="shortcut icon" href="/icons/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="msapplication-TileImage" content="/icons/ms-icon-144x144.png" />
      </Head>
      <GoogleScript />
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <ThemeRoot>
            <Hydrate state={pageProps.dehydratedState}>
              <ErrorBoundary>
                <HistoryProvider>
                  <PageSkeleton />
                  <Component {...pageProps} />
                  <FeedbackDialog />
                </HistoryProvider>
              </ErrorBoundary>
            </Hydrate>
          </ThemeRoot>
        </RecoilRoot>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

export default App;
