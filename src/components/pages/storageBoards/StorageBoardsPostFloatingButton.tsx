import { useEffect, useRef, useState } from 'react';

import { useRouter } from 'next/router';

import { Box, Button, Spotlight, Tooltip } from '@cocstorage/ui';
import Icon from '@cocstorage/ui-icons';
import { useRecoilState, useResetRecoilState } from 'recoil';

import useReverseScrollTrigger from '@hooks/useReverseScrollTrigger';
import { commonOnBoardingDefault, commonOnBoardingState } from '@recoil/common/atoms';
import {
  storageBoardsPostDraftIdState,
  storageBoardsPostEditorContentsState,
  storageBoardsPostSubjectState
} from '@recoil/pages/storageBoardsPost/atoms';

function StorageBoardsPostFloatingButton() {
  const router = useRouter();
  const { path } = router.query;

  const [
    {
      theme: { done: themeDone = false },
      post: { step = 0, lastStep = 0 } = {}
    },
    setCommonOnBoardingState
  ] = useRecoilState(commonOnBoardingState);
  const resetDraftIdState = useResetRecoilState(storageBoardsPostDraftIdState);
  const resetSubjectState = useResetRecoilState(storageBoardsPostSubjectState);
  const resetEditorContentsState = useResetRecoilState(storageBoardsPostEditorContentsState);

  const { triggered, prevScrollY } = useReverseScrollTrigger();

  const [open, setOpen] = useState(false);

  const boxRef = useRef<HTMLDivElement>(null);
  const spotlightOpenTimerRef = useRef<ReturnType<typeof setTimeout>>();

  const handleClick = () => {
    setCommonOnBoardingState((prevState) => ({
      ...prevState,
      post: {
        ...commonOnBoardingDefault.post,
        step: 1,
        done: commonOnBoardingDefault.post.lastStep === 1
      }
    }));

    resetDraftIdState();
    resetSubjectState();
    resetEditorContentsState();

    router.push(`/storages/${path}/post`);
  };

  const handleClose = () =>
    setCommonOnBoardingState((prevState) => ({
      ...prevState,
      post: {
        ...commonOnBoardingDefault.post,
        step: 1,
        done: commonOnBoardingDefault.post.lastStep === 1
      }
    }));

  useEffect(() => {
    if (!themeDone) return;

    spotlightOpenTimerRef.current = setTimeout(() => {
      // TODO 온보딩 겹치는 경우 Backdrop 컴포넌트 동시성 개선 필요
      if ((!step && !lastStep) || step < lastStep) {
        setOpen(true);
      } else {
        setOpen(false);
      }
    }, 350);
  }, [themeDone, step, lastStep]);

  useEffect(() => {
    return () => {
      if (spotlightOpenTimerRef.current) {
        clearTimeout(spotlightOpenTimerRef.current);
      }
    };
  }, []);

  return (
    <>
      <Box
        ref={boxRef}
        customStyle={{
          position: 'fixed',
          left: '50%',
          bottom: 80,
          transform: `translate(-50%, ${!triggered && prevScrollY ? '200%' : 0})`,
          transition: 'transform .2s'
        }}
      >
        <Button
          variant="accent"
          startIcon={<Icon name="WriteOutlined" width={18} height={18} />}
          size="big"
          onClick={handleClick}
          customStyle={{
            boxShadow: '0px 10px 20px rgba(52, 133, 255, 0.2);'
          }}
        >
          글쓰기
        </Button>
      </Box>
      <Spotlight
        open={open}
        onClose={handleClose}
        targetRef={boxRef}
        round={10}
        customStyle={{
          transform: 'translateX(-50%)'
        }}
      >
        <Tooltip
          open
          onClose={handleClose}
          content="로그인하지 않아도 게시글을 등록할 수 있어요!"
          placement="top"
        >
          <Button
            variant="accent"
            size="big"
            startIcon={<Icon name="WriteOutlined" width={18} height={18} />}
            onClick={handleClick}
          >
            글쓰기
          </Button>
        </Tooltip>
      </Spotlight>
    </>
  );
}

export default StorageBoardsPostFloatingButton;
