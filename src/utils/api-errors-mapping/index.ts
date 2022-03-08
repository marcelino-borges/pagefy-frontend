import strings from "../../localization";

const apiErrors: any = {
  "Password policy not met": strings.passwordPolicyNotMet,
  "User exists with same username": strings.userAlreadyExists,
};

export const translateError = (errorMsg: string) => {
  return apiErrors[errorMsg];
};
