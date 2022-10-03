import { ThemeMode } from 'cocstorage-ui/dist/types';
import { atom } from 'recoil';

import LocalStorage from '@library/localStorage';

import { DeleteNoticeCommentReplyData } from '@api/v1/notice-comment-replies';
import { DeleteNoticeCommentData } from '@api/v1/notice-comments';
import { DeleteStorageBoardCommentReplyData } from '@api/v1/storage-board-comment-replies';
import { DeleteStorageBoardCommentData } from '@api/v1/storage-board-comments';

import { localStorageKeys } from '@constants/localStorageKeys';

export const commonThemeDefault: ThemeMode | 'system' = 'system';

export const commonThemeState = atom<ThemeMode | 'system'>({
  key: 'common/themeState',
  default: commonThemeDefault,
  effects: [
    ({ onSet, setSelf }) => {
      const theme = LocalStorage.get<ThemeMode | 'system'>(localStorageKeys.theme) || 'system';

      setSelf(theme);

      onSet((newValue, _, isReset) => {
        if (isReset) {
          LocalStorage.remove(localStorageKeys.theme);
        } else {
          LocalStorage.set(localStorageKeys.theme, newValue);
        }
      });
    }
  ]
});

export const commonOnBoardingState = atom({
  key: 'common/onBoardingState',
  default: {
    comment: {
      step: 0,
      lastStep: 1
    }
  },
  effects: [
    ({ onSet, setSelf }) => {
      const onBoarding = LocalStorage.get<{
        comment: {
          step: number;
          lastStep: number;
        };
      }>(localStorageKeys.onBoarding) || {
        comment: {
          step: 0,
          lastStep: 1
        }
      };

      setSelf(onBoarding);

      onSet((newValue, _, isReset) => {
        if (isReset) {
          LocalStorage.remove(localStorageKeys.onBoarding);
        } else {
          LocalStorage.set(localStorageKeys.onBoarding, newValue);
        }
      });
    }
  ]
});

export const commonFeedbackDialogState = atom<{
  open: boolean;
  title: string;
  code?: string;
  message?: string;
}>({
  key: 'common/feedbackDialogState',
  default: {
    open: false,
    title: '',
    code: '',
    message: ''
  }
});

export const commonCommentMenuBottomSheetState = atom<
  Omit<Partial<DeleteStorageBoardCommentData & DeleteNoticeCommentData>, 'password'> & {
    open: boolean;
  }
>({
  key: 'common/commentMenuBottomSheetState',
  default: {
    open: false,
    storageId: 0,
    id: 0,
    commentId: 0
  }
});

export const commonCommentDeleteBottomSheetState = atom<
  Omit<Partial<DeleteStorageBoardCommentData & DeleteNoticeCommentData>, 'password'> & {
    open: boolean;
  }
>({
  key: 'common/commentDeleteBottomSheetState',
  default: {
    open: false,
    storageId: 0,
    id: 0,
    commentId: 0
  }
});

export const commonReplyListBottomSheetState = atom<{
  open: boolean;
  storageId?: number;
  commentId: number;
}>({
  key: 'common/replyListBottomSheetState',
  default: {
    open: false,
    storageId: 0,
    commentId: 0
  }
});

export const commonReplyMenuBottomSheetState = atom<
  Omit<Partial<DeleteStorageBoardCommentReplyData & DeleteNoticeCommentReplyData>, 'password'> & {
    open: boolean;
  }
>({
  key: 'common/replyMenuBottomSheetState',
  default: {
    open: false,
    storageId: 0,
    id: 0,
    commentId: 0,
    replyId: 0
  }
});

export const commonReplyDeleteBottomSheetState = atom<
  Omit<Partial<DeleteStorageBoardCommentReplyData & DeleteNoticeCommentReplyData>, 'password'> & {
    open: boolean;
  }
>({
  key: 'common/replyDeleteBottomSheetState',
  default: {
    open: false,
    storageId: 0,
    id: 0,
    commentId: 0,
    replyId: 0
  }
});
