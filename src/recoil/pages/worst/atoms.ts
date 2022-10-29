import { atom } from 'recoil';

import { FetchStorageBoardsParams } from '@api/v1/storage-boards';

export const worstParamsDefault: FetchStorageBoardsParams = {
  page: 1,
  per: 20
};

export const worstParamsState = atom({
  key: 'worst/paramsState',
  default: worstParamsDefault
});
