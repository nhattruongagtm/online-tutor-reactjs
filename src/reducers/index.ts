import { combineReducers } from 'redux';
import forgotReducer from './forgotPassword';
import loginReducer from './login';
import postReducer from './post';
import profileReducer from './profile';
import signUpReducer from './signup';

const rootReducer = combineReducers({
    signUpUser: signUpReducer,
    forgotPassword: forgotReducer,
    loginUser: loginReducer,
    post: postReducer,
    profile: profileReducer,
})

export default rootReducer;   
  