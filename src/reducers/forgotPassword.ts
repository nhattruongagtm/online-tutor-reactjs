// interface IInitialState {
//   status: number;
// }
// interface PayloadAction {
//   type: string;
//   payload: number;
// }
// const initialState = {
//   status: 0,
// };

import {
  REQUEST_FORGOT_CHANGE_PASSWORD,
  REQUEST_FORGOT_CHANGE_PASSWORD_FAIL,
  REQUEST_FORGOT_CHANGE_PASSWORD_SUCESS,
  REQUEST_FORGOT_CHECK_CODE,
  REQUEST_FORGOT_SEND_MAIL,
  REQUEST_FORGOT_SEND_MAIL_FAIL,
  REQUEST_FORGOT_SEND_MAIL_SUCCESS,
} from '../constants/forgotPassword';
import { InitialStateSignUp, ISignUpInfo } from './signup';

// const forgotReducer = (
//   state: IInitialState = initialState,
//   action: PayloadAction
// ) => {
//   switch (action.type) {
//     case 'STATUS__FORGOT':
//       state = { status: action.payload };
//       console.log(state);
//       return state;
//     default:
//       return state;
//   }
// };

export interface InitialStateForgot {
  code: string;
  user: ISignUpInfo | null;
  loading: boolean;
  error: string;
  progress: number;
}
interface PayloadAction {
  type: string;
  payload: InitialStateForgot;
}
const initialStateForgot = {
  code: '',
  user: null,
  loading: false,
  error: '',
  progress: 0,
};

const forgotReducer = (
  state: InitialStateForgot = initialStateForgot,
  action: PayloadAction
) => {
  switch (action.type) {
    case REQUEST_FORGOT_CHANGE_PASSWORD:
      return {
        ...state,
        loading: true,
      };
    case REQUEST_FORGOT_SEND_MAIL:
      return {
        ...state,
        loading: true,
      };
    case REQUEST_FORGOT_SEND_MAIL_SUCCESS:
      return {
        ...state,
        code: action.payload,
        loading: true,
      };
    case REQUEST_FORGOT_SEND_MAIL_FAIL:
      return {
        ...state,
        loading: false,
      };
    case REQUEST_FORGOT_CHECK_CODE:
      return {
        ...state,
        loading: false,
      };
    case REQUEST_FORGOT_CHANGE_PASSWORD:
      return {
        ...state,
        loading: false,
      };
    case REQUEST_FORGOT_CHANGE_PASSWORD_SUCESS:
      return {
        ...state,
        loading: true,
      };
    case REQUEST_FORGOT_CHANGE_PASSWORD_FAIL:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};

export default forgotReducer;
