export enum UserActionTypes {
  GET_USER_SUCCESS = "@user/GET_USER_SUCCESS",
  GET_USER_ERROR = "@user/GET_USER_ERROR",
  UPDATE_USER_PAGE_NAME = "@user/UPDATE_USER_PAGE_NAME",
}

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  profileImageUrl?: string;
  pages: IUserPage[];
}

export interface IUserPage {
  _id?: string;
  name: string;
  url: string;
  pageImageUrl?: string;
  views: number;
  components: IUserComponent[];
}

export interface IUserComponent {
  _id: string | undefined;
  label: string;
  url: string;
  style: string | undefined;
  visible: boolean;
  clicks: number;
  layout: {
    rows: number;
    columns: number;
  };
  type: ComponentType;
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
