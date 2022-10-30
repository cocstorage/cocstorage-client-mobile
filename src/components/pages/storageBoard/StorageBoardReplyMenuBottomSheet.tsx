import { useEffect } from 'react';

import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';

import {
  storageBoardReplyDeleteBottomSheetState,
  storageBoardReplyListBottomSheetState,
  storageBoardReplyMenuBottomSheetState
} from '@recoil/pages/storageBoard/atoms';

import ReplyMenuBottomSheet from '@components/UI/organisms/ReplyMenuBottomSheet';

function StorageBoardReplyMenuBottomSheet() {
  const [{ open, storageId, id, commentId, replyId }, setReplyMenuBottomState] = useRecoilState(
    storageBoardReplyMenuBottomSheetState
  );
  const setReplyListBottomState = useSetRecoilState(storageBoardReplyListBottomSheetState);
  const setReplyDeleteBottomState = useSetRecoilState(storageBoardReplyDeleteBottomSheetState);
  const resetReplyMenuBottomState = useResetRecoilState(storageBoardReplyMenuBottomSheetState);

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
        storageId,
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

export default StorageBoardReplyMenuBottomSheet;
