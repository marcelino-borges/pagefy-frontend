import { AuthActionTypes, IAuthTokens, IUserCredentials } from "./types";
import * as AuthService from "../../services/auth";
import { AxiosError, AxiosResponse } from "axios";
import { IApplicationState } from "./../index";
import { translateError } from "../../utils/api-errors-mapping";
import strings from "../../localization";
import { IAppResult } from "../shared";

export const signIn =
  (
    credentials: IUserCredentials,
    onSuccessCallback: any = null,
    onErrorCallback: any = null
  ) =>
  (dispatch: any) => {
    dispatch(signInLoading());
    AuthService.signIn(credentials)
      .then((res: AxiosResponse) => {
        dispatch(signInSuccess(res.data));

        if (onSuccessCallback)
          onSuccessCallback((res.data as IAuthTokens).accessToken);
      })
      .catch((e: AxiosError) => {
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

const signInSuccess = (tokens: IAuthTokens) => ({
  payload: tokens,
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
    AuthService.signUp(user)
      .then(() => {
        dispatch(signUpSuccess());

        if (onSuccessCallback) onSuccessCallback();
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
  (dispatch: any, getState: () => IApplicationState) => {
    dispatch(signOutLoading());
    const state = getState();
    if (state.auth && state.auth.tokens && state.auth.tokens.refreshToken) {
      AuthService.signOut(state.auth.tokens.refreshToken)
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
    } else {
      if (onSuccessCallback) onSuccessCallback();
    }
  };

const signOutLoading = () => ({
  type: AuthActionTypes.SIGNOUT_LOADING,
});

const signOutSuccess = () => ({
  type: AuthActionTypes.SIGNOUT_SUCCESS,
});

const signOutError = (error: IAppResult) => ({
  payload: error,
  type: AuthActionTypes.SIGNOUT_ERROR,
});
