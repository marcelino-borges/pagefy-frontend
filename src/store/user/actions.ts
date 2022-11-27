import { IUser, UserActionTypes } from "./../user/types";
import * as UserService from "./../../services/user";
import * as AuthService from "./../../services/firebase-auth";
import * as PaymentService from "./../../services/payments";
import * as FilesService from "./../../services/files";
import { AxiosError, AxiosResponse } from "axios";
import { IAppResult, UserStorageFolder } from "../shared/types";
import { translateError } from "../../utils/api-errors-mapping";
import { getAllUserPages } from "./../user-pages/actions";
import { ISubscriptionCreationResult } from "./../purchase/types";

export const getUser =
  (
    email: string,
    onSuccessCallback: ((user: IUser) => void) | null = null,
    onErrorCallback: ((error: string) => void) | null = null
  ) =>
  async (dispatch: any) => {
    dispatch(getUserLoading());

    UserService.getUser(email)
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

export const getUserOrCreate =
  (
    user: IUser,
    onSuccessCallback?: (user: IUser) => void,
    onErrorCallback?: (error: string) => void
  ) =>
  async (dispatch: any) => {
    dispatch(getUserOrCreateLoading());

    const userFound = (await UserService.getUser(user.email))?.data;

    if (userFound) {
      dispatch(getUserSuccess(userFound));

      if (onSuccessCallback) onSuccessCallback(user);
      if (user._id) dispatch(getAllUserPages(user._id));
    } else {
      UserService.createUser(user)
        .then((res: AxiosResponse) => {
          dispatch(getUserSuccess(res.data));
          if (onSuccessCallback) onSuccessCallback(res.data);
        })
        .catch((error: AxiosError) => {
          AuthService.deleteUserAuth();
          if (onErrorCallback) onErrorCallback(error.message);
        });
    }
  };

const getUserOrCreateLoading = () => ({
  type: UserActionTypes.GET_USER_LOADING,
});

export const getSubscriptions =
  (
    userId: string,
    onSuccessCallback: any = null,
    onErrorCallback: any = null
  ) =>
  async (dispatch: any) => {
    dispatch(getSubscriptionsLoading());

    PaymentService.getUserSubscriptions(userId)
      .then((res: AxiosResponse) => {
        const subscriptions: ISubscriptionCreationResult[] = res.data;
        dispatch(getSubscriptionsSuccess(subscriptions));

        if (onSuccessCallback) onSuccessCallback(subscriptions);
      })
      .catch((e: AxiosError) => {
        const error: IAppResult = e.response?.data;
        dispatch(getSubscriptionsError(error));

        if (error && error.errorDetails) {
          const translatedError = translateError(error.errorDetails);
          if (onErrorCallback) onErrorCallback(translatedError);
        }
      });
  };

const getSubscriptionsLoading = () => ({
  type: UserActionTypes.GET_SUBSCRIPTIONS_LOADING,
});

export const getSubscriptionsSuccess = (
  subscriptions: ISubscriptionCreationResult[]
) => ({
  payload: subscriptions,
  type: UserActionTypes.GET_SUBSCRIPTIONS_SUCCESS,
});

const getSubscriptionsError = (error: IAppResult) => ({
  payload: error,
  type: UserActionTypes.GET_SUBSCRIPTIONS_ERROR,
});

export const updateUser =
  (user: IUser, onSuccessCallback: any = null, onErrorCallback: any = null) =>
  async (dispatch: any) => {
    dispatch(updateUserLoading());

    UserService.updateUser(user)
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
    imageUrl: string,
    user: IUser,
    onSuccessCallback: any = null,
    onErrorCallback: any = null
  ) =>
  async (dispatch: any) => {
    if (!user._id) {
      if (onErrorCallback) onErrorCallback();
      return;
    }

    dispatch(
      updateUser(
        {
          ...user,
          profileImageUrl: imageUrl,
        },
        () => {
          if (onSuccessCallback) onSuccessCallback();
        },
        () => {
          if (onErrorCallback) onErrorCallback();
        }
      )
    );
  };

export const uploadAndSetUserProfileImage =
  (
    image: File,
    user: IUser,
    onSuccessCallback: any = null,
    onErrorCallback: any = null
  ) =>
  async (dispatch: any) => {
    if (!user._id) {
      if (onErrorCallback) onErrorCallback();
      return;
    }

    FilesService.uploadImage(user._id, image, UserStorageFolder.UPLOADED_IMAGES)
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
