// import { FIlL_ID, FILL_STEP_1, FILL_STEP_2 } from '../constants/signup';

// export interface ISignUpInfo {
//   id: number | null;
//   email: string;
//   password: string;
//   code: string;
//   fullName: string;
//   gender: boolean;
//   district: string;
//   city: string;
//   phone: string;
// }
// export interface IInitialState {
//   signUpInfo: ISignUpInfo;
// }
// interface Payload {
//   type: string;
//   payload: ISignUpInfo;
// }
// const initialState: ISignUpInfo = {
//     id: null,
//     email: '',
//     password: '',
//     phone: '',
//     code: '',
//     fullName: '',
//     gender: true,
//     district: '',
//     city: '',

// };

// const signUpInfoReducer = (
//   state: ISignUpInfo = initialState,
//   action: Payload
// ) : ISignUpInfo => {  
//   switch (action.type) {
//     case FILL_STEP_1:
//       const stateStep1 = { ...state};
//       stateStep1.email = action.payload.email;
//       // stateStep1.password = aaction.payload.password;
//       stateStep1.type = action.payload.type;
//       return stateStep1;
//     case FILL_STEP_2:
//       const stateStep2 = { ...state};
//       stateStep2.code = action.payload.code;
//       return stateStep2;
//     case FIlL_ID:
//       const newState = {...state};
//       newState.id = action.payload.id;
//       return newState;
//     default:
//       return state;
//   }
// };

// export default signUpInfoReducer;

const s = 5;

export default s;
