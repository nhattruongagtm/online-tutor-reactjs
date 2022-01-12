import { ResponseData } from "../api/authApi"
import { REQUEST_LOGIN, REQUEST_LOGIN_FAIL, REQUEST_LOGIN_SUCCESS } from "../constants/login"
import { UserAuth, UserLogin } from "../reducers/login"

export const requestLogin = (payload : UserLogin) =>{
    return {
        type: REQUEST_LOGIN,
        payload : {
            user: payload,
        }
    }
}
export const requestLoginSuccess = (payload: UserAuth | null) =>{  
    return {
        type: REQUEST_LOGIN_SUCCESS,
        payload : payload,  
    }
}
export const requestLoginFail = (error: string) =>{
    return {
        type: REQUEST_LOGIN_FAIL,
        payload: error,
    }
}