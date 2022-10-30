import { atom } from 'recoil';

import { DeleteNoticeCommentReplyData } from '@api/v1/notice-comment-replies';
import { DeleteNoticeCommentData, FetchNoticeCommentsParams } from '@api/v1/notice-comments';

export const noticeHideHeaderSubjectState = atom({
  key: 'notice/hideHeaderSubjectState',
  default: true
});

export const noticeCommentsParamsDefault: FetchNoticeCommentsParams = {
  page: 0,
  per: 10,
  orderBy: 'old'
};

export const noticeCommentsParamsState = atom({
  key: 'notice/commentsParamsState',
  default: noticeCommentsParamsDefault
});

export const noticeCommentMenuBottomSheetState = atom<
  Omit<Partial<DeleteNoticeCommentData>, 'password'> & {
    open: boolean;
  }
>({
  key: 'notice/commentMenuBottomSheetState',
  default: {
    open: false,
    id: 0,
    commentId: 0
  }
});

export const noticeCommentDeleteBottomSheetState = atom<
  Omit<Partial<DeleteNoticeCommentData>, 'password'> & {
    open: boolean;
  }
>({
  key: 'notice/commentDeleteBottomSheetState',
  default: {
    open: false,
    id: 0,
    commentId: 0
  }
});

export const noticeReplyListBottomSheetState = atom<{
  open: boolean;
  commentId: number;
}>({
  key: 'notice/replyListBottomSheetState',
  default: {
    open: false,
    commentId: 0
  }
});

export const noticeReplyMenuBottomSheetState = atom<
  Omit<Partial<DeleteNoticeCommentReplyData>, 'password'> & {
    open: boolean;
  }
>({
  key: 'notice/replyMenuBottomSheetState',
  default: {
    open: false,
    id: 0,
    commentId: 0,
    replyId: 0
  }
});

export const noticeReplyDeleteBottomSheetState = atom<
  Omit<Partial<DeleteNoticeCommentReplyData>, 'password'> & {
    open: boolean;
  }
>({
  key: 'notice/replyDeleteBottomSheetState',
  default: {
    open: false,
    id: 0,
    commentId: 0,
    replyId: 0
  }
});
