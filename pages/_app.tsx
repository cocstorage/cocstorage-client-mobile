import { AppProps } from 'next/app';
import Head from 'next/head';

import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import dayjs from 'dayjs';
import RelativeTime from 'dayjs/plugin/relativeTime';
import { RecoilRoot } from 'recoil';

import { ErrorBoundary, FeedbackDialog, PageProgress, ThemeRoot } from '@components/UI/organisms';

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

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=0"
        />
        <meta httpEquiv="content-language" content="ko" />
      </Head>
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <RecoilRoot>
            <ThemeRoot>
              <Hydrate state={pageProps.dehydratedState}>
                <PageProgress />
                <Component {...pageProps} />
                <FeedbackDialog />
              </Hydrate>
            </ThemeRoot>
          </RecoilRoot>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ErrorBoundary>
    </>
  );
}

export default App;
