import { PageRenderedTypes } from "./types";
import { ComponentType, IUserPage } from "./../user/types";

const mockPage: IUserPage = {
  _id: "1",
  name: "Marcos Fotografia Estilizada",
  url: "pg1/pg1/pg1/pg1",
  views: 151,
  pageImageUrl:
    "https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Zm9jdXN8ZW58MHx8MHx8&w=1000&q=80",

  topComponents: [],
  middleComponents: [
    {
      text: "Devbox",
      url: "http://www.devbox.eng.br",
      style: undefined,
      _id: "1",
      visible: true,
      clicks: 0,
      layout: {
        rows: 1,
        columns: 2,
      },
      type: ComponentType.TextImage,
    },
    {
      text: "Portfolio",
      url: "http://www.devbox.eng.br",
      style: undefined,
      _id: "2",
      visible: true,
      clicks: 0,
      layout: {
        rows: 1,
        columns: 2,
      },
      type: ComponentType.Image,
    },
    {
      text: "Curriculum Vitae",
      url: "http://www.devbox.eng.br",
      style: undefined,
      _id: "3",
      visible: true,
      clicks: 0,
      layout: {
        rows: 1,
        columns: 2,
      },
      type: ComponentType.Text,
    },
    {
      text: "HTBAD",
      url: "http://www.devbox.eng.br",
      style: undefined,
      _id: "4",
      visible: true,
      clicks: 0,
      layout: {
        rows: 1,
        columns: 2,
      },
      type: ComponentType.TextImage,
    },
    {
      text: "Devbox",
      url: "http://www.devbox.eng.br",
      style: undefined,
      _id: "5",
      visible: true,
      clicks: 0,
      layout: {
        rows: 1,
        columns: 2,
      },
      type: ComponentType.TextImage,
    },
    {
      text: "Portfolio",
      url: "http://www.devbox.eng.br",
      style: undefined,
      _id: "6",
      visible: true,
      clicks: 0,
      layout: {
        rows: 1,
        columns: 2,
      },
      type: ComponentType.Text,
    },
    {
      text: "HTBAD",
      url: "http://www.devbox.eng.br",
      style: undefined,
      _id: "8",
      visible: true,
      clicks: 0,
      layout: {
        rows: 1,
        columns: 2,
      },
      type: ComponentType.TextImage,
    },
    {
      text: "Devbox",
      url: "http://www.devbox.eng.br",
      style: undefined,
      _id: "9",
      visible: true,
      clicks: 0,
      layout: {
        rows: 1,
        columns: 2,
      },
      type: ComponentType.TextImage,
    },
    {
      text: "Portfolio",
      url: "http://www.devbox.eng.br",
      style: undefined,
      _id: "10",
      visible: true,
      clicks: 0,
      layout: {
        rows: 1,
        columns: 2,
      },
      type: ComponentType.TextImage,
    },
    {
      text: "Curriculum Vitae",
      url: "http://www.devbox.eng.br",
      style: undefined,
      _id: "11",
      visible: true,
      clicks: 0,
      layout: {
        rows: 1,
        columns: 2,
      },
      type: ComponentType.TextImage,
    },
  ],
};

export const getPageByUrl = (url: string) => (dispatch: any) => {
  //TODO: Service call to API - Get page by url
  dispatch(setPageBeingManagedSuccess(mockPage));
};

const setPageBeingManagedSuccess = (page: IUserPage) => ({
  payload: page,
  type: PageRenderedTypes.SET_PAGE_BEING_RENDERED,
});

export const clearPageBeingRendered = () => (dispatch: any) => {
  dispatch(clearPageBeingManagedSuccess());
};

const clearPageBeingManagedSuccess = () => ({
  type: PageRenderedTypes.CLEAR_PAGE_BEING_RENDERED,
});
