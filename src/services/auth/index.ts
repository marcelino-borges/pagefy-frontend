import axios, { AxiosResponse } from "axios";
import { IUserCredentials } from "../../store/auth/types";
import { IUser } from "../../store/user/types";

const api = axios.create({
  baseURL: `${process.env.REACT_APP_AUTH_ENDPOINT}`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const signIn = async (
  credentials: IUserCredentials
): Promise<AxiosResponse<any>> => await api.post("/auth/signin", credentials);

export const signUp = async (data: IUser) =>
  await api.post("/auth/signup", data);

export const signOut = async (refreshToken: string) =>
  await api.post("/auth/signout", { refreshToken });
