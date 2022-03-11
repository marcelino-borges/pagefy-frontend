import { AuthActionTypes, IUserAuth, IUserCredentials } from "./types";
import * as AuthService from "../../services/firebase-auth";
import * as UserService from "../../services/user";
import { AxiosError, AxiosResponse } from "axios";
import { translateError } from "../../utils/api-errors-mapping";
import strings from "../../localization";
import { IAppResult } from "../shared";
import { UserCredential } from "firebase/auth";
import { getFirebaseToken } from "./../../utils/firebase-config/index";
import { IUser } from "../user/types";
import { clearUserState, getUserSuccess } from "../user/actions";
import { clearPageManagementState } from "../page-management/actions";
import { clearUserPagesState } from "../user-pages/actions";

export const signIn =
  (
    credentials: IUserCredentials,
    onSuccessCallback: any = null,
    onErrorCallback: any = null
  ) =>
  (dispatch: any) => {
    dispatch(signInLoading());
    AuthService.signIn(credentials)
      .then(async (user: UserCredential) => {
        const token = await getFirebaseToken();

        if (!token) {
          if (onErrorCallback) onErrorCallback();
          return;
        }

        dispatch(
          signInSuccess({
            accessToken: token,
            uid: user.user.uid,
          })
        );

        if (onSuccessCallback) onSuccessCallback(token);
      })
      .catch((e: AxiosError) => {
        console.log("e: " + e);
        const error: IAppResult = e.response?.data;
        dispatch(signInError(error));

        if (error && error.errorDetails) {
          const translatedError = translateError(error.errorDetails);
          if (onErrorCallback) onErrorCallback(translatedError);
        } else if (onErrorCallback) onErrorCallback(strings.errorSignIn);
      });
  };

const signInLoading = () => ({
  type: AuthActionTypes.SIGNIN_LOADING,
});

export const signInSuccess = (auth: IUserAuth) => ({
  payload: auth,
  type: AuthActionTypes.SIGNIN_SUCCESS,
});

const signInError = (error: IAppResult) => ({
  payload: error,
  type: AuthActionTypes.SIGNIN_ERROR,
});

export const signUp =
  (user: any, onSuccessCallback: any = null, onErrorCallback: any = null) =>
  (dispatch: any) => {
    dispatch(signUpLoading());

    AuthService.signUp({
      email: user.email,
      password: user.password,
    })
      .then(async (userCredential: UserCredential) => {
        // Success creating user auth

        const token = await getFirebaseToken();

        if (!token) {
          if (onErrorCallback) onErrorCallback();
          return;
        }

        let userToSave = {
          ...(user as IUser),
          authId: userCredential.user.uid,
        };
        UserService.createUser(userToSave, token)
          .then((res: AxiosResponse) => {
            dispatch(signUpSuccess());
            dispatch(getUserSuccess(res.data));
            if (onSuccessCallback) onSuccessCallback();
          })
          .catch((error: AxiosError) => {
            AuthService.deleteUserAuth();
            throw error;
          });
      })
      .catch((e: AxiosError) => {
        const error: IAppResult = e.response?.data;
        dispatch(signUpError(e.response?.data));

        if (error && error.errorDetails) {
          const translatedError = translateError(error.errorDetails);
          if (onErrorCallback) onErrorCallback(translatedError);
        } else if (onErrorCallback) onErrorCallback(strings.errorSignUp);
      });
  };

const signUpLoading = () => ({
  type: AuthActionTypes.SIGNUP_LOADING,
});

const signUpSuccess = () => ({
  type: AuthActionTypes.SIGNUP_SUCCESS,
});

const signUpError = (error: IAppResult) => ({
  payload: error,
  type: AuthActionTypes.SIGNUP_ERROR,
});

export const signOut =
  (onSuccessCallback: any = null, onErrorCallback: any = null) =>
  (dispatch: any) => {
    dispatch(clearAllStates());
    dispatch(signOutLoading());
    AuthService.signOut()
      .then(() => {
        dispatch(signOutSuccess());
        if (onSuccessCallback) onSuccessCallback();
      })
      .catch((e: AxiosError) => {
        const error: IAppResult = e.response?.data;
        dispatch(signOutError(e.response?.data));

        if (error && error.errorDetails) {
          const translatedError = translateError(error.errorDetails);
          if (onErrorCallback) onErrorCallback(translatedError);
        } else if (onErrorCallback) onErrorCallback(strings.errorSignOut);
      });
  };

const signOutLoading = () => ({
  type: AuthActionTypes.SIGNOUT_LOADING,
});

export const signOutSuccess = () => ({
  type: AuthActionTypes.SIGNOUT_SUCCESS,
});

const signOutError = (error: IAppResult) => ({
  payload: error,
  type: AuthActionTypes.SIGNOUT_ERROR,
});

export const clearAllStates = () => (dispatch: any) => {
  dispatch(clearPageManagementState());
  dispatch(clearUserState());
  dispatch(clearUserPagesState());
};
