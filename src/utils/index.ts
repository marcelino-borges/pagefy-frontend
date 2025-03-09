import {
  ComponentShadowStyle,
  YOUTUBE_EMBED_URL_IDENTIFIER,
  YOUTUBE_FULL_URL_IDENTIFIER,
  YOUTUBE_SHORT_URL_IDENTIFIER,
} from "../constants";
import strings from "../localization";
import { ComponentType } from "../store/user-pages/types";

/**
 * Shortens a string to the `maxSize` length
 * @param {string} originalString - Original string
 * @param {number} maxSize - Max size the string will have
 * @returns {string} A new string shortened to `maxSize`
 */
export const stringShortener = (
  originalString: string,
  maxSize: number
): string => {
  if (originalString.length > maxSize)
    return originalString.substring(0, maxSize) + "...";

  return originalString;
};

/**
 * Moves and element of an array from an index position to another index position
 * @param {any[]} array - Original array
 * @param {number} fromIndex - Original position
 * @param {number} toIndex - Target position
 * @returns {string} A copy of the `array` with the element with changed position
 */
export const moveElementInArrayFromToIndex = (
  array: any[],
  fromIndex: number,
  toIndex: number
) => {
  let element = array[fromIndex];
  let updatedArray = [...array];
  updatedArray.splice(fromIndex, 1);
  updatedArray.splice(toIndex, 0, element);
  return updatedArray;
};

export const getYoutubeIdByUrlIdentifier = (
  url: string,
  urlIdentifier: string
): string => {
  const identifierIndex = url.indexOf(urlIdentifier);
  const id = url.substring(identifierIndex + urlIdentifier.length, url.length);
  return id;
};

/**
 * Gets the ID of a YouTube video according to the url size/pattern
 * @param {string} url - Original URL
 * @returns {string | null} String with the ID of the video
 */
export const getYoutubeIdFromUrl = (url: string): string | null => {
  let id = null;
  if (url.includes(YOUTUBE_SHORT_URL_IDENTIFIER)) {
    id = getYoutubeIdByUrlIdentifier(url, YOUTUBE_SHORT_URL_IDENTIFIER);
  } else if (url.includes(YOUTUBE_FULL_URL_IDENTIFIER)) {
    id = getYoutubeIdByUrlIdentifier(url, YOUTUBE_FULL_URL_IDENTIFIER);
  } else if (url.includes(YOUTUBE_EMBED_URL_IDENTIFIER)) {
    id = getYoutubeIdByUrlIdentifier(url, YOUTUBE_EMBED_URL_IDENTIFIER);
  }
  return id;
};

/**
 * Capitalizes only the first letter of the original string and keeps the rest as original.
 * @param {string} original - String you want to modify
 * @returns {string} A string with the first letter capitalized.
 */
export const capitalizeFirstLetter = (original: string): string => {
  return (
    original.slice(0, 1).toUpperCase() + original.slice(1, original.length)
  );
};

/**
 * Capitalizes only the first letter of the original string and sets the rest to lower case.
 * @param {string} original - String you want to modify
 * @returns {string} A string with the first letter capitalized and with the rest in lower case.
 */
export const capitalizeOnlyFirstLetter = (original: string): string => {
  return (
    original.slice(0, 1).toUpperCase() +
    original.slice(1, original.length).toLowerCase()
  );
};

/**
 * Removes the url wrapper from the string. Example: modifies `url(image.jpg)` to `image.jpg`
 * @param {string} original - String you want to modify
 * @returns {string} A string with the `url()` wrapper removed
 */
export const removeCssUrlWrapper = (original: string): string => {
  return original.replace("url(", "").replace(")", "");
};

/**
 * Checks if the URL has "http://" or "https://" and, if negative, returns the URL with "https://"
 * @param {string} url - URL you want to fix
 * @returns {string} URL securely with "http://" or "https://"
 */
export const fixUrlWithHttp = (url: string): string => {
  const HTTPS = "https://";
  const HTTP = "http://";

  if (url.includes(HTTPS) || url.includes(HTTP)) {
    return url;
  }
  return HTTPS + url;
};

