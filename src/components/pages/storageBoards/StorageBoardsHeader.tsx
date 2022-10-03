import { useEffect, useRef, useState } from 'react';

import { useRouter } from 'next/router';

import { useQuery } from '@tanstack/react-query';

import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';

import styled, { CSSObject } from '@emotion/styled';

import {
  commonFeedbackDialogState,
  commonOnBoardingDefault,
  commonOnBoardingState
} from '@recoil/common/atoms';
import { openStorageBoardsInfoBottomSheetState } from '@recoil/storageBoards/atoms';
import { storageBoardsSearchParamsState } from '@recoil/storageBoardsSearch/atoms';

import {
  Box,
  Flexbox,
  Icon,
  IconButton,
  Image,
  Spotlight,
  Tooltip,
  Typography,
  useTheme
} from 'cocstorage-ui';

import useScrollTrigger from '@hooks/useScrollTrigger';

import { fetchStorage } from '@api/v1/storages';

import queryKeys from '@constants/queryKeys';

function StorageBoardsHeader() {
  const router = useRouter();
  const { path } = router.query;

  const [{ search: { step = 0, lastStep = 0 } = {} }, setCommonOnBoardingState] =
    useRecoilState(commonOnBoardingState);
  const resetParams = useResetRecoilState(storageBoardsSearchParamsState);
  const setOpen = useSetRecoilState(openStorageBoardsInfoBottomSheetState);
  const setCommonFeedbackDialogState = useSetRecoilState(commonFeedbackDialogState);

  const [openOnBoarding, setOpenOnBoarding] = useState(false);

  const headerRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLButtonElement>(null);

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

  const handleClickBack = () => router.push('/storages');

  const handleClickSearch = () => {
    resetParams();
    router.push(`/storages/${path}/search`);
  };

  const handleClickIcon = () =>
    setCommonFeedbackDialogState({
      open: true,
      title: '준비 중인 기능이에요!',
      message: '조금만 기다려주세요!'
    });

  const handleCloseOnBoarding = () =>
    setCommonOnBoardingState((prevState) => ({
      ...prevState,
      search: {
        ...commonOnBoardingDefault.search,
        step: 1
      }
    }));

  useEffect(() => {
    if ((!step && !lastStep) || step < lastStep) {
      setOpenOnBoarding(true);
    } else {
      setOpenOnBoarding(false);
    }
  }, [step, lastStep]);

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
          <IconButton ref={targetRef} onClick={handleClickSearch}>
            <Icon name="SearchOutlined" />
          </IconButton>
          <Spotlight
            open={openOnBoarding}
            onClose={handleCloseOnBoarding}
            targetRef={targetRef}
            customStyle={{
              borderRadius: 8
            }}
          >
            <Tooltip
              open={openOnBoarding}
              onClose={handleCloseOnBoarding}
              left={-82.5}
              triangleLeft={86}
              centered={false}
              content="게시글을 검색할 수 있어요!"
              disableOnClose
            >
              <IconButton onClick={handleClickSearch}>
                <Icon name="SearchOutlined" />
              </IconButton>
            </Tooltip>
          </Spotlight>
          <IconButton onClick={handleClickIcon}>
            <Icon name="StarOutlined" />
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
