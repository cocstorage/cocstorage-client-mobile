import { useEffect, useRef, useState } from 'react';

import { useRouter } from 'next/router';

import { useRecoilState, useSetRecoilState } from 'recoil';

import styled from '@emotion/styled';

import { commonForwardPathState, commonHistoryState } from '@recoil/common/atoms';

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

  const [destination, setDestination] = useState('/');
  const [isLoading, setIsLoading] = useState(false);
  const [isReturning, setIsReturning] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const [history, setHistoryState] = useRecoilState(commonHistoryState);
  const setForwardPathState = useSetRecoilState(commonForwardPathState);

  const isLoadingTimerRef = useRef<ReturnType<typeof setTimeout>>();
  const isVisibleTimerRef = useRef<ReturnType<typeof setTimeout>>();
  const scrollTopTimerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    setForwardPathState(router.pathname);
  }, [setForwardPathState, router.pathname]);

  useEffect(() => {
    const handleRouteChangeStart = (url: string) => {
      setIsVisible(true);

      const pathname = getAsPath(url);

      if (isReturning) {
        setHistoryState({
          index: history.index - 1,
          object: history.object.filter((arr, index) => index < history.object.length - 1)
        });
      } else {
        setHistoryState({
          index: history.index + 1,
          object: [...history.object, pathname]
        });
        if (serverSidePages.indexOf(pathname) > -1) {
          isLoadingTimerRef.current = setTimeout(() => setIsLoading(true), 0);
        }
      }
      setDestination(pathname);
      setForwardPathState(pathname);
    };

    const handleRouteChangeComplete = () => {
      setIsLoading(false);

      if (isReturning) {
        setIsReturning(false);
      } else {
        scrollTopTimerRef.current = setTimeout(() => window.scrollTo({ top: 0 }), 120);
      }

      isVisibleTimerRef.current = setTimeout(() => {
        setIsVisible(false);
      }, 200);
    };

    router.beforePopState(() => {
      setIsReturning(true);
      if (serverSidePages.indexOf(history.object[history.index - 1]) > -1)
        document.cookie = 'isReturning=true;path=/';

      return true;
    });

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, [setForwardPathState, setHistoryState, history, isReturning, router]);

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
  pointer-events: ${({ isLoading }) => (isLoading ? '' : 'none')};
  opacity: ${({ isLoading }) => (isLoading ? '1' : '0')};
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

    opacity: ${({ theme: { mode } }) => (mode === 'dark' ? '0.6' : '0.45')};
  }
`;

export default PageSkeleton;
