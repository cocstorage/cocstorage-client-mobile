import { CustomStyle, Flexbox, Pagination, Skeleton, Typography, useTheme } from '@cocstorage/ui';
import Icon from '@cocstorage/ui-icons';

import { Comment, Message } from '@components/UI/molecules';
import CommentSkeleton from '@components/UI/molecules/Comment/CommentSkeleton';
import { Pagination as IPagination } from '@dto/common';
import { NoticeComment } from '@dto/notice-comments';
import { StorageBoardComment } from '@dto/storage-board-comments';

interface CommentListProps {
  comments: StorageBoardComment[] | NoticeComment[];
  pagination: IPagination;
  totalCount: number;
  isLoading?: boolean;
  onChange: (value: number) => void;
  onClickReplyListOpen: (commentId: number) => () => void;
  onClickCommentMenu: (commentId: number) => () => void;
  onClickReplyMenu: (commentId: number, replyId: number) => () => void;
  customStyle?: CustomStyle;
}

function CommentList({
  comments = [],
  pagination: { totalPages = 1, perPage = 10, currentPage = 1 } = {
    totalPages: 1,
    perPage: 10,
    currentPage: 1,
    isLastPage: true,
    nextPage: null,
    prevPage: null
  },
  totalCount,
  isLoading,
  onChange,
  onClickReplyListOpen,
  onClickCommentMenu,
  onClickReplyMenu,
  customStyle
}: CommentListProps) {
  const {
    theme: {
      palette: { primary }
    }
  } = useTheme();

  if (!isLoading && !comments.length)
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
        {isLoading && <Skeleton width={40} height={20} round={6} disableAspectRatio />}
        {!isLoading && (
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
              {totalCount.toLocaleString()}
            </Typography>
          </Flexbox>
        )}
      </Flexbox>
      <Flexbox gap={18} direction="vertical">
        {isLoading &&
          Array.from({ length: 10 }).map((_, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <CommentSkeleton key={`comment-skeleton-${index}`} />
          ))}
        {!isLoading &&
          comments.map((comment) => (
            <Comment
              key={`comment-${comment.id}`}
              comment={comment}
              onClickReplyListOpen={onClickReplyListOpen(comment.id)}
              onClickMenu={onClickCommentMenu(comment.id)}
              onClickReplyMenu={onClickReplyMenu}
            />
          ))}
        <Pagination
          count={totalPages * perPage}
          page={currentPage}
          rowPerPage={perPage}
          onChange={onChange}
          itemCount={5}
          customStyle={{ margin: 'auto' }}
        />
      </Flexbox>
    </Flexbox>
  );
}

export default CommentList;
