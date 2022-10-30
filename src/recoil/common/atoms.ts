import { atom } from 'recoil';

import { ThemeMode } from 'cocstorage-ui';

import LocalStorage from '@library/localStorage';

import localStorageKeys from '@constants/localStorageKeys';

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

export const commonOnBoardingDefault = {
  theme: {
    step: 0,
    lastStep: 1,
    done: false
  },
  search: {
    step: 0,
    lastStep: 1,
    done: false
  },
  comment: {
    step: 0,
    lastStep: 1,
    done: false
  }
};

export const commonOnBoardingState = atom({
  key: 'common/onBoardingState',
  default: commonOnBoardingDefault,
  effects: [
    ({ onSet, setSelf }) => {
      const onBoarding =
        LocalStorage.get<typeof commonOnBoardingDefault>(localStorageKeys.onBoarding) ||
        commonOnBoardingDefault;

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

export const commonHistoryState = atom<{
  index: number;
  object: string[];
}>({
  key: 'common/historyState',
  default: {
    index: 0,
    object: ['/']
  }
});

export const commonIsGoBackState = atom({
  key: 'common/isGoBackState',
  default: false
});

export const commonForwardPathState = atom({
  key: 'common/forwardPathState',
  default: '/'
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
