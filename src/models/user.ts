export interface User {
  id: number;
  displayName: string;
  email: string;
  phone: string;
  district: string;
  city: string;
  gender: number;
  type: number;
}

export interface UserInfo{
  introduce: string;
  info: string;
}