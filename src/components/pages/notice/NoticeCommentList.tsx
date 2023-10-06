import { useEffect, useRef } from 'react';

import { useRouter } from 'next/router';

import { useQuery } from '@tanstack/react-query';
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';

import { fetchNoticeComments } from '@api/v1/notice-comments';
import { fetchNotice } from '@api/v1/notices';
import CommentList from '@components/UI/organisms/CommentList';
import queryKeys from '@constants/queryKeys';
import {
  noticeCommentMenuBottomSheetState,
  noticeCommentsParamsState,
  noticeReplyListBottomSheetState,
  noticeReplyMenuBottomSheetState
} from '@recoil/pages/notice/atoms';

function NoticeCommentList() {
  const router = useRouter();
  const { id } = router.query;

  const [params, setParams] = useRecoilState(noticeCommentsParamsState);
  const setReplyListBottomSheetState = useSetRecoilState(noticeReplyListBottomSheetState);
  const setCommentMenuBottomSheetState = useSetRecoilState(noticeCommentMenuBottomSheetState);
  const setReplyMenuBottomSheetState = useSetRecoilState(noticeReplyMenuBottomSheetState);
  const resetParams = useResetRecoilState(noticeCommentsParamsState);

  const openReplyMenuBottomSheetTimerRef = useRef<ReturnType<typeof setTimeout>>();

  const { data: { commentTotalCount = 0, commentLatestPage = 0 } = {} } = useQuery(
    queryKeys.notices.noticeById(Number(id)),
    () => fetchNotice(Number(id))
  );

  const { data: { comments = [], pagination } = {}, isLoading } = useQuery(
    queryKeys.noticeComments.noticeCommentsByIdWithPage(Number(id), params.page),
    () => fetchNoticeComments(Number(id), params),
    {
      enabled: !!params.page,
      keepPreviousData: true
    }
  );

  const handleChange = (value: number) =>
    setParams((prevParams) => ({
      ...prevParams,
      page: value
    }));

  const handleClick = (commentId: number) => () =>
    setReplyListBottomSheetState({
      open: true,
      commentId
    });

  const handleClickCommentMenu = (commentId: number) => () =>
    setCommentMenuBottomSheetState({
      open: true,
      id: Number(id),
      commentId
    });

  const handleClickReplyMenu = (commentId: number, replyId: number) => () => {
    setReplyListBottomSheetState((prevState) => ({
      ...prevState,
      commentId,
      open: false
    }));

    openReplyMenuBottomSheetTimerRef.current = setTimeout(() => {
      setReplyMenuBottomSheetState({
        open: true,
        id: Number(id),
        commentId,
        replyId
      });
    }, 500);
  };

  useEffect(() => {
    setParams((prevState) => ({
      ...prevState,
      page: commentLatestPage || 1
    }));
  }, [setParams, commentLatestPage]);

  useEffect(() => {
    return () => {
      resetParams();
    };
  }, [resetParams]);

  useEffect(() => {
    return () => {
      if (openReplyMenuBottomSheetTimerRef.current) {
        clearTimeout(openReplyMenuBottomSheetTimerRef.current);
      }
    };
  }, []);

  return (
    <CommentList
      comments={comments}
      pagination={pagination}
      totalCount={commentTotalCount}
      isLoading={isLoading}
      onChange={handleChange}
      onClickReplyListOpen={handleClick}
      onClickCommentMenu={handleClickCommentMenu}
      onClickReplyMenu={handleClickReplyMenu}
      customStyle={{ margin: '20px 0 20px' }}
    />
  );
}

export default NoticeCommentList;
