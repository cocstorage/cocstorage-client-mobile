import { useRef } from 'react';

import { useRouter } from 'next/router';

import { useQuery } from '@tanstack/react-query';

import { useSetRecoilState } from 'recoil';

import styled, { CSSObject } from '@emotion/styled';

import { commonFeedbackDialogState } from '@recoil/common/atoms';
import { openStorageBoardsInfoBottomSheetState } from '@recoil/storageBoards/atoms';

import { Box, Flexbox, Icon, IconButton, Image, Typography, useTheme } from 'cocstorage-ui';

import useScrollTrigger from '@hooks/useScrollTrigger';

import { fetchStorage } from '@api/v1/storages';

import queryKeys from '@constants/queryKeys';

function StorageBoardsHeader() {
  const router = useRouter();
  const { path } = router.query;

  const setOpen = useSetRecoilState(openStorageBoardsInfoBottomSheetState);
  const setCommonFeedbackDialogState = useSetRecoilState(commonFeedbackDialogState);

  const headerRef = useRef<HTMLDivElement>(null);

  const { triggered } = useScrollTrigger({ ref: headerRef });

  const {
    theme: {
      mode,
      palette: { text }
    }
  } = useTheme();

  const { data: { name, avatarUrl } = {} } = useQuery(
    queryKeys.storages.storageById(String(path)),
    () => fetchStorage(String(path))
  );

  const handleClick = () => setOpen(true);

  const handleClickBack = () => router.back();

  const handleClickIcon = () =>
    setCommonFeedbackDialogState({
      open: true,
      title: '준비 중인 기능이에요!',
      message: '조금만 기다려주세요!'
    });

  return (
    <Box ref={headerRef} component="header" customStyle={{ height: 50 }}>
      <StyledStorageBoardsHeader triggered={triggered}>
        <Flexbox alignment="center" customStyle={{ flex: 1, minWidth: 0 }}>
          <IconButton onClick={handleClickBack}>
            <Icon name="CaretSemiLeftOutlined" />
          </IconButton>
          <Image
            width={24}
            height={24}
            src={avatarUrl}
            alt="Storage Logo Img"
            disableAspectRatio
            customStyle={{ marginLeft: 10 }}
          />
          <Typography
            variant="h4"
            fontWeight="bold"
            noWrap
            customStyle={{ marginLeft: 10, flex: '0 auto' }}
          >
            {name}
          </Typography>
          <IconButton onClick={handleClick} customStyle={{ marginLeft: 4 }}>
            <Icon name="InfoOutlined" width={16} height={16} color={text[mode].text1} />
          </IconButton>
        </Flexbox>
        <Flexbox gap={10} alignment="center">
          <IconButton onClick={handleClickIcon}>
            <Icon name="StarOutlined" />
          </IconButton>
          <IconButton onClick={handleClickIcon}>
            <Icon name="MoreMenuOutlined" />
          </IconButton>
        </Flexbox>
      </StyledStorageBoardsHeader>
    </Box>
  );
}

const StyledStorageBoardsHeader = styled.div<{ triggered: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
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

export default StorageBoardsHeader;
