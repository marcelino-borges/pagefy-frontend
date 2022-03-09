import strings from "../../localization";

const apiErrors: any = {
  "URL already exist.": strings.urlAlreadyExists,
  "User exists with same username": strings.userAlreadyExists,
};

export const translateError = (errorMsg: string) => {
  return apiErrors[errorMsg];
};
