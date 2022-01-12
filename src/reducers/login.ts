import md5 from 'md5';
import { userInfo } from 'os';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { ACCESS_TOKEN } from '../constants/auth';
import {
  REQUEST_LOGIN,
  REQUEST_LOGIN_FAIL,
  REQUEST_LOGIN_SUCCESS,
} from '../constants/login';

export interface UserAuth{
  id: number;
  displayName: string;
  phone: string;
  email: string;
  password: string;
  district: string;
  city: string;
  type: number;
}
export interface UserLogin {
  id?: number;
  email: string;
  password: string;
  type?: number;
}
interface InitialStateLogin {
  user: UserAuth | null;
  loading: boolean;
  token: string;
}
export interface LoginSelector{
  loginUser: InitialStateLogin;
}
const initialState: InitialStateLogin = {
  user: null,
  loading: false,
  token: '',
};
interface PayloadAction<T> {
  type: string;
  payload: T;
}  

export const loginReducer = (
  state: InitialStateLogin = initialState,
  action: PayloadAction<InitialStateLogin>
) => {
  switch (action.type) {
    case REQUEST_LOGIN:
     console.log(action.payload)
      return {
        ...state,
        loading: true,
      };  
      
    case REQUEST_LOGIN_SUCCESS:
      action.payload && localStorage.setItem(ACCESS_TOKEN,JSON.stringify(action.payload))
      return {
        ...state,
        loading: false,
        user: action.payload,   
        token: action.payload.token
      }
    case REQUEST_LOGIN_FAIL:
      return {
        ...state,
        user: null,
        loading: false,  
      }
    default:
      return state;  
  }
};

export default loginReducer;
