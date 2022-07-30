import { AxiosResponse } from 'axios';
import md5 from 'md5';
import Login from '../components/Auth/Login/Login';
import { LoginResp } from '../models/user';
import { UserAuth } from '../reducers/loginSlice';
import { ISignUpInfo } from '../reducers/signUpSlice';
import axiosClient from './axiosClient';
interface SignUpInput {
  email: string;
  password: string;
  phone?: string;
  fullName?: string;
  city?: string;
  district?: string;
  gender?: number;
  type: number;
}
export interface LoginInput {
  email: string;
  password: string;
  type?: number;
}
export interface ResponseData<T> {
  message: string;
  status: string;
  data: T;
}
export interface ForgotData {
  id: number;
  code: string;
}
export const authApi = {
  checkMail(email: string): Promise<boolean> {
    const url = '/check-mail';

    return axiosClient.post(url, { email: email });
  },

  sendMailToSignUp(email: string): Promise<string> {
    const url = `/send-mail`;

    const params = {
      email: email,
    };

    return axiosClient.post(url, params);
  },
  signUp(input: SignUpInput): Promise<ResponseData<ISignUpInfo>> {
    const url = '/sign-up';
    return axiosClient.post(url, input, { headers: { ROLE: input.type + '' } });
  },
  login(user: LoginInput): Promise<LoginResp> {
    const url = '/login';

    const input: Omit<LoginInput, 'type'> = {
      email: user.email,
      password: user.password,
    };

    let s = new URLSearchParams(Object.entries(input)).toString();

    return axiosClient.post(url, s, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        ROLE: user.type === 0
        ? 'ROLE_STUDENT'
        : user.type === 1
        ? 'ROLE_TUTOR'
        : 'ROLE_ADMIN',
      },
    });
  },
  sendMailToForgot(email: string): Promise<ForgotData> {
    const url = `/forgot/${email}`;

    return axiosClient.post(url);
  },
  changePassword(userID: number, newPassword: string): Promise<boolean> {
    const url = `/forgot/${userID}`;

    return axiosClient.put(url, newPassword);
  },
  updateProfile(user: ISignUpInfo): Promise<boolean> {
    const url = `/profile/${user.id}`;

    return axiosClient.put(url, user);
  },
  // loginAPI(id: string): Promise<ResponseData<UserAuth>> {
  //   const url = `/loginAPI/${id}`;
  //   return axiosClient.post(url);
  // },
  loginAPI(params: UserAuth): Promise<ResponseData<UserAuth>> {
    const url = `/loginAPI`;
    return axiosClient.post(url, params);
  },
  getIDFromApi(id: string): Promise<ResponseData<number>> {
    const url = '/getAPI/' + id;
    return axiosClient.get(url);
  },
};
