import axios, { AxiosResponse } from "axios";
import { IImageDetails } from "../../store/files/types";

const api = axios.create({
  baseURL: `${process.env.REACT_APP_REGISTRATION_ENDPOINT}`,
});

export const uploadImage = async (
  userId: string,
  image: File,
  userFolderName: string,
  token: string
): Promise<AxiosResponse<any>> => {
  const form = new FormData();
  form.append("userId", userId);
  form.append("image", image);
  form.append("userFolderName", userFolderName);

  return api.post(`/files`, form, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + token,
    },
  });
};

export const deleteImage = async (
  url: string,
  userId: string,
  token: string
): Promise<AxiosResponse<any>> =>
  await api.delete(`/files`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    data: {
      url,
      userId,
    },
  });

export const getAllUserImages = async (
  userId: string,
  token: string
): Promise<AxiosResponse<IImageDetails | null>> =>
  await api.get(`/files/user/${userId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });

export const getAllButtonsTemplates = async (
  token: string
): Promise<AxiosResponse<IImageDetails | null>> =>
  await api.get("/files/templates/buttons", {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });

export const getAllBackgroundsTemplates = async (
  token: string
): Promise<AxiosResponse<IImageDetails | null>> =>
  await api.get("/files/templates/backgrounds", {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });

export const getAllPagesImagesTemplates = async (
  token: string
): Promise<AxiosResponse<IImageDetails | null>> =>
  await api.get("/files/templates/pages-imgs", {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });

export const getAllUserProfileTemplates = async (
  token: string
): Promise<AxiosResponse<IImageDetails | null>> =>
  await api.get("/files/templates/user-profile", {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
