import { IAction } from "../shared/types";
import { IPurchaseState, PurchaseTypes } from "./types";

const initialState: IPurchaseState = {
  loading: false,
  error: undefined,
  plan: undefined,
  price: undefined,
  currency: undefined,
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
        plan: action.payload.plan,
        price: action.payload.price,
        currency: action.payload.currency,
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

    case PurchaseTypes.CLEAR_SUBSCRIPTION:
      return {
        ...state,
        subscriptionCreated: undefined,
      };

    case PurchaseTypes.SET_CURRENCY:
      return {
        ...state,
        currency: action.payload,
      };

    case PurchaseTypes.CLEAR_CURRENCY:
      return {
        ...state,
        currency: undefined,
      };

    case PurchaseTypes.SET_PRICE:
      return {
        ...state,
        price: action.payload,
      };

    case PurchaseTypes.CLEAR_PRICE:
      return {
        ...state,
        price: undefined,
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
