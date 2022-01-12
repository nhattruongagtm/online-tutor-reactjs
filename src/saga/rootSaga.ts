import { all } from 'redux-saga/effects';
import loginSaga from './loginSaga';
import signUpSaga from './signupSaga';

export default function* rootSaga(){
    yield all([loginSaga(),signUpSaga()]);
}