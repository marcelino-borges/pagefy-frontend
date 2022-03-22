export enum PurchaseTypes {
  SET_VALUE = "@purchase/SET_VALUE",
}

export interface IPurchaseState {
  loading: boolean;
  error?: any;
  value?: number;
}
