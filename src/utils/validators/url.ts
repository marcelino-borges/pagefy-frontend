import { LINK_VALIDATOR_REGEX, MAILTO_REGEX, TEL_REGEX } from "../../constants";

export const isUrlValid = (str: string | undefined) => {
  if (!str || !str.length) return false;
  return str.match(LINK_VALIDATOR_REGEX);
};

export const isMailtoUrlValid = (str: string | undefined) => {
  if (!str || !str.length) return false;
  return str.match(MAILTO_REGEX);
};

export const isTelUrlValid = (str: string | undefined) => {
  if (!str || !str.length) return false;
  return str.match(TEL_REGEX);
};
