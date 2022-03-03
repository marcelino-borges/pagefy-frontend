import strings from "../localization";
import {
  YOUTUBE_EMBED_URL_IDENTIFIER,
  YOUTUBE_FULL_URL_IDENTIFIER,
  YOUTUBE_SHORT_URL_IDENTIFIER,
} from "../modules/constants";
import { ComponentType } from "../store/user/types";

export const stringShortener = (originalString: string, maxSize: number) => {
  if (originalString.length > maxSize)
    return originalString.substring(0, maxSize) + "...";

  return originalString;
};

export const getLocalizedStringByComponentType = (type: ComponentType) => {
  switch (type) {
    case ComponentType.Image:
      return strings.image;
    case ComponentType.Text:
      return strings.text;
    case ComponentType.TextImage:
      return strings.textImage;
    case ComponentType.Icon:
      return strings.icon;
    case ComponentType.Video:
      return strings.video;
    case ComponentType.Launch:
      return strings.launch;
    default:
      return strings.unknown;
  }
};

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
) => {
  const identifierIndex = url.indexOf(urlIdentifier);
  const id = url.substring(identifierIndex + urlIdentifier.length, url.length);
  return id;
};

export const getYoutubeIdFromUrl = (url: string) => {
  let id;
  if (url.includes(YOUTUBE_SHORT_URL_IDENTIFIER)) {
    id = getYoutubeIdByUrlIdentifier(url, YOUTUBE_SHORT_URL_IDENTIFIER);
  } else if (url.includes(YOUTUBE_FULL_URL_IDENTIFIER)) {
    id = getYoutubeIdByUrlIdentifier(url, YOUTUBE_FULL_URL_IDENTIFIER);
  } else if (url.includes(YOUTUBE_EMBED_URL_IDENTIFIER)) {
    id = getYoutubeIdByUrlIdentifier(url, YOUTUBE_EMBED_URL_IDENTIFIER);
  } else {
    return null;
  }
  return id;
};

export const capitalizeFirstLetter = (original: string) => {
  return (
    original.slice(0, 1).toUpperCase() + original.slice(1, original.length)
  );
};
