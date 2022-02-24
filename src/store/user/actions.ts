import { IUser, IUserComponent, UserActionTypes } from "./../user/types";

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

export const updateUserPageUrl =
  (pageId: string, newUrl: string) => (dispatch: any) => {
    dispatch(updateUserPageUrlInStore(pageId, newUrl));
  };

const updateUserPageUrlInStore = (pageId: string, newUrl: string) => ({
  payload: { pageId, newUrl },
  type: UserActionTypes.UPDATE_USER_PAGE_URL,
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

export const increaseComponentIndexInPage = (
  currentIndex: number,
  pageId: string
) => ({
  payload: { currentIndex, pageId },
  type: UserActionTypes.INCREASE_COMPONENT_INDEX_IN_PAGE,
});

export const decreaseComponentIndexInPage = (
  currentIndex: number,
  pageId: string
) => ({
  payload: { currentIndex, pageId },
  type: UserActionTypes.DECREASE_COMPONENT_INDEX_IN_PAGE,
});

export const addComponentInPage = (
  component: IUserComponent,
  pageId: string
) => ({
  payload: { component, pageId },
  type: UserActionTypes.ADD_COMPONENT_IN_PAGE,
});

export const deleteComponentFromPage = (
  componentId: string,
  pageId: string
) => ({
  payload: { componentId, pageId },
  type: UserActionTypes.DELETE_COMPONENT_FROM_PAGE,
});

export const setComponentBackgroundColor = (
  pageId: string,
  componentId: string,
  newColor: string
) => ({
  payload: { pageId, componentId, newColor },
  type: UserActionTypes.UPDATE_COMPONENT_BACKGROUND_COLOR,
});

export const setComponentFontColor = (
  pageId: string,
  componentId: string,
  newColor: string
) => ({
  payload: { pageId, componentId, newColor },
  type: UserActionTypes.UPDATE_COMPONENT_FONT_COLOR,
});

export const deletePage = (pageId: string) => ({
  payload: pageId,
  type: UserActionTypes.DELETE_PAGE,
});
