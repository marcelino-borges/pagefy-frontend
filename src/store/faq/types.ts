export enum FaqTypes {
  GET_ALL_FAQS_LOADING = "@testimonials/GET_ALL_FAQS_LOADING",
  GET_ALL_FAQS_ERROR = "@testimonials/GET_ALL_FAQS_ERROR",
  GET_ALL_FAQS_SUCCESS = "@testimonials/GET_ALL_FAQS_SUCCESS",
}
export interface IFaq {
  _id?: string;
  question: string;
  answer: any;
  createdAt?: string;
  updatedAt?: string;
}

export interface IFaqState {
  loading: boolean;
  error?: any;
  faqs: IFaq[];
}
