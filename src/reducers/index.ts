import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';
import { history } from '../utils';
import forgotPasswordSlice from './forgotPasswordSlice';
import loginSlice from './loginSlice';
import postSlice from './postSlice';
import profileSlice from './profileSlice';
import signUpSlice from './signUpSlice';

const rootReducer = combineReducers({
    router: connectRouter(history),
    signUpUser: signUpSlice,
    forgotPassword: forgotPasswordSlice,
    loginUser: loginSlice,
    post: postSlice,
    profile: profileSlice,
})

export default rootReducer;   
  