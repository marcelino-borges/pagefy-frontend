import { PurchaseTypes } from "./types";

export const setPurchaseValue = (value: number) => ({
  payload: value,
  type: PurchaseTypes.SET_VALUE,
});
