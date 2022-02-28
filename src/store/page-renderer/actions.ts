import { PageRenderedTypes } from "./types";
import { ComponentType, IUserPage } from "./../user/types";

const mockPage: IUserPage = {
  _id: "1",
  name: "Marcos Fotografia Estilizada",
  url: "pg1/pg1/pg1/pg1",
  views: 151,
  pageImageUrl:
    "https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Zm9jdXN8ZW58MHx8MHx8&w=1000&q=80",

  topComponents: [
    {
      _id: "e5077154-ea13-424b-b141-6029740da3dd",
      url: "https://www.slproweb.com",
      style: {
        color: "black",
      },
      visible: true,
      clicks: 0,
      layout: {
        rows: 1,
        columns: 1,
      },
      type: 3,
      iconDetails: {
        userFriendlyName: "Twitter",
        icon: "akar-icons:twitter-fill",
      },
    },
    {
      _id: "85a947c3-127d-4314-861e-d6c8e58c7086",
      url: "https://www.slproweb.com/",
      style: {
        color: "#0d54fc",
      },
      visible: true,
      clicks: 0,
      layout: {
        rows: 1,
        columns: 1,
      },
      type: 3,
      iconDetails: {
        userFriendlyName: "Facebook",
        icon: "bi:facebook",
      },
    },
    {
      _id: "6cd53f3c-350f-4bec-aa07-debde31a3f9b",
      url: "https://www.slproweb.com/",
      style: {
        color: "black",
      },
      visible: true,
      clicks: 0,
      layout: {
        rows: 1,
        columns: 1,
      },
      type: 3,
      iconDetails: {
        userFriendlyName: "LinkedIn",
        icon: "entypo-social:linkedin-with-circle",
      },
    },
    {
      _id: "4e5d40e4-f464-4566-9dfa-bca6698eb60f",
      url: "https://www.slproweb.com/",
      style: {
        color: "black",
      },
      visible: true,
      clicks: 0,
      layout: {
        rows: 1,
        columns: 1,
      },
      type: 3,
      iconDetails: {
        userFriendlyName: "Instagram",
        icon: "fa-brands:instagram-square",
      },
    },
    {
      _id: "f623c5a8-6d43-498e-a874-cea63c9dfc25",
      url: "https://www.slproweb.com/",
      style: {
        color: "black",
      },
      visible: true,
      clicks: 0,
      layout: {
        rows: 1,
        columns: 1,
      },
      type: 3,
      iconDetails: {
        userFriendlyName: "Discord",
        icon: "bx:bxl-discord",
      },
    },
  ],
  middleComponents: [
    // All TextImage layouts
    {
      text: "Devbox",
      url: "http://www.devbox.eng.br",
      style: {
        backgroundColor: "#000",
        color: "#fff",
      },
      _id: "111",
      visible: true,
      clicks: 0,
      mediaUrl:
        "https://storage.googleapis.com/dpw/app/uploads/2009/12/como-otimizar-imagens-web-internet1.jpg",
      layout: {
        rows: 1,
        columns: 1,
      },
      type: ComponentType.TextImage,
    },
    {
      text: "Devbox",
      url: "http://www.devbox.eng.br",
      style: {
        backgroundColor: "#000",
        color: "#fff",
      },
      _id: "122",
      visible: true,
      clicks: 0,
      mediaUrl:
        "https://storage.googleapis.com/dpw/app/uploads/2009/12/como-otimizar-imagens-web-internet1.jpg",
      layout: {
        rows: 2,
        columns: 1,
      },
      type: ComponentType.TextImage,
    },
    {
      text: "Devbox",
      url: "http://www.devbox.eng.br",
      style: {
        backgroundColor: "#000",
        color: "#fff",
      },
      _id: "133",
      visible: true,
      clicks: 0,
      mediaUrl:
        "https://storage.googleapis.com/dpw/app/uploads/2009/12/como-otimizar-imagens-web-internet1.jpg",
      layout: {
        rows: 1,
        columns: 2,
      },
      type: ComponentType.TextImage,
    },
    {
      text: "Devbox",
      url: "http://www.devbox.eng.br",
      style: {
        backgroundColor: "#000",
        color: "#fff",
      },
      _id: "144",
      visible: true,
      clicks: 0,
      mediaUrl:
        "https://storage.googleapis.com/dpw/app/uploads/2009/12/como-otimizar-imagens-web-internet1.jpg",
      layout: {
        rows: 2,
        columns: 2,
      },
      type: ComponentType.TextImage,
    },

    // All Image layouts
    {
      text: "Portfolio",
      url: "http://www.devbox.eng.br",
      style: undefined,
      _id: "211",
      visible: true,
      mediaUrl:
        "https://blog.2amgaming.com/wp-content/uploads/2020/01/Como-usar-o-ReShade-para-melhorar-a-imagem-dos-jogos-pelo-GeForce-Experience.jpg",
      clicks: 0,
      layout: {
        rows: 1,
        columns: 1,
      },
      type: ComponentType.Image,
    },
    {
      text: "Portfolio",
      url: "http://www.devbox.eng.br",
      style: undefined,
      _id: "222",
      visible: true,
      clicks: 0,
      mediaUrl:
        "https://blog.2amgaming.com/wp-content/uploads/2020/01/Como-usar-o-ReShade-para-melhorar-a-imagem-dos-jogos-pelo-GeForce-Experience.jpg",
      layout: {
        rows: 2,
        columns: 1,
      },
      type: ComponentType.Image,
    },
    {
      text: "Portfolio",
      url: "http://www.devbox.eng.br",
      style: undefined,
      _id: "233",
      visible: true,
      clicks: 0,
      mediaUrl:
        "https://blog.2amgaming.com/wp-content/uploads/2020/01/Como-usar-o-ReShade-para-melhorar-a-imagem-dos-jogos-pelo-GeForce-Experience.jpg",
      layout: {
        rows: 1,
        columns: 2,
      },
      type: ComponentType.Image,
    },
    {
      text: "Portfolio",
      url: "http://www.devbox.eng.br",
      style: undefined,
      _id: "244",
      visible: true,
      clicks: 0,
      mediaUrl:
        "https://blog.2amgaming.com/wp-content/uploads/2020/01/Como-usar-o-ReShade-para-melhorar-a-imagem-dos-jogos-pelo-GeForce-Experience.jpg",
      layout: {
        rows: 2,
        columns: 2,
      },
      type: ComponentType.Image,
    },

    // All Text layouts
    {
      text: "Curriculum Vitae",
      url: "http://www.devbox.eng.br",
      style: {
        backgroundColor: "#ffa",
        color: "#000",
      },
      _id: "311",
      visible: true,
      clicks: 0,
      layout: {
        rows: 1,
        columns: 1,
      },
      type: ComponentType.Text,
    },
    {
      text: "Curriculum Vitae",
      url: "http://www.devbox.eng.br",
      style: {
        backgroundColor: "#ffa",
        color: "#000",
      },
      _id: "322",
      visible: true,
      clicks: 0,
      layout: {
        rows: 2,
        columns: 1,
      },
      type: ComponentType.Text,
    },
    {
      text: undefined,
      url: "http://www.devbox.eng.br",
      style: undefined,
      _id: "511",
      visible: true,
      clicks: 0,
      mediaUrl: "https://www.youtube.com/watch?v=Bu4-86nBuPc",
      layout: {
        rows: 2,
        columns: 2,
      },
      type: ComponentType.Video,
    },
    {
      text: "Curriculum Vitae",
      url: "http://www.devbox.eng.br",
      style: {
        backgroundColor: "#ffa",
        color: "#000",
      },
      _id: "333",
      visible: true,
      clicks: 0,
      layout: {
        rows: 1,
        columns: 2,
      },
      type: ComponentType.Text,
    },
    {
      text: "Curriculum Vitae",
      url: "http://www.devbox.eng.br",
      style: {
        backgroundColor: "#ffa",
        color: "#000",
      },
      _id: "344",
      visible: true,
      clicks: 0,
      layout: {
        rows: 2,
        columns: 2,
      },
      type: ComponentType.Text,
    },
  ],
};

