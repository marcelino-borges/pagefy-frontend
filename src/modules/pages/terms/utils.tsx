import strings from "../../../localization";
import TermsOfUsePTBR from "./terms-pt-br";
import TermsOfUseEN from "./terms-en";

export const getTermsByLanguage = () => {
  const language = strings.getLanguage();
  switch (language) {
    case "pt":
      return <TermsOfUsePTBR />;
    case "en":
      return <TermsOfUseEN />;
    default:
      return <TermsOfUseEN />;
  }
};
