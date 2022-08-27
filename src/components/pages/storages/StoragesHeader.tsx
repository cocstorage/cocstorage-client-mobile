import styled from '@emotion/styled';

import { Box, Icon, IconButton, Typography } from 'cocstorage-ui';

function StoragesHeader() {
  return (
    <Box component="header" customStyle={{ height: 50 }}>
      <StyledStoragesHeader>
        <Typography variant="h3" fontWeight="bold" noWrap customStyle={{ flex: 1 }}>
          게시판
        </Typography>
        <IconButton>
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
  z-index: 1;
`;

export default StoragesHeader;
