import { IUser, UserActionTypes } from "./../user/types";
import * as UserService from "./../../services/user";
import * as FilesService from "./../../services/files";
import { AxiosError, AxiosResponse } from "axios";
import { IAppResult, UserStorageFolder } from "../shared/types";
import { translateError } from "../../utils/api-errors-mapping";
import { getAllUserPages } from "./../user-pages/actions";
import { getFirebaseToken } from "../../utils/firebase-config";
import { TOKEN_AUTH_ERROR } from "./../../constants/index";

export const getUser =
  (
    email: string,
    token: string | null,
    onSuccessCallback: any = null,
    onErrorCallback: any = null
  ) =>
  async (dispatch: any) => {
    let validToken;

    if (!token) {
      validToken = await getFirebaseToken();

      if (!validToken) {
        const error: IAppResult = {
          message: TOKEN_AUTH_ERROR,
          errorDetails: TOKEN_AUTH_ERROR,
          statusCode: 0,
        };
        dispatch(getUserError(error));

        if (error && error.errorDetails) {
          const translatedError = translateError(error.errorDetails);
          if (onErrorCallback) onErrorCallback(translatedError);
        }

        return;
      }
    } else {
      validToken = token;
    }

    dispatch(getUserLoading());

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
        }
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
  (user: IUser, onSuccessCallback: any = null, onErrorCallback: any = null) =>
  async (dispatch: any) => {
    dispatch(updateUserLoading());

    const token = await getFirebaseToken();

    if (!token) {
      if (onErrorCallback) onErrorCallback();
      return;
    }

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

export const setUserProfileImage =
  (
    image: File,
    user: IUser,
    onSuccessCallback: any = null,
    onErrorCallback: any = null
  ) =>
  async (dispatch: any) => {
    const token = await getFirebaseToken();

    if (!token || !user._id) {
      if (onErrorCallback) onErrorCallback();
      return;
    }

    FilesService.uploadImage(
      user._id,
      image,
      UserStorageFolder.UPLOADED_IMAGES,
      token
    )
      .then((res: AxiosResponse) => {
        const urlImage: string = res.data;

        if (urlImage && urlImage.length > 0) {
          dispatch(
            updateUser({
              ...user,
              profileImageUrl: urlImage,
            })
          );
        }

        if (onSuccessCallback) onSuccessCallback();
      })
      .catch((e: AxiosError) => {
        const error: IAppResult = e.response?.data;

        if (error && error.errorDetails) {
          const translatedError = translateError(error.errorDetails);
          if (onErrorCallback) onErrorCallback(translatedError);
        } else if (onErrorCallback) onErrorCallback();
      });
  };
