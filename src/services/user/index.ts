import axios, { AxiosResponse } from "axios";
import { IUser } from "../../store/user/types";

const api = axios.create({
  baseURL: `${process.env.REACT_APP_REGISTRATION_ENDPOINT}`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getUser = async (
  email: string,
  token: string
): Promise<AxiosResponse<any>> =>
  await api.get(`/user?email=${email}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });

export const updateUser = async (
  user: IUser,
  token: string
): Promise<AxiosResponse<any>> =>
  await api.put("/user", user, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
