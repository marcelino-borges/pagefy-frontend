import { IAction } from "../shared/types";
import { FaqTypes, IFaqState } from "./types";

const initialState: IFaqState = {
  loading: false,
  error: undefined,
  faqs: [],
};

const faqReducer = (
  state: IFaqState = initialState,
  action: IAction
): IFaqState => {
  switch (action.type) {
    case FaqTypes.GET_ALL_FAQS_LOADING:
      return {
        ...state,
        loading: true,
      };

    case FaqTypes.GET_ALL_FAQS_SUCCESS: {
      return {
        ...state,
        loading: false,
        faqs: action.payload,
      };
    }

    case FaqTypes.GET_ALL_FAQS_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default:
      return { ...state };
  }
};

export default faqReducer;
