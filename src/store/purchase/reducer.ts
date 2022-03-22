import { IAction } from "../shared/types";
import { IPurchaseState, PurchaseTypes } from "./types";

const initialState: IPurchaseState = {
  loading: false,
  error: undefined,
  value: undefined,
};

const purchaseReducer = (
  state: IPurchaseState = initialState,
  action: IAction
): IPurchaseState => {
  switch (action.type) {
    case PurchaseTypes.SET_VALUE:
      return {
        ...state,
        value: action.payload,
      };

    default:
      return state;
  }
};

export default purchaseReducer;
