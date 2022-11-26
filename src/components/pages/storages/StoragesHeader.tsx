import { useSetRecoilState } from 'recoil';

import styled from '@emotion/styled';

import { commonFeedbackDialogState } from '@recoil/common/atoms';

import { Box, Icon, IconButton, Typography } from 'cocstorage-ui';

function StoragesHeader() {
  const setCommonFeedbackDialogState = useSetRecoilState(commonFeedbackDialogState);

  const handleClick = () =>
    setCommonFeedbackDialogState({
      open: true,
      title: '준비 중인 기능이에요!',
      message: '조금만 기다려주세요!'
    });

  return (
    <Box component="header" customStyle={{ height: 50 }}>
      <StyledStoragesHeader>
        <Typography component="h1" variant="h3" fontWeight="bold" noWrap customStyle={{ flex: 1 }}>
          게시판
        </Typography>
        <IconButton onClick={handleClick}>
          <Icon name="SearchOutlined" />
        </IconButton>
      </StyledStoragesHeader>
    </Box>
  );
}

const StyledStoragesHeader = styled.div`
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
  z-index: 2;
`;

export default StoragesHeader;
