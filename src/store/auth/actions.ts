import { AxiosError, AxiosResponse } from "axios";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  OAuthProvider,
  UserCredential,
} from "firebase/auth";
import { AuthActionTypes, IUserAuth, IUserCredentials } from "./types";
import * as AuthService from "../../services/firebase-auth";
import * as UserService from "../../services/user";
import { translateError } from "../../utils/api-errors-mapping";
import strings from "../../localization";
import { IAppResult } from "../shared/types";
import { getFirebaseToken } from "../../config/firebase/index";
import { IUser } from "../user/types";
import { clearUserState, getUserSuccess } from "../user/actions";
import { clearPageManagementState } from "../page-management/actions";
import { clearUserPagesState } from "../user-pages/actions";
import { FirebaseError } from "firebase/app";
import { clearStorage } from "../../utils/storage";

export const signIn =
  (
    credentials: IUserCredentials,
    onSuccessCallback:
      | ((
          token: string,
          auth: IUserAuth,
          userData: IUser,
          providerName?: string
        ) => void)
      | null = null,
    onErrorCallback: any = null
  ) =>
  (dispatch: any) => {
    dispatch(signInLoading());
    AuthService.signIn(credentials)
      .then(async (credential: UserCredential) => {
        const token = await getFirebaseToken();

        const [firstName, lastName] = credential.user.displayName
          ? credential.user.displayName.split(" ")
          : ["Name", "Lastname"];

        if (!token || !credential.user.email) {
          if (onErrorCallback) onErrorCallback(credential);
          return;
        }

        const auth: IUserAuth = {
          accessToken: token,
          uid: credential.user.uid,
        };

        const userData: IUser = {
          email: credential.user.email,
          firstName,
          lastName,
          authId: credential.user.uid,
          receiveCommunications: true,
          agreePrivacy: true,
        };

        dispatch(signInSuccess(auth));

        if (onSuccessCallback)
          onSuccessCallback(token, auth, userData, "credential");
      })
      .catch((e: FirebaseError) => {
        const errorCode: string = e.code;
        dispatch(signInError(errorCode));

        if (errorCode) {
          const translatedError = translateError(errorCode);
          if (onErrorCallback) onErrorCallback(translatedError);
        } else if (onErrorCallback)
          onErrorCallback(strings.generalErrors.errorSignUp);
      });
  };

const signInLoading = () => ({
  type: AuthActionTypes.SIGNIN_LOADING,
});

export const signInSuccess = (auth: IUserAuth) => ({
  payload: auth,
  type: AuthActionTypes.SIGNIN_SUCCESS,
});

const signInError = (error: any) => ({
  payload: error,
  type: AuthActionTypes.SIGNIN_ERROR,
});

export const signUp =
  (
    user: any,
    onSuccessCallback:
      | ((userData: IUser, providerName: string) => void)
      | null = null,
    onErrorCallback: ((errorMessage: string) => void) | null = null
  ) =>
  (dispatch: any) => {
    dispatch(signUpLoading());

    AuthService.signUp({
      email: user.email,
      password: user.password,
    })
      .then(async (userCredential: UserCredential) => {
        let userToCreate = {
          ...(user as IUser),
          authId: userCredential.user.uid,
        };
        UserService.createUser(userToCreate)
          .then((res: AxiosResponse) => {
            dispatch(signUpSuccess());
            dispatch(getUserSuccess(res.data));
            if (onSuccessCallback) onSuccessCallback(res.data, "credentials");
          })
          .catch((error: AxiosError) => {
            if (onErrorCallback)
              onErrorCallback(strings.generalErrors.errorSignUp);
            AuthService.deleteUserAuth();
            throw error;
          });
      })
      .catch((e: FirebaseError) => {
        const errorCode: string = e.code;
        dispatch(signUpError(errorCode));

        if (errorCode) {
          const translatedError = translateError(errorCode);
          if (onErrorCallback) onErrorCallback(translatedError);
        } else if (onErrorCallback)
          onErrorCallback(strings.generalErrors.errorSignUp);
      });
  };

