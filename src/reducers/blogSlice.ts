import { Params, Resp } from '../api/tutorApi';
import { Blog } from '../models/blog';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
export interface Filter {
  filters: Params;
}
interface FilterFlag {
  like: boolean;
  dislike: boolean;
}
export interface BlogSlice {
  public: Resp<Blog & FilterFlag>;
  admin: Resp<Blog> & Filter;
  isEdit?: Blog;
}
const initialState: BlogSlice = {
  public: {
    currentPage: 1,
    list: [],
    totalItems: 0,
    totalPages: 0,
  },
  admin: {
    currentPage: 1,
    list: [],
    totalItems: 0,
    totalPages: 0,
    filters: {
      search: '',
    },
  },
};

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    edit: (state, action: PayloadAction<Blog | undefined>) => {
      state.isEdit = action.payload;
    },
    loadBlogListAD: (state, action: PayloadAction<Resp<Blog>>) => {
      const { currentPage, list, totalItems, totalPages } = action.payload;
      state.admin.list = list;
      state.admin.totalItems = totalItems;
      state.admin.totalPages = totalPages;
      state.admin.currentPage = currentPage;
    },
    changePage: (state, action: PayloadAction<number>) => {
      state.admin.currentPage = action.payload;
    },
    filterAd: (state, action: PayloadAction<Params>) => {
      state.admin.filters = action.payload;
    },
    loadBlogList: (state, action: PayloadAction<Resp<Blog>>) => {
      const { currentPage, list, totalItems, totalPages } = action.payload;
      state.public.list = list.map((item) => {
        return {
          ...item,
          like: false,
          dislike: false,
        };
      });
      state.public.totalItems = totalItems;
      state.public.totalPages = totalPages;
      state.public.currentPage = currentPage;
    },
    likeBlogItem: (state, action: PayloadAction<number>) => {
      const index = state.public.list.findIndex(
        (item) => item.id === action.payload
      );
      if (index > -1) {
        state.public.list[index].dislike = false;
        state.public.list[index].like = !state.public.list[index].like;
      }
    },
    disLikeBlogItem: (state, action: PayloadAction<number>) => {
      const index = state.public.list.findIndex(
        (item) => item.id === action.payload
      );
      if (index > -1) {
        state.public.list[index].like = false;
        state.public.list[index].dislike = !state.public.list[index].dislike;
      }
    },
  },
});

export const { edit, changePage, filterAd, loadBlogListAD,disLikeBlogItem,likeBlogItem,loadBlogList } = blogSlice.actions;

export default blogSlice.reducer;
