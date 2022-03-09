import { moveElementInArrayFromToIndex } from "../../utils";
import { IAction } from "../shared";
import {
  IComponentAnimation,
  IUserComponent,
  IUserPage,
  IUserPagesState,
  UserPagesActionTypes,
} from "./types";

// const initialStateMock: IUserPagesState = {
//   loading: false,
//   error: undefined,
//   pages: [
//     {
//       _id: "1",
//       userId: "1",
//       name: "Marcos Fotografia Estilizada",
//       url: "pg1/pg1/pg1/pg1",
//       isPublic: true,
//       views: 151,
//       pageImageUrl:
//         "https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Zm9jdXN8ZW58MHx8MHx8&w=1000&q=80",

//       topComponents: [
//         {
//           _id: "e5077154-ea13-424b-b141-6029740da3dd",
//           url: "https://www.slproweb.com",
//           style: {
//             color: "black",
//           },
//           visible: true,
//           clicks: 0,
//           layout: {
//             rows: 1,
//             columns: 1,
//           },
//           type: 3,
//           iconDetails: {
//             userFriendlyName: "Twitter",
//             icon: "akar-icons:twitter-fill",
//           },
//         },
//         {
//           _id: "85a947c3-127d-4314-861e-d6c8e58c7086",
//           url: "https://www.slproweb.com/",
//           style: {
//             color: "#0d54fc",
//           },
//           visible: true,
//           clicks: 0,
//           layout: {
//             rows: 1,
//             columns: 1,
//           },
//           type: 3,
//           iconDetails: {
//             userFriendlyName: "Facebook",
//             icon: "bi:facebook",
//           },
//         },
//         {
//           _id: "6cd53f3c-350f-4bec-aa07-debde31a3f9b",
//           url: "https://www.slproweb.com/",
//           style: {
//             color: "black",
//           },
//           visible: true,
//           clicks: 0,
//           layout: {
//             rows: 1,
//             columns: 1,
//           },
//           type: 3,
//           iconDetails: {
//             userFriendlyName: "LinkedIn",
//             icon: "entypo-social:linkedin-with-circle",
//           },
//         },
//         {
//           _id: "4e5d40e4-f464-4566-9dfa-bca6698eb60f",
//           url: "https://www.slproweb.com/",
//           style: {
//             color: "black",
//           },
//           visible: true,
//           clicks: 0,
//           layout: {
//             rows: 1,
//             columns: 1,
//           },
//           type: 3,
//           iconDetails: {
//             userFriendlyName: "Instagram",
//             icon: "fa-brands:instagram-square",
//           },
//         },
//         {
//           _id: "f623c5a8-6d43-498e-a874-cea63c9dfc25",
//           url: "https://www.slproweb.com/",
//           style: {
//             color: "black",
//           },
//           visible: true,
//           clicks: 0,
//           layout: {
//             rows: 1,
//             columns: 1,
//           },
//           type: 3,
//           iconDetails: {
//             userFriendlyName: "Discord",
//             icon: "bx:bxl-discord",
//           },
//         },
//       ],
//       middleComponents: [
//         // All TextImage layouts
//         {
//           text: "Devbox",
//           url: "http://www.devbox.eng.br",
//           style: {
//             backgroundColor: "#000",
//             color: "#fff",
//           },
//           _id: "111",
//           visible: true,
//           clicks: 0,
//           mediaUrl:
//             "https://storage.googleapis.com/dpw/app/uploads/2009/12/como-otimizar-imagens-web-internet1.jpg",
//           layout: {
//             rows: 1,
//             columns: 1,
//           },
//           type: ComponentType.TextImage,
//         },
//         {
//           text: "Devbox",
//           url: "http://www.devbox.eng.br",
//           style: {
//             backgroundColor: "#000",
//             color: "#fff",
//           },
//           _id: "122",
//           visible: true,
//           clicks: 0,
//           mediaUrl:
//             "https://storage.googleapis.com/dpw/app/uploads/2009/12/como-otimizar-imagens-web-internet1.jpg",
//           layout: {
//             rows: 2,
//             columns: 1,
//           },
//           type: ComponentType.TextImage,
//         },
//         {
//           text: "Devbox",
//           url: "http://www.devbox.eng.br",
//           style: {
//             backgroundColor: "#000",
//             color: "#fff",
//           },
//           _id: "133",
//           visible: true,
//           clicks: 0,
//           mediaUrl:
//             "https://storage.googleapis.com/dpw/app/uploads/2009/12/como-otimizar-imagens-web-internet1.jpg",
//           layout: {
//             rows: 1,
//             columns: 2,
//           },
//           type: ComponentType.TextImage,
//         },
//         {
//           text: "Devbox",
//           url: "http://www.devbox.eng.br",
//           style: {
//             backgroundColor: "#000",
//             color: "#fff",
//           },
//           _id: "144",
//           visible: true,
//           clicks: 0,
//           mediaUrl:
//             "https://storage.googleapis.com/dpw/app/uploads/2009/12/como-otimizar-imagens-web-internet1.jpg",
//           layout: {
//             rows: 2,
//             columns: 2,
//           },
//           type: ComponentType.TextImage,
//         },

