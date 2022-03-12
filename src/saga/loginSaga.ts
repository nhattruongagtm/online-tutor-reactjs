import { call, delay, put, take, takeLatest } from '@redux-saga/core/effects';
import { UserAuth, UserLogin } from '../reducers/login';
import { authApi, ResponseData } from '../api/authApi';
import {
  REQUEST_LOGIN,
  REQUEST_LOGIN_SUCCESS,
  REQUEST_LOGIN_FAIL,
} from '../constants/login';
import {
  requestLogin,
  requestLoginFail,
  requestLoginSuccess,
} from '../actions/login';
import md5 from 'md5';
import { AxiosError } from 'axios';
import {ERROR_EXCUTE} from '../constants/notify'
import { toast } from 'react-toastify';
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

function* loginWatcher(action: Action) {
  yield delay(500);
  const { user } = action.payload;
  user.password = md5(user.password);

  try {
    const data: ResponseData<UserAuth> = yield call(authApi.login, user);
    if (data.data) {
      toast.success('Đăng nhập thành công!');
      yield put(requestLoginSuccess(data.data));
    } else{
     if (data.status === 'WRONG') {
      toast.error('Sai mật khẩu! Vui lòng thử lại!');
    } else if (data.status === 'CHANGE') {
      toast.error('Vui lòng chuyển đổi tài khoản!');
    } else {
      toast.error('Email hoặc mật khẩu không chính xác!');
    }
    yield put(requestLoginFail("error"));
  }
      
  } catch (error: any) {
    yield put(requestLoginFail(error));
    toast.error(ERROR_EXCUTE);
  }
}

export default function* loginSaga() {
  yield takeLatest(REQUEST_LOGIN, loginWatcher);
}
