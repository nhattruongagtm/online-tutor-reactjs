import { ClassItem } from '../components/WaitingClassList/WaitingClassList';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Resp } from '../api/tutorApi';
export type ICartSlice = Resp<ClassItem>;
const initialState: ICartSlice = {
  list: [],
  totalItems: 0,
  totalPages: 0,
  currentPage: 1,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    loadCartList: (state, action: PayloadAction<ClassItem[]>) => {
      state.list = action.payload;
    },
    addCart: (state, action: PayloadAction<ClassItem>) => {
      state.list.push(action.payload);
    },
    deleteCart: (state, action: PayloadAction<number>) => {
      state.list.filter((item) => item.id !== action.payload);
    },
    updatePageData: (state, action: PayloadAction<Resp<ClassItem>>) => {
      state.currentPage = action.payload.currentPage;
      state.list = action.payload.list;
      state.totalItems = action.payload.totalItems;
      state.totalPages = action.payload.totalPages;
    },
  },
});

export const { addCart, deleteCart, loadCartList, updatePageData } =
  cartSlice.actions;

export default cartSlice.reducer;
