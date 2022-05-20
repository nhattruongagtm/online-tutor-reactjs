import { createSlice, PayloadAction } from '@reduxjs/toolkit';
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

const signUpSlice = createSlice({
  name: 'signUp',
  initialState,
  reducers: {
    requestSignUp: (state, action: PayloadAction<ISignUpInfo>) => {
      state.user = action.payload;
      state.loading = true;
    },
    updateProgressSignUp: (state, action: PayloadAction<number>) => {
      state.progress = action.payload;
    },
    requestSignUpSendMail: (state) => {
      state.loading = true;
    },
    requestSignUpSendMailSuccess: (state, action: PayloadAction<string>) => {
      state.code = action.payload;
      state.loading = true;
    },
    requestSignUpSendMailFail: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    requestSignUpProfile: (state, action: PayloadAction<ISignUpInfo>) => {
      state.loading = true;
      state.user = action.payload;
    },
    requestSignUpProfileSuccess: (state) => {
      state.loading = false;
    },
    requestSignUpProfileFail: (state) => {
      state.loading = false;
    },
    loadingSignUp: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    requestSignUpSuccess: (state) => {
      state.progress = state.progress + 1;
      state.loading = false;
    },
    requestSignUpFail: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    requestCheckCode: (state,action:PayloadAction<string>) =>{
      
    }
  },
});

export const {
  loadingSignUp,
  requestSignUp,
  requestSignUpFail,
  requestSignUpProfile,
  requestSignUpProfileFail,
  requestSignUpProfileSuccess,
  requestSignUpSendMail,
  requestSignUpSendMailFail,
  requestSignUpSendMailSuccess,
  requestSignUpSuccess,
  updateProgressSignUp,
  requestCheckCode
} = signUpSlice.actions;

export default signUpSlice.reducer;
