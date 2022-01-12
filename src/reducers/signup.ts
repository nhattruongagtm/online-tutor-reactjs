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

import { act } from 'react-dom/test-utils';
import { REQUEST_LOGIN } from '../constants/login';
import {
  LOADING_SIGNUP,
  REQUEST_SIGNUP,
  REQUEST_SIGNUP_CHECK_CODE,
  REQUEST_SIGNUP_FAIL,
  REQUEST_SIGNUP_PROFILE,
  REQUEST_SIGNUP_PROFILE_FAIL,
  REQUEST_SIGNUP_PROFILE_SUCCESS,
  REQUEST_SIGNUP_SEND_MAIL,
  REQUEST_SIGNUP_SEND_MAIL_FAIL,
  REQUEST_SIGNUP_SEND_MAIL_SUCCESS,
  REQUEST_SIGNUP_SUCCESS,
  UPDATE_PROGRESS_SIGNUP,
} from '../constants/signup';

// const signUpReducer = (
//   state: IInitialState = initialState,
//   action: PayloadAction
// ) => {
//   switch (action.type) {
//     case "STATUS__SIGNUP":
//       state = {status: action.payload};
//       return state;
//     default:
//       return state;
//   }
// };
export interface InitialStateSignUp {
  progress: number;
  user: ISignUpInfo;
  loading: boolean;
  error: string;
  check: boolean;
  code: string;
}
export interface SignUpSelector {
  signUpUser: InitialStateSignUp;
}
export interface ISignUpInfo {
  id?: number | null;
  email: string;
  password: string;
  displayName: string;
  gender: number;
  district: string;
  city: string;
  phone: string;
  type: number;
}

export interface PayloadAction {
  type: string;
  payload: InitialStateSignUp;
}

const initialState: InitialStateSignUp = {
  progress: 0,
  user: {
    email: '',
    password: '',
    phone: '',
    displayName: '',
    gender: -1,
    district: '',
    city: '',
    type: -1,
  },
  loading: false,
  error: '',
  check: false,
  code: '',
};
const signUpReducer = (
  state: InitialStateSignUp = initialState,
  action: PayloadAction
) => {
  switch (action.type) {
    case REQUEST_SIGNUP:
      return {
        ...state,
        user: action.payload.user,
        loading: true,
      };
    case UPDATE_PROGRESS_SIGNUP:
      console.log(action.payload);
      return {
        ...state,
        progress: action.payload,
      };
    case REQUEST_SIGNUP_SEND_MAIL:
      return {
        ...state,
        loading: true,
      };
    case REQUEST_SIGNUP_SEND_MAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        code: action.payload,
      };
    case REQUEST_SIGNUP_SEND_MAIL_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case REQUEST_SIGNUP_PROFILE:
      console.log(action.payload);
      return {
        ...state,
        loading: true,
        user: action.payload,
      };
    case REQUEST_SIGNUP_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case REQUEST_SIGNUP_PROFILE_FAIL:
      return {
        ...state,
        loading: false,
      };
    case LOADING_SIGNUP:
      return {
        ...state,
        loading: action.payload,
      };
    case REQUEST_SIGNUP_SUCCESS:
      return {
        ...state,
        progress: state.progress + 1,
        loading: false,
      };
    case REQUEST_SIGNUP_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export default signUpReducer;
