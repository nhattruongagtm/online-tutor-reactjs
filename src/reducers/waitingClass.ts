import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ClassItem } from '../components/WaitingClassList/WaitingClassList';

export interface IWaitingClass {
  page: number;
  limit: number;
  totalItems: number;
  list: ClassItem[];
  totalPages: number;
}

const initialState: IWaitingClass = {
  page: 1,
  limit: 2,
  totalItems: 0,
  totalPages: 0,
  list: [],
};

const waitingSlice = createSlice({
  name: 'waitingClass',
  initialState,
  reducers: {
    loadWaitingList: (state, action: PayloadAction<IWaitingClass>) => {
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
  },
})

export const { loadWaitingList, updatePage } = waitingSlice.actions;
export default waitingSlice.reducer;
