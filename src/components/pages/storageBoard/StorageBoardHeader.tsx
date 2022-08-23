import styled from '@emotion/styled';
import { Avatar, Box, Flexbox, Icon, IconButton, Typography } from 'cocstorage-ui';

function StorageBoardHeader() {
  return (
    <Box component="header" customStyle={{ height: 50 }}>
      <StyledStorageBoardHeader>
        <IconButton>
          <Icon name="CaretSemiLeftOutlined" />
        </IconButton>
        <Typography variant="h4" fontWeight="bold" noWrap customStyle={{ flex: 1 }}>
          호나우두 vs 호날두 축구 기량 평가 호나우두 vs 호날두 축구 기량 평가 호나우두 vs 호날두
          축구 기량 평가...
        </Typography>
        <Flexbox gap={10} alignment="center">
          <Avatar
            width={24}
            height={24}
            src="https://static.cocstorage.com/images/xt868xt2w6i50bf4x98xdsbfado3"
            alt="Storage Logo Img"
            round
            customStyle={{ marginLeft: 10 }}
          />
          <IconButton>
            <Icon name="MoreMenuOutlined" />
          </IconButton>
        </Flexbox>
      </StyledStorageBoardHeader>
    </Box>
  );
}

const StyledStorageBoardHeader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
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

export default StorageBoardHeader;
