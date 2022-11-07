import strings from ".";
import { ComponentType } from "../store/user-pages/types";

/**
 * Gets the string correspondent to a component type
 * @param {ComponentType} type - Component's type
 * @returns {string} A string with the component's name
 */
export const getLocalizedStringByComponentType = (
  type: ComponentType
): string => {
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
    case ComponentType.TextOverImage:
      return strings.textOverImage;
    case ComponentType.Map:
      return strings.tools.map.name;
    case ComponentType.Spotify:
      return strings.tools.spotify.name;
    case ComponentType.ProgressBar:
      return strings.tools.progressBar.name;
    case ComponentType.Counter:
      return strings.tools.counters.name;
    default:
      return strings.unknown;
  }
};
