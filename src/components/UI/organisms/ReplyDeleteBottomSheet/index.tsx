import { ChangeEvent, useEffect, useState } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';

import {
  commonReplyDeleteBottomSheetState,
  commonReplyListBottomSheetState,
  commonReplyMenuBottomSheetState
} from '@recoil/common/atoms';
import { noticeCommentsParamsState } from '@recoil/notice/atoms';
import { storageBoardCommentsParamsState } from '@recoil/storageBoard/atoms';

import { BottomSheet, Box, Button, TextBar, Typography, useTheme } from 'cocstorage-ui';

import {
  DeleteNoticeCommentReplyData,
  deleteNonMemberNoticeCommentReply
} from '@api/v1/notice-comment-replies';
import {
  DeleteStorageBoardCommentReplyData,
  deleteNonMemberStorageBoardCommentReply
} from '@api/v1/storage-board-comment-replies';

import queryKeys from '@constants/queryKeys';

interface ReplyDeleteBottomSheetProps {
  type?: 'storageBoard' | 'notice';
}

function ReplyDeleteBottomSheet({ type = 'storageBoard' }: ReplyDeleteBottomSheetProps) {
  const {
    theme: {
      palette: { secondary }
    }
  } = useTheme();

  const params = useRecoilValue(storageBoardCommentsParamsState);
  const noticeCommentsParams = useRecoilValue(noticeCommentsParamsState);
  const { open, storageId, id, commentId, replyId } = useRecoilValue(
    commonReplyDeleteBottomSheetState
  );
  const setReplyMenuBottomSheetState = useSetRecoilState(commonReplyMenuBottomSheetState);
  const setReplyListBottomSheetState = useSetRecoilState(commonReplyListBottomSheetState);
  const resetReplyDeleteBottomState = useResetRecoilState(commonReplyDeleteBottomSheetState);

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

        setTimeout(() => {
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

  const { mutate: mutateDeleteReply, isLoading: isLoadingMutateDeleteReply } = useMutation(
    (data: DeleteNoticeCommentReplyData) => deleteNonMemberNoticeCommentReply(data),
    {
      onSuccess: () => {
        const { page } = noticeCommentsParams;

        queryClient
          .invalidateQueries(
            queryKeys.noticeComments.noticeCommentsByIdWithPage(Number(id), page || 1)
          )
          .then();
        setPassword('');
        resetReplyDeleteBottomState();

        setTimeout(() => {
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

    setTimeout(() => {
      setReplyMenuBottomSheetState((prevState) => ({
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
        replyId,
        password
      });
    } else {
      mutateDeleteReply({
        id,
        commentId,
        replyId,
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

  return (
    <BottomSheet open={open} onClose={handleClose}>
      <Box customStyle={{ padding: '30px 20px' }}>
        <Typography variant="h3" fontWeight="bold" customStyle={{ textAlign: 'center' }}>
          답글을 삭제하려면
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
          disabled={!password || isLoading || isLoadingMutateDeleteReply}
          customStyle={{ marginTop: 20, justifyContent: 'center' }}
        >
          확인
        </Button>
      </Box>
    </BottomSheet>
  );
}

export default ReplyDeleteBottomSheet;
