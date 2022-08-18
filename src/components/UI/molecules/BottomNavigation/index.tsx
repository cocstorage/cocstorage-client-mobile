import { Box, Flexbox, Icon, Typography } from 'cocstorage-ui';

import { StyledBottomNavigation } from './BottomNavigation.styles';

export interface BottomNavigationProps {
  disableFixed?: boolean;
}

function BottomNavigation({ disableFixed }: BottomNavigationProps) {
  return (
    <Box component="nav" customStyle={{ minHeight: 60 }}>
      <StyledBottomNavigation disableFixed={disableFixed}>
        <Flexbox direction="vertical" gap={3} alignment="center">
          <Icon name="HomeFilled" color="primary" />
          <Typography variant="s2" color="primary">
            홈
          </Typography>
        </Flexbox>
        <Flexbox direction="vertical" gap={3} alignment="center">
          <Icon name="CommunityOutlined" />
          <Typography variant="s2">게시판</Typography>
        </Flexbox>
        <Flexbox direction="vertical" gap={3} alignment="center">
          <Icon name="UserOutlined" />
          <Typography variant="s2">프로필</Typography>
        </Flexbox>
      </StyledBottomNavigation>
    </Box>
  );
}

export default BottomNavigation;
