import * as SupportService from "./../../services/support";
import { AxiosError, AxiosResponse } from "axios";
import { IAppResult } from "../shared/types";
import { IUserContact, SentUserContactResult, SupportTypes } from "./types";
import strings from "../../localization";

export const sendSupportEmail =
  (
    userContact: IUserContact,
    recaptchaToken: string,
    onSuccessCallback: any = null,
    onErrorCallback: any = null
  ) =>
  async (dispatch: any) => {
    dispatch(sendSupportEmailLoading());

    SupportService.sendSupportEmail(userContact, recaptchaToken)
      .then((res: AxiosResponse) => {
        const result: SentUserContactResult = res.data;
        dispatch(sendSupportEmailSuccess(result));

        if (onSuccessCallback) onSuccessCallback(result);
      })
      .catch((e: AxiosError) => {
        const error: IAppResult = e.response?.data;
        dispatch(sendSupportEmailError(error));

        if (error && error.errorDetails) {
          if (onErrorCallback)
            onErrorCallback(strings.errorSendingSupportContact);
        }
      });
  };

const sendSupportEmailLoading = () => ({
  type: SupportTypes.SEND_EMAIL_SUPPORT_LOADING,
});

const sendSupportEmailSuccess = (result: SentUserContactResult) => ({
  payload: result,
  type: SupportTypes.SEND_EMAIL_SUPPORT_SUCCESS,
});

const sendSupportEmailError = (error: IAppResult) => ({
  payload: error,
  type: SupportTypes.SEND_EMAIL_SUPPORT_ERROR,
});

export const clearSupportState = () => ({
  type: SupportTypes.CLEAR_SUPPORT_STATE,
});
