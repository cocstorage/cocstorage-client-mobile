import { useEffect, useRef } from 'react';

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

  const openCommentDeleteBottomSheetTimerRef = useRef<ReturnType<typeof setTimeout>>();

  const handleClose = () => resetCommentMenuBottomState();

  const handleClickDeleteMenu = () => {
    setCommentMenuBottomState((prevState) => ({
      ...prevState,
      open: false
    }));

    openCommentDeleteBottomSheetTimerRef.current = setTimeout(() => {
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

  useEffect(() => {
    return () => {
      if (openCommentDeleteBottomSheetTimerRef.current) {
        clearTimeout(openCommentDeleteBottomSheetTimerRef.current);
      }
    };
  }, []);

  return (
    <CommentMenuBottomSheet
      open={open}
      onClose={handleClose}
      onClickDeleteMenu={handleClickDeleteMenu}
    />
  );
}

export default NoticeCommentMenuBottomSheet;
