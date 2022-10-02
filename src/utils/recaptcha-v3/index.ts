import { AxiosResponse } from "axios";
import { RECAPTCHA_SITE_KEY } from "../../constants";
import { verifyRecaptcha } from "../../services/recaptcha";

export const setRecaptchaScript = (document: any): void => {
  const script = document.createElement("script");
  script.src =
    "https://www.google.com/recaptcha/api.js?render=" + RECAPTCHA_SITE_KEY;
  document.body.appendChild(script);
};

export const callRecaptcha = (
  window: any,
  successCallback: (token?: string | undefined) => void | null
): void => {
  (window as any).grecaptcha.ready(function () {
    (window as any).grecaptcha
      .execute(RECAPTCHA_SITE_KEY, { action: "submit" })
      .then((token: any) => {
        successCallback(token);
      });
  });
};

export const runAfterValidateRecaptcha = (
  window: any,
  onValidatedCallback: () => void,
  onErrorCallback?: (errors: string[]) => void
): void => {
  callRecaptcha(window, (token?: string) => {
    if (token) {
      verifyRecaptcha(token)
        .then((result: AxiosResponse) => {
          if (result.status === 200) {
            onValidatedCallback();
          } else {
            if (onErrorCallback) onErrorCallback(result.data);
          }
        })
        .catch((error: any) => {
          if (onErrorCallback) onErrorCallback(error);
        });
    }
  });
};
