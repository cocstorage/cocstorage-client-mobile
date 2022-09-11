import { useEffect, useMemo, useRef, useState } from 'react';

import { useRouter } from 'next/router';

import { createPortal } from 'react-dom';

import { LinearProgress } from 'cocstorage-ui';

function PageProgress() {
  const router = useRouter();
  const [value, setValue] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [hide, setHide] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  const portalRef = useRef<HTMLElement | null>(null);

  const progressingTimerRef = useRef<ReturnType<typeof setInterval>>();
  const progressingDoneTimerRef = useRef<ReturnType<typeof setTimeout>>();
  const valueInitializeTimerRef = useRef<ReturnType<typeof setTimeout>>();

  const opacity = useMemo(() => {
    if (isDone) return 0;
    if (hide) return 0;
    return 1;
  }, [hide, isDone]);

  const handleRouteChangeStart = () => {
    setIsDone(false);
    setHide(false);
    setValue(0);

    if (progressingTimerRef.current) {
      clearInterval(progressingTimerRef.current);
    }
    if (progressingDoneTimerRef.current) {
      clearTimeout(progressingDoneTimerRef.current);
    }
    if (valueInitializeTimerRef.current) {
      clearTimeout(valueInitializeTimerRef.current);
    }

    progressingTimerRef.current = setInterval(() => {
      setValue((prevValue) => {
        if (prevValue >= 100) {
          return 100;
        }
        const diff = Math.random() * 5;
        return Math.min(prevValue + diff, 100);
      });
    }, 300);
  };

  const handleRouteChangeComplete = () => {
    setValue(100);

    if (progressingTimerRef.current) {
      clearInterval(progressingTimerRef.current);
    }

    progressingDoneTimerRef.current = setTimeout(() => {
      setIsDone(true);

      valueInitializeTimerRef.current = setTimeout(() => setValue(0), 500);
    }, 300);
  };

  useEffect(() => {
    let pageProgress = document.getElementById('page-progress-root');

    if (!pageProgress) {
      pageProgress = document.createElement('div');
      pageProgress.id = 'page-progress-root';
      pageProgress.style.position = 'fixed';
      pageProgress.style.top = '0';
      pageProgress.style.left = '0';
      pageProgress.style.width = '100%';
      pageProgress.style.zIndex = '2';

      document.body.appendChild(pageProgress);
    }

    portalRef.current = pageProgress;

    setIsMounted(true);
  }, []);

  useEffect(() => {
    router.events.on('routeChangeStart', handleRouteChangeStart);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
    };
  }, [router.events]);

  useEffect(() => {
    router.events.on('routeChangeComplete', handleRouteChangeComplete);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, [router.events]);

  useEffect(() => {
    return () => {
      if (progressingTimerRef.current) {
        clearInterval(progressingTimerRef.current);
      }

      if (progressingDoneTimerRef.current) {
        clearTimeout(progressingDoneTimerRef.current);
      }

      if (valueInitializeTimerRef.current) {
        clearTimeout(valueInitializeTimerRef.current);
      }
    };
  }, []);

  if (isMounted && portalRef.current) {
    return createPortal(
      <LinearProgress
        value={value}
        customStyle={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: 2.5,
          opacity,
          transition: 'opacity .1s ease-in'
        }}
      />,
      portalRef.current
    );
  }

  return null;
}

export default PageProgress;
