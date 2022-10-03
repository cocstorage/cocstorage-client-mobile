import { ChangeEvent, MouseEvent } from 'react';

import { ThemeMode } from 'cocstorage-ui/dist/types';
import { useRecoilState } from 'recoil';

import { commonThemeState } from '@recoil/common/atoms';

import { Flexbox, Radio, Typography } from 'cocstorage-ui';

import { MyThemeHead, MyThemeHeader } from '@components/pages/myTheme';
import GeneralTemplate from '@components/templeates/GeneralTemplate';

function MyTheme() {
  const [theme, setTheme] = useRecoilState(commonThemeState);

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    const dataThemeType = event.currentTarget.getAttribute('data-theme-type') as ThemeMode;

    setTheme(dataThemeType);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();

    setTheme(event.currentTarget.value as ThemeMode);
  };

  return (
    <>
      <MyThemeHead />
      <GeneralTemplate header={<MyThemeHeader />}>
        <Flexbox direction="vertical" gap={20} customStyle={{ padding: '20px 0' }}>
          <Flexbox justifyContent="space-between" data-theme-type="light" onClick={handleClick}>
            <Typography fontWeight="medium">라이트 모드</Typography>
            <Radio value="light" onChange={handleChange} checked={theme === 'light'} />
          </Flexbox>
          <Flexbox justifyContent="space-between" data-theme-type="dark" onClick={handleClick}>
            <Typography fontWeight="medium">다크 모드</Typography>
            <Radio value="dark" onChange={handleChange} checked={theme === 'dark'} />
          </Flexbox>
          <Flexbox justifyContent="space-between" data-theme-type="system" onClick={handleClick}>
            <Typography fontWeight="medium">시스템 기본</Typography>
            <Radio value="system" onChange={handleChange} checked={theme === 'system'} />
          </Flexbox>
        </Flexbox>
      </GeneralTemplate>
    </>
  );
}

export default MyTheme;
