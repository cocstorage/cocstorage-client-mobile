import { User } from '@dto/uesrs';

export interface Storage {
  id: number;
  storageCategoryId: number;
  user: User;
  path: string;
  name: string;
  description: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  code: string | null;
  storageType: string;
  issueKeywordId: number | null;
  avatarUrl: string | null;
}
