import { PageRenderedTypes } from "./types";
import { IUserPage } from "./../user-pages/types";
import { IApplicationState } from "./../index";

export const getPageByUrl =
  (url: string) => (dispatch: any, getState: () => IApplicationState) => {
    //TODO: Service call to API - Get page by url
    const pages = getState().userPages.pages;
    if (!pages || pages.length < 1) return;

    const page = pages[1];
    if (page) dispatch(setPageBeingManaged(page));
  };

export const setPageBeingManaged = (page: IUserPage) => ({
  payload: page,
  type: PageRenderedTypes.SET_PAGE_BEING_RENDERED,
});

export const clearPageBeingRendered = () => (dispatch: any) => {
  dispatch(clearPageBeingManagedSuccess());
};

const clearPageBeingManagedSuccess = () => ({
  type: PageRenderedTypes.CLEAR_PAGE_BEING_RENDERED,
});

export const clearPageRendererState = () => ({
  type: PageRenderedTypes.CLEAR_STATE,
});
