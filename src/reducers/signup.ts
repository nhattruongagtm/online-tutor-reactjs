interface IInitialState {
  status: number;
}
interface PayloadAction {
  type: string;
  payload: number;
}
const initialState = {
  status: 0,
};

const signUpReducer = (
  state: IInitialState = initialState,
  action: PayloadAction
) => {
  switch (action.type) {
    case "STATUS__SIGNUP":
      state = {status: action.payload};
      return state;
    default:
      return state;
  }
};
export default signUpReducer;
