import strings from "../../localization";

const apiErrors: any = {
  "URL already exist.": strings.urlAlreadyExists,
  "User exists with same username": strings.userAlreadyExists,
  "auth/email-already-in-use": strings.userAlreadyExists,
  "auth/wrong-password": strings.invalidCredentials,
};

export const translateError = (errorMsg: string) => {
  return apiErrors[errorMsg];
};
