import { useEffect } from 'react';

import { useRouter } from 'next/router';

import { useQuery } from '@tanstack/react-query';

import { useRecoilState, useResetRecoilState } from 'recoil';

import { storageBoardCommentsParamsState } from '@recoil/storageBoard/atoms';

import { CustomStyle, Flexbox, Icon, Pagination, Typography, useTheme } from 'cocstorage-ui';

import Message from '@components/UI/molecules/Message';
import Comment from '@components/UI/organisms/Comment';
import CommentSkeleton from '@components/UI/organisms/Comment/CommentSkeleton';

import { fetchStorageBoardComments } from '@api/v1/storage-board-comments';
import { fetchStorageBoard } from '@api/v1/storage-boards';
import { fetchStorage } from '@api/v1/storages';

import queryKeys from '@constants/queryKeys';

interface CommentListProps {
  customStyle?: CustomStyle;
}

function CommentList({ customStyle }: CommentListProps) {
  const router = useRouter();
  const { path, id } = router.query;

  const {
    theme: {
      palette: { primary }
    }
  } = useTheme();

  const [params, setParams] = useRecoilState(storageBoardCommentsParamsState);
  const resetParams = useResetRecoilState(storageBoardCommentsParamsState);

  const { data: { id: storageId } = {} } = useQuery(
    queryKeys.storages.storageById(String(path)),
    () => fetchStorage(String(path))
  );

  const { data: { commentTotalCount = 0, commentLatestPage = 0 } = {} } = useQuery(
    queryKeys.storageBoards.storageBoardById(Number(id)),
    () => fetchStorageBoard(Number(storageId), Number(id))
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
      enabled: !!params.page,
      keepPreviousData: true
    }
  );

  const handleChange = (value: number) =>
    setParams((prevParams) => ({
      ...prevParams,
      page: value
    }));

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

  if (!isLoading && !comments.length)
    return (
      <Message
        title="댓글이 없네요!"
        message="첫 댓글의 주인공이 되어 주실래요?"
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
            {commentTotalCount.toLocaleString()}
          </Typography>
        </Flexbox>
      </Flexbox>
      <Flexbox gap={18} direction="vertical">
        {isLoading &&
          Array.from({ length: 10 }).map((_, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <CommentSkeleton key={`comment-skeleton-${index}`} />
          ))}
        {!isLoading &&
          comments.map((comment) => <Comment key={`comment-${comment.id}`} comment={comment} />)}
      </Flexbox>
      <Pagination
        count={totalPages * perPage}
        page={currentPage}
        rowPerPage={perPage}
        onChange={handleChange}
        itemCount={5}
        customStyle={{ margin: 'auto' }}
      />
    </Flexbox>
  );
}

export default CommentList;
