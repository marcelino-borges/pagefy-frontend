export enum UserActionTypes {
  GET_USER_SUCCESS = "@user/GET_USER_SUCCESS",
  GET_USER_ERROR = "@user/GET_USER_ERROR",
  UPDATE_USER_PAGE_NAME = "@user/UPDATE_USER_PAGE_NAME",
  TOGGLE_COMPONENT_VISIBILITY = "@user/TOGGLE_COMPONENT_VISIBILITY",
  UPDATE_COMPONENT_LABEL = "@user/UPDATE_COMPONENT_LABEL",
  UPDATE_COMPONENT_URL = "@user/UPDATE_COMPONENT_URL",
  INCREASE_COMPONENT_INDEX_IN_PAGE = "@user/INCREASE_COMPONENT_INDEX_IN_PAGE",
  DECREASE_COMPONENT_INDEX_IN_PAGE = "@user/DECREASE_COMPONENT_INDEX_IN_PAGE",
  ADD_COMPONENT_IN_PAGE = "@user/ADD_COMPONENT_IN_PAGE",
  DELETE_COMPONENT_FROM_PAGE = "@user/DELETE_COMPONENT_FROM_PAGE",
}

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  profileImageUrl?: string;
  pages: IUserPage[];
}

export interface IUserPage {
  _id: string;
  name: string;
  url: string;
  pageImageUrl?: string;
  views: number;
  components: IUserComponent[];
}

export interface IUserComponent {
  _id?: string;
  label?: string;
  url: string;
  style?: IComponentStyle;
  visible: boolean;
  clicks: number;
  layout: {
    rows: number;
    columns: number;
  };
  type: ComponentType;
  mediaUrl?: string;
  iconDetails?: IIconDetails;
}

export interface IIconDetails {
  packName: string;
  nameInPack: string;
  indexInPack: number;
}

export interface IComponentStyle {
  backgroundColor?: string;
  color?: string;
}

export enum ComponentType {
  Text,
  Image,
  TextImage,
  Icon,
  Video,
}

export interface IUserState {
  loading: boolean;
  error?: any;
  profile?: IUser;
}