const signUpLoading = () => ({
  type: AuthActionTypes.SIGNUP_LOADING,
});

const signUpSuccess = () => ({
  type: AuthActionTypes.SIGNUP_SUCCESS,
});

const signUpError = (error: any) => ({
  payload: error,
  type: AuthActionTypes.SIGNUP_ERROR,
});

export const signOut =
  (onSuccessCallback: any = null, onErrorCallback: any = null) =>
  (dispatch: any) => {
    clearStorage("user");
    clearStorage("auth");
    dispatch(signOutSuccess());
    dispatch(clearAllStates());

    AuthService.signOut()
      .then(() => {
        if (onSuccessCallback) onSuccessCallback();
      })
      .catch((e: AxiosError) => {
        const error: IAppResult = e.response?.data;
        dispatch(signOutError(e.response?.data));

        if (error && error.errorDetails) {
          const translatedError = translateError(error.errorDetails);
          if (onErrorCallback)
            onErrorCallback(translatedError ?? error.message);
        } else if (onErrorCallback)
          onErrorCallback(strings.generalErrors.errorSignOut);
      });
  };

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

export const signInWithProvider =
  (
    provider: GoogleAuthProvider | FacebookAuthProvider | OAuthProvider,
    onSuccessCallback:
      | ((
          token: string,
          auth: IUserAuth,
          userData: IUser,
          providerName?: string
        ) => void)
      | null = null,
    onErrorCallback: ((error?: string) => void) | null = null
  ) =>
  (dispatch: any) => {
    dispatch(signInWithProviderLoading());
    AuthService.signInWithProvider(provider)
      .then(async (result: UserCredential) => {
        let credential;
        let providerName;

        if (provider instanceof GoogleAuthProvider) {
          credential = GoogleAuthProvider.credentialFromResult(result);
          providerName = "Google";
        } else if (provider instanceof FacebookAuthProvider) {
          credential = FacebookAuthProvider.credentialFromResult(result);
          providerName = "Facebook";
        } else if (provider instanceof OAuthProvider) {
          credential = OAuthProvider.credentialFromResult(result);
          providerName = "OAuth";
        }

        const email = result.user.email;
        const [firstName, lastName] = result.user.displayName
          ? result.user.displayName.split(" ")
          : ["Name", "Lastname"];

        const dispatchError = () => {
          dispatch(signInWithProviderError(strings.generalErrors.errorSignIn));
          if (onErrorCallback)
            onErrorCallback(strings.generalErrors.errorSignIn);
        };

        if (!credential) {
          dispatchError();
          return;
        }

        const token = credential.accessToken;

        if (!email || !token) {
          AuthService.deleteUserAuth();
          dispatchError();
          return;
        }

        const user = result.user;

        const auth: IUserAuth = {
          accessToken: token,
          uid: user.uid,
        };

        const userData: IUser = {
          email,
          firstName,
          lastName,
          authId: user.uid,
          receiveCommunications: true,
          agreePrivacy: true,
        };

        dispatch(signInWithProviderSuccess(auth));

        if (onSuccessCallback)
          onSuccessCallback(token, auth, userData, providerName);
      })
      .catch((error: FirebaseError) => {
        const errorCode: string = error.code;
        dispatch(signInWithProviderError(errorCode));

        let errorToShow = strings.generalErrors.errorSignUp;

        if (errorCode) {
          const translatedError = translateError(errorCode);

          if (translatedError) {
            errorToShow = translatedError;
          }
        }

        if (onErrorCallback) onErrorCallback(errorToShow);
      });
  };

const signInWithProviderLoading = () => ({
  type: AuthActionTypes.SIGNIN_GOOGLE_LOADING,
});

const signInWithProviderSuccess = (auth: IUserAuth) => ({
  payload: auth,
  type: AuthActionTypes.SIGNIN_GOOGLE_SUCCESS,
});

const signInWithProviderError = (error: any) => ({
  payload: error,
  type: AuthActionTypes.SIGNIN_GOOGLE_ERROR,
});
