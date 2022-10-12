import { PlansTypes } from "../user/types";

export enum PurchaseTypes {
  SET_PLAN_TYPE_TO_SUBSCRIBE = "@purchase/SET_VALUE",
  CLEAR_STATE = "@purchase/CLEAR_STATE",
  CREATE_SUBSCRIPTION_LOADING = "@purchase/CREATE_SUBSCRIPTION_LOADING",
  CREATE_SUBSCRIPTION_SUCCESS = "@purchase/CREATE_SUBSCRIPTION_SUCCESS",
  CREATE_SUBSCRIPTION_ERROR = "@purchase/CREATE_SUBSCRIPTION_ERROR",
  CLEAR_SUBSCRIPTION_CREATED = "@purchase/CLEAR_SUBSCRIPTION_CREATED",
}

export interface ICreateSubscriptionProps {
  currency: string;
  recurrency: RecurrencyTypes;
  planType: PlansTypes;
}

export interface ISubscriptionCreationResult {
  subscriptionId: string;
  subscriptionEnd: number;
  subscriptionStart: number;
  currency: string;
  priceId: string;
  recurrency?: string;
  customer: any;
  latestInvoice: any;
  userId: string;
  status: string;
}

export interface IPurchaseState {
  loading: boolean;
  error?: any;
  plan?: PlansTypes;
  subscriptionCreated?: ISubscriptionCreationResult;
}

export declare type RecurrencyTypes = "month" | "year";
