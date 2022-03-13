import { IAction } from "../shared/types";
import { IPageRenderedState, PageRenderedTypes } from "./types";

const initialState: IPageRenderedState = {
  loading: false,
  error: undefined,
  page: undefined,
};

const pageRenderedReducer = (
  state: any = initialState,
  action: IAction
): IPageRenderedState => {
  switch (action.type) {
    case PageRenderedTypes.GET_PAGE_BY_URL_LOADING:
      return {
        ...state,
        loading: true,
        error: undefined,
      };

    case PageRenderedTypes.GET_PAGE_BY_URL_ERROR:
      return {
        error: action.payload,
        page: undefined,
        loading: false,
      };

    case PageRenderedTypes.SET_PAGE_BEING_RENDERED:
      return {
        page: action.payload,
        error: undefined,
        loading: false,
      };

    case PageRenderedTypes.CLEAR_PAGE_BEING_RENDERED:
    case PageRenderedTypes.CLEAR_STATE:
      return initialState;

    default:
      return state;
  }
};

export default pageRenderedReducer;
