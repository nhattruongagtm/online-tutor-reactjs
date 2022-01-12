import { combineReducers } from 'redux';
import forgotReducer from './forgotPassword';
import loginReducer from './login';
import signUpReducer from './signup';
import timeListReducer from './timeList';

const rootReducer = combineReducers({
    signUpUser: signUpReducer,
    forgotPassword: forgotReducer,
    timeList: timeListReducer,  
    loginUser: loginReducer,
})

export default rootReducer;   
  