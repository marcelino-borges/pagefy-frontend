import { AxiosResponse } from "axios";
import { paymentsApi } from "../../config/axios";
import { CheckoutSession } from "../../store/checkout";
import { SubscriptionPlan } from "../../store/plans/types";
import {
  SubscriptionDetails,
  UserSubscription,
} from "../../store/user-subscriptions";

export const getAllPlans = async (): Promise<AxiosResponse<any>> => {
  return paymentsApi.get("/plans");
};

export const getPlanById = async (
  planId: string
): Promise<AxiosResponse<SubscriptionPlan>> => {
  return paymentsApi.get(`/plans/${planId}`);
};

export const createCheckoutSession = async (
  priceId: string,
  email: string,
  currency: string,
  locale: string,
  coupon: string
): Promise<AxiosResponse<CheckoutSession>> => {
  return paymentsApi.post(`/checkout`, {
    priceId,
    email,
    currency,
    locale,
    coupon,
  });
};

export const getCheckoutSessionById = async (
  sessionId: string
): Promise<AxiosResponse<CheckoutSession>> => {
  return paymentsApi.get(`/checkout/session/${sessionId}`);
};

export const cancelSubscription = async (
  subscriptionId: string
): Promise<AxiosResponse<any>> => {
  return paymentsApi.patch("/subscription/cancel", {
    subscriptionId,
  });
};

export const getUserSubscriptions = async (
  userId: string
): Promise<AxiosResponse<UserSubscription[]>> => {
  return paymentsApi.get(`/subscription/user/${userId}`);
};

export const getUserActiveSubscription = (
  userId: string
): Promise<AxiosResponse<SubscriptionDetails>> => {
  return paymentsApi.get(`/subscription/active/user/${userId}`);
};
