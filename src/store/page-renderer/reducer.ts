import { IAction } from "../shared";
import { IPageRenderedState, PageRenderedTypes } from "./types";

const initialState: IPageRenderedState = {
  page: undefined,
};

const pageRenderedReducer = (
  state: any = initialState,
  action: IAction
): IPageRenderedState => {
  switch (action.type) {
    case PageRenderedTypes.SET_PAGE_BEING_RENDERED:
      return {
        page: action.payload,
      };

    case PageRenderedTypes.CLEAR_PAGE_BEING_RENDERED:
      return {
        page: undefined,
      };

    default:
      return state;
  }
};

export default pageRenderedReducer;
