import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ACCESS_TOKEN } from '../constants/auth';
export interface UserAuth {
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
export interface LoginSelector {
  loginUser: InitialStateLogin;
}
const initialState: InitialStateLogin = {
  user: null,
  loading: false,
  token: '',
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    requestLogin: (state,action: PayloadAction<UserLogin>) => {
      state.loading = true;
      state.user = {...state.user, ...action.payload as UserAuth}
    },
    requestLoginSuccess: (state, action: PayloadAction<UserAuth>) => {
      action.payload &&
        localStorage.setItem(ACCESS_TOKEN, JSON.stringify(action.payload));
      state.loading = false;
      state.user = action.payload;
    },
    requestLoginFail: (state) => {
      state.user = null;
      state.loading = false;
    },
  },
});

export const { requestLogin, requestLoginFail, requestLoginSuccess } =
  loginSlice.actions;

export default loginSlice.reducer;
