import { FILL_STEP_1, FILL_STEP_2 } from "../constants/signup"

interface FillStep1{
    email: string,
    password: string,
    type: number,
}
interface FillStep2{
    code: string;
}
export const updateStatus = (payload: number) => {
    return {
        type: "STATUS__SIGNUP",
        payload: payload,
    }
}
export const updateStatusForgotPassword = (payload: number) => {
    return {
        type: "STATUS__FORGOT",
        payload: payload,
    }
}


export const fillStep1 = (payload: FillStep1) =>{
    return {
        type: FILL_STEP_1,  
        payload: payload
    }
}
export const fillStep2 = (payload: FillStep2) =>{
    return {
        type: FILL_STEP_2,  
        payload: payload
    }
}