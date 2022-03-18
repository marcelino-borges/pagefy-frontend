import axios, { AxiosResponse } from "axios";
import { IUserPage } from "../../store/user-pages/types";

const api = axios.create({
  baseURL: `${process.env.REACT_APP_REGISTRATION_ENDPOINT}`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getPageById = async (id: string): Promise<AxiosResponse<any>> =>
  await api.get(`/page/id/${id}`);

export const getPageByUrl = async (url: string): Promise<AxiosResponse<any>> =>
  await api.get(`/page/url/${url}`);

export const getRendererPageByUrl = async (
  url: string
): Promise<AxiosResponse<any>> => await api.get(`/page/url/renderer/${url}`);

export const getAllUserPages = async (
  userId: string,
  token: string
): Promise<AxiosResponse<any>> =>
  await api.get(`/page/all/user/${userId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });

export const createPage = async (
  page: IUserPage,
  token: string
): Promise<AxiosResponse<any>> =>
  await api.post("/page", page, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });

export const updatePage = async (
  page: IUserPage,
  token: string
): Promise<AxiosResponse<any>> =>
  await api.put("/page", page, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });

export const deletePage = async (
  pageId: string,
  token: string
): Promise<AxiosResponse<any>> =>
  await api.delete(`/page/id/${pageId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });

export const incrementComponentClicks = async (
  pageId: string,
  componentId: string
): Promise<AxiosResponse<any>> =>
  await api.post(
    "/page/component-clicks",
    { pageId, componentId },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
