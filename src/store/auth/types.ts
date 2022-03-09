export enum AuthActionTypes {
  SIGNIN_LOADING = "@auth/SIGNIN_LOADING",
  SIGNIN_SUCCESS = "@auth/SIGNIN_SUCCESS",
  SIGNIN_ERROR = "@auth/SIGNIN_ERROR",
  SIGNUP_LOADING = "@auth/SIGNUP_RESIGNUP_LOADINGQUEST",
  SIGNUP_SUCCESS = "@auth/SIGNUP_SUCCESS",
  SIGNUP_ERROR = "@auth/SIGNUP_ERROR",
  SIGNOUT_LOADING = "@auth/SIGNOUT_LOADING",
  SIGNOUT_SUCCESS = "@auth/SIGNOUT_SUCCESS",
  SIGNOUT_ERROR = "@auth/SIGNOUT_ERROR",
}

export interface IUserCredentials {
  email: string;
  password: string;
}

export interface IUserAuth {
  uid: string;
  accessToken: string;
}

export interface IAuthState {
  loading: boolean;
  error?: any;
  auth?: IUserAuth;
}
