import { ChangeEvent, useEffect, useState } from 'react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';

import {
  DeleteStorageBoardCommentData,
  deleteNonMemberStorageBoardComment,
  fetchStorageBoardComments
} from '@api/v1/storage-board-comments';
import { fetchStorageBoard } from '@api/v1/storage-boards';
import CommentDeleteBottomSheet from '@components/UI/organisms/CommentDeleteBottomSheet';
import queryKeys from '@constants/queryKeys';
import { commonOnBoardingDefault, commonOnBoardingState } from '@recoil/common/atoms';
import { myPasswordState } from '@recoil/pages/my/atoms';
import {
  storageBoardCommentDeleteBottomSheetState,
  storageBoardCommentMenuBottomSheetState,
  storageBoardCommentsParamsState
} from '@recoil/pages/storageBoard/atoms';

function StorageBoardCommentDeleteBottomSheet() {
  const { open, storageId, id, commentId } = useRecoilValue(
    storageBoardCommentDeleteBottomSheetState
  );
  const [params, setParams] = useRecoilState(storageBoardCommentsParamsState);
  const myPassword = useRecoilValue(myPasswordState);
  const setCommentMenuBottomSheetState = useSetRecoilState(storageBoardCommentMenuBottomSheetState);
  const setCommonOnBoardingState = useSetRecoilState(commonOnBoardingState);
  const resetCommentDeleteBottomState = useResetRecoilState(
    storageBoardCommentDeleteBottomSheetState
  );

  const [password, setPassword] = useState(myPassword);
  const [errorMessage, setErrorMessage] = useState<{
    error: boolean;
    message: string;
  }>({
    error: false,
    message: ''
  });

  const queryClient = useQueryClient();

  const { data: { commentLatestPage = 0 } = {} } = useQuery(
    queryKeys.storageBoards.storageBoardById(id),
    () => fetchStorageBoard(storageId, id),
    {
      enabled: !!storageId && !!id
    }
  );

  const { data: { comments = [] } = {} } = useQuery(
    queryKeys.storageBoardComments.storageBoardCommentsByIdWithPage(id, params.page),
    () => fetchStorageBoardComments(storageId, id, params),
    {
      enabled: !!storageId && !!id && !!params.page,
      keepPreviousData: true
    }
  );

  const { mutate, isLoading } = useMutation(
    (data: DeleteStorageBoardCommentData) => deleteNonMemberStorageBoardComment(data),
    {
      onSuccess: () => {
        const { page } = params;

        if (page > 1 && page === commentLatestPage && comments.length - 1 <= 0) {
          setParams((prevParams) => ({
            ...prevParams,
            page: commentLatestPage - 1 ? commentLatestPage - 1 : 1
          }));
        } else {
          queryClient
            .invalidateQueries(
              queryKeys.storageBoardComments.storageBoardCommentsByIdWithPage(Number(id), page || 1)
            )
            .then();
        }
        setPassword('');
        resetCommentDeleteBottomState();
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
    resetCommentDeleteBottomState();

    setCommentMenuBottomSheetState((prevState) => ({
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
      resetCommentDeleteBottomState();
    };
  }, [resetCommentDeleteBottomState]);

  return (
    <CommentDeleteBottomSheet
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

export default StorageBoardCommentDeleteBottomSheet;
