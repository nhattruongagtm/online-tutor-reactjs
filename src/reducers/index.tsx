import { combineReducers } from 'redux';
import forgotReducer from './forgotPassword';
import signUpReducer from './signup';
import timeListReducer from './timeList';


const rootReducer = combineReducers({
    signUpStatus: signUpReducer,
    forgotStatus: forgotReducer,
    timeList: timeListReducer,
})

export default rootReducer;
