import { AxiosResponse } from "axios";
import { registrationApi } from "../../config/axios";
import { IUserPage } from "../../store/user-pages/types";

export const getPageById = async (id: string): Promise<AxiosResponse<any>> =>
  await registrationApi.get(`/page/id/${id}`);

export const getPageByUrl = async (url: string): Promise<AxiosResponse<any>> =>
  await registrationApi.get(`/page/url/${url}`);

export const getRendererPageByUrl = async (
  url: string
): Promise<AxiosResponse<any>> =>
  await registrationApi.get(`/page/url/renderer/${url}`);

export const getAllUserPages = async (
  userId: string
): Promise<AxiosResponse<any>> =>
  await registrationApi.get(`/page/all/user/${userId}`);

export const createPage = async (
  page: IUserPage
): Promise<AxiosResponse<any>> => await registrationApi.post("/page", page);

export const updatePage = async (
  page: IUserPage
): Promise<AxiosResponse<any>> => await registrationApi.put("/page", page);

export const deletePage = async (pageId: string): Promise<AxiosResponse<any>> =>
  await registrationApi.delete(`/page/id/${pageId}`);

export const incrementComponentClicks = async (
  pageId: string,
  componentId: string
): Promise<AxiosResponse<any>> =>
  await registrationApi.post("/page/component-clicks", { pageId, componentId });
