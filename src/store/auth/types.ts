export enum AuthActionTypes {
  SIGNIN_REQUEST = "@auth/SIGNIN_REQUEST",
  SIGNIN_SUCCESS = "@auth/SIGNIN_SUCCESS",
  SIGNIN_ERROR = "@auth/SIGNIN_ERROR",
  SIGNUP_REQUEST = "@auth/SIGNUP_REQUEST",
  SIGNUP_SUCCESS = "@auth/SIGNUP_SUCCESS",
  SIGNUP_ERROR = "@auth/SIGNUP_ERROR",
  SIGNOUT_REQUEST = "@auth/SIGNOUT_REQUEST",
  SIGNOUT_SUCCESS = "@auth/SIGNOUT_SUCCESS",
  SIGNOUT_ERROR = "@auth/SIGNOUT_ERROR",
}

export interface IUserCredentials {
  email: string;
  password: string;
}

export interface IAuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface IAuthState {
  loading: boolean;
  error?: any;
  tokens?: IAuthTokens;
}
