import { IUserPage } from "../user-pages/types";

export enum PageRenderedTypes {
  GET_PAGE_BY_URL_LOADING = "@page-rendered/GET_PAGE_BY_URL_LOADING",
  SET_PAGE_BEING_RENDERED = "@page-rendered/SET_PAGE_BEING_RENDERED",
  GET_PAGE_BY_URL_ERROR = "@page-rendered/GET_PAGE_BY_URL_ERROR",
  CLEAR_PAGE_BEING_RENDERED = "@page-rendered/CLEAR_PAGE_BEING_RENDERED",
  CLEAR_STATE = "@page-rendered/CLEAR_STATE",
}

export interface IPageRenderedState {
  loading: boolean;
  error?: string;
  page?: IUserPage;
}
