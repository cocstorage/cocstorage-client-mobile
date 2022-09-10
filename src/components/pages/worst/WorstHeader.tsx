import { useRouter } from 'next/router';

import styled from '@emotion/styled';

import { Box, Icon, IconButton, Typography } from 'cocstorage-ui';

function WorstHeader() {
  const router = useRouter();

  const handleClick = () => router.back();

  return (
    <Box component="header" customStyle={{ height: 50 }}>
      <StyledWorstHeader>
        <IconButton onClick={handleClick}>
          <Icon name="CaretSemiLeftOutlined" />
        </IconButton>
        <Typography variant="h4" fontWeight="bold">
          워스트 게시글
        </Typography>
      </StyledWorstHeader>
    </Box>
  );
}

const StyledWorstHeader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  height: 50px;
  padding: 0 20px;
  border-bottom: 1px solid
    ${({
      theme: {
        palette: { box }
      }
    }) => box.stroked.normal};
  z-index: 1;
`;

export default WorstHeader;
