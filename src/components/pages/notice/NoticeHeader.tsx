import { useRef } from 'react';

import { useRouter } from 'next/router';

import { Box, IconButton, Typography } from '@cocstorage/ui';
import Icon from '@cocstorage/ui-icons';
import styled, { CSSObject } from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';

import { fetchNotice } from '@api/v1/notices';
import queryKeys from '@constants/queryKeys';
import useScrollTrigger from '@hooks/useScrollTrigger';
import { noticeHideHeaderSubjectState } from '@recoil/pages/notice/atoms';

function NoticeHeader() {
  const router = useRouter();
  const { id } = router.query;

  const hideHeaderSubject = useRecoilValue(noticeHideHeaderSubjectState);

  const headerRef = useRef<HTMLDivElement>(null);

  const { triggered } = useScrollTrigger({ ref: headerRef });

  const { data: { subject } = {} } = useQuery(queryKeys.notices.noticeById(Number(id)), () =>
    fetchNotice(Number(id))
  );

  const handleClick = () => router.back();

  return (
    <Box ref={headerRef} component="header" customStyle={{ height: 50 }}>
      <StyledNoticeHeader triggered={triggered}>
        <IconButton onClick={handleClick}>
          <Icon name="CaretSemiLeftOutlined" />
        </IconButton>
        <Typography
          variant="h4"
          fontWeight="bold"
          noWrap
          customStyle={{ flex: 1, visibility: hideHeaderSubject ? 'hidden' : 'visible' }}
        >
          {subject}
        </Typography>
      </StyledNoticeHeader>
    </Box>
  );
}

export const StyledNoticeHeader = styled.div<{ triggered: boolean }>`
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
  border-bottom: 1px solid transparent;
  z-index: 2;

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

export default NoticeHeader;
