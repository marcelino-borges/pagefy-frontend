import axios from "axios";
import strings from "../../localization";
import store from "../../store";
import { getFirebaseToken } from "../firebase";
import { showErrorToast } from "./../../utils/toast/index";
import { IApplicationState } from "../../store";
import getStorage from "redux-persist/es/storage/getStorage";

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
    const storedAuth = getStorage("auth");
    const storedUser = getStorage("user");

    const currentStore: IApplicationState =
      store.getState() as IApplicationState;

    if (!currentStore.auth.auth?.accessToken && !storedAuth && !storedUser)
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
