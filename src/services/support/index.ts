import { AxiosResponse } from "axios";
import { registrationApi } from "../../config/axios";
import { IUserContact } from "../../store/support/types";

export const sendSupportEmail = async (
  userContact: IUserContact,
  recaptchaToken: string
): Promise<AxiosResponse<any>> =>
  await registrationApi.post(
    `/contact`,
    {
      name: userContact.name,
      email: userContact.email,
      message: userContact.message,
    },
    {
      headers: {
        "recaptcha-token": recaptchaToken,
      },
    }
  );
