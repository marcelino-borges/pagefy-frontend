import { moveElementInArrayFromToIndex } from "../../utils";
import { IAction } from "../shared";
import {
  ComponentType,
  IUserComponent,
  IUserPage,
  IUserState,
  UserActionTypes,
} from "./types";

const initialState: IUserState = {
  loading: false,
  error: undefined,
  profile: {
    firstName: "Marcelino",
    lastName: "Borges",
    email: "botelho_gt@hotmail.com",
    pages: [
      {
        _id: "1",
        name: "Marcos Fotografia Estilizada",
        url: "pg1/pg1/pg1/pg1",
        views: 151,
        pageImageUrl:
          "https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Zm9jdXN8ZW58MHx8MHx8&w=1000&q=80",
        components: [
          {
            label: "Devbox",
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
            label: "Portfolio",
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
            label: "Curriculum Vitae",
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
            label: "HTBAD",
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
            label: "Devbox",
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
            label: "Portfolio",
            url: "http://www.devbox.eng.br",
            style: undefined,
            _id: "6",
            visible: true,
            clicks: 0,
            layout: {
              rows: 1,
              columns: 2,
            },
            type: ComponentType.Video,
          },
          {
            label: "Curriculum Vitae Icon",
            url: "http://www.devbox.eng.br",
            style: undefined,
            _id: "7",
            visible: true,
            clicks: 0,
            layout: {
              rows: 1,
              columns: 2,
            },
            type: ComponentType.Icon,
          },
          {
            label: "HTBAD",
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
            label: "Devbox",
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
            label: "Portfolio",
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
            label: "Curriculum Vitae",
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
      },
      {
        _id: "2",
        name: "QTR Turismo",
        url: "pg2",
        views: 0,
        pageImageUrl:
          "https://static.remove.bg/remove-bg-web/a6eefcd21dff1bbc2448264c32f7b48d7380cb17/assets/start-1abfb4fe2980eabfbbaaa4365a0692539f7cd2725f324f904565a9a744f8e214.jpg",

        components: [
          {
            label: "Devbox",
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
            label: "Portfolio",
            url: "http://www.devbox.eng.br",
            style: undefined,
            _id: "2",
            visible: true,
            clicks: 0,
            layout: {
              rows: 1,
              columns: 2,
            },
            type: ComponentType.TextImage,
          },
          {
            label: "Curriculum Vitae",
            url: "http://www.devbox.eng.br",
            style: undefined,
            _id: "3",
            visible: true,
            clicks: 0,
            layout: {
              rows: 1,
              columns: 2,
            },
            type: ComponentType.TextImage,
          },
          {
            label: "HTBAD",
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
            label: "Devbox",
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
            label: "Portfolio",
            url: "http://www.devbox.eng.br",
            style: undefined,
            _id: "6",
            visible: true,
            clicks: 0,
            layout: {
              rows: 1,
              columns: 2,
            },
            type: ComponentType.TextImage,
          },
          {
            label: "Curriculum Vitae",
            url: "http://www.devbox.eng.br",
            style: undefined,
            _id: "7",
            visible: true,
            clicks: 0,
            layout: {
              rows: 1,
              columns: 2,
            },
            type: ComponentType.TextImage,
          },
          {
            label: "HTBAD",
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
            label: "Devbox",
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
            label: "Portfolio",
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
            label: "Curriculum Vitae",
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
          {
            label: "HTBAD",
            url: "http://www.devbox.eng.br",
            style: undefined,
            _id: "12",
            visible: true,
            clicks: 0,
            layout: {
              rows: 1,
              columns: 2,
            },
            type: ComponentType.TextImage,
          },
        ],
      },
      {
        _id: "3",
        name: "Marvel Comics",
        url: "pg3",
        views: 0,
        pageImageUrl:
          "https://i.pinimg.com/originals/bf/82/f6/bf82f6956a32819af48c2572243e8286.jpg",

        components: [
          {
            label: "Devbox",
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
        ],
      },
      {
        _id: "4",
        name: "Max Pinturas a Óleo",
        url: "pg4",
        views: 0,
        pageImageUrl:
          "https://i0.wp.com/abglt.org.br/wp-content/uploads/2020/10/wallpaper-pc1-scaled-1.jpg?fit=2560%2C1440&ssl=1",

        components: [
          {
            label: "Devbox",
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
        ],
      },
      {
        _id: "5",
        name: "3D Sense8",
        url: "pg5",
        views: 0,
        pageImageUrl:
          "https://images.pexels.com/photos/799443/pexels-photo-799443.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=900",

        components: [
          {
            label: "Devbox",
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
        ],
      },
      {
        _id: "6",
        name: "Cosplay dos Amigos",
        url: "pg6",
        views: 0,
        pageImageUrl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2UM7_vOR_ghAvYRIYhvpTMNsbOV6lFNxDjQ&usqp=CAU",

        components: [
          {
            label: "Devbox",
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
        ],
      },
    ],
  },
};

const userReducer = (
  state: any = initialState,
  action: IAction
): IUserState => {
  switch (action.type) {
    case UserActionTypes.GET_USER_SUCCESS:
      return {
        ...state,
        profile: action.payload,
      };

    case UserActionTypes.GET_USER_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    case UserActionTypes.UPDATE_USER_PAGE_NAME: {
      let updatedPagesList: IUserPage[] = state.profile
        ? [...state.profile.pages]
        : [];

      if (updatedPagesList && updatedPagesList.length > 0) {
        updatedPagesList = updatedPagesList.map((page: IUserPage) => {
          if (page._id === action.payload.pageId) {
            return {
              ...page,
              name: action.payload.newName,
            };
          }
          return page;
        });
      }

      return {
        ...state,
        profile: {
          ...state.profile,
          pages: [...updatedPagesList],
        },
      };
    }

    case UserActionTypes.TOGGLE_COMPONENT_VISIBILITY: {
      const pageId = action.payload.pageId as string;
      const componentId = action.payload.componentId as string;

      const updatedPages = state.profile.pages.map((page: IUserPage) => {
        if (page._id === pageId) {
          const updatedComponents = page.components.map(
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
            components: updatedComponents,
          };
          return updatedPage;
        }
        return page;
      });
      return {
        ...state,
        profile: {
          ...state.profile,
          pages: updatedPages,
        },
      };
    }

    case UserActionTypes.UPDATE_COMPONENT_LABEL: {
      const pageId = action.payload.pageId as string;
      const componentId = action.payload.componentId as string;
      const newLabel = action.payload.newLabel as string;

      const updatedPages = state.profile.pages.map((page: IUserPage) => {
        if (page._id === pageId) {
          const updatedComponents = page.components.map(
            (component: IUserComponent) => {
              if (component._id === componentId) {
                const updatedComponent: IUserComponent = {
                  ...component,
                  label: newLabel,
                };
                return updatedComponent;
              }
              return component;
            }
          );
          const updatedPage: IUserPage = {
            ...page,
            components: updatedComponents,
          };
          return updatedPage;
        }
        return page;
      });
      return {
        ...state,
        profile: {
          ...state.profile,
          pages: updatedPages,
        },
      };
    }

    case UserActionTypes.UPDATE_COMPONENT_URL: {
      const pageId = action.payload.pageId as string;
      const componentId = action.payload.componentId as string;
      const newUrl = action.payload.newUrl as string;

      const updatedPages = state.profile.pages.map((page: IUserPage) => {
        if (page._id === pageId) {
          const updatedComponents = page.components.map(
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
            components: updatedComponents,
          };
          return updatedPage;
        }
        return page;
      });
      return {
        ...state,
        profile: {
          ...state.profile,
          pages: updatedPages,
        },
      };
    }

    case UserActionTypes.INCREASE_COMPONENT_INDEX_IN_PAGE: {
      const currentIndex = action.payload.currentIndex as number;
      const nextIndex = currentIndex + 1;
      const pageId = action.payload.pageId;

      const updatedPages = state.profile.pages.map((page: IUserPage) => {
        if (page._id === pageId) {
          if (nextIndex >= page.components.length) {
            return page;
          }
          let pageComponents = moveElementInArrayFromToIndex(
            page.components,
            currentIndex,
            nextIndex
          );

          const updatedPage: IUserPage = {
            ...page,
            components: pageComponents,
          };
          return updatedPage;
        }
        return page;
      });

      return {
        ...state,
        profile: {
          ...state.profile,
          pages: updatedPages,
        },
      };
    }

    case UserActionTypes.DECREASE_COMPONENT_INDEX_IN_PAGE: {
      const currentIndex = action.payload.currentIndex as number;
      const previousIndex = currentIndex - 1;
      const pageId = action.payload.pageId;

      const updatedPages = state.profile.pages.map((page: IUserPage) => {
        if (page._id === pageId) {
          if (previousIndex <= 0) {
            return page;
          }

          let pageComponents = moveElementInArrayFromToIndex(
            page.components,
            currentIndex,
            previousIndex
          );

          const updatedPage: IUserPage = {
            ...page,
            components: pageComponents,
          };
          return updatedPage;
        }
        return page;
      });

      return {
        ...state,
        profile: {
          ...state.profile,
          pages: updatedPages,
        },
      };
    }

    case UserActionTypes.DELETE_COMPONENT_FROM_PAGE: {
      const pageId = action.payload.pageId;
      const componentId = action.payload.componentId;

      const updatedPages = state.profile.pages.map((page: IUserPage) => {
        if (page._id === pageId) {
          const updatedComponents = page.components.filter(
            (component: IUserComponent) => component._id !== componentId
          );
          const updatedPage: IUserPage = {
            ...page,
            components: updatedComponents,
          };
          return updatedPage;
        }
        return page;
      });
      return {
        ...state,
        profile: {
          ...state.profile,
          pages: updatedPages,
        },
      };
    }

    case UserActionTypes.ADD_COMPONENT_IN_PAGE: {
      const pageId = action.payload.pageId;
      const component: IUserComponent = action.payload.component;

      const updatedPages = state.profile.pages.map((page: IUserPage) => {
        if (page._id === pageId) {
          const updatedComponents = [...page.components, component];
          const updatedPage: IUserPage = {
            ...page,
            components: updatedComponents,
          };
          return updatedPage;
        }
        return page;
      });

      return {
        ...state,
        profile: {
          ...state.profile,
          pages: updatedPages,
        },
      };
    }

    default:
      return state;
  }
};

export default userReducer;
