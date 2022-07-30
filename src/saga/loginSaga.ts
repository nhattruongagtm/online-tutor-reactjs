import { call, delay, put, takeLatest } from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { push } from 'connected-react-router';
import md5 from 'md5';
import { decodeToken, isExpired } from 'react-jwt';
import { toast } from 'react-toastify';
import { HOME_PATH } from '.././constants/path';
import { authApi, ResponseData } from '../api/authApi';
import { userApi } from '../api/userApi';
import { TOKEN } from '../constants/auth';
import { ERROR_EXCUTE } from '../constants/notify';
import { LoginResp, LoginRespData } from '../models/user';
import {
  loadUserWhenLoginSuccess,
  requestLogin,
  requestLoginFail,
  requestLoginSuccess,
  UserAuth,
  UserLogin,
} from '../reducers/loginSlice';

interface Action {
  type: string;
  payload: User;
}
interface User {
  user: LoginInput;
}
interface LoginInput {
  email: string;
  password: string;
  type: number;
}
function* loadUserByToken(email: string, roles: string[]) {
  try {
    const resp: ResponseData<UserAuth> = yield call(
      userApi.getUserByEmail,
      email
    );
    const { data } = resp;
    yield put(loadUserWhenLoginSuccess({ ...data, roles }));
  } catch (error) {
    return null;
  }
}

function* loginWatcher({ payload: user }: PayloadAction<LoginInput>) {
  yield delay(500);
  // user.password = md5(user.password);

  try {
    const data: LoginResp = yield call(authApi.login, user);
    if (data.access_token) {
      // if (data.data.type === -1) {
      //   toast.warning('Tài khoản của bạn đã bị khóa!');
      //   yield put(requestLoginFail());
      // } else {
      toast.success('Đăng nhập thành công!');
      yield put(requestLoginSuccess(data));
      const token = localStorage.getItem(TOKEN)
        ? (JSON.parse(localStorage.getItem(TOKEN) as string) as LoginResp)
        : null;
      if (token) {
        const myDecodedToken = decodeToken(token.access_token) as LoginRespData;
        const isMyTokenExpired = isExpired(token.access_token);
        if (!isMyTokenExpired) {
          yield call(loadUserByToken, myDecodedToken.sub, myDecodedToken.roles);
        } else {
          // refresh token
        }
      }
      yield put(push(HOME_PATH));
      // }
    } else if (data.status === 'CHANGE') {
      toast.error('Vui lòng chuyển đổi tài khoản!');
      yield put(requestLoginFail());
    } else if (data.status === 'BLOCKED') {
      toast.error('Tài khoản đã bị khóa!');
      yield put(requestLoginFail());
    } else {   
      toast.error('Email hoặc mật khẩu không chính xác!');
      // }
      yield put(requestLoginFail());
    }
  } catch (error: any) {
    yield put(requestLoginFail());
    toast.error(ERROR_EXCUTE);
  }
}

export default function* loginSaga() {
  yield takeLatest(requestLogin, loginWatcher);
}
