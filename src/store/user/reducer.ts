import { IAction } from "../shared";
import { IUserPage, IUserState, UserActionTypes } from "./types";

const mockUser = {
  firstName: "Marcelino",
  lastName: "Borges",
  email: "botelho_gt@hotmail.com",
  pages: [
    {
      _id: "1",
      name: "Página 1",
      url: "pg1/pg1/pg1/pg1/pg1/pg1/pg1/pg1",
      views: 0,
      pageImageUrl:
        "https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Zm9jdXN8ZW58MHx8MHx8&w=1000&q=80",
      components: [
        {
          label: "Devbox",
          url: "http://www.devbox.eng.br",
          style: "",
          _id: "1",
          visible: true,
          clicks: 0,
        },
        {
          label: "Portfolio",
          url: "http://www.devbox.eng.br",
          style: "",
          _id: "2",
          visible: true,
          clicks: 0,
        },
        {
          label: "Curriculum Vitae",
          url: "http://www.devbox.eng.br",
          style: "",
          _id: "3",
          visible: true,
          clicks: 0,
        },
        {
          label: "HTBAD",
          url: "http://www.devbox.eng.br",
          style: "",
          _id: "4",
          visible: true,
          clicks: 0,
        },
        {
          label: "Devbox",
          url: "http://www.devbox.eng.br",
          style: "",
          _id: "5",
          visible: true,
          clicks: 0,
        },
        {
          label: "Portfolio",
          url: "http://www.devbox.eng.br",
          style: "",
          _id: "6",
          visible: true,
          clicks: 0,
        },
        {
          label: "Curriculum Vitae",
          url: "http://www.devbox.eng.br",
          style: "",
          _id: "7",
          visible: true,
          clicks: 0,
        },
        {
          label: "HTBAD",
          url: "http://www.devbox.eng.br",
          style: "",
          _id: "8",
          visible: true,
          clicks: 0,
        },
        {
          label: "Devbox",
          url: "http://www.devbox.eng.br",
          style: "",
          _id: "9",
          visible: true,
          clicks: 0,
        },
        {
          label: "Portfolio",
          url: "http://www.devbox.eng.br",
          style: "",
          _id: "10",
          visible: true,
          clicks: 0,
        },
        {
          label: "Curriculum Vitae",
          url: "http://www.devbox.eng.br",
          style: "",
          _id: "11",
          visible: true,
          clicks: 0,
        },
        {
          label: "HTBAD",
          url: "http://www.devbox.eng.br",
          style: "",
          _id: "12",
          visible: true,
          clicks: 0,
        },
      ],
    },
    {
      _id: "2",
      name: "Página 2",
      url: "pg2",
      views: 0,
      pageImageUrl:
        "https://static.remove.bg/remove-bg-web/a6eefcd21dff1bbc2448264c32f7b48d7380cb17/assets/start-1abfb4fe2980eabfbbaaa4365a0692539f7cd2725f324f904565a9a744f8e214.jpg",

      components: [
        {
          label: "Devbox",
          url: "http://www.devbox.eng.br",
          style: "",
          _id: "1",
          visible: true,
          clicks: 0,
        },
        {
          label: "Portfolio",
          url: "http://www.devbox.eng.br",
          style: "",
          _id: "2",
          visible: true,
          clicks: 0,
        },
        {
          label: "Curriculum Vitae",
          url: "http://www.devbox.eng.br",
          style: "",
          _id: "3",
          visible: true,
          clicks: 0,
        },
        {
          label: "HTBAD",
          url: "http://www.devbox.eng.br",
          style: "",
          _id: "4",
          visible: true,
          clicks: 0,
        },
        {
          label: "Devbox",
          url: "http://www.devbox.eng.br",
          style: "",
          _id: "5",
          visible: true,
          clicks: 0,
        },
        {
          label: "Portfolio",
          url: "http://www.devbox.eng.br",
          style: "",
          _id: "6",
          visible: true,
          clicks: 0,
        },
        {
          label: "Curriculum Vitae",
          url: "http://www.devbox.eng.br",
          style: "",
          _id: "7",
          visible: true,
          clicks: 0,
        },
        {
          label: "HTBAD",
          url: "http://www.devbox.eng.br",
          style: "",
          _id: "8",
          visible: true,
          clicks: 0,
        },
        {
          label: "Devbox",
          url: "http://www.devbox.eng.br",
          style: "",
          _id: "9",
          visible: true,
          clicks: 0,
        },
        {
          label: "Portfolio",
          url: "http://www.devbox.eng.br",
          style: "",
          _id: "10",
          visible: true,
          clicks: 0,
        },
        {
          label: "Curriculum Vitae",
          url: "http://www.devbox.eng.br",
          style: "",
          _id: "11",
          visible: true,
          clicks: 0,
        },
        {
          label: "HTBAD",
          url: "http://www.devbox.eng.br",
          style: "",
          _id: "12",
          visible: true,
          clicks: 0,
        },
      ],
    },
  ],
};

const initialState: IUserState = {
  loading: false,
  error: undefined,
  profile: mockUser,
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
      let updatedPagesList: IUserPage[] = [...state.profile.pages];
      updatedPagesList = updatedPagesList.map((page: IUserPage) => {
        if (page._id === action.payload.pageId) {
          return {
            ...page,
            name: action.payload.newName,
          };
        }
        return page;
      });

      console.log("state: ", state);
      console.log("updatedPagesList: ", updatedPagesList);
      return {
        ...state,
        profile: {
          ...state.profile,
          pages: [...updatedPagesList],
        },
      };
    }

    default:
      return state;
  }
};

export default userReducer;
