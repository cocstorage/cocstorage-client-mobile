import { useRef } from 'react';

import { useRouter } from 'next/router';

import { useQuery } from '@tanstack/react-query';

import { useRecoilValue, useSetRecoilState } from 'recoil';

import styled, { CSSObject } from '@emotion/styled';

import { commonFeedbackDialogState } from '@recoil/common/atoms';
import { storageBoardHideHeaderSubjectState } from '@recoil/pages/storageBoard/atoms';

import { Avatar, Box, Flexbox, Icon, IconButton, Typography } from 'cocstorage-ui';

import useScrollTrigger from '@hooks/useScrollTrigger';

import { fetchStorageBoard } from '@api/v1/storage-boards';
import { fetchStorage } from '@api/v1/storages';

import queryKeys from '@constants/queryKeys';

function StorageBoardHeader() {
  const router = useRouter();
  const { path, id } = router.query;

  const setCommonFeedbackDialogState = useSetRecoilState(commonFeedbackDialogState);
  const hideHeaderSubject = useRecoilValue(storageBoardHideHeaderSubjectState);

  const headerRef = useRef<HTMLDivElement>(null);

  const { triggered } = useScrollTrigger({ ref: headerRef });

  const { data: { id: storageId, avatarUrl } = {} } = useQuery(
    queryKeys.storages.storageById(String(path)),
    () => fetchStorage(String(path))
  );
  const { data: { subject } = {} } = useQuery(
    queryKeys.storageBoards.storageBoardById(Number(id)),
    () => fetchStorageBoard(Number(storageId), Number(id))
  );

  const handleClick = () => router.back();

  const handleClickImage = () => router.push(`/storages/${path}`);

  const handleClickMenu = () =>
    setCommonFeedbackDialogState({
      open: true,
      title: '준비 중인 기능이에요!',
      message: '조금만 기다려주세요!'
    });

  return (
    <Box ref={headerRef} component="header" customStyle={{ height: 50 }}>
      <StyledStorageBoardHeader triggered={triggered}>
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
        <Flexbox gap={10} alignment="center">
          <Avatar
            width={24}
            height={24}
            src={avatarUrl}
            alt="Storage Logo Img"
            round={6}
            onClick={handleClickImage}
          />
          <IconButton onClick={handleClickMenu}>
            <Icon name="MoreMenuOutlined" />
          </IconButton>
        </Flexbox>
      </StyledStorageBoardHeader>
    </Box>
  );
}

export const StyledStorageBoardHeader = styled.div<{ triggered: boolean }>`
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

export default StorageBoardHeader;
