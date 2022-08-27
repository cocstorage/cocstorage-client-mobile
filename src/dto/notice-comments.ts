import { NoticeCommentReply } from '@dto/notice-comment-replies';
import { User } from '@dto/uesrs';

export interface NoticeComment {
  id: number;
  noticeId: number;
  user: User | null;
  nickname: string;
  content: string;
  thumbUp: number;
  thumbDown: number;
  isActive: boolean;
  isMember: boolean;
  createdIp: string;
  createdAt: string;
  updatedAt: string;
  replies: NoticeCommentReply[];
}
