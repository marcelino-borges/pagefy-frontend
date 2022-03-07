import {
  IComponentAnimation,
  IUserComponent,
  IUserPage,
  UserPagesActionTypes,
} from "./types";

export const createUserPage = (page: IUserPage) => (dispatch: any) => {
  dispatch(createUserPageSuccess(page));
};

const createUserPageSuccess = (page: IUserPage) => ({
  payload: page,
  type: UserPagesActionTypes.CREATE_PAGE,
});

export const updateUserPageName =
  (pageId: string, newName: string) => (dispatch: any) => {
    dispatch(updateUserPageNameInStore(pageId, newName));
  };

const updateUserPageNameInStore = (pageId: string, newName: string) => ({
  payload: { pageId, newName },
  type: UserPagesActionTypes.UPDATE_USER_PAGE_NAME,
});

export const updateUserPageUrl =
  (pageId: string, newUrl: string) => (dispatch: any) => {
    //TODO: Check if page url doesn't exist first
    dispatch(updateUserPageUrlInStore(pageId, newUrl));
  };

const updateUserPageUrlInStore = (pageId: string, newUrl: string) => ({
  payload: { pageId, newUrl },
  type: UserPagesActionTypes.UPDATE_USER_PAGE_URL,
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

export const deletePage = (pageId: string) => ({
  payload: pageId,
  type: UserPagesActionTypes.DELETE_PAGE,
});
