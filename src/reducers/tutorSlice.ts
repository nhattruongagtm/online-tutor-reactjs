import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TutorItem } from '../components/Home/TutorItem';
import { UserAuth } from './loginSlice';
export interface TutorSlice {
  page: number;
  limit: number;
  totalPages: number;
  totalItems: number;
  list: TutorItem[];
  userDetail: UserAuth | null;
}

const initialState: TutorSlice = {
  page: 1,
  limit: 4,
  totalItems: 0,
  totalPages: 0,
  list: [],
  userDetail: null,
};

const tutorSlice = createSlice({
  name: 'tutors',
  initialState,
  reducers: {
    loadTutorList: (state, action: PayloadAction<TutorSlice>) => {
      const { limit, list, page, totalItems, totalPages } = action.payload;
      state.limit = limit;
      state.page = page;
      state.list = list;
      state.totalItems = totalItems;
      state.totalPages = totalPages;
    },
    updatePage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },

    displayUserDetail: (state, action: PayloadAction<UserAuth>) => {
      state.userDetail = action.payload;
    },
  },
});

export const { loadTutorList, updatePage, displayUserDetail } =
  tutorSlice.actions;

export default tutorSlice.reducer;
