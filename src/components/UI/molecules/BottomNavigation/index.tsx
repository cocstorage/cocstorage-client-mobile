import { MouseEvent } from 'react';

import { useRouter } from 'next/router';

import { Box, Icon, Typography } from 'cocstorage-ui';

import { NavigationItem, StyledBottomNavigation } from './BottomNavigation.styles';

export interface BottomNavigationProps {
  disableFixed?: boolean;
}

function BottomNavigation({ disableFixed }: BottomNavigationProps) {
  const router = useRouter();

  const handleClick = (event: MouseEvent<HTMLLIElement>) => {
    const dataPathname = event.currentTarget.getAttribute('data-pathname');
    router.push(dataPathname);
  };

  return (
    <Box component="nav" customStyle={{ minHeight: 60 }}>
      <StyledBottomNavigation disableFixed={disableFixed}>
        <NavigationItem data-pathname="/" onClick={handleClick}>
          <Icon name="HomeFilled" color="primary" />
          <Typography variant="s2" color="primary">
            홈
          </Typography>
        </NavigationItem>
        <NavigationItem data-pathname="/storages" onClick={handleClick}>
          <Icon name="CommunityOutlined" />
          <Typography variant="s2">게시판</Typography>
        </NavigationItem>
        <NavigationItem data-pathname="/" onClick={handleClick}>
          <Icon name="UserOutlined" />
          <Typography variant="s2">프로필</Typography>
        </NavigationItem>
      </StyledBottomNavigation>
    </Box>
  );
}

export default BottomNavigation;
