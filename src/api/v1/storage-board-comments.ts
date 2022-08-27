import { Pagination } from '@dto/common';
import { StorageBoardComment } from '@dto/storage-board-comments';
import Axios from '@library/axios';

const BASE_PATH = '/storages';

export async function fetchStorageBoardComments(
  storageId: number,
  id: number | string,
  params?: FetchStorageBoardCommentsParams
) {
  const { data } = await Axios.get<FetchStorageBoardCommentsResponse>(
    `${BASE_PATH}/${storageId}/boards/${id}/comments`,
    {
      params
    }
  );

  return data;
}

export async function postNonMemberStorageBoardComment(
  storageId: number,
  id: number | string,
  data: PostStorageBoardCommentData
) {
  const { data: response } = await Axios.post<StorageBoardComment, PostStorageBoardCommentData>(
    `${BASE_PATH}/${storageId}/boards/${id}/comments/non-members`,
    data
  );

  return response;
}

export async function deleteNonMemberStorageBoardComment(
  storageId: number,
  id: number,
  commentId: number,
  password: string
) {
  const { data: response } = await Axios.delete<StorageBoardComment>(
    `${BASE_PATH}/${storageId}/boards/${id}/comments/non-members/${commentId}`,
    {
      data: {
        password
      }
    }
  );

  return response;
}

export interface FetchStorageBoardCommentsParams {
  page?: number;
  per?: number;
  orderBy?: string;
}

export interface FetchStorageBoardCommentsResponse {
  comments: StorageBoardComment[];
  pagination: Pagination;
}

export interface PostStorageBoardCommentData {
  nickname?: string | null;
  password?: string | null;
  content: string | null;
}
