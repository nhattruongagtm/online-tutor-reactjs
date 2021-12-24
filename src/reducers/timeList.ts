import { TimeItemProps } from "../components/FindTutorList/FindTutorList";
import {updateDate} from '../actions/timeList'
export interface TimeList{
    timeList: TimeItemProps[];
}
const initialState : TimeList = {
    timeList: [],
}

interface PayloadAction{
    type: string;
    payload: TimeItemProps;
}


export const timeListReducer= (state = initialState, action: PayloadAction ) =>{
    switch(action.type){
        case "UPDATE_DATE": 

        return state;

        default : return state;
    }
}   

export default timeListReducer;