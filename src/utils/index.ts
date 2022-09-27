import {
  YOUTUBE_EMBED_URL_IDENTIFIER,
  YOUTUBE_FULL_URL_IDENTIFIER,
  YOUTUBE_SHORT_URL_IDENTIFIER,
} from "../constants";

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
