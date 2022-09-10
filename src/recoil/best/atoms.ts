import { atom } from 'recoil';

import { FetchStorageBoardsParams } from '@api/v1/storage-boards';

export const bestParamsDefault: FetchStorageBoardsParams = {
  page: 1,
  per: 20
};

export const bestParamsState = atom({
  key: 'best/paramsState',
  default: bestParamsDefault
});
