import { Storage } from '@dto/storages';
import { User } from '@dto/uesrs';

export interface StorageBoard {
  id: number;
  storage: Pick<
    Storage,
    'id' | 'storageCategoryId' | 'path' | 'name' | 'description' | 'avatarUrl'
  >;
  user: User | null;
  nickname: string;
  subject: string;
  content: string;
  description: string;
  viewCount: number;
  thumbUp: number;
  thumbDown: number;
  hasImage: boolean;
  hasVideo: boolean;
  isDraft: boolean;
  isActive: boolean;
  isMember: boolean;
  createdIp: string;
  createdAt: string;
  updatedAt: string;
  isPopular: boolean;
  isWorst: boolean;
  scrapCode: string | null;
  sourceCode: string | null;
  thumbnailUrl: string | null;
  commentTotalCount: number;
  commentLatestPage: number;
}
