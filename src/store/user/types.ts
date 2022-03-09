export enum UserActionTypes {
  GET_USER_LOADING = "@user/GET_USER_LOADING",
  GET_USER_SUCCESS = "@user/GET_USER_SUCCESS",
  GET_USER_ERROR = "@user/GET_USER_ERROR",
  UPLOAD_USER_LOADING = "@user/UPLOAD_USER_LOADING",
  UPLOAD_USER_SUCCESS = "@user/UPLOAD_USER_SUCCESS",
  UPLOAD_USER_ERROR = "@user/UPLOAD_USER_ERROR",
  CLEAR_STATE = "@user/CLEAR_STATE",
}

export interface IUser {
  _id?: string;
  authId?: string;
  profileImageUrl?: string;
  firstName: string;
  lastName: string;
  email: string;
  plan: IPlan;
}

export enum IPlan {
  FREE = 0,
  P1 = 1,
  P2 = 2,
}

export interface IUserState {
  loading: boolean;
  error?: any;
  profile?: IUser;
}
