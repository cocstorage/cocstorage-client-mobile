import { atom } from 'recoil';

import LocalStorage from '@library/localStorage';
import getRandomNickname from '@utils/getRandomNickname';
import getRandomPassword from '@utils/getRandomPassword';

import localStorageKeys from '@constants/localStorageKeys';

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
      let password = LocalStorage.get<string>(localStorageKeys.password) || '';

      if (!password) {
        password = getRandomPassword();
        LocalStorage.set(localStorageKeys.password, password);
      }

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
