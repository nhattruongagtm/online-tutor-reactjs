import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ACCESS_TOKEN, TOKEN } from '../constants/auth';
import { LoginResp } from '../models/user';
export interface UserAuth {
  id: number;
  displayName: string;
  phone?: string;
  email: string;
  password?: string;
  district?: string;
  city?: string;
  type?: number;
  avatar?: string;
  gender?: number;
  roles?: string[];
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
  roles: string[];
}
export interface Roles {
  roles: string[];
}
export interface LoginSelector {
  loginUser: InitialStateLogin;
}
const initialState: InitialStateLogin = {
  user: null,
  loading: false,
  token: '',
  roles: [],
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    requestLogin: (state, action: PayloadAction<UserLogin>) => {
      state.loading = true;
    },
    requestLoginSuccess: (state, action: PayloadAction<LoginResp>) => {
      action.payload.access_token &&
        localStorage.setItem(TOKEN, JSON.stringify(action.payload));
      state.loading = false;
    },
    requestLoginFail: (state) => {
      state.loading = false;
    },
    loadUserWhenLoginSuccess: (
      state,
      action: PayloadAction<UserAuth & Roles>
    ) => {
      state.user = action.payload;
      state.roles = action.payload.roles;
    },
  },
});

export const {
  requestLogin,
  requestLoginFail,
  requestLoginSuccess,
  loadUserWhenLoginSuccess,
} = loginSlice.actions;

export default loginSlice.reducer;
