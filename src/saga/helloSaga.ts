import { takeLatest } from 'redux-saga/effects';
interface Action{
    type: string;
    payload: any;
}
function* hello(action : Action) {
  console.log(action);
}
function* helloSaga(){
    yield takeLatest("*",hello);
}
export default helloSaga;
