import {
  call,
  delay,
  put,
  select,
  takeEvery,
  takeLatest,
} from '@redux-saga/core/effects';   
import { toast } from 'react-toastify';

import { authApi, ForgotData } from '../api/authApi';
import { ForgotSelector } from '../components/Auth/ForgotPassword/ForgotPassword';
import {
  REQUEST_FORGOT_CHANGE_PASSWORD,
  REQUEST_FORGOT_PASSWORD,
} from '../constants/forgotPassword';
import { ERROR_EXCUTE } from '../constants/notify';
import {
  displayCheckForm,
  InitialStateForgot,
  loadingForgot,
  requestForgotChangePassword,  
  requestForgotCheckCode,
  requestForgotPassword,
  requestForgotUpdateCodeID,
  updateStatus,
} from '../reducers/forgotPasswordSlice';
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
        newPassword
      );

      if (resp) {
        toast.success('Thay đổi mật khẩu thành công!');
        yield put(updateStatus(2));
        yield put(loadingForgot(false));
      } else {
        yield put(loadingForgot(false));
        toast.error(ERROR_EXCUTE);
      }
    }
    yield put(loadingForgot(false));
  } catch (e: any) {
    yield put(loadingForgot(false));
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
      yield put(updateStatus(1));
      yield takeLatest(requestForgotChangePassword, changePassword);
      yield put(loadingForgot(false));
    } catch (e: any) {
      yield put(loadingForgot(false));
      toast.error(ERROR_EXCUTE);
    }
  } else {
    toast.error('Mã xác nhận không đúng!');
  }
  yield put(loadingForgot(false));
}
function* forgotPasswordWatcher({ payload: email }: PayloadAction<string>) {
  yield delay(500);

  try {
    const resp: ForgotData = yield call(authApi.sendMailToForgot, email);
    console.log("first",resp);
    if (resp.id) {
      yield put(
        requestForgotUpdateCodeID({
          id: resp.id,
          code: resp.code,
        } as Partial<InitialStateForgot>)
      );
      yield put(displayCheckForm(true));

      // validate code
      yield takeEvery(requestForgotCheckCode, validateCode);
    }
    yield put(loadingForgot(false));
  } catch (e: any) {
    yield put(loadingForgot(false));
    toast.error(ERROR_EXCUTE);
  }
}

function* forgotPasswordSaga() {
  yield takeLatest(requestForgotPassword, forgotPasswordWatcher);
}

export default forgotPasswordSaga;
