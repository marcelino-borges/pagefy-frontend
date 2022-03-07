import { configureStore } from "@reduxjs/toolkit";

// Types
import { IUserState } from "./user/types";
import { IUserPagesState } from "./user-pages/types";
import { IPageManagementState } from "./page-management/types";
import { IPageRenderedState } from "./page-renderer/types";
import { IAuthState } from "./auth/types";

// Reducers
import userReducer from "./user/reducer";
import pageManagementReducer from "./page-management/reducer";
import pageRendererReducer from "./page-renderer/reducer";
import userPagesReducer from "./user-pages/reducer";
import authReducer from "./auth/reducer";

export interface IApplicationState {
  auth: IAuthState;
  user: IUserState;
  userPages: IUserPagesState;
  pageManagement: IPageManagementState;
  pageRendered: IPageRenderedState;
}

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    userPages: userPagesReducer,
    pageManagement: pageManagementReducer,
    pageRendered: pageRendererReducer,
  },
});

export default store;
