import { IAction } from "../shared";
import { AuthActionTypes, IAuthState } from "./types";

const initialState: IAuthState = {
  error: undefined,
  loading: false,
  tokens: undefined,
};

const authReducer = (
  state: any = initialState,
  action: IAction
): IAuthState => {
  switch (action.type) {
    case AuthActionTypes.SIGNIN_LOADING:
      return {
        ...state,
        loading: true,
        error: undefined,
      };
    case AuthActionTypes.SIGNIN_SUCCESS:
      return {
        ...state,
        loading: false,
        error: undefined,
        tokens: action.payload,
      };
    case AuthActionTypes.SIGNIN_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case AuthActionTypes.SIGNUP_LOADING:
      return {
        ...state,
        loading: true,
        error: undefined,
      };

    case AuthActionTypes.SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        error: undefined,
      };

    case AuthActionTypes.SIGNUP_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case AuthActionTypes.SIGNOUT_LOADING:
      return {
        ...state,
        loading: true,
        error: undefined,
      };

    case AuthActionTypes.SIGNOUT_SUCCESS:
      return initialState;

    case AuthActionTypes.SIGNOUT_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default authReducer;
