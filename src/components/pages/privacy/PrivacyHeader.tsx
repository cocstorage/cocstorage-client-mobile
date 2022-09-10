import { useRef } from 'react';

import { useRouter } from 'next/router';

import styled, { CSSObject } from '@emotion/styled';

import { Box, Icon, IconButton, Typography } from 'cocstorage-ui';

import useScrollTrigger from '@hooks/useScrollTrigger';

function PrivacyHeader() {
  const router = useRouter();

  const headerRef = useRef<HTMLDivElement>(null);

  const { triggered } = useScrollTrigger({ ref: headerRef });

  const handleClick = () => router.back();

  return (
    <Box ref={headerRef} component="header" customStyle={{ height: 50 }}>
      <StyledPrivacyHeader triggered={triggered}>
        <IconButton onClick={handleClick}>
          <Icon name="CaretSemiLeftOutlined" />
        </IconButton>
        <Typography variant="h4" fontWeight="bold">
          개인정보처리방침
        </Typography>
      </StyledPrivacyHeader>
    </Box>
  );
}

const StyledPrivacyHeader = styled.div<{ triggered: boolean }>`
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

export default PrivacyHeader;
