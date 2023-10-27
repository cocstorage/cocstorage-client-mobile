import { useEffect } from 'react';

import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';

import ReplyMenuBottomSheet from '@components/UI/organisms/ReplyMenuBottomSheet';
import {
  noticeReplyDeleteBottomSheetState,
  noticeReplyListBottomSheetState,
  noticeReplyMenuBottomSheetState
} from '@recoil/pages/notice/atoms';

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

    setReplyListBottomState((prevState) => ({
      ...prevState,
      open: true
    }));
  };

  const handleClickDeleteMenu = () => {
    setReplyMenuBottomState((prevState) => ({
      ...prevState,
      open: false
    }));

    setReplyDeleteBottomState({
      open: true,
      id,
      commentId,
      replyId
    });
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
