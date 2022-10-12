import { createSubscription } from "../../services/payments";
import { getFirebaseToken } from "../../utils/firebase-config";
import { PlansTypes } from "../user/types";
import { AxiosError, AxiosResponse } from "axios";
import {
  ICreateSubscriptionProps,
  ISubscriptionCreationResult,
  PurchaseTypes,
} from "./types";
import { TOKEN_AUTH_ERROR } from "./../../constants/index";

export const setPlanTypeToSubscribe = (plan: PlansTypes) => ({
  payload: plan,
  type: PurchaseTypes.SET_PLAN_TYPE_TO_SUBSCRIBE,
});

export const startSubscription =
  (
    { currency, recurrency, planType }: ICreateSubscriptionProps,
    successCallback?: () => void,
    errorCallback?: () => void
  ) =>
  async (dispatch: any) => {
    dispatch(startSubscriptionLoading());

    const token = await getFirebaseToken();

    if (!token) {
      if (errorCallback) errorCallback();

      dispatch(createSubscriptionError(TOKEN_AUTH_ERROR));
      return;
    }

    createSubscription(currency, recurrency, planType, token)
      .then((response: AxiosResponse) => {
        if (successCallback) successCallback();

        const subscriptionCreated: ISubscriptionCreationResult = response.data;

        dispatch(startSubscriptionSuccess(subscriptionCreated));
      })
      .catch((error: AxiosError) => {
        if (errorCallback) errorCallback();

        dispatch(createSubscriptionError(error.message));
      });
  };

export const startSubscriptionLoading = () => ({
  type: PurchaseTypes.CREATE_SUBSCRIPTION_LOADING,
});

export const startSubscriptionSuccess = (
  subscriptionCreated: ISubscriptionCreationResult
) => ({
  payload: subscriptionCreated,
  type: PurchaseTypes.CREATE_SUBSCRIPTION_SUCCESS,
});

export const createSubscriptionError = (error: any) => ({
  payload: error,
  type: PurchaseTypes.CREATE_SUBSCRIPTION_ERROR,
});

export const clearSubscription = () => ({
  type: PurchaseTypes.CLEAR_SUBSCRIPTION_CREATED,
});

export const clearPurchaseState = () => ({
  type: PurchaseTypes.CLEAR_STATE,
});
