import {
  call,
  delay,
  put,
  select,
  takeEvery,
  takeLatest,
} from '@redux-saga/core/effects';
import md5 from 'md5';
import { toast } from 'react-toastify';
import {
  loadingForgotPassword,
  requestForgotPasswordCheckCode,
  requestForgotPasswordUpdateCodeID,
  requestForgotPasswordUpdateProgress,
} from '../actions/forgotPassword';
import { authApi, ForgotData } from '../api/authApi';
import { ForgotSelector } from '../components/Auth/ForgotPassword/ForgotPassword';
import {
  REQUEST_FORGOT_CHANGE_PASSWORD,
  REQUEST_FORGOT_PASSWORD,
} from '../constants/forgotPassword';
import { ERROR_EXCUTE } from '../constants/notify';
import { InitialStateForgot } from '../reducers/forgotPassword';
interface PayloadAction<T> {
  type: string;
  payload: T;
}

function* changePassword({ payload: newPassword }: PayloadAction<string>) {
  yield delay(500);

  const forgotSelector: InitialStateForgot = yield select(
    (state: ForgotSelector) => state.forgotPassword
  );

  try {
    const { id } = forgotSelector;

    if (id) {
      const resp: boolean = yield call(
        authApi.changePassword,
        id,
        md5(newPassword)
      );

      if (resp) {
        toast.success('Thay đổi mật khẩu thành công!');
        yield put(requestForgotPasswordUpdateProgress(3));
        yield put(loadingForgotPassword(false));
      } else {
        yield put(loadingForgotPassword(false));
        toast.error(ERROR_EXCUTE);
      }
    }
    yield put(loadingForgotPassword(false));
  } catch (e: any) {
    yield put(loadingForgotPassword(false));
    toast.error(ERROR_EXCUTE);
  }
}
function* validateCode({ payload: typeCode }: PayloadAction<string>) {
  const forgotSelector: InitialStateForgot = yield select(
    (state: ForgotSelector) => state.forgotPassword
  );
  const { code } = forgotSelector;

  if (typeCode === code) {
    try {
      yield put(requestForgotPasswordUpdateProgress(2));

      yield takeLatest(REQUEST_FORGOT_CHANGE_PASSWORD, changePassword);
      yield put(loadingForgotPassword(false));
    } catch (e: any) {
      yield put(loadingForgotPassword(false));
      toast.error(ERROR_EXCUTE);
    }
  } else {
    toast.error('Mã xác nhận không đúng!');
  }
  yield put(loadingForgotPassword(false));
}
function* forgotPasswordWatcher({ payload: email }: PayloadAction<string>) {

  yield delay(500);

  try {
    console.log("call api")
    const resp: ForgotData = yield call(authApi.sendMailToForgot, email);
    if (resp.id) {
      yield put(requestForgotPasswordUpdateCodeID(resp.id, resp.code));
      yield put(requestForgotPasswordUpdateProgress(1));

      // validate code
      yield takeEvery(requestForgotPasswordCheckCode, validateCode);
    }
    yield put(loadingForgotPassword(false));
  } catch (e: any) {
    yield put(loadingForgotPassword(false));
    toast.error(ERROR_EXCUTE);
  }
}

function* forgotPasswordSaga() {
  yield takeLatest(REQUEST_FORGOT_PASSWORD, forgotPasswordWatcher);
}

export default forgotPasswordSaga;
