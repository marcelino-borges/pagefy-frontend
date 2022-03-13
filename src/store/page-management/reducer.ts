import { IAction } from "../shared/types";
import { IPageManagementState, PageManagementTypes } from "./types";

const initialState: IPageManagementState = {
  pageId: undefined,
};

const pageManagementReducer = (
  state: any = initialState,
  action: IAction
): IPageManagementState => {
  switch (action.type) {
    case PageManagementTypes.SET_PAGE_BEING_MANAGED:
      return {
        pageId: action.payload,
      };

    case PageManagementTypes.CLEAR_PAGE_BEING_MANAGED:
      return {
        pageId: undefined,
      };

    default:
      return state;
  }
};

export default pageManagementReducer;
