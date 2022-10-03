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
      Authorization: "Bearer " + token,
    },
  });

export const createUser = async (
  user: IUser,
  token: string
): Promise<AxiosResponse<any>> =>
  await api.post("/user", user, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });

export const updateUser = async (
  user: IUser,
  token: string
): Promise<AxiosResponse<any>> =>
  await api.put("/user", user, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });

export const deleteUser = async (
  userId: string,
  authId: string,
  token: string
): Promise<AxiosResponse<any>> =>
  await api.delete(`/user?userId=${userId}&authId=${authId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
