import { useEffect } from 'react';

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

  const handleClose = () => {
    setReplyMenuBottomState((prevState) => ({
      ...prevState,
      open: false
    }));

    setTimeout(() => {
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

    setTimeout(() => {
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

  return (
    <ReplyMenuBottomSheet
      open={open}
      onClose={handleClose}
      onClickDeleteMenu={handleClickDeleteMenu}
    />
  );
}

export default NoticeReplyMenuBottomSheet;
