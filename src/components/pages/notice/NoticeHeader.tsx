import styled from '@emotion/styled';

import { Box, Icon, IconButton, Typography } from 'cocstorage-ui';

function NoticeHeader() {
  return (
    <Box component="header" customStyle={{ height: 50 }}>
      <StyledNoticeHeader>
        <IconButton>
          <Icon name="CaretSemiLeftOutlined" />
        </IconButton>
        <Typography variant="h4" fontWeight="bold" noWrap customStyle={{ flex: 1 }}>
          호나우두 vs 호날두 축구 기량 평가 호나우두 vs 호날두 축구 기량 평가 호나우두 vs 호날두
          축구 기량 평가...
        </Typography>
        <IconButton>
          <Icon name="MoreMenuOutlined" />
        </IconButton>
      </StyledNoticeHeader>
    </Box>
  );
}

const StyledNoticeHeader = styled.div`
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

export default NoticeHeader;
