import { IUserPage } from "../user/types";

export enum PageRenderedTypes {
  SET_PAGE_BEING_RENDERED = "@page-rendered/SET_PAGE_BEING_RENDERED",
  CLEAR_PAGE_BEING_RENDERED = "@page-rendered/CLEAR_PAGE_BEING_RENDERED",
}

export interface IPageRenderedState {
  error?: string;
  page?: IUserPage;
}
