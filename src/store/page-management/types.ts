export enum PageManagementTypes {
  SET_PAGE_BEING_MANAGED = "@page-management/SET_PAGE_BEING_MANAGED",
  CLEAR_PAGE_BEING_MANAGED = "@page-management/CLEAR_PAGE_BEING_MANAGED",
  CLEAR_STATE = "@page-management/CLEAR_STATE",
}

export interface IPageManagementState {
  pageId?: string;
}
