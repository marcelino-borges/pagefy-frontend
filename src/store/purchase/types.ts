import { PlansTypes } from "../user/types";

export enum PurchaseTypes {
  SET_PLAN_TYPE_TO_SUBSCRIBE = "@purchase/SET_VALUE",
  CLEAR_STATE = "@purchase/CLEAR_STATE",
}

export interface IPurchaseState {
  loading: boolean;
  error?: any;
  plan?: PlansTypes;
}
