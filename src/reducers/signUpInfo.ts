import { FILL_STEP_1, FILL_STEP_2 } from '../constants/signup';

export interface ISignUpInfo {
  email: string;
  password: string;
  type: number;
  code: string;
  fullName: string;
  gender: boolean;
  district: string;
  city: string;
  phone: string;
  check: boolean;  
}
export interface IInitialState {
  signUpInfo: ISignUpInfo;
}
interface Payload {
  type: string;
  payload: ISignUpInfo;
}
const initialState: ISignUpInfo = {
 
    email: '',
    password: '',
    phone: '',
    type: 1,
    code: '',
    fullName: '',
    gender: true,
    district: '',
    city: '',
    check: false,

};

const signUpInfoReducer = (
  state: ISignUpInfo = initialState,
  action: Payload
) : ISignUpInfo => {
  switch (action.type) {
    case FILL_STEP_1:
      const stateStep1 = { ...state};
      stateStep1.email = action.payload.email;
      stateStep1.password = action.payload.password;
      stateStep1.type = action.payload.type;
      return stateStep1;
    case FILL_STEP_2:
      const stateStep2 = { ...state};
      stateStep2.code = action.payload.code;
      return stateStep2;
    default:
      return state;
  }
};

export default signUpInfoReducer;
