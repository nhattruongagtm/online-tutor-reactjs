import {
  UPDATE_PROFILE,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_SUCCESS,
} from '../constants/profile';

interface Profile {
  loading: boolean;
}
interface PayloadAction<T> {
  type: string;
  payload: T;
}
const initalState: Profile = {
  loading: false,
};
const profileReducer = (
  state: Profile = initalState,
  action: PayloadAction<boolean>
) => {
  switch (action.type) {
    case UPDATE_PROFILE:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case UPDATE_PROFILE_FAIL:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default profileReducer;
