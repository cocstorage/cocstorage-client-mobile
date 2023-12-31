import { useRouter } from 'next/router';

import { Box, IconButton, Typography } from '@cocstorage/ui';
import Icon from '@cocstorage/ui-icons';
import styled from '@emotion/styled';

function PolicyHeader() {
  const router = useRouter();

  const handleClick = () => router.back();

  return (
    <Box component="header" customStyle={{ height: 50 }}>
      <StyledPolicyHeader>
        <IconButton onClick={handleClick}>
          <Icon name="CaretSemiLeftOutlined" />
        </IconButton>
        <Typography component="h1" variant="h4" fontWeight="bold">
          이용약관
        </Typography>
      </StyledPolicyHeader>
    </Box>
  );
}

const StyledPolicyHeader = styled.div`
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

export default PolicyHeader;
