import { atom } from 'recoil';

import { FetchNoticesParams } from '@api/v1/notices';

export const noticesParamsDefault: FetchNoticesParams = {
  page: 1,
  per: 20,
  orderBy: 'latest'
};

export const noticesParamsState = atom({
  key: 'notices/paramsState',
  default: noticesParamsDefault
});
