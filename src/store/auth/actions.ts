import { AuthActionTypes, IAuthTokens, IUserCredentials } from "./types";
import * as AuthService from "../../services/auth";
import { AxiosResponse } from "axios";
import { IUser } from "../user/types";
import { IApplicationState } from "./../index";

export const signIn =
  (
    credentials: IUserCredentials,
    onSuccessCallback: any | null = null,
    onErrorCallback: any | null = null
  ) =>
  (dispatch: any) => {
    dispatch(signInLoading());
    AuthService.signIn(credentials)
      .then((res: AxiosResponse) => {
        dispatch(signInSuccess(res.data));

        if (onSuccessCallback) onSuccessCallback();
      })
      .catch((e: any) => {
        dispatch(signInError(e));

        if (onErrorCallback) onErrorCallback();
      });
  };

const signInLoading = () => ({
  type: AuthActionTypes.SIGNIN_REQUEST,
});

const signInSuccess = (tokens: IAuthTokens) => ({
  payload: tokens,
  type: AuthActionTypes.SIGNIN_SUCCESS,
});

const signInError = (error: any) => ({
  payload: error,
  type: AuthActionTypes.SIGNIN_ERROR,
});

export const signUp =
  (
    user: IUser,
    onSuccessCallback: any | null = null,
    onErrorCallback: any | null = null
  ) =>
  (dispatch: any) => {
    dispatch(signUpLoading());
    AuthService.signUp(user)
      .then(() => {
        dispatch(signUpSuccess());

        if (onSuccessCallback) onSuccessCallback();
      })
      .catch((e: any) => {
        dispatch(signUpError(e));

        if (onErrorCallback) onErrorCallback();
      });
  };

const signUpLoading = () => ({
  type: AuthActionTypes.SIGNUP_REQUEST,
});

const signUpSuccess = () => ({
  type: AuthActionTypes.SIGNUP_SUCCESS,
});

const signUpError = (error: any) => ({
  payload: error,
  type: AuthActionTypes.SIGNUP_ERROR,
});

export const signOut =
  (onSuccessCallback: any | null = null, onErrorCallback: any | null = null) =>
  (dispatch: any, getState: () => IApplicationState) => {
    dispatch(signOutLoading());
    const state = getState();
    if (state.auth && state.auth.tokens) {
      AuthService.signOut(state.auth.tokens.refreshToken)
        .then((res: AxiosResponse) => {
          dispatch(signOutSuccess());

          if (onSuccessCallback) onSuccessCallback();
        })
        .catch((e: any) => {
          dispatch(signOutError(e));

          if (onErrorCallback) onErrorCallback();
        });
    }
  };

const signOutLoading = () => ({
  type: AuthActionTypes.SIGNOUT_REQUEST,
});

const signOutSuccess = () => ({
  type: AuthActionTypes.SIGNOUT_SUCCESS,
});

const signOutError = (error: any) => ({
  payload: error,
  type: AuthActionTypes.SIGNOUT_ERROR,
});
