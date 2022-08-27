import { atom, atomFamily } from 'recoil';

import { FetchStorageBoardsParams } from '@api/v1/storage-boards';

export const storageBoardsParamsDefault: FetchStorageBoardsParams = {
  subject: null,
  content: null,
  nickname: null,
  page: 1,
  per: 20,
  orderBy: 'latest'
};

export const storageBoardsParamsStateFamily = atomFamily<
  { path: string; params: FetchStorageBoardsParams },
  string
>({
  key: 'storageBoards/storageBoardsParamsStateFamily',
  default: (path) => ({
    path,
    params: storageBoardsParamsDefault
  })
});

export const openStorageBoardsInfoBottomSheetState = atom({
  key: 'storageBoards/openStorageBoardsInfoBottomSheetState',
  default: false
});
