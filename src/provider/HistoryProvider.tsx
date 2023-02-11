import { PropsWithChildren, ReactElement, useCallback, useEffect } from 'react';

import { useRouter } from 'next/router';

import { useRecoilState, useSetRecoilState } from 'recoil';

import {
  commonForwardPathState,
  commonHistoryState,
  commonIsGoBackState
} from '@recoil/common/atoms';

import getPathNameByUrl from '@utils/getPathNameByUrl';

const serverSidePages = [
  '/',
  '/notices',
  '/notices/[id]',
  '/storages',
  '/storages/[path]',
  '/storages/[path]/[id]',
  '/storages/[path]/post',
  '/best',
  '/worst'
];

function HistoryProvider({ children }: PropsWithChildren) {
  const router = useRouter();

  const [history, setHistoryState] = useRecoilState(commonHistoryState);
  const [isGoBack, setIsGoBack] = useRecoilState(commonIsGoBackState);
  const setForwardPathState = useSetRecoilState(commonForwardPathState);

  const handleRouteChangeStart = useCallback(
    (url: string) => {
      const pathname = getPathNameByUrl(url);
      setForwardPathState(pathname);

      if (isGoBack) {
        setHistoryState({
          index: history.index - 1,
          object: history.object.filter((arr, index) => index < history.object.length - 1)
        });
      } else {
        setHistoryState({
          index: history.index + 1,
          object: [...history.object, pathname]
        });
      }
    },
    [setForwardPathState, setHistoryState, isGoBack, history]
  );

  const handleRouteChangeComplete = useCallback(() => {
    if (isGoBack) {
      setIsGoBack(false);
    }
  }, [setIsGoBack, isGoBack]);

  useEffect(() => {
    setForwardPathState(router.pathname);
  }, [setForwardPathState, router.pathname]);

  useEffect(() => {
    router.beforePopState(() => {
      setIsGoBack(true);
      if (serverSidePages.indexOf(history.object[history.index - 1]) > -1)
        document.cookie = 'isGoBack=true;path=/';

      return true;
    });
  }, [setIsGoBack, router, history]);

  useEffect(() => {
    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, [handleRouteChangeComplete, handleRouteChangeStart, router]);

  return children as ReactElement;
}

export default HistoryProvider;
