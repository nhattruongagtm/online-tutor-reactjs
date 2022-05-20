import {
  call,
  delay,
  put,
  select,
  takeEvery,
  takeLatest,
} from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { authApi, ResponseData } from '../api/authApi';

import {
  InitialStateSignUp,
  ISignUpInfo,
  loadingSignUp,
  requestCheckCode,
  requestSignUp,
  requestSignUpFail,
  requestSignUpProfile,
  requestSignUpSendMailSuccess,
  requestSignUpSuccess,
  SignUpSelector,
  updateProgressSignUp,
} from '../reducers/signUpSlice';

function* signUp() {
  yield delay(1000);

  const signUpSelector: InitialStateSignUp = yield select(
    (state: SignUpSelector) => state.signUpUser
  );
  const { user } = signUpSelector;
  console.log(user);

  // call api to sign up
  // yield put(requestSignUpStart());
  try {
    const resp: ResponseData<ISignUpInfo> = yield call(authApi.signUp, user);
    if (resp.data.id) {
      yield put(requestSignUpSuccess());
      yield put(updateProgressSignUp(3));
    } else {
      toast.error('Đã xảy ra lỗi, vui lòng thử lại!');
      yield put(requestSignUpFail('error!'));
    }
  } catch (e: any) {
    yield put(requestSignUpFail(e));
    toast.error('Đã xảy ra lỗi, vui lòng thử lại!');
  }
}
function* validateCode({ payload }: PayloadAction<string>) {
  const signUpSelector: InitialStateSignUp = yield select(
    (state: SignUpSelector) => state.signUpUser
  );

  const { code } = signUpSelector;  

  if (code === payload) {
    // go to sign up
    yield put(updateProgressSignUp(2));

    yield takeLatest(requestSignUpProfile, signUp);
  } else {
    toast.error('Mã xác nhận không đúng!');  
  }
}

function* signUpWatcher({ payload }: PayloadAction<ISignUpInfo>) {
  yield delay(1000);

  const { email } = payload;

  // check is email exist?
  try {
    const isExist: boolean = yield call(authApi.checkMail, email);
    if (isExist) {
      yield toast.error('Email đã tồn tại! Vui lòng nhập email khác!');
    } else {
      toast.info('Đang gửi mail...');
      // send mail
      // yield put(requestSignUpSendMail(user.email));
      try {
        const code: string = yield call(authApi.sendMailToSignUp, email);

        yield put(requestSignUpSendMailSuccess(code));

        // update progressP
        yield put(updateProgressSignUp(1));

        // validate code
        yield takeEvery(requestCheckCode, validateCode);
      } catch (e) {
        yield put(requestSignUpFail('cannot send mail, send again!'));
      }
    }
    yield put(loadingSignUp(false));
  } catch (e: any) {
    yield put(loadingSignUp(false));
    toast.error('Đã xảy ra lỗi!, Vui lòng thử lại!');
  }
}

function* signUpSaga() {
  yield takeLatest(requestSignUp, signUpWatcher);
}
export default signUpSaga;
