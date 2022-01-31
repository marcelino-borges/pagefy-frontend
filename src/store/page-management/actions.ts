import { PageManagementTypes } from "./types";

export const setPageBeingManaged = (pageId: string) => (dispatch: any) => {
  dispatch(setPageBeingManagedSuccess(pageId));
};

const setPageBeingManagedSuccess = (pageId: string) => ({
  payload: pageId,
  type: PageManagementTypes.SET_PAGE_BEING_MANAGED,
});

export const clearPageBeingManaged = () => (dispatch: any) => {
  dispatch(clearPageBeingManagedSuccess());
};

const clearPageBeingManagedSuccess = () => ({
  type: PageManagementTypes.CLEAR_PAGE_BEING_MANAGED,
});
