import { AxiosResponse } from "axios";
import { registrationApi } from "../../config/axios";
import { IUser } from "../../store/user/types";

export const getUser = async (email: string): Promise<AxiosResponse<any>> =>
  await registrationApi.get(`/user?email=${email}`);

export const createUser = async (user: IUser): Promise<AxiosResponse<any>> =>
  await registrationApi.post("/user", user);

export const updateUser = async (user: IUser): Promise<AxiosResponse<any>> =>
  await registrationApi.put("/user", user);

export const deleteUser = async (
  userId: string,
  authId: string
): Promise<AxiosResponse<any>> =>
  await registrationApi.delete(`/user?userId=${userId}&authId=${authId}`);
