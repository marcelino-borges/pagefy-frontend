import {
  LINK_VALIDATOR_REGEX,
  MAILTO_REGEX,
  TEL_REGEX,
  FAX_REGEX,
  SMS_REGEX,
  CALLTO_REGEX,
} from "../../constants";

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

export const isSmsUrlValid = (str: string | undefined) => {
  if (!str || !str.length) return false;
  return str.match(SMS_REGEX);
};

export const isCalltoUrlValid = (str: string | undefined) => {
  if (!str || !str.length) return false;
  return str.match(CALLTO_REGEX);
};

export const isFaxUrlValid = (str: string | undefined) => {
  if (!str || !str.length) return false;
  return str.match(FAX_REGEX);
};
