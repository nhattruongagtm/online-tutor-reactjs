import md5 from 'md5';
import Login from '../components/Auth/Login/Login';
import signUpInfoReducer from '../reducers/signUpInfo';
import axiosClient from './axiosClient';
interface SignUpInput {
  email: string;
  password: string;
  phone: string;
  fullName: string;
  city: string;
  district: string;
  gender: boolean;
  type: number;
}
interface LoginInput {
  email: string;
  password: string;
  type: number;
}
export const authApi = {
  async sendMailToSignUp(email: string) {
    const url = `/send-mail/${email}`;

    // return await axiosClient.post(url).catch(e=>{console.log(e)})

    // fake code
    return '123456';
  },
  async signUp(input: SignUpInput) {
    const url = '/sign-up';
    // return await axiosClient.post(url,input).catch(e=> console.log(e));
    return true;
  },
  async login(user: LoginInput) {
    const url = '/login';

    // return await axiosClient.post(url,user).catch(e=>console.log(e))

    if (user.email === 'nhattruongagtm@gmail.com') {
      if (user.password === md5('123123123')) {
        return {
          status: 200,
          data: {
            message: 'Đăng nhập thành công!',
          },
        };
      } else {
        return {
          status: 403,
          data: {
            message: 'Sai mật khẩu, vui lòng thử lại!',
          },
        };
      }
    } else {
      return {
        status: 403,
        data: {
          message: 'Không tồn tại tài khoản!',
        },
      };
    }
  },
  async sendMailToForgot(email: string) {
    const url = `/send-mail/${email}`;

    // return await axiosClient.post(url).catch(e=>{console.log(e)})

    // fake code
    return {userID: 'kh1',code: '123456'};
  },
  async changePassword(userID: string, newPassword: string) {
    const url = '/user';

    // return axiosClient.put(url, { userID: userID, newPassword: newPassword });

    return {
      status: 200,
      message: 'success',
    }
  },
};
