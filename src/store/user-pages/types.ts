export enum UserPagesActionTypes {
  // Update page name
  UPDATE_USER_PAGE_NAME_LOADING = "@user-pages/UPDATE_USER_PAGE_NAME_LOADING",
  UPDATE_USER_PAGE_NAME_SUCCESS = "@user-pages/UPDATE_USER_PAGE_NAME_SUCCESS",
  UPDATE_USER_PAGE_NAME_ERROR = "@user-pages/UPDATE_USER_PAGE_NAME_ERROR",
  //Update page url
  UPDATE_USER_PAGE_URL_LOADING = "@user-pages/UPDATE_USER_PAGE_URL_LOADING",
  UPDATE_USER_PAGE_URL_SUCCESS = "@user-pages/UPDATE_USER_PAGE_URL_SUCCESS",
  UPDATE_USER_PAGE_URL_ERROR = "@user-pages/UPDATE_USER_PAGE_URL_ERROR",
  //
  TOGGLE_COMPONENT_VISIBILITY = "@user-pages/TOGGLE_COMPONENT_VISIBILITY",
  TOGGLE_PAGE_IS_PUBLIC = "@user-pages/TOGGLE_PAGE_IS_PUBLIC",
  //Components
  UPDATE_COMPONENT_LABEL = "@user-pages/UPDATE_COMPONENT_LABEL",
  UPDATE_COMPONENT_URL = "@user-pages/UPDATE_COMPONENT_URL",
  UPDATE_COMPONENT_PROGRESS_VALUE = "@user-pages/UPDATE_COMPONENT_PROGRESS_VALUE",
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
  //Delete page
  DELETE_PAGE_LOADING = "@user-pages/DELETE_PAGE_LOADING",
  DELETE_PAGE_SUCCESS = "@user-pages/DELETE_PAGE_SUCCESS",
  DELETE_PAGE_ERROR = "@user-pages/DELETE_PAGE_ERROR",
  //Create page
  CREATE_PAGE_LOADING = "@user-pages/CREATE_PAGE_LOADING",
  CREATE_PAGE_SUCCESS = "@user-pages/CREATE_PAGE_SUCCESS",
  CREATE_PAGE_ERROR = "@user-pages/CREATE_PAGE_ERROR",
  //Update page
  UPDATE_PAGE_LOADING = "@user-pages/UPDATE_PAGE_LOADING",
  UPDATE_PAGE_SUCCESS = "@user-pages/UPDATE_PAGE_SUCCESS",
  UPDATE_PAGE_ERROR = "@user-pages/UPDATE_PAGE_ERROR",
  //GET ALL USER PAGES
  GET_ALL_USER_PAGES_LOADING = "@user-pages/GET_ALL_USER_PAGES_LOADING",
  GET_ALL_USER_PAGES_SUCCESS = "@user-pages/GET_ALL_USER_PAGES_SUCCESS",
  GET_ALL_USER_PAGES_ERROR = "@user-pages/GET_ALL_USER_PAGES_ERROR",
  SET_PAGE_TO_BE_SAVED = "@user-pages/SET_PAGE_TO_BE_SAVED",
  //Upload page image
  UPDATE_PAGE_IMAGE_LOADING = "@user-pages/UPDATE_PAGE_IMAGE_LOADING",
  UPDATE_PAGE_IMAGE_SUCCESS = "@user-pages/UPDATE_PAGE_IMAGE_SUCCESS",
  UPDATE_PAGE_IMAGE_ERROR = "@user-pages/UPDATE_PAGE_IMAGE_ERROR",
  //Upload page background image
  UPDATE_PAGE_BG_IMAGE_LOADING = "@user-pages/UPDATE_PAGE_BG_IMAGE_LOADING",
  UPDATE_PAGE_BG_IMAGE_SUCCESS = "@user-pages/UPDATE_PAGE_BG_IMAGE_SUCCESS",
  UPDATE_PAGE_BG_IMAGE_ERROR = "@user-pages/UPDATE_PAGE_BG_IMAGE_ERROR",
  //Upload component page
  UPDATE_COMPONENT_IMAGE_LOADING = "@user-pages/UPDATE_COMPONENT_IMAGE_LOADING",
  UPDATE_COMPONENT_IMAGE_SUCCESS = "@user-pages/UPDATE_COMPONENT_IMAGE_SUCCESS",
  UPDATE_COMPONENT_IMAGE_ERROR = "@user-pages/UPDATE_COMPONENT_IMAGE_ERROR",

  CLEAR_STATE = "@user-pages/CLEAR_STATE",
}

export interface IUserPage {
  _id?: string;
  userId: string;
  name: string;
  url: string;
  pageImageUrl?: string;
  isPublic: boolean;
  views: number;
  style?: IHtmlStyle;
  topComponents?: IUserComponent[];
  middleComponents?: IUserComponent[];
  bottomComponents?: IUserComponent[];
  customScripts?: {
    header?: string;
    endBody?: string;
  };
}

export interface IUserComponent {
  _id?: string;
  text?: string;
  url?: string;
  style?: IHtmlStyle;
  visible: boolean;
  clicks: number;
  layout: IComponentLayout;
  type: ComponentType;
  mediaUrl?: string;
  iconDetails?: IIconDetails;
  visibleDate?: string;
  launchDate?: string;
  animation?: IComponentAnimation;
  progressValue?: number;
  counters?: ICounter[];
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

export interface IHtmlStyle {
  backgroundColor?: string;
  backgroundImage?: string;
  backgroundSize?: string;
  backgroundPosition?: string;
  color?: string;
  borderRadius?: string;
  boxShadow?: string;
}

export const enum ComponentType {
  Text = 0,
  Image = 1,
  TextImage = 2,
  Icon = 3,
  Video = 4,
  Launch = 5,
  TextOverImage = 6,
  Map = 7,
  Spotify = 8,
  ProgressBar = 9,
  Counter = 10,
}

export interface ICounter {
  number: number;
  label: string;
}

export interface IUserPagesState {
  loading: boolean;
  error?: any;
  pages: IUserPage[];
  pageBeingSaved?: IUserPage;
}
