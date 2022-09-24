import { useRouter } from 'next/router';

import styled from '@emotion/styled';

import { Box, Icon, IconButton, Typography } from 'cocstorage-ui';

function MyHeader() {
  const router = useRouter();

  const handleClick = () => router.back();

  return (
    <Box component="header" customStyle={{ height: 50 }}>
      <StyledMyHeader>
        <IconButton onClick={handleClick}>
          <Icon name="CaretSemiLeftOutlined" />
        </IconButton>
        <Typography variant="h4" fontWeight="bold">
          마이
        </Typography>
      </StyledMyHeader>
    </Box>
  );
}

const StyledMyHeader = styled.div`
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
  border-bottom: 1px solid
    ${({
      theme: {
        palette: { box }
      }
    }) => box.stroked.normal};
  z-index: 2;
`;

export default MyHeader;
