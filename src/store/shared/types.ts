export enum SharedActionTypes {
  SET_LOADING = "@shared/SET_LOADING",
  CLEAR_LOADING = "@shared/CLEAR_LOADING",
  INCREMENT_CONTINUOUS_TIME_LOADING = "@shared/INCREMENT_CONTINUOUS_TIME_LOADING",
  CLEAR_CONTINUOUS_TIME_LOADING = "@shared/CLEAR_CONTINUOUS_TIME_LOADING",
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
  UPLOADED_IMAGES = "uploaded-images",
}

export interface ISharedState {
  loading: boolean;
  continuousTimeLoading: number;
}
