import { AxiosResponse } from "axios";
import { registrationApi } from "../../config/axios";
import { IUser, UserOnboardings } from "../../store/user/types";

export const getUser = async (email: string): Promise<AxiosResponse<IUser>> =>
  await registrationApi.get(`/user?email=${email}`);

export const createUser = async (user: IUser): Promise<AxiosResponse<IUser>> =>
  await registrationApi.post("/user", user);

export const updateUser = async (user: IUser): Promise<AxiosResponse<IUser>> =>
  await registrationApi.put("/user", user);

export const deleteUser = async (
  userId: string,
  authId: string
): Promise<AxiosResponse<any>> =>
  await registrationApi.delete(`/user?userId=${userId}&authId=${authId}`);

export const canUserCreatePage = async (
  userId: string
): Promise<AxiosResponse<any>> =>
  await registrationApi.get(`/user/${userId}/can-create-page`);

export const updateOnboardingEvents = async (
  onboardings: UserOnboardings
): Promise<AxiosResponse<any>> =>
  await registrationApi.patch("/user/onboardings", onboardings);
