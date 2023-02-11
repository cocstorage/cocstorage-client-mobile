import { ChangeEvent, useEffect, useRef, useState } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';

import {
  storageBoardCommentsParamsState,
  storageBoardReplyDeleteBottomSheetState,
  storageBoardReplyListBottomSheetState,
  storageBoardReplyMenuBottomSheetState
} from '@recoil/pages/storageBoard/atoms';

import ReplyDeleteBottomSheet from '@components/UI/organisms/ReplyDeleteBottomSheet';

import {
  DeleteStorageBoardCommentReplyData,
  deleteNonMemberStorageBoardCommentReply
} from '@api/v1/storage-board-comment-replies';

import queryKeys from '@constants/queryKeys';

function StorageBoardReplyDeleteBottomSheet() {
  const params = useRecoilValue(storageBoardCommentsParamsState);
  const { open, storageId, id, commentId, replyId } = useRecoilValue(
    storageBoardReplyDeleteBottomSheetState
  );
  const setReplyMenuBottomSheetState = useSetRecoilState(storageBoardReplyMenuBottomSheetState);
  const setReplyListBottomSheetState = useSetRecoilState(storageBoardReplyListBottomSheetState);
  const resetReplyDeleteBottomState = useResetRecoilState(storageBoardReplyDeleteBottomSheetState);

  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<{
    error: boolean;
    message: string;
  }>({
    error: false,
    message: ''
  });

  const openReplyMenuBottomSheetTimerRef = useRef<ReturnType<typeof setTimeout>>();
  const openReplyListBottomSheetTimerRef = useRef<ReturnType<typeof setTimeout>>();

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(
    (data: DeleteStorageBoardCommentReplyData) => deleteNonMemberStorageBoardCommentReply(data),
    {
      onSuccess: () => {
        const { page } = params;

        queryClient
          .invalidateQueries(
            queryKeys.storageBoardComments.storageBoardCommentsByIdWithPage(Number(id), page || 1)
          )
          .then();
        setPassword('');
        resetReplyDeleteBottomState();

        openReplyListBottomSheetTimerRef.current = setTimeout(() => {
          setReplyListBottomSheetState((prevState) => ({
            ...prevState,
            open: true
          }));
        }, 500);
      },
      onError: () =>
        setErrorMessage({
          error: true,
          message: '비밀번호가 일치하지 않아요.'
        })
    }
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (errorMessage.error) {
      setErrorMessage({
        error: false,
        message: ''
      });
    }
    setPassword(event.currentTarget.value);
  };

  const handleClose = () => {
    resetReplyDeleteBottomState();

    openReplyMenuBottomSheetTimerRef.current = setTimeout(() => {
      setReplyMenuBottomSheetState((prevState) => ({
        ...prevState,
        open: true
      }));
    }, 500);
  };

  const handleClick = () =>
    mutate({
      storageId,
      id,
      commentId,
      replyId,
      password
    });

  useEffect(() => {
    if (!open) {
      setPassword('');
      setErrorMessage({
        error: false,
        message: ''
      });
    }
  }, [open]);

  useEffect(() => {
    return () => {
      resetReplyDeleteBottomState();
    };
  }, [resetReplyDeleteBottomState]);

  useEffect(() => {
    return () => {
      if (openReplyMenuBottomSheetTimerRef.current) {
        clearTimeout(openReplyMenuBottomSheetTimerRef.current);
      }
      if (openReplyListBottomSheetTimerRef.current) {
        clearTimeout(openReplyListBottomSheetTimerRef.current);
      }
    };
  }, []);

  return (
    <ReplyDeleteBottomSheet
      open={open}
      onClose={handleClose}
      password={password}
      errorMessage={errorMessage}
      isLoading={isLoading}
      onChange={handleChange}
      onClickDelete={handleClick}
    />
  );
}

export default StorageBoardReplyDeleteBottomSheet;
