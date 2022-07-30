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
import loadingSlice from './loadingSlice';
import rateSlice from './rateSlice';
import waitingClass from './waitingClass';
import tutorSlice from './tutorSlice';
import blogSlice from './blogSlice';
import subjectSlice from './subjectSlice';
import courseSlice from './courseSlice';

const rootReducer = combineReducers({
  router: connectRouter(history),
  signUpUser: signUpSlice,
  forgotPassword: forgotPasswordSlice,
  loginUser: loginSlice,
  post: postSlice,
  profile: profileSlice,
  detailCourse: detailCourseSlice,
  cart: cartSlice,
  loading: loadingSlice,
  rate: rateSlice,
  waitingClass: waitingClass,
  tutors: tutorSlice,
  blog: blogSlice,
  subject: subjectSlice,
  course: courseSlice
});

export default rootReducer;
