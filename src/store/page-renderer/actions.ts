import { PageRenderedTypes } from "./types";
import { IUserPage } from "./../user-pages/types";
import * as UserPagesService from "../../services/user-pages";
import { AxiosResponse } from "axios";
import { AxiosError } from "axios";
import strings from "../../localization";
import { translateError } from "../../utils/api-errors-mapping";
import { IAppResult } from "../shared/types";

export const getPageByUrl =
  (url: string, onSuccessCallback: any = null, onErrorCallback: any = null) =>
  (dispatch: any) => {
    dispatch(getPageByUrlLoading());

    UserPagesService.getPageByUrl(url)
      .then((res: AxiosResponse) => {
        dispatch(setPageBeingRendered(res.data));
        if (onSuccessCallback) onSuccessCallback();
      })
      .catch((e: AxiosError) => {
        const error: IAppResult = e.response?.data;
        dispatch(getPageByUrlError(e.response?.data));

        if (error && error.errorDetails) {
          const translatedError = translateError(error.errorDetails);
          if (onErrorCallback) onErrorCallback(translatedError);
          return;
        }
        if (onErrorCallback) onErrorCallback(strings.couldntFindPage);
      });
  };

const getPageByUrlLoading = () => ({
  type: PageRenderedTypes.GET_PAGE_BY_URL_LOADING,
});

const getPageByUrlError = (error: any) => ({
  payload: error,
  type: PageRenderedTypes.GET_PAGE_BY_URL_ERROR,
});

export const setPageBeingRendered = (page: IUserPage) => ({
  payload: page,
  type: PageRenderedTypes.SET_PAGE_BEING_RENDERED,
});

export const getRendererPageByUrl =
  (url: string, onSuccessCallback: any = null, onErrorCallback: any = null) =>
  (dispatch: any) => {
    dispatch(getPageByUrlLoading());

    UserPagesService.getRendererPageByUrl(url)
      .then((res: AxiosResponse) => {
        if (onSuccessCallback) onSuccessCallback(res.data);
      })
      .catch((e: AxiosError) => {
        const error: IAppResult = e.response?.data;
        dispatch(getPageByUrlError(e.response?.data));

        if (error && error.errorDetails) {
          const translatedError = translateError(error.errorDetails);
          if (onErrorCallback) onErrorCallback(translatedError);
          return;
        }
        if (onErrorCallback) onErrorCallback(strings.couldntFindPage);
      });
  };

export const clearPageBeingRendered = () => (dispatch: any) => {
  dispatch(clearPageBeingManagedSuccess());
};

const clearPageBeingManagedSuccess = () => ({
  type: PageRenderedTypes.CLEAR_PAGE_BEING_RENDERED,
});

export const clearPageRendererState = () => ({
  type: PageRenderedTypes.CLEAR_STATE,
});

export const incrementComponentClicks = (
  pageId: string,
  componentId: string,
  onSuccessCallback: any = null,
  onErrorCallback: any = null
) => {
  UserPagesService.incrementComponentClicks(pageId, componentId)
    .then(() => {
      if (onSuccessCallback) onSuccessCallback();
    })
    .catch((e: AxiosError) => {
      const error: IAppResult = e.response?.data;

      if (error && error.errorDetails) {
        const translatedError = translateError(error.errorDetails);
        console.log(
          "Error incrementing click on component with ID " + componentId
        );
        if (onErrorCallback) onErrorCallback(translatedError);
        return;
      }
    });
};
