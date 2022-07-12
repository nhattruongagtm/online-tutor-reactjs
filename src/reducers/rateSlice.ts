import { createSlice, PayloadAction } from '@reduxjs/toolkit';
export interface Rate {
  id?: number;
  createdDate?: number;
  courseID: number;
  star: number;
  comment: string;
  userID: number;
  displayName?: string;
  photoUrl?: string;
}
export interface RateSlice {
  list: Rate[];
  totalPages: number;
  totalItems: number;
  page: number;
  limit: number;
}
const initialState: RateSlice = {
  list: [],
  limit: 10,
  page: 1,
  totalItems: 0,
  totalPages: 0,
};
const rateSlice = createSlice({
  name: 'rate',
  initialState,
  reducers: {
    loadRateList(state, action: PayloadAction<RateSlice>) {
      const { limit, list, page, totalItems, totalPages } = action.payload;
      state.list = list;
      state.limit = limit;
      state.page = page;
      state.totalItems = totalItems;
      state.totalPages = totalPages;
    },
    createRate(state, action: PayloadAction<Rate>) {
      state.list.unshift(action.payload);
    },
  },
});

export const { createRate, loadRateList } = rateSlice.actions;

export default rateSlice.reducer;
