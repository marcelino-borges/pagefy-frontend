import { IUser, UserActionTypes } from "./../user/types";
import { IUserPage } from "./types";

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
