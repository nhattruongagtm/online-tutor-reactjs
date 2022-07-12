import { call, delay, put, takeLatest } from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { push } from 'connected-react-router';
import md5 from 'md5';
import { toast } from 'react-toastify';
import { HOME_PATH } from '.././constants/path';
import { authApi, ResponseData } from '../api/authApi';
import { ERROR_EXCUTE } from '../constants/notify';
import {
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

function* loginWatcher({ payload: user }: PayloadAction<LoginInput>) {
  yield delay(500);
  user.password = md5(user.password);

  try {
    const data: ResponseData<UserAuth> = yield call(authApi.login, user);
    if (data.data) {
      if (data.data.type === -1) {
        toast.warning('Tài khoản của bạn đã bị khóa!');
        yield put(requestLoginFail());
      } else {
        toast.success('Đăng nhập thành công!');
        yield put(requestLoginSuccess(data.data));
        yield put(push(HOME_PATH));
      }
    } else {
      if (data.status === 'WRONG') {
        toast.error('Sai mật khẩu! Vui lòng thử lại!');
      } else if (data.status === 'CHANGE') {
        toast.error('Vui lòng chuyển đổi tài khoản!');
      } else {
        toast.error('Email hoặc mật khẩu không chính xác!');
      }
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
