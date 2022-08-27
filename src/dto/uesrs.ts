export interface User {
  id: number;
  nickname: string;
  isAuthenticated: boolean;
  role: string;
  avatarUrl: string | null;
}
