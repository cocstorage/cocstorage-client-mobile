import { useEffect } from 'react';

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

  const handleClose = () => resetCommentMenuBottomState();

  const handleClickDeleteMenu = () => {
    setCommentMenuBottomState((prevState) => ({
      ...prevState,
      open: false
    }));

    setTimeout(() => {
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

  return (
    <CommentMenuBottomSheet
      open={open}
      onClose={handleClose}
      onClickDeleteMenu={handleClickDeleteMenu}
    />
  );
}

export default StorageBoardCommentMenuBottomSheet;
