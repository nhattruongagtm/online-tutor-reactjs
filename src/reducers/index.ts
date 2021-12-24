import { combineReducers } from 'redux';
import signUpReducer from './signup';
import forgotReducer from './forgotPassword';
import timeListReducer from './timeList';
import signUpInfoReducer from './signUpInfo';


const rootReducer = combineReducers({
    signUpStatus: signUpReducer,
    forgotStatus: forgotReducer,
    timeList: timeListReducer,  
    signUpInfo: signUpInfoReducer,
})

export default rootReducer;   
  