import { PlansTypes } from "../user/types";
import { PurchaseTypes } from "./types";

export const setPlanTypeToSubscribe = (plan: PlansTypes) => ({
  payload: plan,
  type: PurchaseTypes.SET_PLAN_TYPE_TO_SUBSCRIBE,
});

export const clearState = () => ({
  type: PurchaseTypes.CLEAR_STATE,
});
