import { useEffect, useRef } from 'react';

import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';

import {
  storageBoardCommentDeleteBottomSheetState,
  storageBoardCommentMenuBottomSheetState
} from '@recoil/pages/storageBoard/atoms';

import CommentMenuBottomSheet from '@components/UI/organisms/CommentMenuBottomSheet';

function StorageBoardCommentMenuBottomSheet() {
  const [{ open, storageId, id, commentId }, setCommentMenuBottomState] = useRecoilState(
    storageBoardCommentMenuBottomSheetState
  );
  const setCommentDeleteBottomSheetState = useSetRecoilState(
    storageBoardCommentDeleteBottomSheetState
  );
  const resetCommentMenuBottomState = useResetRecoilState(storageBoardCommentMenuBottomSheetState);

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
        storageId,
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

export default StorageBoardCommentMenuBottomSheet;
