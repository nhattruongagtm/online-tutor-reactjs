import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';
import { history } from '../utils';
import detailCourseSlice from './detailCourseSlice';
import forgotPasswordSlice from './forgotPasswordSlice';
import loginSlice from './loginSlice';
import postSlice from './postSlice';
import profileSlice from './profileSlice';
import signUpSlice from './signUpSlice';
import cartSlice from './cartSlice';

const rootReducer = combineReducers({
    router: connectRouter(history),
    signUpUser: signUpSlice,
    forgotPassword: forgotPasswordSlice,
    loginUser: loginSlice,
    post: postSlice,
    profile: profileSlice,
    detailCourse: detailCourseSlice,
    cart: cartSlice
})

export default rootReducer;   
  