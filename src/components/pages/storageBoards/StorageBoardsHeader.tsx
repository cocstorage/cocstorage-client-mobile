import styled from '@emotion/styled';

import { Avatar, Box, Flexbox, Icon, IconButton, Typography, useTheme } from 'cocstorage-ui';

function StorageBoardsHeader() {
  const {
    theme: {
      type,
      palette: { text }
    }
  } = useTheme();
  return (
    <Box component="header" customStyle={{ height: 50 }}>
      <StyledStorageBoardsHeader>
        <Flexbox alignment="center" customStyle={{ flex: 1, minWidth: 0 }}>
          <IconButton>
            <Icon name="CaretSemiLeftOutlined" />
          </IconButton>
          <Avatar
            width={24}
            height={24}
            src="https://static.cocstorage.com/images/xt868xt2w6i50bf4x98xdsbfado3"
            alt="Storage Logo Img"
            round
          />
          <Typography
            variant="h4"
            fontWeight="bold"
            noWrap
            customStyle={{ marginLeft: 10, flex: '0 auto' }}
          >
            인터넷 방송
          </Typography>
          <IconButton customStyle={{ marginLeft: 4 }}>
            <Icon name="InfoOutlined" width={16} height={16} color={text[type].text1} />
          </IconButton>
        </Flexbox>
        <Flexbox gap={10} alignment="center">
          <IconButton>
            <Icon name="StarOutlined" />
          </IconButton>
          <IconButton>
            <Icon name="MoreMenuOutlined" />
          </IconButton>
        </Flexbox>
      </StyledStorageBoardsHeader>
    </Box>
  );
}

const StyledStorageBoardsHeader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 50px;
  padding: 0 20px;
  background-color: ${({
    theme: {
      palette: { background }
    }
  }) => background.bg};
  z-index: 1;
`;

export default StorageBoardsHeader;
