import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../pages/DetailCourse/CommentItem';
export interface PageItem {
  id: number;
  totalItems: number;
  list: Comment[];
  totalPages: number;
  currentPage: number;
}
export interface CommentPage {
  pageInfo: PageItem;
}

const initialState: CommentPage = {
  pageInfo: {
    id: -1,
    currentPage: 0,
    list: [],
    totalItems: 0,
    totalPages: 0,
  },
};

const detailCourseSlice = createSlice({
  name: 'detailCourse',
  initialState,
  reducers: {
    updatePage: (state, action: PayloadAction<PageItem>) => {
      state.pageInfo = {
        ...action.payload,
        list: action.payload.list.reverse(),
      };
    },
    loadMore: (state, action: PayloadAction<Comment[]>) => {
      state.pageInfo.list = [...state.pageInfo.list, ...action.payload];
    },
    addComment: (state, action: PayloadAction<Comment>) => {
      state.pageInfo.list = [action.payload, ...state.pageInfo.list];
    },
  },
});

export const { updatePage, loadMore, addComment } = detailCourseSlice.actions;

export default detailCourseSlice.reducer;
