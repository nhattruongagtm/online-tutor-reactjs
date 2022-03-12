import { all } from 'redux-saga/effects';
import forgotPasswordSaga from './forgotPasswordSaga';
import loginSaga from './loginSaga';
import signUpSaga from './signupSaga';

export default function* rootSaga(){
    yield all([loginSaga(),signUpSaga(),forgotPasswordSaga()]);
}