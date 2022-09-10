import { useRef } from 'react';

import styled, { CSSObject } from '@emotion/styled';

import { Box, Icon, IconButton, Typography } from 'cocstorage-ui';

import useScrollTrigger from '@hooks/useScrollTrigger';

function NoticesHeader() {
  const headerRef = useRef<HTMLDivElement>(null);

  const { triggered } = useScrollTrigger({ ref: headerRef });

  return (
    <Box ref={headerRef} component="header" customStyle={{ height: 50 }}>
      <StyledNoticesHeader triggered={triggered}>
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

const StyledNoticesHeader = styled.div<{ triggered: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  height: 50px;
  padding: 0 20px;
  border-bottom: 1px solid transparent;
  z-index: 1;

  background-color: ${({
    theme: {
      palette: { background }
    }
  }) => background.bg};
  ${({
    theme: {
      palette: { box }
    },
    triggered
  }): CSSObject =>
    triggered
      ? {
          borderBottomColor: box.stroked.normal
        }
      : {}};
`;

export default NoticesHeader;
