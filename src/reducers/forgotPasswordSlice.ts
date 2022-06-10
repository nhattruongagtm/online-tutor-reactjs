import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { stat } from 'fs';

export interface InitialStateForgot {
  code: string;
  email: string;
  id: number | null;
  loading: boolean;
  error: string;
  progress: number;
  isCheckForm: boolean;
}
const initialState: InitialStateForgot = {
  code: '',
  id: null,
  email: '',
  loading: false,
  error: '',
  progress: 0,
  isCheckForm: false,
};

const forgotSlice = createSlice({
  name: 'forgotPassword',
  initialState,
  reducers: {
    requestForgotPassword: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    requestForgotUpdateCodeID: (
      state,
      action: PayloadAction<Partial<InitialStateForgot>>
    ) => {
      state.id = action.payload.id as number;
      state.loading = true;
      state.code = action.payload.code as string;
    },
    requestForgotPasswordSuccess: (state) => {  
      state.loading = false;
    },
    requestForgotSendMail: (state) => {
      state.loading = true;
    },
    requestForgotSendMailSuccess: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.code = action.payload;
    },
    requestForgotCheckCode: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.code = action.payload;
    },
    requestForgotChangePassword: (state, action: PayloadAction<string>) => {
      state.loading = true;
    },
    requestForgotChangePasswordSuccess: (state) => {
      state.loading = false;
    },
    loadingForgot: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    updateStatus: (state, action: PayloadAction<number>) => {
      state.progress = action.payload;
    },
    displayCheckForm: (state, action: PayloadAction<boolean>) => {
      state.isCheckForm = action.payload;
    },
  },
});

export const {
  loadingForgot,
  requestForgotChangePassword,
  requestForgotChangePasswordSuccess,
  requestForgotCheckCode,
  requestForgotPassword,
  requestForgotPasswordSuccess,
  requestForgotSendMail,
  requestForgotSendMailSuccess,
  requestForgotUpdateCodeID,
  updateStatus,
  displayCheckForm,
} = forgotSlice.actions;

export default forgotSlice.reducer;
