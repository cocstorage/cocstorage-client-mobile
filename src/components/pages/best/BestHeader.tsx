import styled from '@emotion/styled';
import { Box, Icon, IconButton, Typography } from 'cocstorage-ui';

function BestHeader() {
  return (
    <Box component="header" customStyle={{ height: 50 }}>
      <StyledBestHeader>
        <IconButton>
          <Icon name="CaretSemiLeftOutlined" />
        </IconButton>
        <Typography variant="h4" fontWeight="bold">
          베스트 게시글
        </Typography>
      </StyledBestHeader>
    </Box>
  );
}

const StyledBestHeader = styled.div`
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

export default BestHeader;
