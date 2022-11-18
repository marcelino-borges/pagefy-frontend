import strings from "../../localization";
import { FaqTypes, IFaq } from "./types";
import * as FaqService from "./../../services/faq";
import { IAppResult } from "../shared/types";
import { AxiosError, AxiosResponse } from "axios";

export const getAllFaqs =
  (
    language: string,
    onSuccessCallback: any = null,
    onErrorCallback: any = null
  ) =>
  async (dispatch: any) => {
    dispatch(getAllFaqsLoading());

    FaqService.getAllFaqs(language)
      .then((res: AxiosResponse) => {
        const faqs: IFaq[] = res.data;
        dispatch(getAllFaqsSuccess(faqs));

        if (onSuccessCallback) onSuccessCallback(faqs);
      })
      .catch((e: AxiosError) => {
        const error: IAppResult = e.response?.data;
        dispatch(getAllFaqsError(error.message));

        if (error && error.errorDetails) {
          if (onErrorCallback)
            onErrorCallback(strings.errorSendingSupportContact);
        }
      });
  };

const getAllFaqsLoading = () => ({
  type: FaqTypes.GET_ALL_FAQS_LOADING,
});

const getAllFaqsSuccess = (faqs: IFaq[]) => ({
  payload: faqs,
  type: FaqTypes.GET_ALL_FAQS_SUCCESS,
});

const getAllFaqsError = (error: string) => ({
  payload: error,
  type: FaqTypes.GET_ALL_FAQS_ERROR,
});
