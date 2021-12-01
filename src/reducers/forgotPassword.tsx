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
  
  const forgotReducer = (
    state: IInitialState = initialState,
    action: PayloadAction
  ) => {
    switch (action.type) {
      case "STATUS__FORGOT":
        state = {status: action.payload};
        console.log(state)
        return state;
      default:
        return state;
    }
  };
  export default forgotReducer;