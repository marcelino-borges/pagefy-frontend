import { AxiosError, AxiosResponse } from "axios";
import * as PagesService from "../../services/user-pages";
import { translateError } from "../../utils/api-errors-mapping";
import { getFirebaseToken } from "../../utils/firebase-config";
import { IAppResult } from "../shared";
import {
  IComponentAnimation,
  IUserComponent,
  IUserPage,
  UserPagesActionTypes,
} from "./types";

export const getAllUserPages =
  (
    userId: string,
    onSuccessCallback: any = null,
    onErrorCallback: any = null
  ) =>
  async (dispatch: any) => {
    dispatch(getAllUserPagesLoading());

    const token = await getFirebaseToken();

    if (!token) {
      if (onErrorCallback) onErrorCallback();
      return;
    }

    PagesService.getAllUserPages(userId, token)
      .then((res: AxiosResponse) => {
        dispatch(getAllUserPagesSuccess(res.data));

        if (onSuccessCallback) onSuccessCallback();
      })
      .catch((e: AxiosError) => {
        const error: IAppResult = e.response?.data;
        dispatch(getAllUserPagesError(error));

        if (error && error.message) {
          const translatedError = translateError(error.message);
          if (onErrorCallback) onErrorCallback(translatedError);
        } else {
          if (onErrorCallback) onErrorCallback();
        }
      });
  };

const getAllUserPagesLoading = () => ({
  type: UserPagesActionTypes.GET_ALL_USER_PAGES_LOADING,
});

const getAllUserPagesSuccess = (pages: IUserPage[]) => ({
  payload: pages,
  type: UserPagesActionTypes.GET_ALL_USER_PAGES_SUCCESS,
});

const getAllUserPagesError = (error: IAppResult) => ({
  payload: error,
  type: UserPagesActionTypes.GET_ALL_USER_PAGES_ERROR,
});

export const createUserPage =
  (
    page: IUserPage,
    onSuccessCallback: any = null,
    onErrorCallback: any = null
  ) =>
  async (dispatch: any) => {
    dispatch(createUserPageLoading());

    const token = await getFirebaseToken();

    if (!token) {
      if (onErrorCallback) onErrorCallback();
      return;
    }

    PagesService.createPage(page, token)
      .then((res: AxiosResponse) => {
        const newPage: IUserPage = res.data;
        dispatch(createUserPageSuccess(newPage));

        if (onSuccessCallback) onSuccessCallback(newPage);
      })
      .catch((e: AxiosError) => {
        const error: IAppResult = e.response?.data;
        dispatch(createUserPageError(error));

        if (error && error.message) {
          const translatedError = translateError(error.message);
          if (onErrorCallback) onErrorCallback(translatedError);
        } else {
          if (onErrorCallback) onErrorCallback();
        }
      });
  };

const createUserPageLoading = () => ({
  type: UserPagesActionTypes.CREATE_PAGE_LOADING,
});

const createUserPageSuccess = (page: IUserPage) => ({
  payload: page,
  type: UserPagesActionTypes.CREATE_PAGE_SUCCESS,
});

const createUserPageError = (error: IAppResult) => ({
  payload: error,
  type: UserPagesActionTypes.CREATE_PAGE_ERROR,
});

export const updatePage =
  (
    page: IUserPage,
    onSuccessCallback: any = null,
    onErrorCallback: any = null
  ) =>
  async (dispatch: any) => {
    dispatch(updatePageLoading());

    const token = await getFirebaseToken();

    if (!token) {
      if (onErrorCallback) onErrorCallback();
      return;
    }

    PagesService.updatePage(page, token)
      .then((res: AxiosResponse) => {
        dispatch(updatePageSuccess(res.data));

        if (onSuccessCallback) onSuccessCallback();
      })
      .catch((e: AxiosError) => {
        const error: IAppResult = e.response?.data;
        dispatch(updatePageError(error));

        if (error && error.message) {
          const translatedError = translateError(error.message);
          if (onErrorCallback) onErrorCallback(translatedError);
        } else {
          if (onErrorCallback) onErrorCallback();
        }
      });
  };

const updatePageLoading = () => ({
  type: UserPagesActionTypes.UPDATE_PAGE_LOADING,
});

const updatePageSuccess = (page: IUserPage) => ({
  payload: page,
  type: UserPagesActionTypes.UPDATE_PAGE_SUCCESS,
});

const updatePageError = (error: IAppResult) => ({
  payload: error,
  type: UserPagesActionTypes.UPDATE_PAGE_ERROR,
});

export const updateUserPageName = (pageId: string, newName: string) => ({
  payload: { pageId, newName },
  type: UserPagesActionTypes.UPDATE_USER_PAGE_NAME_SUCCESS,
});

export const updateUserPageUrl = (pageId: string, newUrl: string) => ({
  payload: { pageId, newUrl },
  type: UserPagesActionTypes.UPDATE_USER_PAGE_URL_SUCCESS,
});

export const togglePageIsPublic = (pageId: string) => ({
  payload: { pageId },
  type: UserPagesActionTypes.TOGGLE_PAGE_IS_PUBLIC,
});

