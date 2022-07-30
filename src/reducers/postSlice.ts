import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ClassItem } from '../components/WaitingClassList/WaitingClassList';
export interface TimePost {
  ids?: number;
  day: number;
  time: number;
}
interface InitialPost {
  timeList: TimePost[];
  edit: ClassItem | undefined;
}

const initialState: InitialPost = {
  timeList: [
    {
      ids: Math.floor(Math.random()*100),
      day: 2,
      time: 7,
    },
    {
      ids: Math.floor(Math.random()*100),
      day: 2,
      time: 8.5,
    },
  ],
  edit: undefined,
};

const postSlice = createSlice({
  name: 'post',   
  initialState,
  reducers: {
    loadTimeList: (state,action:PayloadAction<TimePost[]>)=>{
      state.timeList = action.payload
    },
    addTimeList: (state, action: PayloadAction<TimePost>) => {
      state.timeList.push(action.payload);
    },
    updateTimeList: (state, action: PayloadAction<TimePost>) => {
      const ind = state.timeList.findIndex(
        (time) => time.ids === action.payload.ids
      );
      if(ind > -1){
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
  },
});

export const { addTimeList,loadTimeList, deleteTimeList, updateTimeList,editPost } =
  postSlice.actions;

export default postSlice.reducer;
