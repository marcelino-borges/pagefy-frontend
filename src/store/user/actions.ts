import { IUser, UserActionTypes } from "./../user/types";
import * as UserService from "./../../services/user";
import { AxiosError, AxiosResponse } from "axios";
import { IAppResult } from "../shared";
import { translateError } from "../../utils/api-errors-mapping";
import { getAllUserPages } from "./../user-pages/actions";
import { getFirebaseToken } from "../../utils/firebase-config";

export const getUser =
  (
    email: string,
    token: string | null,
    onSuccessCallback: any = null,
    onErrorCallback: any = null
  ) =>
  async (dispatch: any) => {
    dispatch(getUserLoading());
    let validToken;

    if (!token) {
      validToken = await getFirebaseToken();

      if (!validToken) {
        if (onErrorCallback) onErrorCallback();
        return;
      }
    } else {
      validToken = token;
    }

    UserService.getUser(email, validToken)
      .then((res: AxiosResponse) => {
        const user: IUser = res.data;
        dispatch(getUserSuccess(res.data));

        if (onSuccessCallback) onSuccessCallback(user);

        if (user._id) dispatch(getAllUserPages(user._id));
      })
      .catch((e: AxiosError) => {
        const error: IAppResult = e.response?.data;
        dispatch(getUserError(error));

        if (error && error.errorDetails) {
          const translatedError = translateError(error.errorDetails);
          if (onErrorCallback) onErrorCallback(translatedError);
        } else if (onErrorCallback) onErrorCallback();
      });
  };

const getUserLoading = () => ({
  type: UserActionTypes.GET_USER_LOADING,
});

export const getUserSuccess = (user: IUser) => ({
  payload: user,
  type: UserActionTypes.GET_USER_SUCCESS,
});

const getUserError = (e: IAppResult) => ({
  payload: e,
  type: UserActionTypes.GET_USER_ERROR,
});

export const updateUser =
  (
    user: IUser,
    token: string,
    onSuccessCallback: any = null,
    onErrorCallback: any = null
  ) =>
  (dispatch: any) => {
    dispatch(updateUserLoading());
    UserService.updateUser(user, token)
      .then((res: AxiosResponse) => {
        dispatch(updateUserSuccess(res.data));

        if (onSuccessCallback) onSuccessCallback();
      })
      .catch((e: AxiosError) => {
        const error: IAppResult = e.response?.data;
        dispatch(updateUserError(error));

        if (error && error.errorDetails) {
          const translatedError = translateError(error.errorDetails);
          if (onErrorCallback) onErrorCallback(translatedError);
        } else if (onErrorCallback) onErrorCallback();
      });
  };

const updateUserLoading = () => ({
  type: UserActionTypes.UPLOAD_USER_LOADING,
});

const updateUserSuccess = (user: IUser) => ({
  payload: user,
  type: UserActionTypes.UPLOAD_USER_SUCCESS,
});

const updateUserError = (e: IAppResult) => ({
  type: UserActionTypes.UPLOAD_USER_ERROR,
});

export const clearUserState = () => ({
  type: UserActionTypes.CLEAR_STATE,
});
