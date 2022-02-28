import { configureStore } from "@reduxjs/toolkit";

// Types
import { IUserState } from "./user/types";
import { IPageManagementState } from "./page-management/types";
import { IPageRenderedState } from "./page-renderer/types";

// Reducers
import userReducer from "./user/reducer";
import pageManagementReducer from "./page-management/reducer";
import pageRendererReducer from "./page-renderer/reducer";

export interface IApplicationState {
  user: IUserState;
  pageManagement: IPageManagementState;
  pageRendered: IPageRenderedState;
}

const store = configureStore({
  reducer: {
    user: userReducer,
    pageManagement: pageManagementReducer,
    pageRendered: pageRendererReducer,
  },
});

export default store;
