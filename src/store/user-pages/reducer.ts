import { moveElementInArrayFromToIndex } from "../../utils";
import { IAction } from "../shared/types";
import {
  IComponentAnimation,
  IUserComponent,
  IUserPage,
  IUserPagesState,
  UserPagesActionTypes,
} from "./types";

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
    case UserPagesActionTypes.GET_ALL_USER_PAGES_ERROR:
    case UserPagesActionTypes.UPDATE_PAGE_IMAGE_ERROR:
    case UserPagesActionTypes.UPDATE_COMPONENT_IMAGE_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    case UserPagesActionTypes.UPDATE_PAGE_LOADING:
    case UserPagesActionTypes.UPDATE_PAGE_IMAGE_LOADING:
    case UserPagesActionTypes.UPDATE_PAGE_BG_IMAGE_LOADING:
    case UserPagesActionTypes.UPDATE_COMPONENT_IMAGE_LOADING:
      return {
        ...state,
        loading: true,
      };

    /*
     * LOADINGS
     */
    case UserPagesActionTypes.CREATE_PAGE_LOADING:
    case UserPagesActionTypes.DELETE_PAGE_LOADING:
    case UserPagesActionTypes.GET_ALL_USER_PAGES_LOADING:
    case UserPagesActionTypes.UPDATE_USER_PAGE_URL_LOADING:
    case UserPagesActionTypes.UPDATE_USER_PAGE_NAME_LOADING:
      return {
        ...state,
      };

    case UserPagesActionTypes.UPDATE_PAGE_IMAGE_SUCCESS: {
      let updatedPagesList: IUserPage[] = state.pages ? [...state.pages] : [];

      if (updatedPagesList && updatedPagesList.length > 0) {
        updatedPagesList = updatedPagesList.map((page: IUserPage) => {
          if (page._id === action.payload.pageId) {
            const updatedPage: IUserPage = {
              ...page,
              pageImageUrl: action.payload,
            };

            return updatedPage;
          }
          return page;
        });
      }

      return {
        ...state,
        loading: false,
        error: undefined,
        pages: [...updatedPagesList],
      };
    }

    case UserPagesActionTypes.UPDATE_PAGE_BG_IMAGE_SUCCESS: {
      let updatedPagesList: IUserPage[] = state.pages ? [...state.pages] : [];

      if (updatedPagesList && updatedPagesList.length > 0) {
        updatedPagesList = updatedPagesList.map((page: IUserPage) => {
          if (page._id === action.payload.pageId) {
            const updatedPage: IUserPage = {
              ...page,
              style: {
                ...page.style,
                backgroundImage: `url(${action.payload})`,
              },
            };

            return updatedPage;
          }
          return page;
        });
      }

      return {
        ...state,
        loading: false,
        error: undefined,
        pages: [...updatedPagesList],
      };
    }

    case UserPagesActionTypes.GET_ALL_USER_PAGES_SUCCESS: {
      return {
        ...state,
        pages: action.payload,
        error: undefined,
      };
    }

    case UserPagesActionTypes.CREATE_PAGE_SUCCESS: {
      const existingPages = state.pages ? [...state.pages] : [];
      const updatedPages = [action.payload, ...existingPages];

      return {
        ...state,
        pages: updatedPages,
        error: undefined,
      };
    }

    case UserPagesActionTypes.UPDATE_PAGE_SUCCESS: {
      let updatedPagesList: IUserPage[] = state.pages ? [...state.pages] : [];

      if (updatedPagesList && updatedPagesList.length > 0) {
        updatedPagesList = updatedPagesList.map((page: IUserPage) => {
          if (page._id === action.payload._id) {
            return {
              ...page,
            };
          }
          return page;
        });
      }

      return {
        ...state,
        pages: [...updatedPagesList],
        loading: false,
        error: undefined,
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

      return {
        ...state,
        pages: [...updatedPagesList],
        pageBeingSaved: pageToBeSaved,
        loading: false,
      };
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

      return {
        ...state,
        pages: [...updatedPagesList],
        pageBeingSaved: pageToBeSaved,
        loading: false,
      };
    }

    case UserPagesActionTypes.TOGGLE_PAGE_IS_PUBLIC: {
      const pageId = action.payload.pageId as string;
      let pageToBeSaved;

      const updatedPagesList = state.pages.map((page: IUserPage) => {
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

      return {
        ...state,
        pages: [...updatedPagesList],
        pageBeingSaved: pageToBeSaved,
        loading: false,
      };
    }

    case UserPagesActionTypes.TOGGLE_COMPONENT_VISIBILITY: {
      const pageId = action.payload.pageId as string;
      const componentId = action.payload.componentId as string;
      let pageToBeSaved;

      const updatedPagesList = state.pages.map((page: IUserPage) => {
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

      return {
        ...state,
        pages: [...updatedPagesList],
        pageBeingSaved: pageToBeSaved,
        loading: false,
      };
    }

    case UserPagesActionTypes.UPDATE_COMPONENT_LABEL: {
      const pageId = action.payload.pageId as string;
      const componentId = action.payload.componentId as string;
      const newLabel = action.payload.newLabel as string;
      let pageToBeSaved;

      const updatedPagesList = state.pages.map((page: IUserPage) => {
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

      return {
        ...state,
        pages: [...updatedPagesList],
        pageBeingSaved: pageToBeSaved,
        loading: false,
      };
    }

    case UserPagesActionTypes.UPDATE_COMPONENT_URL: {
      const pageId = action.payload.pageId as string;
      const componentId = action.payload.componentId as string;
      const newUrl = action.payload.newUrl as string;
      let pageToBeSaved;

      const updatedPagesList = state.pages.map((page: IUserPage) => {
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

      return {
        ...state,
        pages: [...updatedPagesList],
        pageBeingSaved: pageToBeSaved,
        loading: false,
      };
    }

    case UserPagesActionTypes.UPDATE_PAGE_BACKGROUND_COLOR: {
      const pageId = action.payload.pageId as string;
      const newColor = action.payload.newColor as string;
      let pageToBeSaved;

      const updatedPagesList = state.pages.map((page: IUserPage) => {
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

      return {
        ...state,
        pages: [...updatedPagesList],
        pageBeingSaved: pageToBeSaved,
        loading: false,
      };
    }

    case UserPagesActionTypes.UPDATE_COMPONENT_ANIMATION: {
      const pageId = action.payload.pageId as string;
      const componentId = action.payload.componentId as string;
      const animation = action.payload.animation as IComponentAnimation;
      let pageToBeSaved;

      const updatedPagesList = state.pages.map((page: IUserPage) => {
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

      return {
        ...state,
        pages: [...updatedPagesList],
        pageBeingSaved: pageToBeSaved,
        loading: false,
      };
    }

    case UserPagesActionTypes.UPDATE_COMPONENT_VISIBLE_DATE: {
      const pageId = action.payload.pageId as string;
      const componentId = action.payload.componentId as string;
      const dateTime = action.payload.dateTime as string;
      let pageToBeSaved;

      const updatedPagesList = state.pages.map((page: IUserPage) => {
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

      return {
        ...state,
        pages: [...updatedPagesList],
        pageBeingSaved: pageToBeSaved,
        loading: false,
      };
    }

    case UserPagesActionTypes.UPDATE_PAGE_FONT_COLOR: {
      const pageId = action.payload.pageId as string;
      const newColor = action.payload.newColor as string;
      let pageToBeSaved;

      const updatedPagesList = state.pages.map((page: IUserPage) => {
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

      return {
        ...state,
        pages: [...updatedPagesList],
        pageBeingSaved: pageToBeSaved,
        loading: false,
      };
    }

    case UserPagesActionTypes.UPDATE_COMPONENT_BACKGROUND_COLOR: {
      const pageId = action.payload.pageId as string;
      const componentId = action.payload.componentId as string;
      const newColor = action.payload.newColor as string;
      let pageToBeSaved;

      const updatedPagesList = state.pages.map((page: IUserPage) => {
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

      return {
        ...state,
        pages: [...updatedPagesList],
        pageBeingSaved: pageToBeSaved,
        loading: false,
      };
    }

    case UserPagesActionTypes.UPDATE_COMPONENT_FONT_COLOR: {
      const pageId = action.payload.pageId as string;
      const componentId = action.payload.componentId as string;
      const newColor = action.payload.newColor as string;
      let pageToBeSaved;

      const updatedPagesList = state.pages.map((page: IUserPage) => {
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

      return {
        ...state,
        pages: [...updatedPagesList],
        pageBeingSaved: pageToBeSaved,
        loading: false,
      };
    }

    case UserPagesActionTypes.INCREASE_MIDDLE_COMPONENT_INDEX_IN_PAGE: {
      const currentIndex = action.payload.currentIndex as number;
      const nextIndex = currentIndex + 1;
      const pageId = action.payload.pageId;
      let pageToBeSaved;

      const updatedPagesList = state.pages.map((page: IUserPage) => {
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

      return {
        ...state,
        pages: [...updatedPagesList],
        pageBeingSaved: pageToBeSaved,
        loading: false,
      };
    }

    case UserPagesActionTypes.DECREASE_MIDDLE_COMPONENT_INDEX_IN_PAGE: {
      const currentIndex = action.payload.currentIndex as number;
      const previousIndex = currentIndex - 1;
      const pageId = action.payload.pageId;
      let pageToBeSaved;

      const updatedPagesList = state.pages.map((page: IUserPage) => {
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

      return {
        ...state,
        pages: [...updatedPagesList],
        pageBeingSaved: pageToBeSaved,
        loading: false,
      };
    }

    case UserPagesActionTypes.DELETE_MIDDLE_COMPONENT_FROM_PAGE: {
      const updatedPagesList = action.payload;

      return {
        ...state,
        pages: [...updatedPagesList],
        loading: false,
      };
    }

    case UserPagesActionTypes.DELETE_TOP_COMPONENT_FROM_PAGE: {
      console.log("top action.payload: " + action.payload);
      const updatedPagesList = action.payload;

      return {
        ...state,
        pages: [...updatedPagesList],
        loading: false,
      };
    }

    case UserPagesActionTypes.DELETE_PAGE_SUCCESS: {
      const pageIdToDelete = action.payload;

      const updatedPages = state.pages.filter(
        (page: IUserPage) => page._id !== pageIdToDelete
      );

      return {
        ...state,
        pages: [...updatedPages],
        error: undefined,
        loading: false,
      };
    }

    case UserPagesActionTypes.ADD_MIDDLE_COMPONENT_IN_PAGE: {
      const pageId = action.payload.pageId;
      const component: IUserComponent = action.payload.component;
      let pageToBeSaved;

      const updatedPagesList = state.pages.map((page: IUserPage) => {
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
              loading: false,
            };
          }
        }
        return page;
      });

      return {
        ...state,
        pages: [...updatedPagesList],
        pageBeingSaved: pageToBeSaved,
      };
    }
    case UserPagesActionTypes.ADD_TOP_COMPONENT_IN_PAGE: {
      const pageId = action.payload.pageId;
      const component: IUserComponent = action.payload.component;
      let pageToBeSaved;

      const updatedPagesList = state.pages.map((page: IUserPage) => {
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

      return {
        ...state,
        pages: [...updatedPagesList],
        pageBeingSaved: pageToBeSaved,
        loading: false,
      };
    }

    case UserPagesActionTypes.UPDATE_COMPONENT_IMAGE_SUCCESS: {
      const pageId = action.payload.pageId as string;
      const componentId = action.payload.componentId as string;
      const url = action.payload.url as string;
      let pageToBeSaved;

      const updatedPagesList = state.pages.map((page: IUserPage) => {
        if (page._id === pageId && page.middleComponents) {
          const updatedComponents = page.middleComponents.map(
            (component: IUserComponent) => {
              if (component._id === componentId) {
                const updatedComponent: IUserComponent = {
                  ...component,
                  mediaUrl: `url(${url})`,
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

      return {
        ...state,
        pages: [...updatedPagesList],
        pageBeingSaved: pageToBeSaved,
        loading: false,
      };
    }

    case UserPagesActionTypes.CLEAR_STATE:
      return { ...initialState };

    default:
      return state;
  }
};

export default pagesReducer;
