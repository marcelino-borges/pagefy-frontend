import axios, { AxiosResponse } from "axios";
import { IUserContact } from "../../store/support/types";

const api = axios.create({
  baseURL: `${process.env.REACT_APP_REGISTRATION_ENDPOINT}`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const sendSupportEmail = async (
  userContact: IUserContact,
  recaptchaToken: string
): Promise<AxiosResponse<any>> =>
  await api.post(
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
