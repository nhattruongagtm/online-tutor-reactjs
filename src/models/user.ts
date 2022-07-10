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

export interface UserInfo {
  introduction: string;
  addition: string;
}

export interface Tutor {}

export interface AdditionalInfo {
  id?: number;
  introduction: string;
  addition: string;
  account?: {
    id: number;
  };
}
