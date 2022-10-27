import strings from ".";
import { ButtonType } from "../store/user-pages/types";

/**
 * Gets the string correspondent to a component type
 * @param {ButtonType} type - Component's type
 * @returns {string} A string with the component's name
 */
export const getLocalizedStringByComponentType = (type: ButtonType): string => {
  switch (type) {
    case ButtonType.Image:
      return strings.image;
    case ButtonType.Text:
      return strings.text;
    case ButtonType.TextImage:
      return strings.textImage;
    case ButtonType.Icon:
      return strings.icon;
    case ButtonType.Video:
      return strings.video;
    case ButtonType.Launch:
      return strings.launch;
    case ButtonType.TextOverImage:
      return strings.textOverImage;
    default:
      return strings.unknown;
  }
};
