import { atom } from 'recoil';

import { FetchStorageBoardsParams } from '@api/v1/storage-boards';

export const storageBoardsSearchParamsDefault: FetchStorageBoardsParams = {
  subject: null,
  content: null,
  nickname: null,
  page: 1,
  per: 20,
  orderBy: 'latest'
};

export const storageBoardsSearchParamsState = atom<FetchStorageBoardsParams>({
  key: 'storageBoardsSearch/paramsState',
  default: storageBoardsSearchParamsDefault
});

// TODO 추후 사용
export const storageBoardsSearchPendingState = atom({
  key: 'storageBoardsSearch/pendingState',
  default: false
});