//         // All Image layouts
//         {
//           text: "Portfolio",
//           url: "http://www.devbox.eng.br",
//           style: undefined,
//           _id: "211",
//           visible: true,
//           mediaUrl:
//             "https://blog.2amgaming.com/wp-content/uploads/2020/01/Como-usar-o-ReShade-para-melhorar-a-imagem-dos-jogos-pelo-GeForce-Experience.jpg",
//           clicks: 0,
//           layout: {
//             rows: 1,
//             columns: 1,
//           },
//           type: ComponentType.Image,
//         },
//         {
//           text: "Portfolio",
//           url: "http://www.devbox.eng.br",
//           style: undefined,
//           _id: "222",
//           visible: true,
//           clicks: 0,
//           mediaUrl:
//             "https://blog.2amgaming.com/wp-content/uploads/2020/01/Como-usar-o-ReShade-para-melhorar-a-imagem-dos-jogos-pelo-GeForce-Experience.jpg",
//           layout: {
//             rows: 2,
//             columns: 1,
//           },
//           type: ComponentType.Image,
//         },
//         {
//           text: "Portfolio",
//           url: "http://www.devbox.eng.br",
//           style: undefined,
//           _id: "23312",
//           visible: true,
//           clicks: 0,
//           mediaUrl:
//             "https://blog.2amgaming.com/wp-content/uploads/2020/01/Como-usar-o-ReShade-para-melhorar-a-imagem-dos-jogos-pelo-GeForce-Experience.jpg",
//           layout: {
//             rows: 1,
//             columns: 2,
//           },
//           type: ComponentType.Image,
//         },
//         {
//           text: "Portfolio",
//           url: "http://www.devbox.eng.br",
//           style: undefined,
//           _id: "244",
//           visible: true,
//           clicks: 0,
//           mediaUrl:
//             "https://blog.2amgaming.com/wp-content/uploads/2020/01/Como-usar-o-ReShade-para-melhorar-a-imagem-dos-jogos-pelo-GeForce-Experience.jpg",
//           layout: {
//             rows: 2,
//             columns: 2,
//           },
//           type: ComponentType.Image,
//         },

//         // All Text layouts
//         {
//           text: "Curriculum Vitae",
//           url: "http://www.devbox.eng.br",
//           style: {
//             backgroundColor: "#ffa",
//             color: "#000",
//           },
//           _id: "311",
//           visible: true,
//           clicks: 0,
//           layout: {
//             rows: 1,
//             columns: 1,
//           },
//           type: ComponentType.Text,
//         },
//         {
//           text: "Curriculum Vitae",
//           url: "http://www.devbox.eng.br",
//           style: {
//             backgroundColor: "#ffa",
//             color: "#000",
//           },
//           _id: "322",
//           visible: true,
//           clicks: 0,
//           layout: {
//             rows: 2,
//             columns: 1,
//           },
//           type: ComponentType.Text,
//         },
//         {
//           text: undefined,
//           url: "http://www.devbox.eng.br",
//           style: undefined,
//           _id: "511",
//           visible: true,
//           clicks: 0,
//           mediaUrl: "https://www.youtube.com/watch?v=Bu4-86nBuPc",
//           layout: {
//             rows: 2,
//             columns: 2,
//           },
//           type: ComponentType.Video,
//         },
//         {
//           text: "Curriculum Vitae",
//           url: "http://www.devbox.eng.br",
//           style: {
//             backgroundColor: "#ffa",
//             color: "#000",
//           },
//           _id: "522",
//           visible: true,
//           clicks: 0,
//           layout: {
//             rows: 1,
//             columns: 2,
//           },
//           type: ComponentType.Text,
//         },
//         {
//           text: "Curriculum Vitae",
//           url: "http://www.devbox.eng.br",
//           style: {
//             backgroundColor: "#ffa",
//             color: "#000",
//           },
//           _id: "533",
//           visible: true,
//           clicks: 0,
//           layout: {
//             rows: 2,
//             columns: 2,
//           },
//           type: ComponentType.Text,
//         },
//       ],
//     },
//     {
//       _id: "2",
//       userId: "1",
//       name: "SocialBIO.me",
//       url: "pg2",
//       isPublic: true,
//       views: 0,
//       style: {
//         backgroundColor: "grey",
//         backgroundImage: "url(https://devbox.eng.br/bg.png)",
//         backgroundPosition: "center",
//       },
//       pageImageUrl: "https://devbox.eng.br/logo.png",

