import strings from "../../../localization";
import CookiesPoliciesPTBR from "./cookies-pt-br";
import CookiesPoliciesEN from "./cookies-en";

export const getCookiesByLanguage = () => {
  const language = strings.getLanguage();
  switch (language) {
    case "pt":
      return <CookiesPoliciesPTBR />;
    case "en":
      return <CookiesPoliciesEN />;
    default:
      return <CookiesPoliciesEN />;
  }
};
