import { atom } from 'recoil';

import LocalStorage from '@library/localStorage';
import SessionStorage from '@library/sessionStorage';
import getRandomNickname from '@utils/getRandomNickname';

import { localStorageKeys } from '@constants/localStorageKeys';
import { sessionStorageKeys } from '@constants/sessionStorageKeys';

export const myNicknameState = atom({
  key: 'my/nicknameState',
  default: '',
  effects: [
    ({ onSet, setSelf }) => {
      let nickname = LocalStorage.get<string>(localStorageKeys.nickname);

      if (!nickname) {
        nickname = getRandomNickname();
        LocalStorage.set(localStorageKeys.nickname, nickname);
      }

      setSelf(nickname);

      onSet((newValue, _, isReset) => {
        if (isReset) {
          LocalStorage.remove(localStorageKeys.nickname);
        } else {
          LocalStorage.set(localStorageKeys.nickname, newValue);
        }
      });
    }
  ]
});

export const myPasswordState = atom({
  key: 'my/passwordState',
  default: '',
  effects: [
    ({ onSet, setSelf }) => {
      const password = LocalStorage.get<string>(localStorageKeys.password) || '';

      setSelf(password);

      onSet((newValue, _, isReset) => {
        if (isReset) {
          LocalStorage.remove(localStorageKeys.password);
        } else {
          LocalStorage.set(localStorageKeys.password, newValue);
        }
      });
    }
  ]
});

export const myHasSavedPasswordState = atom({
  key: 'my/hasSavedPasswordState',
  default: false,
  effects: [
    ({ onSet, setSelf }) => {
      const hasSavedPasswordToday =
        SessionStorage.get<boolean>(sessionStorageKeys.hasSavedPassword) || false;

      setSelf(hasSavedPasswordToday);

      onSet((newValue, _, isReset) => {
        if (isReset) {
          SessionStorage.remove(sessionStorageKeys.hasSavedPassword);
        } else {
          SessionStorage.set(sessionStorageKeys.hasSavedPassword, newValue);
        }
      });
    }
  ]
});
