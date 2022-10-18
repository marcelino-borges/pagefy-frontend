import {
  cancelSubscription,
  createSubscription,
} from "../../services/payments";
import { getFirebaseToken } from "../../utils/firebase-config";
import { PlansTypes } from "../user/types";
import { AxiosError, AxiosResponse } from "axios";
import {
  ICreateSubscriptionProps,
  ISubscriptionCreationResult,
  PurchaseTypes,
} from "./types";
import { TOKEN_AUTH_ERROR } from "./../../constants/index";

export const setPlanTypeToSubscribe = (
  plan: PlansTypes,
  price: string | undefined,
  currency: string | undefined
) => ({
  payload: { plan, price, currency },
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
  type: PurchaseTypes.CLEAR_SUBSCRIPTION,
});

export const cancelSubscriptionOnDatabase =
  (
    subscriptionId: string,
    successCallback?: (data?: any) => void,
    errorCallback?: (error?: any) => void
  ) =>
  async (dispatch: any) => {
    dispatch(startSubscriptionLoading());

    const token = await getFirebaseToken();

    if (!token) {
      if (errorCallback) errorCallback(TOKEN_AUTH_ERROR);

      dispatch(cancelSubscriptionError(TOKEN_AUTH_ERROR));
      return;
    }

    cancelSubscription(subscriptionId, token)
      .then((response: AxiosResponse) => {
        if (successCallback) successCallback(response.data);

        const subscriptionCanceled: ISubscriptionCreationResult = response.data;

        dispatch(cancelSubscriptionSuccess(subscriptionCanceled));
      })
      .catch((error: AxiosError) => {
        if (errorCallback) errorCallback(error);

        dispatch(cancelSubscriptionError(error.message));
      });
  };

export const cancelSubscriptionLoading = () => () => ({
  type: PurchaseTypes.CANCEL_SUBSCRIPTION_LOADING,
});

export const cancelSubscriptionSuccess = (
  subscriptionCanceled: ISubscriptionCreationResult
) => ({
  payload: subscriptionCanceled,
  type: PurchaseTypes.CANCEL_SUBSCRIPTION_SUCCESS,
});

export const cancelSubscriptionError = (error: any) => ({
  payload: error,
  type: PurchaseTypes.CANCEL_SUBSCRIPTION_ERROR,
});

export const clearPurchaseState = () => ({
  type: PurchaseTypes.CLEAR_STATE,
});

export const setCurrency = (currency: string) => ({
  payload: currency,
  type: PurchaseTypes.SET_CURRENCY,
});

export const clearCurrency = () => ({
  type: PurchaseTypes.CLEAR_CURRENCY,
});

export const setPrice = (price: string) => ({
  payload: price,
  type: PurchaseTypes.SET_PRICE,
});

export const clearPrice = () => ({
  type: PurchaseTypes.CLEAR_PRICE,
});
