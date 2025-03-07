import { AxiosResponse } from "axios";
import { paymentsApi } from "../../config/axios";
import { PlansTypes } from "../../store/user/types";
import { CheckoutSession } from "../../store/checkout";
import { SubscriptionPlan } from "../../store/plans/types";

export const getAllPlans = async (): Promise<AxiosResponse<any>> => {
  return paymentsApi.get("/plans");
};

export const getPlanById = async (
  planId: string
): Promise<AxiosResponse<SubscriptionPlan>> => {
  return paymentsApi.get(`/plans/${planId}`);
};

export const createCheckoutSession = async (
  priceId: string
): Promise<AxiosResponse<CheckoutSession>> => {
  return paymentsApi.post(`/checkout`, {
    priceId,
  });
};

export const getCheckoutSessionById = async (
  sessionId: string
): Promise<AxiosResponse<CheckoutSession>> => {
  return paymentsApi.get(`/checkout/session/${sessionId}`);
};

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
