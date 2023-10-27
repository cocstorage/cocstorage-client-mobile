import { useEffect } from 'react';

import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';

import CommentMenuBottomSheet from '@components/UI/organisms/CommentMenuBottomSheet';
import {
  noticeCommentDeleteBottomSheetState,
  noticeCommentMenuBottomSheetState
} from '@recoil/pages/notice/atoms';

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

    setCommentDeleteBottomSheetState({
      open: true,
      id,
      commentId
    });
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
