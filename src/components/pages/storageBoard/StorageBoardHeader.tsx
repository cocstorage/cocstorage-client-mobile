import { useRef } from 'react';

import { useRouter } from 'next/router';

import { useQuery } from '@tanstack/react-query';

import { useRecoilValue, useSetRecoilState } from 'recoil';

import styled, { CSSObject } from '@emotion/styled';

import { commonDialogOpenStateFamily } from '@recoil/common/atoms';
import { hideHeaderSubjectState } from '@recoil/storageBoard/atoms';

import { Box, Flexbox, Icon, IconButton, Typography } from 'cocstorage-ui';

import RatioImage from '@components/UI/atoms/RatioImage';

import useScrollTrigger from '@hooks/useScrollTrigger';

import { fetchStorageBoard } from '@api/v1/storage-boards';
import { fetchStorage } from '@api/v1/storages';

import queryKeys from '@constants/queryKeys';

function StorageBoardHeader() {
  const router = useRouter();
  const { path, id } = router.query;

  const setOpenDialog = useSetRecoilState(commonDialogOpenStateFamily('featurePreparation'));
  const hideHeaderSubject = useRecoilValue(hideHeaderSubjectState);

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

  const handleClickIcon = () => setOpenDialog(({ type }) => ({ type, open: true }));

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
          <RatioImage
            width={24}
            height={24}
            src={avatarUrl}
            alt="Storage Logo Img"
            disableAspectRatio
            customStyle={{ marginLeft: 10 }}
          />
          <IconButton onClick={handleClickIcon}>
            <Icon name="MoreMenuOutlined" />
          </IconButton>
        </Flexbox>
      </StyledStorageBoardHeader>
    </Box>
  );
}

const StyledStorageBoardHeader = styled.div<{ triggered: boolean }>`
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

export default StorageBoardHeader;
