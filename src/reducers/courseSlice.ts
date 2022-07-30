import { Params, Resp } from '../api/tutorApi';
import { Blog } from '../models/blog';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Course } from '../models/course';

export interface CourseSlice {
  filters: Params;
  currentPage: number;
  list: Course[];
  totalItems: number;
  totalPages: number;
}
const initialState: CourseSlice = {
  filters: {},
  currentPage: 1,
  list: [],
  totalItems: 0,
  totalPages: 0,
};

const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {
    loadCourseList: (state, action: PayloadAction<Resp<Course>>) => {
      const { currentPage, list, totalItems, totalPages } = action.payload;
      state.list = list;
      state.totalItems = totalItems;
      state.totalPages = totalPages;
      state.currentPage = currentPage;
    },
    changeCoursePage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    filterCourse: (state, action: PayloadAction<Params>) => {
      state.filters = action.payload;
    },
  },
});

export const { changeCoursePage, filterCourse, loadCourseList } =
  courseSlice.actions;

export default courseSlice.reducer;
