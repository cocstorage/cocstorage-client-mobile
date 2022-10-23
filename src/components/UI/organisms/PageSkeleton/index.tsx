import { useCallback, useEffect, useRef, useState } from 'react';

import { useRouter } from 'next/router';

import { useRecoilValue } from 'recoil';

import styled from '@emotion/styled';

import { commonIsGoBackState } from '@recoil/common/atoms';

import getAsPath from '@utils/getAsPath';

import { Best, Home, Notice, Notices, StorageBoard, StorageBoards, Storages, Worst } from './pages';

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
  const wrapperRef = useRef<HTMLDivElement>(null);

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

      const pathname = getAsPath(url);

      setDestination(pathname);

      if (!isGoBack) {
        if (serverSidePages.indexOf(pathname) > -1) {
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
    <SkeletonWrapper ref={wrapperRef} isLoading={isLoading}>
      {destination === '/storages/[path]/[id]' && <StorageBoard />}
      {destination === '/' && <Home />}
      {destination === '/storages' && <Storages />}
      {destination === '/storages/[path]' && <StorageBoards />}
      {destination === '/best' && <Best />}
      {destination === '/worst' && <Worst />}
      {destination === '/notices' && <Notices />}
      {destination === '/notices/[id]' && <Notice />}
    </SkeletonWrapper>
  );
}

const SkeletonWrapper = styled.div<{
  isLoading?: boolean;
}>`
  position: fixed;
  overflow-x: hidden;
  overflow-y: auto;
  z-index: 5;
  width: 100%;
  height: 100%;
  transition: opacity 0.2s;
  pointer-events: ${({ isLoading }) => (isLoading ? 'none' : 'visible')};
  touch-action: ${({ isLoading }) => (isLoading ? 'none' : 'auto')};
  opacity: ${({ isLoading }) => (isLoading ? 1 : 0)};
  background-color: ${({
    theme: {
      palette: { background }
    }
  }) => background.bg};

  &:after {
    content: '';
    top: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 7;
  }
`;

export const SkeletonGroup = styled.div`
  position: relative;

  &:after {
    content: '';
    top: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 6;

    opacity: ${({ theme: { mode } }) => (mode === 'dark' ? 0.6 : 0.45)};
  }
`;

export default PageSkeleton;
