import axios, { AxiosResponse } from "axios";

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
