import { User } from '@dto/uesrs';

export interface Notice {
  id: number;
  user: User;
  subject: string;
  content: string;
  description: string;
  viewCount: number;
  isDraft: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  thumbnailUrl: string | null;
  commentTotalCount: number;
  commentLatestPage: number;
}
