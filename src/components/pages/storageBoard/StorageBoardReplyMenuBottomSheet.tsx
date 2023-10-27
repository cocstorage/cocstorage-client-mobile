import { useEffect } from 'react';

import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';

import ReplyMenuBottomSheet from '@components/UI/organisms/ReplyMenuBottomSheet';
import {
  storageBoardReplyDeleteBottomSheetState,
  storageBoardReplyListBottomSheetState,
  storageBoardReplyMenuBottomSheetState
} from '@recoil/pages/storageBoard/atoms';

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
      storageId,
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

export default StorageBoardReplyMenuBottomSheet;
