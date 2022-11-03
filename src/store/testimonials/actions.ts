import * as TestimonialService from "./../../services/testimonials";
import { AxiosError, AxiosResponse } from "axios";
import { IAppResult } from "../shared/types";
import strings from "../../localization";
import { ITestimonial, TestimonialTypes } from "./types";

export const createTestimonial =
  (
    testimonial: ITestimonial,
    onSuccessCallback:
      | ((createdTestimonial: ITestimonial) => void)
      | null = null,
    onErrorCallback: ((e: AxiosError) => void) | null = null
  ) =>
  async (dispatch: any) => {
    dispatch(createTestimonialLoading());

    TestimonialService.createTestimonial(testimonial)
      .then((res: AxiosResponse) => {
        const createdTestimonial: ITestimonial = res.data;
        dispatch(createTestimonialSuccess(createdTestimonial));

        if (onSuccessCallback) onSuccessCallback(createdTestimonial);
      })
      .catch((e: AxiosError) => {
        dispatch(createTestimonialError(e.message));
        if (onErrorCallback) onErrorCallback(e);
      });
  };

const createTestimonialLoading = () => ({
  type: TestimonialTypes.CREATE_TESTIMONIAL_LOADING,
});

const createTestimonialSuccess = (testimonial: ITestimonial) => ({
  payload: testimonial,
  type: TestimonialTypes.CREATE_TESTIMONIAL_SUCCESS,
});

const createTestimonialError = (error: string) => ({
  payload: error,
  type: TestimonialTypes.CREATE_TESTIMONIAL_ERROR,
});

export const getAllUserTestimonials =
  (
    userId: string,
    onSuccessCallback: any = null,
    onErrorCallback: any = null
  ) =>
  async (dispatch: any) => {
    dispatch(getAllUserTestimonialsLoading());

    TestimonialService.getAllTestimonials(userId)
      .then((res: AxiosResponse) => {
        const testimonials: ITestimonial[] = res.data;
        dispatch(getAllUserTestimonialsSuccess(testimonials));

        if (onSuccessCallback) onSuccessCallback(testimonials);
      })
      .catch((e: AxiosError) => {
        const error: IAppResult = e.response?.data;
        dispatch(getAllUserTestimonialsError(error.message));

        if (error && error.errorDetails) {
          if (onErrorCallback)
            onErrorCallback(strings.errorSendingSupportContact);
        }
      });
  };

const getAllUserTestimonialsLoading = () => ({
  type: TestimonialTypes.GET_ALL_USER_TESTIMONIALS_LOADING,
});

const getAllUserTestimonialsSuccess = (testimonials: ITestimonial[]) => ({
  payload: testimonials,
  type: TestimonialTypes.GET_ALL_USER_TESTIMONIALS_SUCCESS,
});

const getAllUserTestimonialsError = (error: string) => ({
  payload: error,
  type: TestimonialTypes.GET_ALL_USER_TESTIMONIALS_ERROR,
});

export const updateTestimonial =
  (
    testimonial: ITestimonial,
    onSuccessCallback:
      | ((updatedTestimonial: ITestimonial) => void)
      | null = null,
    onErrorCallback: ((e: AxiosError) => void) | null = null
  ) =>
  async (dispatch: any) => {
    dispatch(updateTestimonialLoading());

    TestimonialService.updateTestimonial(testimonial)
      .then((res: AxiosResponse) => {
        const updatedTestimonial: ITestimonial = res.data;
        dispatch(updateTestimonialSuccess(updatedTestimonial));

        if (onSuccessCallback) onSuccessCallback(updatedTestimonial);
      })
      .catch((e: AxiosError) => {
        dispatch(updateTestimonialError(e.message));
        if (onErrorCallback) onErrorCallback(e);
      });
  };

const updateTestimonialLoading = () => ({
  type: TestimonialTypes.UPDATE_TESTIMONIAL_LOADING,
});

const updateTestimonialSuccess = (testimonial: ITestimonial) => ({
  payload: testimonial,
  type: TestimonialTypes.UPDATE_TESTIMONIAL_SUCCESS,
});

const updateTestimonialError = (error: string) => ({
  payload: error,
  type: TestimonialTypes.UPDATE_TESTIMONIAL_ERROR,
});

export const deleteTestimonial =
  (
    testimonialId: string,
    onSuccessCallback:
      | ((deletedTestimonial: ITestimonial) => void)
      | null = null,
    onErrorCallback: ((e: AxiosError) => void) | null = null
  ) =>
  async (dispatch: any) => {
    dispatch(deleteTestimonialLoading());

    TestimonialService.deleteTestimonial(testimonialId)
      .then((res: AxiosResponse) => {
        const deletedTestimonial: ITestimonial = res.data;
        dispatch(deleteTestimonialSuccess(testimonialId));

        if (onSuccessCallback) onSuccessCallback(deletedTestimonial);
      })
      .catch((e: AxiosError) => {
        dispatch(deleteTestimonialError(e.message));
        if (onErrorCallback) onErrorCallback(e);
      });
  };

const deleteTestimonialLoading = () => ({
  type: TestimonialTypes.DELETE_TESTIMONIAL_LOADING,
});

const deleteTestimonialSuccess = (testimonialId: string) => ({
  payload: testimonialId,
  type: TestimonialTypes.DELETE_TESTIMONIAL_SUCCESS,
});

const deleteTestimonialError = (error: string) => ({
  payload: error,
  type: TestimonialTypes.DELETE_TESTIMONIAL_ERROR,
});

export const clearSupportState = () => ({
  type: TestimonialTypes.CLEAR_TESTIMONIAL_STATE,
});
