import { AxiosResponse } from "axios";
import { registrationApi } from "../../config/axios";
import { ITestimonial } from "../../store/testimonials/types";

export const createTestimonial = async (
  testimonial: ITestimonial
): Promise<AxiosResponse<any>> => {
  return registrationApi.post(`/testimonials`, testimonial);
};

export const getAllTestimonials = async (
  userId: string
): Promise<AxiosResponse<any>> => {
  return registrationApi.get(`/testimonials/all/user/${userId}`);
};

export const getLastTestimonial = async (
  userId: string
): Promise<AxiosResponse<any>> => {
  return registrationApi.get(`/testimonials/last/user/${userId}`);
};

export const updateTestimonial = async (
  testimonial: ITestimonial
): Promise<AxiosResponse<any>> => {
  return registrationApi.put("/testimonials/", testimonial);
};

export const deleteTestimonial = async (
  testimonialId: string
): Promise<AxiosResponse<any>> => {
  return registrationApi.delete(`/testimonials/${testimonialId}`);
};
