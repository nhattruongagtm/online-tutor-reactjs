import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../pages/DetailCourse/CommentItem';
import { Reply } from '../pages/DetailCourse/ReplyItem';
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
    loadReply: (state, action: PayloadAction<Reply[]>) => {
      const index =
        action.payload.length > 0
          ? state.pageInfo.list.findIndex(
              (item) => item.id === action.payload[0].commentID
            )
          : -1;

      if (index > -1) {
        state.pageInfo.list[index].relies = action.payload;
      }
    },
    addReply: (state, action: PayloadAction<Reply>) => {
      const index = state.pageInfo.list.findIndex(
        (item) => item.id === action.payload.commentID
      );
      if (index > -1) {
        state.pageInfo.list[index].relies?.push(action.payload);
      }
    },
  },
});

export const { updatePage, loadMore, addComment, addReply, loadReply } =
  detailCourseSlice.actions;

export default detailCourseSlice.reducer;
