import { PlanFeatures, UserSubscription } from "../user-subscriptions";

export enum UserActionTypes {
  GET_USER_LOADING = "@user/GET_USER_LOADING",
  GET_USER_SUCCESS = "@user/GET_USER_SUCCESS",
  GET_USER_ERROR = "@user/GET_USER_ERROR",
  GET_USER_OR_CREATE_LOADING = "@user/GET_USER_OR_CREATE_LOADING",
  GET_USER_OR_CREATE_SUCCESS = "@user/GET_USER_OR_CREATE_SUCCESS",
  GET_USER_OR_CREATE_ERROR = "@user/GET_USER_OR_CREATE_ERROR",
  UPLOAD_USER_LOADING = "@user/UPLOAD_USER_LOADING",
  UPLOAD_USER_SUCCESS = "@user/UPLOAD_USER_SUCCESS",
  UPLOAD_USER_ERROR = "@user/UPLOAD_USER_ERROR",
  GET_SUBSCRIPTIONS_LOADING = "@user/GET_SUBSCRIPTIONS_LOADING",
  GET_SUBSCRIPTIONS_SUCCESS = "@user/GET_SUBSCRIPTIONS_SUCCESS",
  GET_SUBSCRIPTIONS_ERROR = "@user/GET_SUBSCRIPTIONS_ERROR",
  GET_ACTIVE_SUBSCRIPTION_LOADING = "@user/GET_ACTIVE_SUBSCRIPTION_LOADING",
  GET_ACTIVE_SUBSCRIPTION_SUCCESS = "@user/GET_ACTIVE_SUBSCRIPTION_SUCCESS",
  GET_ACTIVE_SUBSCRIPTION_ERROR = "@user/GET_ACTIVE_SUBSCRIPTION_ERROR",
  CANCEL_SUBSCRIPTION_LOADING = "@user/CANCEL_SUBSCRIPTION_LOADING",
  CANCEL_SUBSCRIPTION_SUCCESS = "@user/CANCEL_SUBSCRIPTION_SUCCESS",
  CANCEL_SUBSCRIPTION_ERROR = "@user/CANCEL_SUBSCRIPTION_ERROR",
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
  receiveCommunications?: boolean;
  agreePrivacy?: boolean;
}

export interface IUserState {
  loading: boolean;
  error?: any;
  profile?: IUser;
  activeSubscription?: UserSubscription;
  planFeatures?: PlanFeatures;
  subscriptions?: UserSubscription[];
}
