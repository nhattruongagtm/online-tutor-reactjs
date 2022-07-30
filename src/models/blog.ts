import { UserInfo } from 'os';

export interface AccountRef {
  id: number;
  avatar?: string;
}
export interface Blog {
  id?: number;
  title: string;
  content: string;
  likes: number;
  views: number;
  createdDate?: number;
  account: AccountRef;
  thumbnail: any;
  dislikes: number;
}