//       topComponents: [
//         {
//           _id: "e5077154-ea13-424b-b141-6029740da3dd",
//           url: "https://www.slproweb.com",
//           style: {
//             color: "black",
//           },
//           visible: true,
//           clicks: 0,
//           layout: {
//             rows: 1,
//             columns: 1,
//           },
//           type: 3,
//           iconDetails: {
//             userFriendlyName: "Twitter",
//             icon: "akar-icons:twitter-fill",
//           },
//         },
//         {
//           _id: "85a947c3-127d-4314-861e-d6c8e58c7086",
//           url: "https://www.slproweb.com/",
//           style: {
//             color: "#0d54fc",
//           },
//           visible: true,
//           clicks: 0,
//           layout: {
//             rows: 1,
//             columns: 1,
//           },
//           type: 3,
//           iconDetails: {
//             userFriendlyName: "Facebook",
//             icon: "bi:facebook",
//           },
//         },
//         {
//           _id: "6cd53f3c-350f-4bec-aa07-debde31a3f9b",
//           url: "https://www.slproweb.com/",
//           style: {
//             color: "black",
//           },
//           visible: true,
//           clicks: 0,
//           layout: {
//             rows: 1,
//             columns: 1,
//           },
//           type: 3,
//           iconDetails: {
//             userFriendlyName: "LinkedIn",
//             icon: "entypo-social:linkedin-with-circle",
//           },
//         },
//         {
//           _id: "4e5d40e4-f464-4566-9dfa-bca6698eb60f",
//           url: "https://www.slproweb.com/",
//           style: {
//             color: "black",
//           },
//           visible: true,
//           clicks: 0,
//           layout: {
//             rows: 1,
//             columns: 1,
//           },
//           type: 3,
//           iconDetails: {
//             userFriendlyName: "Instagram",
//             icon: "fa-brands:instagram-square",
//           },
//         },
//         {
//           _id: "f623c5a8-6d43-498e-a874-cea63c9dfc25",
//           url: "https://www.slproweb.com/",
//           style: {
//             color: "black",
//           },
//           visible: true,
//           clicks: 0,
//           layout: {
//             rows: 1,
//             columns: 1,
//           },
//           type: 3,
//           iconDetails: {
//             userFriendlyName: "Discord",
//             icon: "bx:bxl-discord",
//           },
//         },
//       ],
//       middleComponents: [
//         // All TextImage layouts
//         {
//           text: "Devbox",
//           url: "http://www.devbox.eng.br",
//           style: {
//             backgroundColor: "#000",
//             color: "#fff",
//           },
//           _id: "133",
//           visible: true,
//           clicks: 0,
//           mediaUrl:
//             "https://storage.googleapis.com/dpw/app/uploads/2009/12/como-otimizar-imagens-web-internet1.jpg",
//           layout: {
//             rows: 1,
//             columns: 2,
//           },
//           type: ComponentType.TextImage,
//         },

//         // All Image layouts

//         {
//           text: undefined,
//           url: "http://www.devbox.eng.br",
//           style: undefined,
//           _id: "2333",
//           visible: true,
//           clicks: 0,
//           mediaUrl:
//             "https://blog.2amgaming.com/wp-content/uploads/2020/01/Como-usar-o-ReShade-para-melhorar-a-imagem-dos-jogos-pelo-GeForce-Experience.jpg",
//           layout: {
//             rows: 1,
//             columns: 2,
//           },
//           type: ComponentType.Image,
//         },
//         {
//           text: undefined,
//           url: "http://www.devbox.eng.br",
//           style: undefined,
//           _id: "2334",
//           visible: true,
//           clicks: 0,
//           mediaUrl:
//             "https://www.oficinadanet.com.br/imagens/post/38468/capa-windows-11-como-baixar-a-imagem-iso-agora.jpg",
//           layout: {
//             rows: 1,
//             columns: 1,
//           },
//           type: ComponentType.Image,
//         },

