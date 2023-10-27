import { ChangeEvent, useEffect, useState } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';

import {
  DeleteStorageBoardCommentReplyData,
  deleteNonMemberStorageBoardCommentReply
} from '@api/v1/storage-board-comment-replies';
import ReplyDeleteBottomSheet from '@components/UI/organisms/ReplyDeleteBottomSheet';
import queryKeys from '@constants/queryKeys';
import { commonOnBoardingDefault, commonOnBoardingState } from '@recoil/common/atoms';
import { myPasswordState } from '@recoil/pages/my/atoms';
import {
  storageBoardCommentsParamsState,
  storageBoardReplyDeleteBottomSheetState,
  storageBoardReplyListBottomSheetState,
  storageBoardReplyMenuBottomSheetState
} from '@recoil/pages/storageBoard/atoms';

function StorageBoardReplyDeleteBottomSheet() {
  const params = useRecoilValue(storageBoardCommentsParamsState);
  const { open, storageId, id, commentId, replyId } = useRecoilValue(
    storageBoardReplyDeleteBottomSheetState
  );
  const myPassword = useRecoilValue(myPasswordState);
  const setReplyMenuBottomSheetState = useSetRecoilState(storageBoardReplyMenuBottomSheetState);
  const setReplyListBottomSheetState = useSetRecoilState(storageBoardReplyListBottomSheetState);
  const setCommonOnBoardingState = useSetRecoilState(commonOnBoardingState);
  const resetReplyDeleteBottomState = useResetRecoilState(storageBoardReplyDeleteBottomSheetState);

  const [password, setPassword] = useState(myPassword);
  const [errorMessage, setErrorMessage] = useState<{
    error: boolean;
    message: string;
  }>({
    error: false,
    message: ''
  });

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

        setReplyListBottomSheetState((prevState) => ({
          ...prevState,
          open: true
        }));
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

    setReplyMenuBottomSheetState((prevState) => ({
      ...prevState,
      open: true
    }));
  };

  const handleClick = () => {
    setCommonOnBoardingState((prevState) => ({
      ...prevState,
      loadPassword: {
        ...commonOnBoardingDefault.loadPassword,
        step: 1,
        done: commonOnBoardingDefault.loadPassword.lastStep === 1
      }
    }));

    mutate({
      storageId,
      id,
      commentId,
      replyId,
      password
    });
  };

  useEffect(() => {
    if (!open) {
      setErrorMessage({
        error: false,
        message: ''
      });
      if (myPassword) setPassword(myPassword);
    }
  }, [open, myPassword]);

  useEffect(() => {
    return () => {
      resetReplyDeleteBottomState();
    };
  }, [resetReplyDeleteBottomState]);

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
