import { ADD_TIME_LIST, DELETE_TIME_LIST, UPDATE_TIME_LIST } from "../constants/post"
import { TimePost } from "../reducers/post"

export const addTimeList = (timePost: TimePost) =>{
    return {
        type: ADD_TIME_LIST,
        payload: timePost,
    }
}
export const updateTimeList = (timePost: TimePost) =>{
    return {
        type: UPDATE_TIME_LIST,
        payload: timePost,
    }
}
export const deleteTimeList = (timePost: TimePost) =>{
    return {
        type: DELETE_TIME_LIST,
        payload: timePost,
    }
}