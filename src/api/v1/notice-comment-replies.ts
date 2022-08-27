import { NoticeCommentReply } from '@dto/notice-comment-replies';
import Axios from '@library/axios';

const BASE_PATH = '/admin/notices';

export async function postNonMemberNoticeCommentReply(
  id: number,
  commentId: number,
  data: PostNoticeCommentReplyData
) {
  const { data: response } = await Axios.post<NoticeCommentReply, PostNoticeCommentReplyData>(
    `${BASE_PATH}/${id}/comments/${commentId}/replies/non-members`,
    data
  );

  return response;
}

export async function deleteNonMemberNoticeCommentReply(
  id: number,
  commentId: number,
  replyId: number,
  password: string
) {
  const { data: response } = await Axios.delete<NoticeCommentReply>(
    `${BASE_PATH}/${id}/comments/${commentId}/replies/non-members/${replyId}`,
    {
      data: {
        password
      }
    }
  );

  return response;
}

export interface PostNoticeCommentReplyData {
  nickname?: string | null;
  password?: string | null;
  content: string | null;
}
