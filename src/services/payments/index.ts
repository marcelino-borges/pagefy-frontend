import { AxiosResponse } from "axios";
import { paymentsApi } from "../../config/axios";
import { PlansTypes } from "../../store/user/types";

export const getPaymentIntent = async (
  paymentIntentId: string
): Promise<AxiosResponse<any>> => {
  return paymentsApi.get(`/subscription/paymentintent/${paymentIntentId}`);
};

export const createSubscription = async (
  currency: string,
  recurrency: string,
  planType: PlansTypes
): Promise<AxiosResponse<any>> => {
  return paymentsApi.post(`/subscription`, {
    currency,
    recurrency,
    planType,
  });
};

export const cancelSubscription = async (
  subscriptionId: string
): Promise<AxiosResponse<any>> => {
  return paymentsApi.put(`/subscription/cancel/${subscriptionId}`, null);
};

export const getUserSubscriptions = async (
  userId: string
): Promise<AxiosResponse<any>> => {
  return paymentsApi.get(`/subscription/user/${userId}`);
};
