import { StorageBoardCommentReply } from '@dto/storage-board-comment-replies';
import Axios from '@library/axios';

const BASE_PATH = '/storages';

export async function postNonMemberStorageBoardCommentReply(
  storageId: number,
  id: number,
  commentId: number,
  data: PostStorageBoardCommentReplyData
) {
  const { data: response } = await Axios.post<
    StorageBoardCommentReply,
    PostStorageBoardCommentReplyData
  >(`${BASE_PATH}/${storageId}/boards/${id}/comments/${commentId}/replies/non-members`, data);

  return response;
}

export async function deleteNonMemberStorageBoardCommentReply({
  storageId,
  id,
  commentId,
  replyId,
  password
}: DeleteStorageBoardCommentReplyData) {
  const { data: response } = await Axios.delete<StorageBoardCommentReply>(
    `${BASE_PATH}/${storageId}/boards/${id}/comments/${commentId}/replies/non-members/${replyId}`,
    {
      data: {
        password
      }
    }
  );

  return response;
}

export interface PostStorageBoardCommentReplyData {
  nickname?: string | null;
  password?: string | null;
  content: string | null;
}

export interface DeleteStorageBoardCommentReplyData {
  storageId: number;
  id: number;
  commentId: number;
  replyId: number;
  password: string;
}
