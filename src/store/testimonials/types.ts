import { IUser } from "../user/types";

export enum TestimonialTypes {
  CREATE_TESTIMONIAL_LOADING = "@testimonials/CREATE_TESTIMONIAL_LOADING",
  CREATE_TESTIMONIAL_ERROR = "@testimonials/CREATE_TESTIMONIAL_ERROR",
  CREATE_TESTIMONIAL_SUCCESS = "@testimonials/CREATE_TESTIMONIAL_SUCCESS",

  GET_ALL_USER_TESTIMONIALS_LOADING = "@testimonials/GET_ALL_USER_TESTIMONIALS_LOADING",
  GET_ALL_USER_TESTIMONIALS_ERROR = "@testimonials/GET_ALL_USER_TESTIMONIALS_ERROR",
  GET_ALL_USER_TESTIMONIALS_SUCCESS = "@testimonials/GET_ALL_USER_TESTIMONIALS_SUCCESS",

  GET_LAST_USER_TESTIMONIAL_LOADING = "@testimonials/GET_LAST_USER_TESTIMONIAL_LOADING",
  GET_LAST_USER_TESTIMONIAL_ERROR = "@testimonials/GET_LAST_USER_TESTIMONIAL_ERROR",
  GET_LAST_USER_TESTIMONIAL_SUCCESS = "@testimonials/GET_LAST_USER_TESTIMONIAL_SUCCESS",

  GET_ALL_TESTIMONIALS_LOADING = "@testimonials/GET_ALL_TESTIMONIALS_LOADING",
  GET_ALL_TESTIMONIALS_ERROR = "@testimonials/GET_ALL_TESTIMONIALS_ERROR",
  GET_ALL_TESTIMONIALS_SUCCESS = "@testimonials/GET_ALL_TESTIMONIALS_SUCCESS",

  UPDATE_TESTIMONIAL_LOADING = "@testimonials/UPDATE_TESTIMONIAL_LOADING",
  UPDATE_TESTIMONIAL_ERROR = "@testimonials/UPDATE_TESTIMONIAL_ERROR",
  UPDATE_TESTIMONIAL_SUCCESS = "@testimonials/UPDATE_TESTIMONIAL_SUCCESS",

  DELETE_TESTIMONIAL_LOADING = "@testimonials/DELETE_TESTIMONIAL_LOADING",
  DELETE_TESTIMONIAL_ERROR = "@testimonials/DELETE_TESTIMONIAL_ERROR",
  DELETE_TESTIMONIAL_SUCCESS = "@testimonials/DELETE_TESTIMONIAL_SUCCESS",

  CLEAR_TESTIMONIAL_STATE = "@testimonials/GET_LAST_USER_TESTIMONIAL_SUCCESS",
}

export interface ITestimonial {
  _id?: string;
  user: Partial<IUser> | string;
  testimonial: string;
  pictureUrl?: string;
  videoUrl?: string;
  rating: number;
  language?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface ITestimonialState {
  loading: boolean;
  error?: any;
  userTestimonials?: ITestimonial[];
  allTestimonials?: ITestimonial[];
}
