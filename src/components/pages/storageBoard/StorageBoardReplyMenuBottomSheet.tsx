import { useEffect, useRef } from 'react';

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

  const openReplyBottomSheetTimerRef = useRef<ReturnType<typeof setTimeout>>();
  const openReplyListBottomSheetTimerRef = useRef<ReturnType<typeof setTimeout>>();

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

    openReplyBottomSheetTimerRef.current = setTimeout(() => {
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

  useEffect(() => {
    if (openReplyBottomSheetTimerRef.current) {
      clearTimeout(openReplyBottomSheetTimerRef.current);
    }
    if (openReplyListBottomSheetTimerRef.current) {
      clearTimeout(openReplyListBottomSheetTimerRef.current);
    }
  }, []);

  return (
    <ReplyMenuBottomSheet
      open={open}
      onClose={handleClose}
      onClickDeleteMenu={handleClickDeleteMenu}
    />
  );
}

export default StorageBoardReplyMenuBottomSheet;
