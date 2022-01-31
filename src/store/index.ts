import { configureStore } from "@reduxjs/toolkit";
import { IUserState } from "./user/types";
import userReducer from "./user/reducer";
import pageManagementReducer from "./page-management/reducer";
import { IPageManagementState } from "./page-management/types";

export interface IApplicationState {
  user: IUserState;
  pageManagement: IPageManagementState;
}

const store = configureStore({
  reducer: { user: userReducer, pageManagement: pageManagementReducer },
});

export default store;
