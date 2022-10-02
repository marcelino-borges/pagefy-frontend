import { IAction, IAppResult } from "../shared/types";
import { ISupportState, SupportTypes } from "./types";

const initialState: ISupportState = {
  loading: false,
  error: undefined,
  success: undefined,
};

const supportReducer = (
  state: any = initialState,
  action: IAction
): ISupportState => {
  switch (action.type) {
    case SupportTypes.SEND_EMAIL_SUPPORT_LOADING:
      return {
        ...initialState,
        loading: true,
      };

    case SupportTypes.SEND_EMAIL_SUPPORT_SUCCESS:
      return {
        ...initialState,
        success: true,
      };

    case SupportTypes.SEND_EMAIL_SUPPORT_ERROR: {
      const error: IAppResult = action.payload;

      return {
        ...state,
        error: error.message,
        loading: false,
      };
    }

    case SupportTypes.CLEAR_SUPPORT_STATE:
      return initialState;

    default:
      return { ...state };
  }
};

export default supportReducer;