//         // All Text layouts
//         {
//           text: "Meu Site",
//           url: "http://www.devbox.eng.br",
//           style: {
//             backgroundColor: "#162B47",
//             color: "#fff",
//           },
//           _id: "31vv31v46",
//           visible: true,
//           clicks: 0,
//           layout: {
//             rows: 1,
//             columns: 1,
//           },
//           type: ComponentType.Text,
//         },
//         {
//           text: "Loja Online",
//           url: "http://www.devbox.eng.br",
//           style: {
//             backgroundColor: "#3CB6D6ab",
//             color: "#000",
//           },
//           _id: "313131313",
//           visible: true,
//           clicks: 0,
//           layout: {
//             rows: 1,
//             columns: 2,
//           },
//           type: ComponentType.Text,
//         },
//         {
//           text: "Portfolio",
//           url: "http://www.devbox.eng.br",
//           style: {
//             backgroundColor: "#65C29Bab",
//             color: "#000",
//           },
//           _id: "35467547",
//           visible: true,
//           clicks: 0,
//           layout: {
//             rows: 1,
//             columns: 2,
//           },
//           type: ComponentType.Text,
//         },
//         {
//           text: "",
//           url: "https://www.youtube.com/watch?v=Bu4-86nBuPc",
//           style: undefined,
//           mediaUrl: "https://www.youtube.com/watch?v=Bu4-86nBuPc",
//           _id: "387922",
//           visible: true,
//           clicks: 0,
//           layout: {
//             rows: 1,
//             columns: 2,
//           },
//           type: ComponentType.Video,
//         },
//         {
//           _id: "1243sdfa",
//           text: "para a inauguração da nossa loja online no Shopping Recife!",
//           url: "http://www.devbox.eng.br",
//           style: {
//             backgroundColor: "#8f5bcfab",
//             color: "#fff",
//           },
//           visible: true,
//           clicks: 0,
//           layout: {
//             rows: 4,
//             columns: 2,
//           },
//           launchDate: "2022-05-03T13:50:08.000Z",
//           type: ComponentType.Launch,
//           mediaUrl: undefined,
//         },
//         {
//           text: "Para saber mais!",
//           url: "https://www.slproweb.com/",
//           style: {
//             backgroundColor: "#2162cc",
//             color: "#fff",
//           },
//           visible: true,
//           clicks: 0,
//           layout: {
//             rows: 1,
//             columns: 2,
//           },
//           type: 0,
//           animation: {
//             name: "pulse",
//             duration: 2,
//             startDelay: 0,
//             infinite: true,
//           },
//         },
//       ],
//     },
//     {
//       _id: "3",
//       userId: "1",
//       name: "Marvel Comics",
//       url: "pg3",
//       isPublic: true,
//       views: 0,
//       pageImageUrl:
//         "https://yt3.ggpht.com/ytc/AKedOLRJFxojUGx7u06lBjilcCYrHQyLt9k678A5Uef2=s900-c-k-c0x00ffffff-no-rj",

//       topComponents: [],
//       middleComponents: [
//         // All TextImage layouts
//         {
//           text: "Devbox",
//           url: "http://www.devbox.eng.br",
//           style: {
//             backgroundColor: "#000",
//             color: "#fff",
//           },
//           _id: "133",
//           visible: true,
//           clicks: 0,
//           mediaUrl:
//             "https://storage.googleapis.com/dpw/app/uploads/2009/12/como-otimizar-imagens-web-internet1.jpg",
//           layout: {
//             rows: 1,
//             columns: 2,
//           },
//           type: ComponentType.TextImage,
//         },

//         // All Image layouts

//         {
//           text: "Portfolio",
//           url: "http://www.devbox.eng.br",
//           style: undefined,
//           _id: "233",
//           visible: true,
//           clicks: 0,
//           mediaUrl:
//             "https://blog.2amgaming.com/wp-content/uploads/2020/01/Como-usar-o-ReShade-para-melhorar-a-imagem-dos-jogos-pelo-GeForce-Experience.jpg",
//           layout: {
//             rows: 1,
//             columns: 2,
//           },
//           type: ComponentType.Image,
//         },

//         // All Text layouts
//         {
//           text: "Curriculum Vitae",
//           url: "http://www.devbox.eng.br",
//           style: {
//             backgroundColor: "#d62",
//             color: "#000",
//           },
//           _id: "3gv11v",
//           visible: true,
//           clicks: 0,
//           layout: {
//             rows: 1,
//             columns: 2,
//           },
//           type: ComponentType.Text,
//         },
//       ],
//     },
//     {
//       _id: "4",
//       userId: "1",
//       name: "Max Pinturas a Óleo",
//       url: "pg4",
//       isPublic: true,
//       views: 0,
//       pageImageUrl:
//         "https://i0.wp.com/abglt.org.br/wp-content/uploads/2020/10/wallpaper-pc1-scaled-1.jpg?fit=2560%2C1440&ssl=1",

//       middleComponents: [
//         {
//           text: "Devbox",
//           url: "http://www.devbox.eng.br",
//           style: undefined,
//           _id: "1",
//           visible: true,
//           clicks: 0,
//           layout: {
//             rows: 1,
//             columns: 2,
//           },
//           type: ComponentType.TextImage,
//         },
//       ],
//     },
//     {
//       _id: "5",
//       userId: "1",
//       name: "3D Sense8",
//       url: "pg5",
//       isPublic: true,
//       views: 0,
//       pageImageUrl:
//         "https://images.pexels.com/photos/799443/pexels-photo-799443.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=900",

//       middleComponents: [
//         {
//           text: "Devbox",
//           url: "http://www.devbox.eng.br",
//           style: undefined,
//           _id: "1",
//           visible: true,
//           clicks: 0,
//           layout: {
//             rows: 1,
//             columns: 2,
//           },
//           type: ComponentType.TextImage,
//         },
//       ],
//     },
//     {
//       _id: "6",
//       userId: "1",
//       name: "Cosplay dos Amigos",
//       url: "pg6",
//       isPublic: true,
//       views: 0,
//       pageImageUrl:
//         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2UM7_vOR_ghAvYRIYhvpTMNsbOV6lFNxDjQ&usqp=CAU",

