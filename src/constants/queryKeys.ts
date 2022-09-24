import { FetchNoticesParams } from '@api/v1/notices';
import { FetchStorageBoardsParams } from '@api/v1/storage-boards';

const storageCategories = {
  storageCategories: ['storageCategories']
};

const storages = {
  storages: ['storages'],
  storageById: (id: number | string) => ['storages', id]
};

const storageBoards = {
  indexPopularStorageBoards: ['indexPopularStorageBoards'],
  indexWorstStorageBoards: ['indexWorstStorageBoards'],
  popularStorageBoardsWithParams: (params: FetchStorageBoardsParams) => [
    'popularStorageBoards',
    params
  ],
  worstStorageBoardsWithParams: (params: FetchStorageBoardsParams) => [
    'worstStorageBoards',
    params
  ],
  latestStorageBoards: ['latestStorageBoards'],
  storageBoardsByIdWithParams: (id: number | string, params: FetchStorageBoardsParams) => [
    'storageBoards',
    id,
    params
  ],
  storageBoardsSearchByIdWithParams: (id: number | string, params: FetchStorageBoardsParams) => [
    'storageBoardsSearch',
    id,
    params
  ],
  storageBoardById: (id: number) => ['storageBoard', id]
};

const storageBoardComments = {
  storageBoardCommentsByIdWithPage: (id: number, page: number) => ['storageBoardComments', id, page]
};

const issueKeywords = {
  issueKeywordRank: ['issueKeywordRank']
};

const notices = {
  indexNotice: ['indexNotice'],
  noticesWithParams: (params: FetchNoticesParams) => ['notices', params],
  noticeById: (id: number) => ['notice', id]
};

const noticeComments = {
  noticeCommentsByIdWithPage: (id: number, page: number) => ['noticeComments', id, page]
};

const queryKeys = {
  storageCategories,
  storages,
  storageBoards,
  storageBoardComments,
  issueKeywords,
  notices,
  noticeComments
};

export default queryKeys;
