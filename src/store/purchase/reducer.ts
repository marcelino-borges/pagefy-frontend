import { IAction } from "../shared/types";
import { IPurchaseState, PurchaseTypes } from "./types";

const initialState: IPurchaseState = {
  loading: false,
  error: undefined,
  plan: undefined,
};

const purchaseReducer = (
  state: IPurchaseState = initialState,
  action: IAction
): IPurchaseState => {
  switch (action.type) {
    case PurchaseTypes.SET_PLAN_TYPE_TO_SUBSCRIBE:
      return {
        ...state,
        plan: action.payload,
      };

    case PurchaseTypes.CLEAR_STATE:
      return {
        ...initialState,
      };

    default:
      return state;
  }
};

export default purchaseReducer;
