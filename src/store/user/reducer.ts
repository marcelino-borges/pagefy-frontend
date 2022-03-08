import { IAction } from "../shared";
import { IUserState, UserActionTypes } from "./types";

// const initialStateMock: IUserState = {
//   loading: false,
//   error: undefined,
//   profile: {
//     _id: "1",
//     firstName: "Marcelino",
//     lastName: "Borges",
//     email: "botelho_gt@hotmail.com",
//   },
// };

const initialState: IUserState = {
  loading: false,
  error: undefined,
  profile: undefined,
};

const userReducer = (
  state: any = initialState,
  action: IAction
): IUserState => {
  switch (action.type) {
    case UserActionTypes.UPLOAD_USER_LOADING:
    case UserActionTypes.GET_USER_LOADING:
      return {
        ...state,
        loading: true,
      };

    case UserActionTypes.UPLOAD_USER_SUCCESS:
    case UserActionTypes.GET_USER_SUCCESS:
      return {
        ...state,
        profile: action.payload,
        loading: false,
        error: undefined,
      };

    case UserActionTypes.UPLOAD_USER_ERROR:
    case UserActionTypes.GET_USER_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default userReducer;
