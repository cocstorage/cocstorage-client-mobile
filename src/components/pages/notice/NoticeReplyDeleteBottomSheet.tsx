import { ChangeEvent, useEffect, useRef, useState } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';

import {
  DeleteNoticeCommentReplyData,
  deleteNonMemberNoticeCommentReply
} from '@api/v1/notice-comment-replies';
import ReplyDeleteBottomSheet from '@components/UI/organisms/ReplyDeleteBottomSheet';
import queryKeys from '@constants/queryKeys';
import {
  noticeCommentsParamsState,
  noticeReplyDeleteBottomSheetState,
  noticeReplyListBottomSheetState,
  noticeReplyMenuBottomSheetState
} from '@recoil/pages/notice/atoms';

function NoticeReplyDeleteBottomSheet() {
  const params = useRecoilValue(noticeCommentsParamsState);
  const { open, id, commentId, replyId } = useRecoilValue(noticeReplyDeleteBottomSheetState);
  const setReplyMenuBottomSheetState = useSetRecoilState(noticeReplyMenuBottomSheetState);
  const setReplyListBottomSheetState = useSetRecoilState(noticeReplyListBottomSheetState);
  const resetReplyDeleteBottomState = useResetRecoilState(noticeReplyDeleteBottomSheetState);

  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<{
    error: boolean;
    message: string;
  }>({
    error: false,
    message: ''
  });

  const openReplyListBottomSheetTimerRef = useRef<ReturnType<typeof setTimeout>>();

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(
    (data: DeleteNoticeCommentReplyData) => deleteNonMemberNoticeCommentReply(data),
    {
      onSuccess: () => {
        const { page } = params;

        queryClient
          .invalidateQueries(
            queryKeys.noticeComments.noticeCommentsByIdWithPage(Number(id), page || 1)
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

    openReplyListBottomSheetTimerRef.current = setTimeout(() => {
      setReplyMenuBottomSheetState((prevState) => ({
        ...prevState,
        open: true
      }));
    }, 500);
  };

  const handleClick = () =>
    mutate({
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

export default NoticeReplyDeleteBottomSheet;
