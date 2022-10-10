import { useRef } from 'react';

import { useRouter } from 'next/router';

import { useQuery } from '@tanstack/react-query';

import { useRecoilValue, useSetRecoilState } from 'recoil';

import styled, { CSSObject } from '@emotion/styled';

import { commonFeedbackDialogState } from '@recoil/common/atoms';
import { noticeHideHeaderSubjectState } from '@recoil/notice/atoms';

import { Box, Icon, IconButton, Typography } from 'cocstorage-ui';

import useScrollTrigger from '@hooks/useScrollTrigger';

import { fetchNotice } from '@api/v1/notices';

import queryKeys from '@constants/queryKeys';

function NoticeHeader() {
  const router = useRouter();
  const { id } = router.query;

  const setCommonFeedbackDialogState = useSetRecoilState(commonFeedbackDialogState);
  const hideHeaderSubject = useRecoilValue(noticeHideHeaderSubjectState);

  const headerRef = useRef<HTMLDivElement>(null);

  const { triggered } = useScrollTrigger({ ref: headerRef });

  const { data: { subject } = {} } = useQuery(queryKeys.notices.noticeById(Number(id)), () =>
    fetchNotice(Number(id))
  );

  const handleClick = () => router.back();

  const handleClickMenu = () =>
    setCommonFeedbackDialogState({
      open: true,
      title: '준비 중인 기능이에요!',
      message: '조금만 기다려주세요!'
    });

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
        <IconButton onClick={handleClickMenu}>
          <Icon name="MoreMenuOutlined" />
        </IconButton>
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