//       middleComponents: [
//         {
//           text: "Devbox",
//           url: "http://www.devbox.eng.br",
//           style: undefined,
//           _id: "1",
//           visible: true,
//           clicks: 0,
//           layout: {
//             rows: 1,
//             columns: 2,
//           },
//           type: ComponentType.TextImage,
//         },
//       ],
//     },
//   ],
// };

const initialState: IUserPagesState = {
  loading: false,
  error: undefined,
  pages: [],
  pageBeingSaved: undefined,
};

const pagesReducer = (
  state: any = initialState,
  action: IAction
): IUserPagesState => {
  switch (action.type) {
    /*
     * ERRORS
     */
    case UserPagesActionTypes.CREATE_PAGE_ERROR:
    case UserPagesActionTypes.UPDATE_PAGE_ERROR:
    case UserPagesActionTypes.DELETE_PAGE_ERROR:
    case UserPagesActionTypes.UPDATE_USER_PAGE_URL_ERROR:
    case UserPagesActionTypes.UPDATE_USER_PAGE_NAME_ERROR:
    case UserPagesActionTypes.GET_ALL_USER_PAGES_ERROR: {
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    }

    /*
     * LOADINGS
     */
    case UserPagesActionTypes.CREATE_PAGE_LOADING:
    case UserPagesActionTypes.UPDATE_PAGE_LOADING:
    case UserPagesActionTypes.DELETE_PAGE_LOADING:
    case UserPagesActionTypes.GET_ALL_USER_PAGES_LOADING:
    case UserPagesActionTypes.UPDATE_USER_PAGE_URL_LOADING:
    case UserPagesActionTypes.UPDATE_USER_PAGE_NAME_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }

    case UserPagesActionTypes.UPDATE_PAGE_SUCCESS: {
      return {
        ...state,
        loading: true,
        error: undefined,
        pageBeingSaved: undefined,
      };
    }

    case UserPagesActionTypes.GET_ALL_USER_PAGES_SUCCESS: {
      return {
        ...state,
        pages: action.payload,
        error: undefined,
        loading: false,
      };
    }

    case UserPagesActionTypes.CREATE_PAGE_SUCCESS: {
      const existingPages = state.pages ? [...state.pages] : [];
      const updatedPages = [action.payload, ...existingPages];

      return {
        ...state,
        pages: updatedPages,
        error: undefined,
        loading: false,
      };
    }

    case UserPagesActionTypes.UPDATE_USER_PAGE_NAME_SUCCESS: {
      let updatedPagesList: IUserPage[] = state.pages ? [...state.pages] : [];
      let pageToBeSaved;

      if (updatedPagesList && updatedPagesList.length > 0) {
        updatedPagesList = updatedPagesList.map((page: IUserPage) => {
          if (page._id === action.payload.pageId) {
            const updatedPage = {
              ...page,
              name: action.payload.newName,
            };

            pageToBeSaved = updatedPage;

            return updatedPage;
          }
          return page;
        });
      }

      let newState: any = {
        ...state,
        pages: [...updatedPagesList],
      };

      if (pageToBeSaved) {
        newState.pageBeingSaved = pageToBeSaved;
      }

      return newState;
    }

    case UserPagesActionTypes.UPDATE_USER_PAGE_URL_SUCCESS: {
      let updatedPagesList: IUserPage[] = state.pages ? [...state.pages] : [];
      let pageToBeSaved;

      if (updatedPagesList && updatedPagesList.length > 0) {
        updatedPagesList = updatedPagesList.map((page: IUserPage) => {
          if (page._id === action.payload.pageId) {
            const updatedPage = {
              ...page,
              url: action.payload.newUrl,
            };

            pageToBeSaved = updatedPage;

            return updatedPage;
          }
          return page;
        });
      }

      let newState: any = {
        ...state,
        pages: [...updatedPagesList],
      };

      if (pageToBeSaved) {
        newState.pageBeingSaved = pageToBeSaved;
      }

      return newState;
    }

    case UserPagesActionTypes.TOGGLE_PAGE_IS_PUBLIC: {
      const pageId = action.payload.pageId as string;
      let pageToBeSaved;

      const updatedPages = state.pages.map((page: IUserPage) => {
        if (page._id === pageId && page.middleComponents) {
          const updatedPage: IUserPage = {
            ...page,
            isPublic: !page.isPublic,
          };
          pageToBeSaved = updatedPage;
          return updatedPage;
        }
        return page;
      });

      let newState: any = {
        ...state,
        pages: [...updatedPages],
      };

      if (pageToBeSaved) {
        newState.pageBeingSaved = pageToBeSaved;
      }

      return newState;
    }

    case UserPagesActionTypes.TOGGLE_COMPONENT_VISIBILITY: {
      const pageId = action.payload.pageId as string;
      const componentId = action.payload.componentId as string;
      let pageToBeSaved;

      const updatedPages = state.pages.map((page: IUserPage) => {
        if (page._id === pageId && page.middleComponents) {
          const updatedComponents = page.middleComponents.map(
            (component: IUserComponent) => {
              if (component._id === componentId) {
                const updatedComponent: IUserComponent = {
                  ...component,
                  visible: !component.visible,
                };
                return updatedComponent;
              }
              return component;
            }
          );
          const updatedPage: IUserPage = {
            ...page,
            middleComponents: updatedComponents,
          };
          pageToBeSaved = updatedPage;
          return updatedPage;
        }
        return page;
      });

      let newState: any = {
        ...state,
        pages: [...updatedPages],
      };

      if (pageToBeSaved) {
        newState.pageBeingSaved = pageToBeSaved;
      }

      return newState;
    }

    case UserPagesActionTypes.UPDATE_COMPONENT_LABEL: {
      const pageId = action.payload.pageId as string;
      const componentId = action.payload.componentId as string;
      const newLabel = action.payload.newLabel as string;
      let pageToBeSaved;

      const updatedPages = state.pages.map((page: IUserPage) => {
        if (page._id === pageId && page.middleComponents) {
          const updatedComponents = page.middleComponents.map(
            (component: IUserComponent) => {
              if (component._id === componentId) {
                const updatedComponent: IUserComponent = {
                  ...component,
                  text: newLabel,
                };
                return updatedComponent;
              }
              return component;
            }
          );
          const updatedPage: IUserPage = {
            ...page,
            middleComponents: updatedComponents,
          };
          pageToBeSaved = updatedPage;
          return updatedPage;
        }
        return page;
      });

      let newState: any = {
        ...state,
        pages: [...updatedPages],
      };

      if (pageToBeSaved) {
        newState.pageBeingSaved = pageToBeSaved;
      }

      return newState;
    }

    case UserPagesActionTypes.UPDATE_COMPONENT_URL: {
      const pageId = action.payload.pageId as string;
      const componentId = action.payload.componentId as string;
      const newUrl = action.payload.newUrl as string;
      let pageToBeSaved;

      const updatedPages = state.pages.map((page: IUserPage) => {
        if (page._id === pageId && page.middleComponents) {
          const updatedComponents = page.middleComponents.map(
            (component: IUserComponent) => {
              if (component._id === componentId) {
                const updatedComponent: IUserComponent = {
                  ...component,
                  url: newUrl,
                };
                return updatedComponent;
              }
              return component;
            }
          );
          const updatedPage: IUserPage = {
            ...page,
            middleComponents: updatedComponents,
          };
          pageToBeSaved = updatedPage;
          return updatedPage;
        }
        return page;
      });

      let newState: any = {
        ...state,
        pages: [...updatedPages],
      };

      if (pageToBeSaved) {
        newState.pageBeingSaved = pageToBeSaved;
      }

      return newState;
    }

    case UserPagesActionTypes.UPDATE_PAGE_BACKGROUND_COLOR: {
      const pageId = action.payload.pageId as string;
      const newColor = action.payload.newColor as string;
      let pageToBeSaved;

      const updatedPages = state.pages.map((page: IUserPage) => {
        if (page._id === pageId && page.middleComponents) {
          const updatedPage: IUserPage = {
            ...page,
            style: {
              ...page.style,
              backgroundColor: newColor,
            },
          };
          pageToBeSaved = updatedPage;
          return updatedPage;
        }
        return page;
      });

      let newState: any = {
        ...state,
        pages: [...updatedPages],
      };

      if (pageToBeSaved) {
        newState.pageBeingSaved = pageToBeSaved;
      }

      return newState;
    }

    case UserPagesActionTypes.UPDATE_COMPONENT_ANIMATION: {
      const pageId = action.payload.pageId as string;
      const componentId = action.payload.componentId as string;
      const animation = action.payload.animation as IComponentAnimation;
      let pageToBeSaved;

      const updatedPages = state.pages.map((page: IUserPage) => {
        if (page._id === pageId && page.middleComponents) {
          const updatedComponents = page.middleComponents.map(
            (component: IUserComponent) => {
              if (component._id === componentId) {
                const updatedComponent: IUserComponent = {
                  ...component,
                  animation: animation,
                };
                return updatedComponent;
              }
              return component;
            }
          );
          const updatedPage: IUserPage = {
            ...page,
            middleComponents: updatedComponents,
          };
          pageToBeSaved = updatedPage;
          return updatedPage;
        }
        return page;
      });

      let newState: any = {
        ...state,
        pages: [...updatedPages],
      };

      if (pageToBeSaved) {
        newState.pageBeingSaved = pageToBeSaved;
      }

      return newState;
    }

    case UserPagesActionTypes.UPDATE_COMPONENT_VISIBLE_DATE: {
      const pageId = action.payload.pageId as string;
      const componentId = action.payload.componentId as string;
      const dateTime = action.payload.dateTime as string;
      let pageToBeSaved;

      const updatedPages = state.pages.map((page: IUserPage) => {
        if (page._id === pageId && page.middleComponents) {
          const updatedComponents = page.middleComponents.map(
            (component: IUserComponent) => {
              if (component._id === componentId) {
                const updatedComponent: IUserComponent = {
                  ...component,
                  visibleDate: dateTime,
                };
                return updatedComponent;
              }
              return component;
            }
          );
          const updatedPage: IUserPage = {
            ...page,
            middleComponents: updatedComponents,
          };
          pageToBeSaved = updatedPage;
          return updatedPage;
        }
        return page;
      });

      let newState: any = {
        ...state,
        pages: [...updatedPages],
      };

      if (pageToBeSaved) {
        newState.pageBeingSaved = pageToBeSaved;
      }

      return newState;
    }

    case UserPagesActionTypes.UPDATE_PAGE_FONT_COLOR: {
      const pageId = action.payload.pageId as string;
      const newColor = action.payload.newColor as string;
      let pageToBeSaved;

      const updatedPages = state.pages.map((page: IUserPage) => {
        if (page._id === pageId && page.middleComponents) {
          const updatedPage: IUserPage = {
            ...page,
            style: {
              ...page.style,
              color: newColor,
            },
          };
          pageToBeSaved = updatedPage;
          return updatedPage;
        }
        return page;
      });

      let newState: any = {
        ...state,
        pages: [...updatedPages],
      };

      if (pageToBeSaved) {
        newState.pageBeingSaved = pageToBeSaved;
      }

      return newState;
    }

    case UserPagesActionTypes.UPDATE_COMPONENT_BACKGROUND_COLOR: {
      const pageId = action.payload.pageId as string;
      const componentId = action.payload.componentId as string;
      const newColor = action.payload.newColor as string;
      let pageToBeSaved;

      const updatedPages = state.pages.map((page: IUserPage) => {
        if (page._id === pageId && page.middleComponents) {
          const updatedComponents = page.middleComponents.map(
            (component: IUserComponent) => {
              if (component._id === componentId) {
                const updatedComponent: IUserComponent = {
                  ...component,
                  style: {
                    ...component.style,
                    backgroundColor: newColor,
                  },
                };
                return updatedComponent;
              }
              return component;
            }
          );
          const updatedPage: IUserPage = {
            ...page,
            middleComponents: updatedComponents,
          };
          pageToBeSaved = updatedPage;
          return updatedPage;
        }
        return page;
      });

      let newState: any = {
        ...state,
        pages: [...updatedPages],
      };

      if (pageToBeSaved) {
        newState.pageBeingSaved = pageToBeSaved;
      }

      return newState;
    }

    case UserPagesActionTypes.UPDATE_COMPONENT_FONT_COLOR: {
      const pageId = action.payload.pageId as string;
      const componentId = action.payload.componentId as string;
      const newColor = action.payload.newColor as string;
      let pageToBeSaved;

      const updatedPages = state.pages.map((page: IUserPage) => {
        if (page._id === pageId && page.middleComponents) {
          const updatedComponents = page.middleComponents.map(
            (component: IUserComponent) => {
              if (component._id === componentId) {
                const updatedComponent: IUserComponent = {
                  ...component,
                  style: {
                    ...component.style,
                    color: newColor,
                  },
                };
                return updatedComponent;
              }
              return component;
            }
          );
          const updatedPage: IUserPage = {
            ...page,
            middleComponents: updatedComponents,
          };
          pageToBeSaved = updatedPage;
          return updatedPage;
        }
        return page;
      });

      let newState: any = {
        ...state,
        pages: [...updatedPages],
      };

      if (pageToBeSaved) {
        newState.pageBeingSaved = pageToBeSaved;
      }

      return newState;
    }

    case UserPagesActionTypes.INCREASE_MIDDLE_COMPONENT_INDEX_IN_PAGE: {
      const currentIndex = action.payload.currentIndex as number;
      const nextIndex = currentIndex + 1;
      const pageId = action.payload.pageId;
      let pageToBeSaved;

      const updatedPages = state.pages.map((page: IUserPage) => {
        if (page._id === pageId && page.middleComponents) {
          if (
            currentIndex === page.middleComponents.length - 1 ||
            nextIndex >= page.middleComponents.length
          ) {
            return page;
          }
          let pageComponents = moveElementInArrayFromToIndex(
            page.middleComponents,
            currentIndex,
            nextIndex
          );

          const updatedPage: IUserPage = {
            ...page,
            middleComponents: pageComponents,
          };
          pageToBeSaved = updatedPage;
          return updatedPage;
        }
        return page;
      });

      let newState: any = {
        ...state,
        pages: [...updatedPages],
      };

      if (pageToBeSaved) {
        newState.pageBeingSaved = pageToBeSaved;
      }

      return newState;
    }

    case UserPagesActionTypes.DECREASE_MIDDLE_COMPONENT_INDEX_IN_PAGE: {
      const currentIndex = action.payload.currentIndex as number;
      const previousIndex = currentIndex - 1;
      const pageId = action.payload.pageId;
      let pageToBeSaved;

      const updatedPages = state.pages.map((page: IUserPage) => {
        if (page._id === pageId && page.middleComponents) {
          if (currentIndex <= 0) {
            return page;
          }

          let pageComponents = moveElementInArrayFromToIndex(
            page.middleComponents,
            currentIndex,
            previousIndex
          );

          const updatedPage: IUserPage = {
            ...page,
            middleComponents: pageComponents,
          };
          pageToBeSaved = updatedPage;
          return updatedPage;
        }
        return page;
      });

      let newState: any = {
        ...state,
        pages: [...updatedPages],
      };

      if (pageToBeSaved) {
        newState.pageBeingSaved = pageToBeSaved;
      }

      return newState;
    }

    case UserPagesActionTypes.DELETE_MIDDLE_COMPONENT_FROM_PAGE: {
      const pageId = action.payload.pageId;
      const componentId = action.payload.componentId;
      let pageToBeSaved;

      const updatedPages = state.pages.map((page: IUserPage) => {
        if (page._id === pageId && page.middleComponents) {
          const updatedComponents = page.middleComponents.filter(
            (component: IUserComponent) => component._id !== componentId
          );
          const updatedPage: IUserPage = {
            ...page,
            middleComponents: updatedComponents,
          };
          pageToBeSaved = updatedPage;
          return updatedPage;
        }
        return page;
      });

      let newState: any = {
        ...state,
        pages: [...updatedPages],
      };

      if (pageToBeSaved) {
        newState.pageBeingSaved = pageToBeSaved;
      }

      return newState;
    }

    case UserPagesActionTypes.DELETE_TOP_COMPONENT_FROM_PAGE: {
      const pageId = action.payload.pageId;
      const componentId = action.payload.componentId;
      let pageToBeSaved;

      const updatedPages = state.pages.map((page: IUserPage) => {
        if (page._id === pageId && page.topComponents) {
          const updatedComponents = page.topComponents.filter(
            (component: IUserComponent) => component._id !== componentId
          );
          const updatedPage: IUserPage = {
            ...page,
            topComponents: updatedComponents,
          };
          pageToBeSaved = updatedPage;
          return updatedPage;
        }
        return page;
      });

      let newState: any = {
        ...state,
        pages: [...updatedPages],
      };

      if (pageToBeSaved) {
        newState.pageBeingSaved = pageToBeSaved;
      }

      return newState;
    }

    case UserPagesActionTypes.DELETE_PAGE_SUCCESS: {
      const pageIdToDelete = action.payload;

      const updatedPages = state.pages.filter(
        (page: IUserPage) => page._id !== pageIdToDelete
      );

      return {
        ...state,
        pages: [...updatedPages],
        loading: false,
        error: undefined,
      };
    }

    case UserPagesActionTypes.ADD_MIDDLE_COMPONENT_IN_PAGE: {
      const pageId = action.payload.pageId;
      const component: IUserComponent = action.payload.component;
      let pageToBeSaved;

      const updatedPages = state.pages.map((page: IUserPage) => {
        if (page._id === pageId) {
          if (page.middleComponents) {
            const updatedComponents = [...page.middleComponents, component];
            const updatedPage: IUserPage = {
              ...page,
              middleComponents: updatedComponents,
            };
            pageToBeSaved = updatedPage;
            return updatedPage;
          } else {
            return {
              ...page,
              middleComponents: [component],
            };
          }
        }
        return page;
      });

      let newState: any = {
        ...state,
        pages: [...updatedPages],
      };

      if (pageToBeSaved) {
        newState.pageBeingSaved = pageToBeSaved;
      }

      return newState;
    }
    case UserPagesActionTypes.ADD_TOP_COMPONENT_IN_PAGE: {
      const pageId = action.payload.pageId;
      const component: IUserComponent = action.payload.component;
      let pageToBeSaved;

      const updatedPages = state.pages.map((page: IUserPage) => {
        if (page._id === pageId) {
          if (page.topComponents) {
            const updatedComponents = [...page.topComponents, component];
            const updatedPage: IUserPage = {
              ...page,
              topComponents: updatedComponents,
            };
            pageToBeSaved = updatedPage;
            return updatedPage;
          } else {
            return {
              ...page,
              topComponents: [component],
            };
          }
        }
        return page;
      });

      let newState: any = {
        ...state,
        pages: [...updatedPages],
      };

      if (pageToBeSaved) {
        newState.pageBeingSaved = pageToBeSaved;
      }

      return newState;
    }

    case UserPagesActionTypes.CLEAR_STATE:
      return initialState;

    default:
      return state;
  }
};

export default pagesReducer;
