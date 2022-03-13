export enum SharedActionTypes {
  SET_LOADING = "@shared/SET_LOADING",
  CLEAR_LOADING = "@shared/CLEAR_LOADING",
}

export interface IAction {
  payload?: any;
  type: any;
}

export interface IAppResult {
  message: string;
  errorDetails: string;
  statusCode: number;
}

export enum UserStorageFolder {
  PROFILE = "profile",
  PAGES = "pages",
}

export interface ISharedState {
  loading: boolean;
}
