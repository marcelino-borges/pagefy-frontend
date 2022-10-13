import { IAction } from "../shared/types";
import { IPurchaseState, PurchaseTypes } from "./types";

const initialState: IPurchaseState = {
  loading: false,
  error: undefined,
  plan: undefined,
  subscriptionCreated: undefined,
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
    case PurchaseTypes.CREATE_SUBSCRIPTION_LOADING:
      return {
        ...state,
        loading: true,
      };
    case PurchaseTypes.CREATE_SUBSCRIPTION_SUCCESS:
      return {
        ...state,
        subscriptionCreated: action.payload,
        loading: false,
      };
    case PurchaseTypes.CREATE_SUBSCRIPTION_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case PurchaseTypes.CANCEL_SUBSCRIPTION_LOADING:
      return {
        ...state,
        loading: true,
      };

    case PurchaseTypes.CANCEL_SUBSCRIPTION_SUCCESS:
      return {
        ...state,
        subscriptionCreated: undefined,
        loading: false,
      };

    case PurchaseTypes.CANCEL_SUBSCRIPTION_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
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
