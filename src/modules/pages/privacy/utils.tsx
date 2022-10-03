import strings from "../../../localization";
import PrivacyEN from "./privacy-en";
import PrivacyPTBR from "./privacy-pt-br";

export const getPrivacyByLanguage = () => {
  const language = strings.getLanguage();
  switch (language) {
    case "pt":
      return <PrivacyPTBR />;
    case "en":
      return <PrivacyEN />;
    default:
      return <PrivacyEN />;
  }
};
