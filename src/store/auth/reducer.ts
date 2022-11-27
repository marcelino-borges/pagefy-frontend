import { IAction } from "../shared/types";
import { AuthActionTypes, IAuthState } from "./types";

const initialState: IAuthState = {
  error: undefined,
  loading: false,
  auth: undefined,
};

const authReducer = (
  state: any = initialState,
  action: IAction
): IAuthState => {
  switch (action.type) {
    case AuthActionTypes.SIGNIN_LOADING:
    case AuthActionTypes.SIGNIN_GOOGLE_LOADING:
    case AuthActionTypes.SIGNIN_FACEBOOK_LOADING:
    case AuthActionTypes.SIGNIN_MICROSOFT_LOADING:
    case AuthActionTypes.SIGNIN_APPLE_LOADING:
      return {
        ...state,
        loading: true,
        error: undefined,
      };
    case AuthActionTypes.SIGNIN_SUCCESS:
    case AuthActionTypes.SIGNIN_GOOGLE_SUCCESS:
    case AuthActionTypes.SIGNIN_FACEBOOK_SUCCESS:
    case AuthActionTypes.SIGNIN_MICROSOFT_SUCCESS:
    case AuthActionTypes.SIGNIN_APPLE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: undefined,
        auth: action.payload,
      };
    case AuthActionTypes.SIGNIN_ERROR:
    case AuthActionTypes.SIGNIN_GOOGLE_ERROR:
    case AuthActionTypes.SIGNIN_FACEBOOK_ERROR:
    case AuthActionTypes.SIGNIN_MICROSOFT_ERROR:
    case AuthActionTypes.SIGNIN_APPLE_ERROR:
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

    case AuthActionTypes.SIGNOUT_SUCCESS:
      return initialState;

    case AuthActionTypes.SIGNOUT_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return { ...state };
  }
};

export default authReducer;
