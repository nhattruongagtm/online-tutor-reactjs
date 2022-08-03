import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Params, Resp } from '../api/tutorApi';
import { ClassItem } from '../components/WaitingClassList/WaitingClassList';
import { Filter } from './blogSlice';
export interface TimePost {
  ids?: number;
  day: number;
  time: number;
}
export type PostSlice = Resp<ClassItem> & Filter;

interface InitialPost {
  timeList: TimePost[];
  edit: ClassItem | undefined;
  posts: PostSlice;
}

const initialState: InitialPost = {
  timeList: [
    {
      ids: Math.floor(Math.random() * 100),
      day: 2,
      time: 7,
    },
    {
      ids: Math.floor(Math.random() * 100),
      day: 2,
      time: 8.5,
    },
  ],
  edit: undefined,
  posts: {
    currentPage: 1,
    list: [],
    totalItems: 0,
    totalPages: 0,
    filters: {
      search: '',
    },
  },
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    loadTimeList: (state, action: PayloadAction<TimePost[]>) => {
      state.timeList = action.payload;
    },
    addTimeList: (state, action: PayloadAction<TimePost>) => {
      state.timeList.push(action.payload);
    },
    updateTimeList: (state, action: PayloadAction<TimePost>) => {
      const ind = state.timeList.findIndex(
        (time) => time.ids === action.payload.ids
      );
      if (ind > -1) {
        state.timeList[ind].day = action.payload.day;
        state.timeList[ind].time = action.payload.time;
      }
    },
    deleteTimeList: (state, action: PayloadAction<TimePost>) => {
      state.timeList =
        state.timeList.length > 1
          ? state.timeList.filter((time) => time.ids !== action.payload.ids)
          : state.timeList;
    },
    editPost: (state, action: PayloadAction<ClassItem>) => {
      state.edit = action.payload;
    },
    loadPostListAd: (state, action: PayloadAction<PostSlice>) => {
      const { currentPage, filters, list, totalItems, totalPages } =
        action.payload;
      state.posts.currentPage = currentPage;
      state.posts.list = list;
      state.posts.totalItems = totalItems;
      state.posts.totalPages = totalPages;
    },
    changePostPage: (state, action: PayloadAction<number>) => {
      state.posts.currentPage = action.payload;
    },
    filterPosts: (state,action:PayloadAction<Params>)=>{
      state.posts.filters = action.payload;
    }
  },
});

export const {
  addTimeList,
  loadTimeList,
  deleteTimeList,
  updateTimeList,
  editPost,
  changePostPage,filterPosts,loadPostListAd
} = postSlice.actions;

export default postSlice.reducer;
