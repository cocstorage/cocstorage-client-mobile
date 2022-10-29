import { ChangeEvent, useEffect, useState } from 'react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';

import {
  commonCommentDeleteBottomSheetState,
  commonCommentMenuBottomSheetState
} from '@recoil/common/atoms';
import { noticeCommentsParamsState } from '@recoil/pages/notice/atoms';
import { storageBoardCommentsParamsState } from '@recoil/pages/storageBoard/atoms';

import { BottomSheet, Box, Button, TextBar, Typography, useTheme } from 'cocstorage-ui';

import {
  DeleteNoticeCommentData,
  deleteNonMemberNoticeComment,
  fetchNoticeComments
} from '@api/v1/notice-comments';
import { fetchNotice } from '@api/v1/notices';
import {
  DeleteStorageBoardCommentData,
  deleteNonMemberStorageBoardComment,
  fetchStorageBoardComments
} from '@api/v1/storage-board-comments';
import { fetchStorageBoard } from '@api/v1/storage-boards';

import queryKeys from '@constants/queryKeys';

interface CommentDeleteBottomSheetProps {
  type?: 'storageBoard' | 'notice';
}

function CommentDeleteBottomSheet({ type = 'storageBoard' }: CommentDeleteBottomSheetProps) {
  const {
    theme: {
      palette: { secondary }
    }
  } = useTheme();

  const { open, storageId, id, commentId } = useRecoilValue(commonCommentDeleteBottomSheetState);
  const [params, setParams] = useRecoilState(storageBoardCommentsParamsState);
  const [noticeCommentsParams, setNoticeCommentParams] = useRecoilState(noticeCommentsParamsState);
  const resetCommentDeleteBottomState = useResetRecoilState(commonCommentDeleteBottomSheetState);
  const setCommentMenuBottomSheetState = useSetRecoilState(commonCommentMenuBottomSheetState);

  const [password, setPassword] = useState('');
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
      enabled: type === 'storageBoard' && !!storageId && !!id
    }
  );

  const { data: { comments = [] } = {} } = useQuery(
    queryKeys.storageBoardComments.storageBoardCommentsByIdWithPage(id, params.page),
    () => fetchStorageBoardComments(storageId, id, params),
    {
      enabled: type === 'storageBoard' && !!storageId && !!id && !!params.page,
      keepPreviousData: true
    }
  );

  const { data: { commentLatestPage: noticeCommentLatestPage } = {} } = useQuery(
    queryKeys.notices.noticeById(Number(id)),
    () => fetchNotice(Number(id)),
    {
      enabled: type === 'notice' && !!id
    }
  );

  const { data: { comments: noticeComments = [] } = {} } = useQuery(
    queryKeys.noticeComments.noticeCommentsByIdWithPage(Number(id), noticeCommentsParams.page),
    () => fetchNoticeComments(Number(id), noticeCommentsParams),
    {
      enabled: type === 'notice' && !!id && !!noticeCommentsParams.page,
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

  const { mutate: mutateDeleteNoticeCommentDelete, isLoading: isLoadingMutateDeleteNoticeComment } =
    useMutation((data: DeleteNoticeCommentData) => deleteNonMemberNoticeComment(data), {
      onSuccess: () => {
        const { page } = noticeCommentsParams;

        if (page > 1 && page === noticeCommentLatestPage && noticeComments.length - 1 <= 0) {
          setNoticeCommentParams((prevParams) => ({
            ...prevParams,
            page: noticeCommentLatestPage - 1 ? noticeCommentLatestPage - 1 : 1
          }));
        } else {
          queryClient
            .invalidateQueries(
              queryKeys.noticeComments.noticeCommentsByIdWithPage(Number(id), page || 1)
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
    });

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

  const handleClick = () => {
    if (type === 'storageBoard') {
      mutate({
        storageId,
        id,
        commentId,
        password
      });
    } else {
      mutateDeleteNoticeCommentDelete({
        id,
        commentId,
        password
      });
    }
  };

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
      resetCommentDeleteBottomState();
    };
  }, [resetCommentDeleteBottomState]);

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
          disabled={!password || isLoading || isLoadingMutateDeleteNoticeComment}
          customStyle={{ marginTop: 20, justifyContent: 'center' }}
        >
          확인
        </Button>
      </Box>
    </BottomSheet>
  );
}

export default CommentDeleteBottomSheet;
