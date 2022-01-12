import {
  call,
  delay,
  put,
  select,
  takeEvery,
  takeLatest,
} from '@redux-saga/core/effects';
import { toast } from 'react-toastify';
import {
  loadingSignUp,
  requestSignUpFail,
  requestSignUpSendMail,
  requestSignUpSendMailFail,
  requestSignUpSendMailSuccess,
  requestSignUpStart,
  requestSignUpSuccess,
  updateProgressSignUp,
} from '../actions/signup';
import { authApi } from '../api/authApi';
import {
  REQUEST_SIGNUP,
  REQUEST_SIGNUP_CHECK_CODE,
  REQUEST_SIGNUP_PROFILE,
  REQUEST_SIGNUP_START,
} from '../constants/signup';
import {
  InitialStateSignUp,
  ISignUpInfo,
  PayloadAction,
  SignUpSelector,
} from '../reducers/signup';

interface CodeAction {
  type: string;
  payload: string;
}
function* signUp() {
  yield delay(1000);

  const signUpSelector: InitialStateSignUp = yield select(
    (state: SignUpSelector) => state.signUpUser
  );
  const { user } = signUpSelector;

  // call api to sign up
  yield put(requestSignUpStart());
  try {
    const resp: ISignUpInfo = yield call(authApi.signUp, user);
    if (resp.id) {
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
function* validateCode({ payload }: CodeAction) {
  const signUpSelector: InitialStateSignUp = yield select(
    (state: SignUpSelector) => state.signUpUser
  );

  const { code } = signUpSelector;

  if (code === payload) {
    // go to sign up
    yield put(updateProgressSignUp(2));

    yield takeLatest(REQUEST_SIGNUP_PROFILE, signUp);
  } else {
    toast.error('Mã xác nhận không đúng!');
  }
}

function* signUpWatcher({ payload }: PayloadAction) {
  yield delay(1000);

  const { user } = payload;

  // check is email exist?
  try {
    const isExist: boolean = yield call(authApi.checkMail, user.email);
    if (isExist) {
      yield toast.error('Email đã tồn tại! Vui lòng nhập email khác!');
    } else {
      toast.info('Đang gửi mail...');
      // send mail
      yield put(requestSignUpSendMail(user.email));
      try {
        const code: string = yield call(authApi.sendMailToSignUp, user.email);
        yield put(requestSignUpSendMailSuccess(code));

        // update progress
        yield put(updateProgressSignUp(1));

        // validate code
        yield takeEvery(REQUEST_SIGNUP_CHECK_CODE, validateCode);
      } catch (e) {
        yield put(requestSignUpSendMailFail('cannot send mail, send again!'));
      }
    }
    yield put(loadingSignUp(false));
  } catch (e: any) {
    yield put(loadingSignUp(false));
    toast.error('Đã xảy ra lỗi!, Vui lòng thử lại!');
  }
}

function* signUpSaga() {
  yield takeLatest(REQUEST_SIGNUP, signUpWatcher);
}
export default signUpSaga;
