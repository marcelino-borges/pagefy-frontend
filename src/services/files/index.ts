import { AxiosResponse } from "axios";
import { registrationApi } from "../../config/axios";
import { IImageDetails } from "../../store/files/types";

export const uploadImage = async (
  userId: string,
  image: File,
  userFolderName: string
): Promise<AxiosResponse<any>> => {
  const form = new FormData();
  form.append("userId", userId);
  form.append("image", image);
  form.append("userFolderName", userFolderName);

  return registrationApi.post(`/files`, form);
};

export const deleteImage = async (
  url: string,
  userId: string
): Promise<AxiosResponse<any>> =>
  await registrationApi.delete(`/files`, {
    data: {
      url,
      userId,
    },
  });

export const getAllUserImages = async (
  userId: string
): Promise<AxiosResponse<IImageDetails | null>> =>
  await registrationApi.get(`/files/user/${userId}`);

export const getAllButtonsTemplates = async (): Promise<
  AxiosResponse<IImageDetails | null>
> => await registrationApi.get("/files/templates/buttons");

export const getAllBackgroundsTemplates = async (): Promise<
  AxiosResponse<IImageDetails | null>
> => await registrationApi.get("/files/templates/backgrounds");

export const getAllPagesImagesTemplates = async (): Promise<
  AxiosResponse<IImageDetails | null>
> => await registrationApi.get("/files/templates/pages-imgs");

export const getAllUserProfileTemplates = async (): Promise<
  AxiosResponse<IImageDetails | null>
> => await registrationApi.get("/files/templates/user-profile");
