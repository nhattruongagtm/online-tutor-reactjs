import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';
import { Resp } from '../api/tutorApi';
import { ClassItem } from '../components/WaitingClassList/WaitingClassList';

const initialState: Resp<ClassItem> = {
  currentPage: 1,
  totalItems: 0,
  totalPages: 0,
  list: [],
};

const waitingSlice = createSlice({
  name: 'waitingClass',
  initialState,
  reducers: {   
    loadWaitingList: (state, action: PayloadAction<Resp<ClassItem>>) => {
      const { list, currentPage, totalItems, totalPages } = action.payload;
      state.currentPage = currentPage;
      state.list = list;   
      state.totalItems = totalItems;
      state.totalPages = totalPages;
    },
    updatePage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
})  
     
export const { loadWaitingList, updatePage } = waitingSlice.actions;
export default waitingSlice.reducer;
