export enum SupportTypes {
  SEND_EMAIL_SUPPORT_LOADING = "@user/SEND_EMAIL_SUPPORT_LOADING",
  SEND_EMAIL_SUPPORT_SUCCESS = "@user/SEND_EMAIL_SUPPORT_SUCCESS",
  SEND_EMAIL_SUPPORT_ERROR = "@user/SEND_EMAIL_SUPPORT_ERROR",
  CLEAR_SUPPORT_STATE = "@user/CLEAR_SUPPORT_STATE",
}

export interface IUserContact {
  name: string;
  email: string;
  message: string;
}

export interface SentUserContactResult {
  envelope: any;
  messageId: string;
  accepted: any;
  rejected: any;
  pending: any;
  response: string;
}

export interface ISupportState {
  loading: boolean;
  error?: any;
  success?: boolean;
}
