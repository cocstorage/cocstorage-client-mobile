import { HTMLAttributes, PropsWithChildren, useEffect, useState } from 'react';

import { ThemeMode, ThemeProvider } from '@cocstorage/ui';
import { Global } from '@emotion/react';
import localFont from 'next/font/local';
import { useRecoilState } from 'recoil';

import { commonThemeState } from '@recoil/common/atoms';

type ThemeRootProps = HTMLAttributes<HTMLDivElement>;

const font = localFont({
  src: [
    { path: '../../../styles/fonts/MinSansVF.woff2', weight: '900' },
    { path: '../../../styles/fonts/MinSansVF.woff2', weight: '700' },
    { path: '../../../styles/fonts/MinSansVF.woff2', weight: '500' },
    { path: '../../../styles/fonts/MinSansVF.woff2', weight: '400' },
    { path: '../../../styles/fonts/MinSansVF.woff2', weight: '300' },
    { path: '../../../styles/fonts/MinSansVF.woff2', weight: '100' }
  ]
});

function ThemeRoot({ children }: PropsWithChildren<ThemeRootProps>) {
  const [theme, setTheme] = useRecoilState(commonThemeState);
  const [themeMode, setThemeMode] = useState<ThemeMode>('light');

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
    const handleChange = (event: MediaQueryListEvent) => {
      if (theme !== 'system') return;

      setThemeMode(event.matches ? 'dark' : 'light');
    };

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', handleChange);

    return () => {
      window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', handleChange);
    };
  }, [theme]);

  return (
    <ThemeProvider theme={themeMode}>
      <Global
        styles={{
          body: {
            fontFamily: `${font.style.fontFamily}, -apple-system, BlinkMacSystemFont, Helvetica Neue, Apple SD Gothic Neo, Malgun Gothic, 맑은 고딕, 나눔고딕, Nanum Gothic, Noto Sans KR, Noto Sans CJK KR, arial, 돋움, Dotum, Tahoma, Geneva, sans-serif`
          }
        }}
      />
      {children}
    </ThemeProvider>
  );
}

export default ThemeRoot;
