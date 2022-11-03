import { AxiosResponse } from "axios";
import { registrationApi } from "../../config/axios";

export const verifyRecaptcha = async (
  token: string
): Promise<AxiosResponse<any>> =>
  await registrationApi.post(`/verify-recaptcha`, {
    token,
  });
