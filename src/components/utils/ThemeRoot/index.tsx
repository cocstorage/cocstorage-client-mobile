import { HTMLAttributes, PropsWithChildren, useCallback, useEffect, useState } from 'react';

import { useRecoilState } from 'recoil';

import { commonThemeState } from '@recoil/common/atoms';

import { ThemeMode, ThemeProvider } from 'cocstorage-ui';

type ThemeRootProps = HTMLAttributes<HTMLDivElement>;

function ThemeRoot({ children }: PropsWithChildren<ThemeRootProps>) {
  const [theme, setTheme] = useRecoilState(commonThemeState);
  const [themeMode, setThemeMode] = useState<ThemeMode>('light');

  const handleChange = useCallback(
    (event: MediaQueryListEvent) => {
      if (theme !== 'system') return;

      setThemeMode(event.matches ? 'dark' : 'light');
    },
    [setThemeMode, theme]
  );

  useEffect(() => {
    if (theme === 'system') {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(theme);
      setThemeMode(isDark ? 'dark' : 'light');
    } else {
      setThemeMode(theme);
    }
  }, [theme, setTheme]);

  useEffect(() => {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', handleChange);

    return () => {
      window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', handleChange);
    };
  }, [handleChange]);

  return <ThemeProvider theme={themeMode}>{children}</ThemeProvider>;
}

export default ThemeRoot;
