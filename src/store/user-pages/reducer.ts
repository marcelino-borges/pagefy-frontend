import { moveElementInArrayFromToIndex } from "../../utils";
import { IAction } from "../shared";
import {
  IComponentAnimation,
  IUserComponent,
  IUserPage,
  IUserPagesState,
  UserPagesActionTypes,
} from "./types";

const initialState: IUserPagesState = {
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
      };
    }

    case UserPagesActionTypes.UPDATE_PAGE_SUCCESS: {
      return {
        ...state,
        error: undefined,
        pageBeingSaved: undefined,
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
