import { createSlice, PayloadAction } from '@reduxjs/toolkit';
export interface TimePost {
  id: string;
  day: number;
  time: number;
}
interface InitialPost {
  timeList: TimePost[];
}

const initialState: InitialPost = {
  timeList: [
    {
      id: 'a',
      day: 2,
      time: 7,
    },
    {
      id: 'b',
      day: 2,
      time: 8.5,
    },
  ],
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    addTimeList: (state, action: PayloadAction<TimePost>) => {
      state.timeList.push(action.payload);
    },
    updateTimeList: (state, action: PayloadAction<TimePost>) => {
      const ind = state.timeList.findIndex(
        (time) => time.id === action.payload.id
      );
      state.timeList[ind].day = action.payload.day;
      state.timeList[ind].time = action.payload.time;
    },
    deleteTimeList: (state, action: PayloadAction<TimePost>) => {
      state.timeList =
        state.timeList.length > 1
          ? state.timeList.filter((time) => time.id !== action.payload.id)
          : state.timeList;
    },
  },
});

export const { addTimeList, deleteTimeList, updateTimeList } =
  postSlice.actions;

export default postSlice.reducer;
