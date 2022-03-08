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

export const getAllUserPages = async (
  userId: string
): Promise<AxiosResponse<any>> => await api.get(`/page/all/user/${userId}`);

export const createPage = async (
  page: IUserPage
): Promise<AxiosResponse<any>> => await api.post("/page", page);

export const updatePage = async (
  page: IUserPage
): Promise<AxiosResponse<any>> => await api.put("/page", page);
