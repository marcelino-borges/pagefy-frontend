export enum AuthActionTypes {
  SIGNIN_LOADING = "@auth/SIGNIN_LOADING",
  SIGNIN_SUCCESS = "@auth/SIGNIN_SUCCESS",
  SIGNIN_ERROR = "@auth/SIGNIN_ERROR",
  SIGNIN_GOOGLE_LOADING = "@auth/SIGNIN_GOOGLE_LOADING",
  SIGNIN_GOOGLE_SUCCESS = "@auth/SIGNIN_GOOGLE_SUCCESS",
  SIGNIN_GOOGLE_ERROR = "@auth/SIGNIN_GOOGLE_ERROR",
  SIGNIN_FACEBOOK_LOADING = "@auth/SIGNIN_FACEBOOK_LOADING",
  SIGNIN_FACEBOOK_SUCCESS = "@auth/SIGNIN_FACEBOOK_SUCCESS",
  SIGNIN_FACEBOOK_ERROR = "@auth/SIGNIN_FACEBOOK_ERROR",
  SIGNIN_MICROSOFT_LOADING = "@auth/SIGNIN_MICROSOFT_LOADING",
  SIGNIN_MICROSOFT_SUCCESS = "@auth/SIGNIN_MICROSOFT_SUCCESS",
  SIGNIN_MICROSOFT_ERROR = "@auth/SIGNIN_MICROSOFT_ERROR",
  SIGNIN_APPLE_LOADING = "@auth/SIGNIN_APPLE_LOADING",
  SIGNIN_APPLE_SUCCESS = "@auth/SIGNIN_APPLE_SUCCESS",
  SIGNIN_APPLE_ERROR = "@auth/SIGNIN_APPLE_ERROR",
  SIGNUP_LOADING = "@auth/SIGNUP_RESIGNUP_LOADINGQUEST",
  SIGNUP_SUCCESS = "@auth/SIGNUP_SUCCESS",
  SIGNUP_ERROR = "@auth/SIGNUP_ERROR",
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