/**
 * @param {string} url - URL you want to fix
 * @param {any} window - DOM window
 */
export const openExternalLink = (url: string, window: any) => {
  if (!url) return;

  const newWindow = window.open(
    fixUrlWithHttp(url),
    "_blank",
    "noopener,noreferrer"
  );

  if (newWindow) newWindow.opener = null;
};

export const getRandomIntInRange = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const includesAnyInString = (
  originalString: string,
  wordsToFind: string[]
): boolean => {
  for (let word in wordsToFind) {
    if (originalString.includes(wordsToFind[word])) return true;
  }
  return false;
};

export const formatFloatingNumberFromInt = (int: number) => {
  const asString: string = String(int);
  return (
    asString.slice(0, asString.length - 2) +
    "," +
    asString.slice(asString.length - 2, asString.length)
  );
};

export const translateShadowStyleEnum = (
  shadowStyle: ComponentShadowStyle
): string => {
  switch (shadowStyle) {
    case ComponentShadowStyle.NONE:
      return strings.tools.button.shadowStyles.none;
    case ComponentShadowStyle.SMOOTH:
      return strings.tools.button.shadowStyles.smooth;
    case ComponentShadowStyle.NORMAL:
      return strings.tools.button.shadowStyles.normal;
    case ComponentShadowStyle.HARD:
      return strings.tools.button.shadowStyles.hard;
    case ComponentShadowStyle.EXTREME:
      return strings.tools.button.shadowStyles.extreme;
    default:
      return strings.tools.button.shadowStyles.none;
  }
};

export const isBgAndFontCustomizable = (type: ComponentType) =>
  type !== ComponentType.Video &&
  type !== ComponentType.Map &&
  type !== ComponentType.Spotify &&
  type !== ComponentType.Image;

export const isImageType = (type: ComponentType) =>
  type === ComponentType.Image ||
  type === ComponentType.TextImage ||
  type === ComponentType.TextOverImage;

export const isUrlEditable = (type: ComponentType) =>
  type !== ComponentType.Video &&
  type !== ComponentType.Map &&
  type !== ComponentType.Spotify;

export const isButtonType = (type: ComponentType) =>
  type === ComponentType.Text ||
  type === ComponentType.Image ||
  type === ComponentType.TextImage ||
  type === ComponentType.TextOverImage;

export const isClickableType = (type: ComponentType) =>
  type === ComponentType.Text ||
  type === ComponentType.Image ||
  type === ComponentType.TextImage ||
  type === ComponentType.TextOverImage ||
  type === ComponentType.Icon ||
  type === ComponentType.Launch ||
  type === ComponentType.ProgressBar;

export const clamp = (value: number, min: number, max: number) => {
  if (value < min) return min;
  else if (value > max) return max;
  else return value;
};

export const getRandomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min)) + min;

export const getCurrencyByLocale = (locale: string) => {
  const localeToCurrency: Record<string, string> = {
    // BRL
    "pt-BR": "BRL",

    // USD
    "en-US": "USD",
    "en-PH": "USD",
    "es-US": "USD",

    // EUR
    "de-DE": "EUR",
    "fr-FR": "EUR",
    "es-ES": "EUR",
    "it-IT": "EUR",
    "nl-NL": "EUR",
    "pt-PT": "EUR",
    "fi-FI": "EUR",
    "el-GR": "EUR",

    // JPY
    "ja-JP": "JPY",

    // GBP
    "en-GB": "GBP",

    // AUD
    "en-AU": "AUD",

    // CAD
    "en-CA": "CAD",
    "fr-CA": "CAD",

    // CHF
    "de-CH": "CHF",
    "fr-CH": "CHF",
    "it-CH": "CHF",

    // CNY
    "zh-CN": "CNY",
    "zh-SG": "CNY",

    // HKD
    "zh-HK": "HKD",
    "en-HK": "HKD",

    // SGD
    "en-SG": "SGD",
  };

  const currency = localeToCurrency[locale] || "USD";

  return currency;
};
