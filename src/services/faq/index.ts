import { AxiosResponse } from "axios";
import { registrationApi } from "../../config/axios";

export const getAllFaqs = async (
  language: string
): Promise<AxiosResponse<any>> => {
  return registrationApi.get(`/faqs?language=${language}`);
};
