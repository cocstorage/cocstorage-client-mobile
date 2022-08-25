import styled from '@emotion/styled';
import { Box, Icon, IconButton, Typography } from 'cocstorage-ui';

function NoticesHeader() {
  return (
    <Box component="header" customStyle={{ height: 50 }}>
      <StyledNoticesHeader>
        <IconButton>
          <Icon name="CaretSemiLeftOutlined" />
        </IconButton>
        <Typography variant="h4" fontWeight="bold">
          새로운 소식
        </Typography>
      </StyledNoticesHeader>
    </Box>
  );
}

const StyledNoticesHeader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
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

export default NoticesHeader;
