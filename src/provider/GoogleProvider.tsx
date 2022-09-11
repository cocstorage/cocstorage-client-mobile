import { useCallback, useEffect } from 'react';

import { useRouter } from 'next/router';
import Script from 'next/script';

import Gtag from '@library/gtag';

function GoogleProvider() {
  const router = useRouter();

  const handleRouteChange = useCallback((url) => Gtag.pageView(url), []);

  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      router.events.on('routeChangeComplete', handleRouteChange);
      router.events.on('hashChangeComplete', handleRouteChange);
    }

    return () => {
      if (process.env.NODE_ENV !== 'production') {
        router.events.off('routeChangeComplete', handleRouteChange);
        router.events.off('hashChangeComplete', handleRouteChange);
      }
    };
  }, [router.events, handleRouteChange]);

  if (process.env.NODE_ENV !== 'production') return null;

  return (
    <>
      <Script
        async
        strategy="afterInteractive"
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5809905264951057"
        crossOrigin="anonymous"
      />
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-20GMQTM36F"
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html:
            'window.dataLayer = window.dataLayer || [];\n' +
            '  function gtag(){dataLayer.push(arguments);}\n' +
            '  gtag("js", new Date());\n' +
            '  gtag("config", "G-20GMQTM36F");'
        }}
      />
    </>
  );
}

export default GoogleProvider;
