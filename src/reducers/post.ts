import { statSync } from 'fs';
import {
    ADD_TIME_LIST, DELETE_TIME_LIST, UPDATE_TIME_LIST
} from '../constants/post';
export interface TimePost {
  id: string;
  day: number;
  time: number;
}
interface InitialPost {
  timeList: TimePost[];
}
interface PayloadAction<T> {
  type: string;
  payload: T;
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
const postReducer = (
  state: InitialPost = initialState,
  action: PayloadAction<TimePost>
) => {
  switch (action.type) {   
    case ADD_TIME_LIST:
        return {
            ...state,
            timeList: [...state.timeList, action.payload],
        }
    case UPDATE_TIME_LIST:
        const newState = {...state};
        const ind = newState.timeList.findIndex((time) => time.id === action.payload.id);
        newState.timeList[ind].day = action.payload.day;
        newState.timeList[ind].time = action.payload.time;

        return{  
            ...state,
            timeList:  newState.timeList,  
        }
    case DELETE_TIME_LIST:
        return {
            ...state,
            timeList: state.timeList.length > 1 ? state.timeList.filter((time) => time.id !== action.payload.id) : state.timeList,
        }
    default:
      return state;
  }
};

export default postReducer;