const mockPage2: IUserPage = {
  _id: "1",
  name: "Marcos Fotografia Estilizada",
  url: "pg1/pg1/pg1/pg1",
  views: 151,
  pageImageUrl:
    "https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Zm9jdXN8ZW58MHx8MHx8&w=1000&q=80",

  topComponents: [],
  middleComponents: [
    // All TextImage layouts
    {
      text: "Devbox",
      url: "http://www.devbox.eng.br",
      style: {
        backgroundColor: "#000",
        color: "#fff",
      },
      _id: "133",
      visible: true,
      clicks: 0,
      mediaUrl:
        "https://storage.googleapis.com/dpw/app/uploads/2009/12/como-otimizar-imagens-web-internet1.jpg",
      layout: {
        rows: 1,
        columns: 2,
      },
      type: ComponentType.TextImage,
    },

    // All Image layouts

    {
      text: "Portfolio",
      url: "http://www.devbox.eng.br",
      style: undefined,
      _id: "233",
      visible: true,
      clicks: 0,
      mediaUrl:
        "https://blog.2amgaming.com/wp-content/uploads/2020/01/Como-usar-o-ReShade-para-melhorar-a-imagem-dos-jogos-pelo-GeForce-Experience.jpg",
      layout: {
        rows: 1,
        columns: 2,
      },
      type: ComponentType.Image,
    },

    // All Text layouts
    {
      text: "Curriculum Vitae",
      url: "http://www.devbox.eng.br",
      style: {
        backgroundColor: "#d62",
        color: "#000",
      },
      _id: "3",
      visible: true,
      clicks: 0,
      layout: {
        rows: 1,
        columns: 2,
      },
      type: ComponentType.Text,
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
