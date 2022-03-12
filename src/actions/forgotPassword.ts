import { LOADING_FORGOT, REQUEST_FORGOT_CHANGE_PASSWORD, REQUEST_FORGOT_CHANGE_PASSWORD_SUCESS, REQUEST_FORGOT_CHECK_CODE, REQUEST_FORGOT_PASSWORD, REQUEST_FORGOT_UPDATE_CODEID, REQUEST_FORGOT_UPDATE_PROGRESS } from "../constants/forgotPassword"

export const requestForgotPassword = (email: string) =>{
    return {
        type: REQUEST_FORGOT_PASSWORD,
        payload: email,
    }
}
export const loadingForgotPassword = (loading: boolean) =>{
    return {
        type: LOADING_FORGOT,
        payload: loading,
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
export const requestForgotPasswordUpdateProgress = (progress: number) =>{
    return {
        type: REQUEST_FORGOT_UPDATE_PROGRESS,
        payload: progress,
    }
}

export const requestForgotPasswordUpdateCodeID = (id: number, code: string) =>{
    return {
        type: REQUEST_FORGOT_UPDATE_CODEID,
        payload: {
            id,
            code,
        },
    }
}
export const requestChangePassword = (newPassword: string) =>{
    return {
        type: REQUEST_FORGOT_CHANGE_PASSWORD,
        payload: newPassword,
    }
}
export const requestChangePasswordSuccess = () =>{
    return {
        type: REQUEST_FORGOT_CHANGE_PASSWORD_SUCESS,
    }
}
