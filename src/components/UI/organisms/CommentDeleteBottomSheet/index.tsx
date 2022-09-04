import { ChangeEvent, useEffect, useState } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';

import {
  storageBoardCommentDeleteBottomSheetState,
  storageBoardCommentMenuBottomSheetState,
  storageBoardCommentsParamsState
} from '@recoil/storageBoard/atoms';

import { BottomSheet, Box, Button, TextBar, Typography, useTheme } from 'cocstorage-ui';

import {
  DeleteStorageBoardCommentData,
  deleteNonMemberStorageBoardComment
} from '@api/v1/storage-board-comments';

import queryKeys from '@constants/queryKeys';

function CommentDeleteBottomSheet() {
  const {
    theme: {
      palette: { secondary }
    }
  } = useTheme();

  const { open, storageId, id, commentId, commentsLength, commentLatestPage } = useRecoilValue(
    storageBoardCommentDeleteBottomSheetState
  );
  const [params, setParams] = useRecoilState(storageBoardCommentsParamsState);
  const resetCommentDeleteBottomState = useResetRecoilState(
    storageBoardCommentDeleteBottomSheetState
  );
  const setCommentMenuBottomSheetState = useSetRecoilState(storageBoardCommentMenuBottomSheetState);

  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<{
    error: boolean;
    message: string;
  }>({
    error: false,
    message: ''
  });

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(
    (data: DeleteStorageBoardCommentData) => deleteNonMemberStorageBoardComment(data),
    {
      onSuccess: () => {
        const { page } = params;

        if (page > 1 && page === commentLatestPage && commentsLength - 1 <= 0) {
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

    setTimeout(() => {
      setCommentMenuBottomSheetState((prevState) => ({
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

  return (
    <BottomSheet open={open} onClose={handleClose}>
      <Box customStyle={{ padding: '30px 20px' }}>
        <Typography variant="h3" fontWeight="bold" customStyle={{ textAlign: 'center' }}>
          댓글을 삭제하려면
          <br /> 비밀번호를 입력해주세요.
        </Typography>
        <TextBar
          type="password"
          onChange={handleChange}
          value={password}
          fullWidth
          size="big"
          label="비밀번호"
          autoComplete="current-password"
          customStyle={{ marginTop: 30 }}
        />
        {errorMessage.error && (
          <Typography customStyle={{ marginTop: 10, color: secondary.red.main }}>
            {errorMessage.message}
          </Typography>
        )}
        <Button
          variant="accent"
          fullWidth
          onClick={handleClick}
          disabled={!password || isLoading}
          customStyle={{ marginTop: 20, justifyContent: 'center' }}
        >
          확인
        </Button>
      </Box>
    </BottomSheet>
  );
}

export default CommentDeleteBottomSheet;
