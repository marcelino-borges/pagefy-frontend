export enum UserPagesActionTypes {
  UPDATE_USER_PAGE_NAME = "@user-pages/UPDATE_USER_PAGE_NAME",
  UPDATE_USER_PAGE_URL = "@user-pages/UPDATE_USER_PAGE_URL",
  TOGGLE_COMPONENT_VISIBILITY = "@user-pages/TOGGLE_COMPONENT_VISIBILITY",
  TOGGLE_PAGE_IS_PUBLIC = "@user-pages/TOGGLE_PAGE_IS_PUBLIC",
  UPDATE_COMPONENT_LABEL = "@user-pages/UPDATE_COMPONENT_LABEL",
  UPDATE_COMPONENT_URL = "@user-pages/UPDATE_COMPONENT_URL",
  UPDATE_COMPONENT_BACKGROUND_COLOR = "@user-pages/UPDATE_COMPONENT_BACKGROUND_COLOR",
  UPDATE_COMPONENT_FONT_COLOR = "@user-pages/UPDATE_COMPONENT_FONT_COLOR",
  UPDATE_COMPONENT_ANIMATION = "@user-pages/UPDATE_COMPONENT_ANIMATION",
  UPDATE_COMPONENT_VISIBLE_DATE = "@user-pages/UPDATE_COMPONENT_VISIBLE_DATE",
  UPDATE_PAGE_BACKGROUND_COLOR = "@user-pages/UPDATE_PAGE_BACKGROUND_COLOR",
  UPDATE_PAGE_FONT_COLOR = "@user-pages/UPDATE_PAGE_FONT_COLOR",
  INCREASE_MIDDLE_COMPONENT_INDEX_IN_PAGE = "@user-pages/INCREASE_MIDDLE_COMPONENT_INDEX_IN_PAGE",
  DECREASE_MIDDLE_COMPONENT_INDEX_IN_PAGE = "@user-pages/DECREASE_MIDDLE_COMPONENT_INDEX_IN_PAGE",
  ADD_TOP_COMPONENT_IN_PAGE = "@user-pages/ADD_TOP_COMPONENT_IN_PAGE",
  ADD_MIDDLE_COMPONENT_IN_PAGE = "@user-pages/ADD_MIDDLE_COMPONENT_IN_PAGE",
  DELETE_MIDDLE_COMPONENT_FROM_PAGE = "@user-pages/DELETE_MIDDLE_COMPONENT_FROM_PAGE",
  DELETE_TOP_COMPONENT_FROM_PAGE = "@user-pages/DELETE_TOP_COMPONENT_FROM_PAGE",
  DELETE_PAGE = "@user-pages/DELETE_PAGE",
  CREATE_PAGE = "@user-pages/CREATE_PAGE",
}

export interface IUserPage {
  _id?: string;
  userId: string;
  name: string;
  url: string;
  pageImageUrl?: string;
  isPublic: boolean;
  views: number;
  style?: IComponentStyle;
  topComponents?: IUserComponent[];
  middleComponents?: IUserComponent[];
  bottomComponents?: IUserComponent[];
}

export interface IUserComponent {
  _id?: string;
  text?: string;
  url?: string;
  style?: IComponentStyle;
  visible: boolean;
  clicks: number;
  layout: IComponentLayout;
  type: ComponentType;
  mediaUrl?: string;
  iconDetails?: IIconDetails;
  visibleDate?: string;
  launchDate?: string;
  animation?: IComponentAnimation;
}

export interface IComponentAnimation {
  name: string;
  startDelay: number;
  duration: number;
  infinite: boolean;
}

export interface IComponentLayout {
  rows: number;
  columns: number;
}

export interface IIconDetails {
  userFriendlyName: string;
  icon: string;
}

export interface IComponentStyle {
  backgroundColor?: string;
  backgroundImage?: string;
  backgroundSize?: string;
  backgroundPosition?: string;
  color?: string;
}

export const enum ComponentType {
  Text = 0,
  Image = 1,
  TextImage = 2,
  Icon = 3,
  Video = 4,
  Launch = 5,
}

export interface IUserPagesState {
  loading: boolean;
  error?: any;
  pages?: IUserPage[];
}
