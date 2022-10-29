import { useCallback, useEffect, useRef, useState } from 'react';

import { useRouter } from 'next/router';

import { useRecoilValue } from 'recoil';

import { commonIsGoBackState } from '@recoil/common/atoms';

import getPathNameByUrl from '@utils/getPathNameByUrl';

import { Best, Home, Notice, Notices, StorageBoard, StorageBoards, Storages, Worst } from './pages';
import { StyledPageSkeleton } from './PageSkeleton.styles';

const serverSidePages = [
  '/',
  '/notices',
  '/notices/[id]',
  '/storages',
  '/storages/[path]',
  '/storages/[path]/[id]',
  '/best',
  '/worst'
];

function PageSkeleton() {
  const router = useRouter();

  const isGoBack = useRecoilValue(commonIsGoBackState);

  const [destination, setDestination] = useState('/');
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const isLoadingTimerRef = useRef<ReturnType<typeof setTimeout>>();
  const isVisibleTimerRef = useRef<ReturnType<typeof setTimeout>>();
  const scrollTopTimerRef = useRef<ReturnType<typeof setTimeout>>();

  const handleRouteChangeStart = useCallback(
    (url: string) => {
      setIsVisible(true);

      const pathname = getPathNameByUrl(url);

      setDestination(pathname);

      if (!isGoBack) {
        if (serverSidePages.includes(pathname)) {
          isLoadingTimerRef.current = setTimeout(() => setIsLoading(true), 0);
        }
      }
    },
    [isGoBack]
  );

  const handleRouteChangeComplete = useCallback(() => {
    setIsLoading(false);

    if (!isGoBack) {
      scrollTopTimerRef.current = setTimeout(() => window.scrollTo({ top: 0 }), 120);
    }

    isVisibleTimerRef.current = setTimeout(() => {
      setIsVisible(false);
    }, 200);
  }, [isGoBack]);

  useEffect(() => {
    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, [router, handleRouteChangeComplete, handleRouteChangeStart]);

  useEffect(() => {
    return () => {
      if (isLoadingTimerRef.current) {
        clearTimeout(isLoadingTimerRef.current);
      }
      if (isVisibleTimerRef.current) {
        clearTimeout(isVisibleTimerRef.current);
      }
      if (scrollTopTimerRef.current) {
        clearTimeout(scrollTopTimerRef.current);
      }
    };
  }, []);

  if (!isVisible) return null;

  return (
    <StyledPageSkeleton isLoading={isLoading}>
      {destination === '/storages/[path]/[id]' && <StorageBoard />}
      {destination === '/' && <Home />}
      {destination === '/storages' && <Storages />}
      {destination === '/storages/[path]' && <StorageBoards />}
      {destination === '/best' && <Best />}
      {destination === '/worst' && <Worst />}
      {destination === '/notices' && <Notices />}
      {destination === '/notices/[id]' && <Notice />}
    </StyledPageSkeleton>
  );
}

export default PageSkeleton;
