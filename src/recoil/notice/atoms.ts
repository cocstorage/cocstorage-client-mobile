import { atom } from 'recoil';

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
  Omit<DeleteNoticeCommentData, 'password'> & {
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
  Omit<DeleteNoticeCommentData, 'password'> & {
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
