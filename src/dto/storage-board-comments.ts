import { StorageBoardCommentReply } from '@dto/storage-board-comment-replies';
import { User } from '@dto/uesrs';

export interface StorageBoardComment {
  id: number;
  storageBoardId: number;
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
  replies: StorageBoardCommentReply[];
}
