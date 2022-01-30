import strings from "../localization";
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
    default:
      return strings.unknown;
  }
};