export const toggleComponentVisibility = (
  pageId: string,
  componentId: string
) => ({
  payload: { pageId, componentId },
  type: UserPagesActionTypes.TOGGLE_COMPONENT_VISIBILITY,
});

export const setComponentLabel = (
  pageId: string,
  componentId: string,
  newLabel: string
) => ({
  payload: { pageId, componentId, newLabel },
  type: UserPagesActionTypes.UPDATE_COMPONENT_LABEL,
});

export const setComponentUrl = (
  pageId: string,
  componentId: string,
  newUrl: string
) => ({
  payload: { pageId, componentId, newUrl },
  type: UserPagesActionTypes.UPDATE_COMPONENT_URL,
});

export const increaseComponentIndexInPage = (
  currentIndex: number,
  pageId: string
) => ({
  payload: { currentIndex, pageId },
  type: UserPagesActionTypes.INCREASE_MIDDLE_COMPONENT_INDEX_IN_PAGE,
});

export const decreaseComponentIndexInPage = (
  currentIndex: number,
  pageId: string
) => ({
  payload: { currentIndex, pageId },
  type: UserPagesActionTypes.DECREASE_MIDDLE_COMPONENT_INDEX_IN_PAGE,
});

export const addTopComponentInPage = (
  component: IUserComponent,
  pageId: string
) => ({
  payload: { component, pageId },
  type: UserPagesActionTypes.ADD_TOP_COMPONENT_IN_PAGE,
});

export const addMiddleComponentInPage = (
  component: IUserComponent,
  pageId: string
) => ({
  payload: { component, pageId },
  type: UserPagesActionTypes.ADD_MIDDLE_COMPONENT_IN_PAGE,
});

export const deleteMiddleComponentFromPage = (
  componentId: string,
  pageId: string
) => ({
  payload: { componentId, pageId },
  type: UserPagesActionTypes.DELETE_MIDDLE_COMPONENT_FROM_PAGE,
});

export const deleteTopComponentFromPage = (
  componentId: string,
  pageId: string
) => ({
  payload: { componentId, pageId },
  type: UserPagesActionTypes.DELETE_TOP_COMPONENT_FROM_PAGE,
});

export const setPageBackgroundColor = (pageId: string, newColor: string) => ({
  payload: { pageId, newColor },
  type: UserPagesActionTypes.UPDATE_PAGE_BACKGROUND_COLOR,
});

export const setPageFontColor = (pageId: string, newColor: string) => ({
  payload: { pageId, newColor },
  type: UserPagesActionTypes.UPDATE_PAGE_FONT_COLOR,
});

export const setComponentBackgroundColor = (
  pageId: string,
  componentId: string,
  newColor: string
) => ({
  payload: { pageId, componentId, newColor },
  type: UserPagesActionTypes.UPDATE_COMPONENT_BACKGROUND_COLOR,
});

export const setComponentFontColor = (
  pageId: string,
  componentId: string,
  newColor: string
) => ({
  payload: { pageId, componentId, newColor },
  type: UserPagesActionTypes.UPDATE_COMPONENT_FONT_COLOR,
});

export const setComponentAnimation = (
  pageId: string,
  componentId: string,
  animation: IComponentAnimation
) => ({
  payload: { pageId, componentId, animation },
  type: UserPagesActionTypes.UPDATE_COMPONENT_ANIMATION,
});

export const setComponentVisibleDate = (
  pageId: string,
  componentId: string,
  dateTime: string
) => ({
  payload: { pageId, componentId, dateTime },
  type: UserPagesActionTypes.UPDATE_COMPONENT_VISIBLE_DATE,
});

export const deletePage =
  (
    pageId: string,
    onSuccessCallback: any = null,
    onErrorCallback: any = null
  ) =>
  async (dispatch: any) => {
    dispatch(deletePageLoading());

    const token = await getFirebaseToken();

    if (!token) {
      if (onErrorCallback) onErrorCallback();
      return;
    }

    PagesService.deletePage(pageId, token)
      .then(() => {
        dispatch(deletePageSuccess(pageId));

        if (onSuccessCallback) onSuccessCallback();
      })
      .catch((e: AxiosError) => {
        const error: IAppResult = e.response?.data;
        dispatch(deletePageError(error));

        if (error && error.message) {
          const translatedError = translateError(error.message);
          if (onErrorCallback) onErrorCallback(translatedError);
        } else {
          if (onErrorCallback) onErrorCallback();
        }
      });
  };

export const deletePageLoading = () => ({
  type: UserPagesActionTypes.DELETE_PAGE_LOADING,
});

export const deletePageSuccess = (pageId: string) => ({
  payload: pageId,
  type: UserPagesActionTypes.DELETE_PAGE_SUCCESS,
});

export const deletePageError = (error: IAppResult) => ({
  payload: error,
  type: UserPagesActionTypes.DELETE_PAGE_ERROR,
});

export const clearUserPagesState = () => ({
  type: UserPagesActionTypes.CLEAR_STATE,
});

export const setPageToBeSaved = (page: IUserPage) => ({
  payload: page,
  type: UserPagesActionTypes.SET_PAGE_TO_BE_SAVED,
});
