import { call, delay, takeLatest } from '@redux-saga/core/effects';
import { toast } from 'react-toastify';
import { authApi } from '../api/authApi';
import { ERROR_EXCUTE } from '../constants/notify';
import { UPDATE_PROFILE } from '../constants/profile';
import { ISignUpInfo } from '../reducers/signup';

interface Profile {
  id: number;
  displayName: string;
  phone: string;
  email: string;
  district: string;
  city: string;
}
interface PayloadAction<T> {
  type: string;
  payload: T;
}
function* profileWatcher({ payload }: PayloadAction<ISignUpInfo>) {
  yield delay(500);
   
  try {
    const resp: boolean = yield call(authApi.updateProfile, payload);
    if (resp) {
      toast.success('Cập nhật thông tin thành công!');
    } else {
      toast.error(ERROR_EXCUTE);
    }
  } catch (e: any) {
    toast.error(ERROR_EXCUTE);
  }
}
function* profileSaga() {
  yield takeLatest(UPDATE_PROFILE, profileWatcher);
}
export default profileSaga;  
