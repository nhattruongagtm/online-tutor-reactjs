import { REQUEST_FORGOT_CHANGE_PASSWORD, REQUEST_FORGOT_CHECK_CODE } from "../constants/forgotPassword"

export const requestForgotPassword = (email: string) =>{
    return {
        type: REQUEST_FORGOT_CHANGE_PASSWORD,
        payload: email,
    }
}
export const requestForgotPasswordSuccess = () =>{
    return {

    }
}
export const requestForgotPasswordFail = () =>{
    return {

    }
}
export const requestForgotPasswordCheckCode = (code: string) =>{
    return {
        type: REQUEST_FORGOT_CHECK_CODE,
        payload: code,
    }
}