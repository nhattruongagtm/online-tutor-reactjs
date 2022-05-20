import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, UserInfo } from '../models/user';
export interface Profile {
  loading: boolean;
  userInfo: UserProfile;
}

export type UserProfile = User & UserInfo;

const initialState: Profile = {
  loading: false,
  userInfo: {
    id: -1,
    displayName: '',
    city: '',
    district: '',
    email: '',
    gender: -1,
    info: '',
    introduce: '',
    phone: '',
    type: -1,
  },
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    updateProfile: (state) => {
      state.loading = true;
    },
    updateProfileSuccess: (state) => {
      state.loading = false;
    },
    updateProfileFail: (state) => {
      state.loading = false;
    },
    loadUserInfo: (state, action: PayloadAction<UserProfile>) => {
      state.userInfo = action.payload;
    },
  },
});

export const {
  updateProfile,
  updateProfileFail,
  updateProfileSuccess,
  loadUserInfo,
} = profileSlice.actions;

export default profileSlice.reducer;