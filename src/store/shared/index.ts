export interface IAction {
  payload?: any;
  type: any;
}

export interface IAppResult {
  message: string;
  errorDetails: string;
  statusCode: number;
}
