import { atom } from 'recoil';

import {
  DeleteStorageBoardCommentData,
  FetchStorageBoardCommentsParams
} from '@api/v1/storage-board-comments';

export const hideHeaderSubjectState = atom({
  key: 'storageBoards/hideHeaderSubjectState',
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
