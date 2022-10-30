import { useEffect } from 'react';

import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';

import {
  noticeCommentDeleteBottomSheetState,
  noticeCommentMenuBottomSheetState
} from '@recoil/pages/notice/atoms';

import CommentMenuBottomSheet from '@components/UI/organisms/CommentMenuBottomSheet';

function NoticeCommentMenuBottomSheet() {
  const [{ open, id, commentId }, setCommentMenuBottomState] = useRecoilState(
    noticeCommentMenuBottomSheetState
  );
  const setCommentDeleteBottomSheetState = useSetRecoilState(noticeCommentDeleteBottomSheetState);
  const resetCommentMenuBottomState = useResetRecoilState(noticeCommentMenuBottomSheetState);

  const handleClose = () => resetCommentMenuBottomState();

  const handleClickDeleteMenu = () => {
    setCommentMenuBottomState((prevState) => ({
      ...prevState,
      open: false
    }));

    setTimeout(() => {
      setCommentDeleteBottomSheetState({
        open: true,
        id,
        commentId
      });
    }, 500);
  };

  useEffect(() => {
    return () => {
      resetCommentMenuBottomState();
    };
  }, [resetCommentMenuBottomState]);

  return (
    <CommentMenuBottomSheet
      open={open}
      onClose={handleClose}
      onClickDeleteMenu={handleClickDeleteMenu}
    />
  );
}

export default NoticeCommentMenuBottomSheet;
