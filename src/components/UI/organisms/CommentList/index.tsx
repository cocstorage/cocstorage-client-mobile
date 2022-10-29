import { useEffect } from 'react';

import { useRouter } from 'next/router';

import { useQuery } from '@tanstack/react-query';

import { useRecoilState, useResetRecoilState } from 'recoil';

import { noticeCommentsParamsState } from '@recoil/pages/notice/atoms';
import { storageBoardCommentsParamsState } from '@recoil/pages/storageBoard/atoms';

import { CustomStyle, Flexbox, Icon, Pagination, Typography, useTheme } from 'cocstorage-ui';

import Message from '@components/UI/molecules/Message';
import Comment from '@components/UI/organisms/Comment';
import CommentSkeleton from '@components/UI/organisms/Comment/CommentSkeleton';

import { fetchNoticeComments } from '@api/v1/notice-comments';
import { fetchNotice } from '@api/v1/notices';
import { fetchStorageBoardComments } from '@api/v1/storage-board-comments';
import { fetchStorageBoard } from '@api/v1/storage-boards';
import { fetchStorage } from '@api/v1/storages';

import queryKeys from '@constants/queryKeys';

interface CommentListProps {
  type?: 'storageBoard' | 'notice';
  customStyle?: CustomStyle;
}

function CommentList({ type = 'storageBoard', customStyle }: CommentListProps) {
  const router = useRouter();
  const { path, id } = router.query;

  const {
    theme: {
      palette: { primary }
    }
  } = useTheme();

  const [params, setParams] = useRecoilState(storageBoardCommentsParamsState);
  const resetParams = useResetRecoilState(storageBoardCommentsParamsState);

  const [noticeCommentsParams, setNoticeCommentsParams] = useRecoilState(noticeCommentsParamsState);
  const resetNoticeCommentsParams = useResetRecoilState(noticeCommentsParamsState);

  const { data: { id: storageId = 0 } = {} } = useQuery(
    queryKeys.storages.storageById(String(path)),
    () => fetchStorage(String(path)),
    {
      enabled: type === 'storageBoard'
    }
  );

  const { data: { commentTotalCount = 0, commentLatestPage = 0 } = {} } = useQuery(
    queryKeys.storageBoards.storageBoardById(Number(id)),
    () => fetchStorageBoard(Number(storageId), Number(id)),
    {
      enabled: type === 'storageBoard'
    }
  );

  const {
    data: {
      comments = [],
      pagination: { totalPages = 1, perPage = 10, currentPage = 1 } = {}
    } = {},
    isLoading
  } = useQuery(
    queryKeys.storageBoardComments.storageBoardCommentsByIdWithPage(Number(id), params.page),
    () => fetchStorageBoardComments(storageId, Number(id), params),
    {
      enabled: type === 'storageBoard' && !!params.page,
      keepPreviousData: true
    }
  );

  const {
    data: {
      commentTotalCount: noticeCommentTotalCount = 0,
      commentLatestPage: noticeCommentLatestPage = 0
    } = {}
  } = useQuery(queryKeys.notices.noticeById(Number(id)), () => fetchNotice(Number(id)), {
    enabled: type === 'notice' && !!noticeCommentsParams.page
  });

  const {
    data: {
      comments: noticeComments = [],
      pagination: {
        totalPages: noticeCommentsTotalPages = 1,
        perPage: noticeCommentsPerPage = 10,
        currentPage: noticeCommentsCurrentPage = 1
      } = {}
    } = {},
    isLoading: isLoadingNoticeComments
  } = useQuery(
    queryKeys.noticeComments.noticeCommentsByIdWithPage(Number(id), noticeCommentsParams.page),
    () => fetchNoticeComments(Number(id), noticeCommentsParams),
    {
      enabled: type === 'notice' && !!noticeCommentsParams.page,
      keepPreviousData: true
    }
  );

  const handleChange = (value: number) => {
    if (type === 'storageBoard') {
      setParams((prevParams) => ({
        ...prevParams,
        page: value
      }));
    } else if (type === 'notice') {
      setNoticeCommentsParams((prevParams) => ({
        ...prevParams,
        page: value
      }));
    }
  };

  useEffect(() => {
    if (type === 'storageBoard') {
      setParams((prevState) => ({
        ...prevState,
        page: commentLatestPage || 1
      }));
    }
  }, [type, setParams, commentLatestPage]);

  useEffect(() => {
    if (type === 'notice') {
      setNoticeCommentsParams((prevParams) => ({
        ...prevParams,
        page: noticeCommentLatestPage || 1
      }));
    }
  }, [type, setNoticeCommentsParams, noticeCommentLatestPage]);

  useEffect(() => {
    return () => {
      resetParams();
    };
  }, [resetParams]);

  useEffect(() => {
    return () => {
      resetNoticeCommentsParams();
    };
  }, [resetNoticeCommentsParams]);

  if (
    (type === 'storageBoard' && !isLoading && !comments.length) ||
    (type === 'notice' && !isLoadingNoticeComments && !noticeComments.length)
  )
    return (
      <Message
        title="아직 댓글이 없네요."
        message="첫 댓글을 남겨주세요!"
        hideButton
        customStyle={{ margin: '40px 0 50px' }}
      />
    );

  return (
    <Flexbox component="section" direction="vertical" gap={24} customStyle={customStyle}>
      <Flexbox gap={4} alignment="center">
        <Icon name="CommentOutlined" width={20} height={20} />
        <Flexbox gap={6}>
          <Typography variant="h4" fontWeight="bold">
            댓글
          </Typography>
          <Typography
            variant="h4"
            fontWeight="bold"
            customStyle={{
              color: primary.main
            }}
          >
            {(commentTotalCount || noticeCommentTotalCount).toLocaleString()}
          </Typography>
        </Flexbox>
      </Flexbox>
      <Flexbox gap={18} direction="vertical">
        {type === 'storageBoard' &&
          isLoading &&
          Array.from({ length: 10 }).map((_, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <CommentSkeleton key={`comment-skeleton-${index}`} />
          ))}
        {type === 'storageBoard' &&
          !isLoading &&
          comments.map((comment) => <Comment key={`comment-${comment.id}`} comment={comment} />)}
        {type === 'notice' &&
          isLoadingNoticeComments &&
          Array.from({ length: 10 }).map((_, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <CommentSkeleton key={`notice-comment-skeleton-${index}`} />
          ))}
        {type === 'notice' &&
          !isLoadingNoticeComments &&
          noticeComments.map((noticeComment) => (
            <Comment
              key={`notice-comment-${noticeComment.id}`}
              type="notice"
              comment={noticeComment}
            />
          ))}
      </Flexbox>
      {type === 'storageBoard' && (
        <Pagination
          count={totalPages * perPage}
          page={currentPage}
          rowPerPage={perPage}
          onChange={handleChange}
          itemCount={5}
          customStyle={{ margin: 'auto' }}
        />
      )}
      {type === 'notice' && (
        <Pagination
          count={noticeCommentsTotalPages * noticeCommentsPerPage}
          page={noticeCommentsCurrentPage}
          rowPerPage={noticeCommentsPerPage}
          onChange={handleChange}
          itemCount={5}
          customStyle={{ margin: 'auto' }}
        />
      )}
    </Flexbox>
  );
}

export default CommentList;
