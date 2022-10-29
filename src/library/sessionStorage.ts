import { sessionStorageKeys } from '@constants/sessionStorageKeys';

const SessionStorage = (() => {
  let sessionStorage: Storage | null;

  function init(): Storage | null {
    return typeof window !== 'undefined' ? window.sessionStorage : null;
  }

  return {
    getInstance() {
      if (sessionStorage) {
        return sessionStorage;
      }
      sessionStorage = init();
      return sessionStorage;
    },
    get<T>(key: keyof typeof sessionStorageKeys): T | null {
      if (sessionStorage) {
        const item = sessionStorage.getItem(key);
        return item ? JSON.parse(item) : null;
      }
      const initSessionStorage = SessionStorage.getInstance();

      if (initSessionStorage) {
        const item = initSessionStorage.getItem(key);
        return item ? JSON.parse(item) : null;
      }

      return null;
    },
    set<T>(key: keyof typeof sessionStorageKeys, value: T) {
      if (sessionStorage) {
        sessionStorage.setItem(key, JSON.stringify(value));
      } else {
        const initSessionStorage = SessionStorage.getInstance();

        if (initSessionStorage) {
          initSessionStorage.setItem(key, JSON.stringify(value));
        }
      }
    },
    remove(key: string) {
      if (sessionStorage) {
        sessionStorage.removeItem(key);
      } else {
        const initSessionStorage = SessionStorage.getInstance();

        if (initSessionStorage) {
          initSessionStorage.removeItem(key);
        }
      }
    },
    clear() {
      if (sessionStorage) {
        sessionStorage.clear();
      } else {
        const initSessionStorage = SessionStorage.getInstance();

        if (initSessionStorage) {
          initSessionStorage.clear();
        }
      }
    }
  };
})();

export default SessionStorage;
