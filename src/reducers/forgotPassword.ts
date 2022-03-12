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
  LOADING_FORGOT,
  REQUEST_FORGOT_CHANGE_PASSWORD,
  REQUEST_FORGOT_CHANGE_PASSWORD_FAIL,
  REQUEST_FORGOT_CHANGE_PASSWORD_SUCESS,
  REQUEST_FORGOT_CHECK_CODE,
  REQUEST_FORGOT_PASSWORD,
  REQUEST_FORGOT_PASSWORD_FAIL,
  REQUEST_FORGOT_PASSWORD_SUCCESS,
  REQUEST_FORGOT_SEND_MAIL,
  REQUEST_FORGOT_SEND_MAIL_FAIL,
  REQUEST_FORGOT_SEND_MAIL_SUCCESS,
  REQUEST_FORGOT_UPDATE_CODEID,
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
  email: string;
  id: number | null;
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
  id: null,
  email: '',
  loading: false,
  error: '',
  progress: 0,
};

const forgotReducer = (
  state: InitialStateForgot = initialStateForgot,  
  action: PayloadAction
) => {
  switch (action.type) {
    case REQUEST_FORGOT_PASSWORD:
      return {
        ...state,
        email: action.payload,
        loading: true,
      };
    case REQUEST_FORGOT_UPDATE_CODEID:
      return {
        ...state,
        id: action.payload.id,
        loading: true,
        code: action.payload.code,

      };
    case REQUEST_FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case REQUEST_FORGOT_PASSWORD_FAIL:
      return {
        ...state,
        loading: false,
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
        code: action.payload,
        loading: false,
      };
    case REQUEST_FORGOT_CHANGE_PASSWORD:
      return {
        ...state,
        loading: true,
      };
    case REQUEST_FORGOT_CHANGE_PASSWORD_SUCESS:
      return {
        ...state,
        loading: false,
      };
    case LOADING_FORGOT:
      return {
        ...state,
        loading: action.payload,  
      };
    default:
      return state;
  }
};

export default forgotReducer;
