import { IUser, UserActionTypes } from "./../user/types";

export const getUser = (email: string) => (dispatch: any) => {
  //Make request to backend
};

const getUserSuccess = (data: IUser) => ({
  payload: data,
  type: UserActionTypes.GET_USER_SUCCESS,
});

const getUserError = () => ({
  type: UserActionTypes.GET_USER_ERROR,
});

export const updateUserPageName =
  (pageId: string, newName: string) => (dispatch: any) => {
    dispatch(updateUserPageNameInStore(pageId, newName));
  };

const updateUserPageNameInStore = (pageId: string, newName: string) => ({
  payload: { pageId, newName },
  type: UserActionTypes.UPDATE_USER_PAGE_NAME,
});

export const deleteComponentFromPage = (
  pageId: string,
  componentId: string
) => ({
  payload: { pageId, componentId },
  type: UserActionTypes.DELETE_COMPONENT_FROM_PAGE,
});

export const toggleComponentVisibility = (
  pageId: string,
  componentId: string
) => ({
  payload: { pageId, componentId },
  type: UserActionTypes.TOGGLE_COMPONENT_VISIBILITY,
});

export const setComponentLabel = (
  pageId: string,
  componentId: string,
  newLabel: string
) => ({
  payload: { pageId, componentId, newLabel },
  type: UserActionTypes.UPDATE_COMPONENT_LABEL,
});

export const setComponentUrl = (
  pageId: string,
  componentId: string,
  newUrl: string
) => ({
  payload: { pageId, componentId, newUrl },
  type: UserActionTypes.UPDATE_COMPONENT_URL,
});
