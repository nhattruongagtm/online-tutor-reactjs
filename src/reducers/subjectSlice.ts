import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Subject } from '../models/subject';

export interface SubjectStore {
  loading: boolean;
  list: Subject[];
  edit: Subject | null;
}

const initialState: SubjectStore = {
  loading: false,
  list: [],
  edit: null,
};

const subjectSlice = createSlice({
  name: 'subject',
  initialState,
  reducers: {
    loadSubjectList: (state, action: PayloadAction<Subject[]>) => {
      state.list = action.payload;
    },
    edit: (state, action: PayloadAction<Subject | null>) => {
      state.edit = action.payload;
    },
    updateSubject: (state, action: PayloadAction<Subject>) => {
      const index = state.list.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index > -1) {
        state.list[index] = action.payload;
      }
    },
  },
});

export const { edit, loadSubjectList } = subjectSlice.actions;

export default subjectSlice.reducer;
