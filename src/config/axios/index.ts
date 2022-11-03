import axios from "axios";
import strings from "../../localization";
import { getFirebaseToken } from "../firebase";
import { showErrorToast } from "./../../utils/toast/index";

const getConfig = async (config: any) => {
  const token = await getFirebaseToken();
  config.headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  return config;
};

const rejectRequest = (error: any) => {
  return Promise.reject(error);
};

const responseInterceptor = (error: any) => {
  if (
    error.response.status === 401 ||
    error.response.data.message === "401 Unauthorized"
  ) {
    showErrorToast(strings.authErrors.invalidToken);
  }
};

export const registrationApi = axios.create({
  baseURL: `${process.env.REACT_APP_REGISTRATION_ENDPOINT}`,
});

registrationApi.interceptors.request.use(getConfig, rejectRequest);
registrationApi.interceptors.response.use(undefined, responseInterceptor);

export const paymentsApi = axios.create({
  baseURL: `${process.env.REACT_APP_PAYMENTS_ENDPOINT}`,
});

paymentsApi.interceptors.request.use(getConfig, rejectRequest);
paymentsApi.interceptors.response.use(undefined, responseInterceptor);
