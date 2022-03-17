import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  createTransform,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

// Types
import { IUserState } from "./user/types";
import { IUserPagesState } from "./user-pages/types";
import { IPageManagementState } from "./page-management/types";
import { IPageRenderedState } from "./page-renderer/types";
import { IAuthState } from "./auth/types";
import { ISharedState } from "./shared/types";

// Reducers
import userReducer from "./user/reducer";
import pageManagementReducer from "./page-management/reducer";
import pageRendererReducer from "./page-renderer/reducer";
import userPagesReducer from "./user-pages/reducer";
import authReducer from "./auth/reducer";
import sharedReducer from "./shared/reducer";

export interface IApplicationState {
  auth: IAuthState;
  user: IUserState;
  userPages: IUserPagesState;
  pageManagement: IPageManagementState;
  pageRendered: IPageRenderedState;
  shared: ISharedState;
}

let blacklistTransform = createTransform((inboundState: any, key: any) => {
  let state = { ...inboundState };

  if (state["loading"]) {
    state["loading"] = false;
  }

  return state;
});

const persistConfig = {
  key: "appState",
  storage: storage,
  blacklist: ["pageRendered"],
  transforms: [blacklistTransform],
};

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  userPages: userPagesReducer,
  pageManagement: pageManagementReducer,
  pageRendered: pageRendererReducer,
  shared: sharedReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;
