import { useEffect, useRef, useState } from 'react';

import { useRouter } from 'next/router';

import { Avatar, Box, Flexbox, IconButton, Spotlight, Typography } from '@cocstorage/ui';
import Icon from '@cocstorage/ui-icons';
import styled, { CSSObject } from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { fetchStorageBoard } from '@api/v1/storage-boards';
import { fetchStorage } from '@api/v1/storages';
import queryKeys from '@constants/queryKeys';
import useScrollTrigger from '@hooks/useScrollTrigger';
import {
  commonHistoryState,
  commonOnBoardingDefault,
  commonOnBoardingState
} from '@recoil/common/atoms';
import {
  storageBoardHideHeaderSubjectState,
  storageBoardMenuBottomSheetOpenState
} from '@recoil/pages/storageBoard/atoms';

function StorageBoardHeader() {
  const router = useRouter();
  const { path, id } = router.query;

  const setMenuBottomSheetOpenState = useSetRecoilState(storageBoardMenuBottomSheetOpenState);
  const [
    { comment: { done: commentDone = false } = {}, editAndDelete: { step = 0, lastStep = 0 } = {} },
    setCommonOnBoardingState
  ] = useRecoilState(commonOnBoardingState);
  const { index, object } = useRecoilValue(commonHistoryState);
  const hideHeaderSubject = useRecoilValue(storageBoardHideHeaderSubjectState);

  const [open, setOpen] = useState(false);

  const headerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const { triggered } = useScrollTrigger({ ref: headerRef });

  const { data: { id: storageId, avatarUrl } = {} } = useQuery(
    queryKeys.storages.storageById(String(path)),
    () => fetchStorage(String(path))
  );
  const { data: { subject, sourceCode } = {} } = useQuery(
    queryKeys.storageBoards.storageBoardById(Number(id)),
    () => fetchStorageBoard(Number(storageId), Number(id))
  );

  const handleClick = () => router.back();

  const handleClickImage = () => router.push(`/storages/${path}`);

  const handleClickMenu = () => {
    setOpen(false);
    setCommonOnBoardingState((prevState) => ({
      ...prevState,
      editAndDelete: {
        ...commonOnBoardingDefault.editAndDelete,
        step: 1,
        done: commonOnBoardingDefault.editAndDelete.lastStep === 1
      }
    }));
    setMenuBottomSheetOpenState(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCommonOnBoardingState((prevState) => ({
      ...prevState,
      editAndDelete: {
        ...commonOnBoardingDefault.editAndDelete,
        step: 1,
        done: commonOnBoardingDefault.editAndDelete.lastStep === 1
      }
    }));
  };

  useEffect(() => {
    if (!commentDone || object[index - 1] !== '/storages/[path]/post' || sourceCode) return;

    if ((!step && !lastStep) || step < lastStep) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [commentDone, object, index, sourceCode, step, lastStep]);

  return (
    <>
      <Box ref={headerRef} component="header" customStyle={{ minHeight: 50 }}>
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
              fallback={{
                name: 'ImageOutlined',
                width: 20,
                height: 20
              }}
              onClick={handleClickImage}
            />
            {!sourceCode && (
              <IconButton ref={buttonRef} onClick={handleClickMenu}>
                <Icon name="MoreMenuOutlined" />
              </IconButton>
            )}
          </Flexbox>
        </StyledStorageBoardHeader>
      </Box>
      <Spotlight
        open={open}
        onClose={handleClose}
        round={6}
        targetRef={buttonRef}
        tooltip={{
          content: '게시글의 수정 및 삭제는 여기를 터치해 주세요!',
          centered: false,
          left: -200,
          triangleLeft: 205,
          onClick: handleClickMenu
        }}
      />
    </>
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
