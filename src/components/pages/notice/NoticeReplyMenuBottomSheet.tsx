import { useEffect, useRef } from 'react';

import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';

import {
  noticeReplyDeleteBottomSheetState,
  noticeReplyListBottomSheetState,
  noticeReplyMenuBottomSheetState
} from '@recoil/pages/notice/atoms';

import ReplyMenuBottomSheet from '@components/UI/organisms/ReplyMenuBottomSheet';

function NoticeReplyMenuBottomSheet() {
  const [{ open, id, commentId, replyId }, setReplyMenuBottomState] = useRecoilState(
    noticeReplyMenuBottomSheetState
  );
  const setReplyListBottomState = useSetRecoilState(noticeReplyListBottomSheetState);
  const setReplyDeleteBottomState = useSetRecoilState(noticeReplyDeleteBottomSheetState);
  const resetReplyMenuBottomState = useResetRecoilState(noticeReplyMenuBottomSheetState);

  const openReplyListBottomSheetTimerRef = useRef<ReturnType<typeof setTimeout>>();
  const openReplyDeleteBottomSheetTimerRef = useRef<ReturnType<typeof setTimeout>>();

  const handleClose = () => {
    setReplyMenuBottomState((prevState) => ({
      ...prevState,
      open: false
    }));

    openReplyListBottomSheetTimerRef.current = setTimeout(() => {
      setReplyListBottomState((prevState) => ({
        ...prevState,
        open: true
      }));
    }, 500);
  };

  const handleClickDeleteMenu = () => {
    setReplyMenuBottomState((prevState) => ({
      ...prevState,
      open: false
    }));

    openReplyDeleteBottomSheetTimerRef.current = setTimeout(() => {
      setReplyDeleteBottomState({
        open: true,
        id,
        commentId,
        replyId
      });
    }, 500);
  };

  useEffect(() => {
    return () => {
      resetReplyMenuBottomState();
    };
  }, [resetReplyMenuBottomState]);

  useEffect(() => {
    return () => {
      if (openReplyListBottomSheetTimerRef.current) {
        clearTimeout(openReplyListBottomSheetTimerRef.current);
      }
      if (openReplyDeleteBottomSheetTimerRef.current) {
        clearTimeout(openReplyDeleteBottomSheetTimerRef.current);
      }
    };
  }, []);

  return (
    <ReplyMenuBottomSheet
      open={open}
      onClose={handleClose}
      onClickDeleteMenu={handleClickDeleteMenu}
    />
  );
}

export default NoticeReplyMenuBottomSheet;
