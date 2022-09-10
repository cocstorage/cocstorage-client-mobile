import { MouseEvent } from 'react';

import { useRouter } from 'next/router';

import { Box, Icon, Typography, useTheme } from 'cocstorage-ui';

import { NavigationItem, StyledBottomNavigation } from './BottomNavigation.styles';

export interface BottomNavigationProps {
  disableFixed?: boolean;
}

function BottomNavigation({ disableFixed }: BottomNavigationProps) {
  const router = useRouter();

  const {
    theme: {
      type,
      palette: { text }
    }
  } = useTheme();

  const handleClick = (event: MouseEvent<HTMLLIElement>) => {
    const dataPathname = event.currentTarget.getAttribute('data-pathname');
    router.push(dataPathname);
  };

  return (
    <Box component="nav" customStyle={{ minHeight: 60 }}>
      <StyledBottomNavigation disableFixed={disableFixed}>
        <NavigationItem data-pathname="/" onClick={handleClick}>
          <Icon
            name={router.pathname === '/' ? 'HomeFilled' : 'HomeOutlined'}
            color={router.pathname === '/' ? 'primary' : text[type].text2}
          />
          <Typography variant="s2" color={router.pathname === '/' ? 'primary' : text[type].text2}>
            홈
          </Typography>
        </NavigationItem>
        <NavigationItem data-pathname="/storages" onClick={handleClick}>
          <Icon
            name={router.pathname.includes('/storages') ? 'CommunityFilled' : 'CommunityOutlined'}
            color={router.pathname.includes('/storages') ? 'primary' : text[type].text2}
          />
          <Typography
            variant="s2"
            color={router.pathname.includes('/storages') ? 'primary' : text[type].text2}
          >
            게시판
          </Typography>
        </NavigationItem>
        <NavigationItem data-pathname="/setting" onClick={handleClick}>
          <Icon
            name="SettingOutlined"
            color={router.pathname === '/setting' ? 'primary' : text[type].text2}
          />
          <Typography
            variant="s2"
            color={router.pathname === '/setting' ? 'primary' : text[type].text2}
          >
            설정
          </Typography>
        </NavigationItem>
      </StyledBottomNavigation>
    </Box>
  );
}

export default BottomNavigation;
