import { RefObject, useCallback, useEffect, useState } from 'react';

interface UseScrollTriggerProps<T> {
  trigger?: boolean;
  ref?: RefObject<T>;
}

export default function useScrollTrigger<T extends HTMLElement>({
  trigger = true,
  ref
}: UseScrollTriggerProps<T>): {
  triggered: boolean;
} {
  const [triggered, setTriggered] = useState(false);
  const [fixedTop, setFixedTop] = useState(0);

  const handleScroll = useCallback(() => {
    if (!ref || !ref.current) return;

    const { top = 0 } = ref.current?.getBoundingClientRect() || {};
    const { scrollY } = window;
    const { scrollTop } = document.documentElement;

    const offsetTop = top + scrollY;

    if (offsetTop >= 0 && offsetTop < scrollTop && !triggered) {
      setTriggered(true);
      setFixedTop(offsetTop);
    } else if (scrollTop <= fixedTop && triggered) {
      setTriggered(false);
    }
  }, [triggered, fixedTop, ref]);

  useEffect(() => {
    if (trigger) {
      window.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (trigger) {
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, [trigger, handleScroll]);

  useEffect(() => {
    if (trigger) {
      window.addEventListener('load', handleScroll);
    }

    return () => {
      if (trigger) {
        window.removeEventListener('load', handleScroll);
      }
    };
  }, [trigger, handleScroll]);

  return {
    triggered
  };
}
