import strings from "../../localization";

const apiErrors: any = {
  "URL already exist.": strings.authErrors.urlAlreadyExists,
  "User exists with same username": strings.authErrors.userAlreadyExists,
  "auth/email-already-in-use": strings.authErrors.userAlreadyExists,
  "auth/wrong-password": strings.authErrors.invalidCredentials,
  "auth/user-not-found": strings.authErrors.userNotFound,
  "auth/invalid-email": strings.authErrors.invalidEmail,
  "auth/weak-password": strings.authErrors.weakPassword,
  "auth/invalid-token": strings.authErrors.invalidToken,
  "User has no subscriptions.":
    strings.subscriptionPayment.youHaveNoFinanceHistory,
};

export const translateError = (errorMsg: string) => {
  const errorFound = Object.keys(apiErrors).find((error) =>
    error.includes(errorMsg)
  );
  if (errorFound) return apiErrors[errorFound];
  return;
};
