import { ISubscriptionCreationResult } from "../purchase/types";

export enum UserActionTypes {
  GET_USER_LOADING = "@user/GET_USER_LOADING",
  GET_USER_SUCCESS = "@user/GET_USER_SUCCESS",
  GET_USER_ERROR = "@user/GET_USER_ERROR",
  UPLOAD_USER_LOADING = "@user/UPLOAD_USER_LOADING",
  UPLOAD_USER_SUCCESS = "@user/UPLOAD_USER_SUCCESS",
  UPLOAD_USER_ERROR = "@user/UPLOAD_USER_ERROR",
  GET_SUBSCRIPTIONS_LOADING = "@user/GET_SUBSCRIPTIONS_LOADING",
  GET_SUBSCRIPTIONS_SUCCESS = "@user/GET_SUBSCRIPTIONS_SUCCESS",
  GET_SUBSCRIPTIONS_ERROR = "@user/GET_SUBSCRIPTIONS_ERROR",
  CLEAR_STATE = "@user/CLEAR_STATE",
}

export interface IUser {
  _id?: string;
  authId?: string;
  paymentId?: string;
  profileImageUrl?: string;
  firstName: string;
  lastName: string;
  email: string;
  plan: PlansTypes;
  receiveCommunications?: boolean;
  agreePrivacy?: boolean;
}

export enum PlansTypes {
  FREE = 0,
  VIP = 1,
  PLATINUM = 2,
}

export interface IUserState {
  loading: boolean;
  error?: any;
  profile?: IUser;
  subscriptions?: ISubscriptionCreationResult[];
}
