import { combineReducers } from 'redux';
import forgotReducer from './forgotPassword';
import signUpReducer from './signup';


const rootReducer = combineReducers({
    signUpStatus: signUpReducer,
    forgotStatus: forgotReducer,
})

export default rootReducer;
