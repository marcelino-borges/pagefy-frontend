import axios, { AxiosResponse } from "axios";

const api = axios.create({
  baseURL: `${process.env.REACT_APP_REGISTRATION_ENDPOINT}`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const verifyRecaptcha = async (
  token: string
): Promise<AxiosResponse<any>> =>
  await api.post(`/verify-recaptcha`, {
    token,
  });
