import { configureStore } from "@reduxjs/toolkit";
import { IUserState } from "./user/types";
import userReducer from "./user/reducer";

export interface IApplicationState {
  user: IUserState;
}

const store = configureStore({
  reducer: { user: userReducer },
});

export default store;
