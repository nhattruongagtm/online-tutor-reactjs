import { ISignUpInfo } from "../reducers/signup"
import {UPDATE_PROFILE} from '../constants/profile'
export const updateProfile = (userInfo : ISignUpInfo) =>{
    return {
        type: UPDATE_PROFILE,
        payload: userInfo,
    }
}