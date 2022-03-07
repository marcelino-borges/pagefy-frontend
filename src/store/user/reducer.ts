import { IAction } from "../shared";
import { IUserState, UserActionTypes } from "./types";

const initialState: IUserState = {
  loading: false,
  error: undefined,
  profile: {
    _id: "1",
    firstName: "Marcelino",
    lastName: "Borges",
    email: "botelho_gt@hotmail.com",
  },
};

const userReducer = (
  state: any = initialState,
  action: IAction
): IUserState => {
  switch (action.type) {
    case UserActionTypes.GET_USER_SUCCESS:
      return {
        ...state,
        profile: action.payload,
      };

    case UserActionTypes.GET_USER_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;
