export enum UserActionTypes {
  GET_USER_SUCCESS = "@user/GET_USER_SUCCESS",
  GET_USER_ERROR = "@user/GET_USER_ERROR",
}

export interface IUser {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  profileImageUrl?: string;
}

export interface IUserState {
  loading: boolean;
  error?: any;
  profile?: IUser;
}
