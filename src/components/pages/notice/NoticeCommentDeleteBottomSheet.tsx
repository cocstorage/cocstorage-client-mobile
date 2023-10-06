import { ChangeEvent, useEffect, useRef, useState } from 'react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';

import {
  DeleteNoticeCommentData,
  deleteNonMemberNoticeComment,
  fetchNoticeComments
} from '@api/v1/notice-comments';
import { fetchNotice } from '@api/v1/notices';
import CommentDeleteBottomSheet from '@components/UI/organisms/CommentDeleteBottomSheet';
import queryKeys from '@constants/queryKeys';
import {
  noticeCommentDeleteBottomSheetState,
  noticeCommentMenuBottomSheetState,
  noticeCommentsParamsState
} from '@recoil/pages/notice/atoms';

function NoticeCommentDeleteBottomSheet() {
  const { open, id, commentId } = useRecoilValue(noticeCommentDeleteBottomSheetState);
  const [params, setParams] = useRecoilState(noticeCommentsParamsState);
  const setCommentMenuBottomSheetState = useSetRecoilState(noticeCommentMenuBottomSheetState);
  const resetCommentDeleteBottomState = useResetRecoilState(noticeCommentDeleteBottomSheetState);

  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<{
    error: boolean;
    message: string;
  }>({
    error: false,
    message: ''
  });

  const openCommentMenuBottomSheetRef = useRef<ReturnType<typeof setTimeout>>();

  const queryClient = useQueryClient();

  const { data: { commentLatestPage = 0 } = {} } = useQuery(
    queryKeys.notices.noticeById(id),
    () => fetchNotice(id),
    {
      enabled: !!id
    }
  );

  const { data: { comments = [] } = {} } = useQuery(
    queryKeys.noticeComments.noticeCommentsByIdWithPage(id, params.page),
    () => fetchNoticeComments(id, params),
    {
      enabled: !!id && !!params.page,
      keepPreviousData: true
    }
  );

  const { mutate, isLoading } = useMutation(
    (data: DeleteNoticeCommentData) => deleteNonMemberNoticeComment(data),
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

    openCommentMenuBottomSheetRef.current = setTimeout(() => {
      setCommentMenuBottomSheetState((prevState) => ({
        ...prevState,
        open: true
      }));
    }, 500);
  };

  const handleClick = () =>
    mutate({
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

  useEffect(() => {
    return () => {
      resetCommentDeleteBottomState();
    };
  }, [resetCommentDeleteBottomState]);

  useEffect(() => {
    return () => {
      if (openCommentMenuBottomSheetRef.current) {
        clearTimeout(openCommentMenuBottomSheetRef.current);
      }
    };
  }, []);

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

export default NoticeCommentDeleteBottomSheet;
