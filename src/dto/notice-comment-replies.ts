import { User } from '@dto/uesrs';

export interface NoticeCommentReply {
  id: number;
  noticeCommentId: number;
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
}
