import { AxiosResponse } from 'axios';
import {
  FIlL_ID,
  FILL_STEP_1,
  FILL_STEP_2,
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
  REQUEST_SIGNUP_START,
  REQUEST_SIGNUP_SUCCESS,
  UPDATE_CODE_SIGNUP,
  UPDATE_PROGRESS_SIGNUP,
  VALIDATE_CODE_SIGNUP,
} from '../constants/signup';
import { ISignUpInfo } from '../reducers/signup';

interface FillStep1 {
  email: string;
  password: string;
  type: number;
}
interface FillStep2 {
  code: AxiosResponse;
}

export const updateStatus = (payload: number) => {
  return {
    type: 'STATUS__SIGNUP',
    payload: payload,
  };
};
export const updateStatusForgotPassword = (payload: number) => {
  return {
    type: 'STATUS__FORGOT',
    payload: payload,
  };
};
export const fillIDSignUp = (payload: number | null) => {
  return {
    type: FIlL_ID,
    payload: payload,
  };
};

export const fillStep1 = (payload: FillStep1) => {
  return {
    type: FILL_STEP_1,
    payload: payload,
  };
};
export const fillStep2 = (payload: FillStep2) => {
  return {
    type: FILL_STEP_2,
    payload: payload,
  };
};

export const updateProgressSignUp = (progress: number) => {
  return {
    type: UPDATE_PROGRESS_SIGNUP,
    payload: progress,
  };
};
export const loadingSignUp = (isLoading: boolean) => {
  return {
    type: LOADING_SIGNUP,
    payload: isLoading,
  };
};
export const validateCode = (code: string) => {
  return {
    type: REQUEST_SIGNUP_CHECK_CODE,
    payload: code,
  };
};
export const requestSignUp = (payload: ISignUpInfo) => {
  return {
    type: REQUEST_SIGNUP,
    payload: {
      user: payload,
    },
  };
};
export const requestSignUpStart = () => {
  return {
    type: REQUEST_SIGNUP_START,
  };
};
export const requestSignUpSuccess = () => {
  return {
    type: REQUEST_SIGNUP_SUCCESS,
   
  };
};
export const requestSignUpFail = (error: string) => {
  return {
    type: REQUEST_SIGNUP_FAIL,
    payload: error,
  };
};

export const requestSignUpSendMail = (email: string) => {
  return {
    type: REQUEST_SIGNUP_SEND_MAIL,
    payload: email,
  };
};
export const requestSignUpSendMailSuccess = (code: string) => {
  return {
    type: REQUEST_SIGNUP_SEND_MAIL_SUCCESS,
    payload: code,
  };
};
export const requestSignUpSendMailFail = (error: string) => {
  return {
    type: REQUEST_SIGNUP_SEND_MAIL_FAIL,
    payload: error,
  };
};

export const requestSignUpProfile = (user: ISignUpInfo) => {
  return {
    type: REQUEST_SIGNUP_PROFILE,
    payload: user,
  };
};
export const requestSignUpProfileSuccess = (user: ISignUpInfo) => {
  return {
    type: REQUEST_SIGNUP_PROFILE_SUCCESS,
    payload: user,
  };
};
export const requestSignUpProfileFail = (error: string) => {
  return {
    type: REQUEST_SIGNUP_PROFILE_FAIL,
    payload: error,
  };
};
export const requestSignUpCheckCode = (code: string) => {
  return {
    type: REQUEST_SIGNUP_CHECK_CODE,
    payload: code,
  };
};
