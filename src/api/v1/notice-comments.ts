import { Pagination } from '@dto/common';
import { NoticeComment } from '@dto/notice-comments';
import Axios from '@library/axios';

const BASE_PATH = '/admin/notices';

export async function fetchNoticeComments(id: number, params?: FetchNoticeCommentsParams) {
  const { data } = await Axios.get<FetchNoticeCommentsResponse>(`${BASE_PATH}/${id}/comments`, {
    params
  });

  return data;
}

export async function postNonMemberNoticeComment(id: number, data: PostNoticeCommentData) {
  const { data: response } = await Axios.post<NoticeComment, PostNoticeCommentData>(
    `${BASE_PATH}/${id}/comments/non-members`,
    data
  );

  return response;
}

export async function deleteNonMemberNoticeComment({
  id,
  commentId,
  password
}: DeleteNoticeCommentData) {
  const { data: response } = await Axios.delete<NoticeComment>(
    `${BASE_PATH}/${id}/comments/non-members/${commentId}`,
    {
      data: {
        password
      }
    }
  );

  return response;
}

export interface FetchNoticeCommentsParams {
  page?: number;
  per?: number;
  orderBy?: string;
}

export interface FetchNoticeCommentsResponse {
  comments: NoticeComment[];
  pagination: Pagination;
}

export interface PostNoticeCommentData {
  nickname?: string | null;
  password?: string | null;
  content: string | null;
}

export interface DeleteNoticeCommentData {
  id: number;
  commentId: number;
  password: string;
}
