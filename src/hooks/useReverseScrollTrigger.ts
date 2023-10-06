import { useEffect, useRef, useState } from 'react';

export default function useReverseScrollTrigger(trigger = true): {
  triggered: boolean;
  prevScrollY: number;
} {
  const [triggered, setTriggered] = useState(false);
  const [prevScrollY, setPrevScrollY] = useState(0);
  const prevScrollYRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const { innerHeight, scrollY } = window;

      const isNoneBounce = document.body.scrollHeight - innerHeight > scrollY;

      if (isNoneBounce) {
        if (scrollY <= 0) {
          setTriggered(true);
        } else if (prevScrollYRef.current > scrollY) {
          setTriggered(true);
        } else if (prevScrollYRef.current < scrollY) {
          setTriggered(false);
        }
      }

      prevScrollYRef.current = scrollY;
      setPrevScrollY(scrollY);
    };

    if (trigger) {
      window.addEventListener('scroll', handleScroll);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [trigger]);

  return { triggered, prevScrollY };
}
