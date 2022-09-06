import { atom } from 'recoil';

import { DeleteStorageBoardCommentReplyData } from '@api/v1/storage-board-comment-replies';
import {
  DeleteStorageBoardCommentData,
  FetchStorageBoardCommentsParams
} from '@api/v1/storage-board-comments';

export const storageBoardHideHeaderSubjectState = atom({
  key: 'storageBoard/hideHeaderSubjectState',
  default: true
});

export const storageBoardCommentsParamsDefault: FetchStorageBoardCommentsParams = {
  page: 0,
  per: 10,
  orderBy: 'old'
};

export const storageBoardCommentsParamsState = atom({
  key: 'storageBoard/commentsParamsState',
  default: storageBoardCommentsParamsDefault
});

export const storageBoardReplyListBottomSheetState = atom<{
  open: boolean;
  storageId: number;
  commentId: number;
}>({
  key: 'storageBoard/replyListBottomSheetState',
  default: {
    open: false,
    storageId: 0,
    commentId: 0
  }
});

export const storageBoardCommentMenuBottomSheetState = atom<
  Omit<DeleteStorageBoardCommentData, 'password'> & {
    open: boolean;
    commentsLength: number;
    commentLatestPage: number;
  }
>({
  key: 'storageBoard/commentMenuBottomSheetState',
  default: {
    open: false,
    storageId: 0,
    id: 0,
    commentId: 0,
    commentsLength: 0,
    commentLatestPage: 0
  }
});

export const storageBoardCommentDeleteBottomSheetState = atom<
  Omit<DeleteStorageBoardCommentData, 'password'> & {
    open: boolean;
    commentsLength: number;
    commentLatestPage: number;
  }
>({
  key: 'storageBoard/commentDeleteBottomSheetState',
  default: {
    open: false,
    storageId: 0,
    id: 0,
    commentId: 0,
    commentsLength: 0,
    commentLatestPage: 0
  }
});

export const storageBoardReplyMenuBottomSheetState = atom<
  Omit<DeleteStorageBoardCommentReplyData, 'password'> & {
    open: boolean;
  }
>({
  key: 'storageBoard/replyMenuBottomSheetState',
  default: {
    open: false,
    storageId: 0,
    id: 0,
    commentId: 0,
    replyId: 0
  }
});

export const storageBoardReplyDeleteBottomSheetState = atom<
  Omit<DeleteStorageBoardCommentReplyData, 'password'> & {
    open: boolean;
  }
>({
  key: 'storageBoard/replyDeleteBottomSheetState',
  default: {
    open: false,
    storageId: 0,
    id: 0,
    commentId: 0,
    replyId: 0
  }
});
