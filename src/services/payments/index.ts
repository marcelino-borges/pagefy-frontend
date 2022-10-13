import axios, { AxiosResponse } from "axios";
import { PlansTypes } from "../../store/user/types";

const api = axios.create({
  baseURL: `${process.env.REACT_APP_PAYMENTS_ENDPOINT}`,
});

export const createSubscription = async (
  currency: string,
  recurrency: string,
  planType: PlansTypes,
  token: string
): Promise<AxiosResponse<any>> => {
  return api.post(
    `/subscription`,
    {
      currency,
      recurrency,
      planType,
    },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
};

export const cancelSubscription = async (
  subscriptionId: string,
  token: string
): Promise<AxiosResponse<any>> => {
  return api.put(`/subscription/cancel/${subscriptionId}`, null, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};
