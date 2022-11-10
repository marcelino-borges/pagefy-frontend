import {
  COMPLEMENTARY_COLOR,
  PRIMARY_COLOR,
  SECONDARY_COLOR,
} from "../../../styles/colors";

export const hexToRgb = (hex: string) => {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b;
  });

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : {
        r: 255,
        g: 255,
        b: 255,
      };
};

export const rgbToHex = (r: number, g: number, b: number) =>
  "#" +
  [r, g, b]
    .map((x) => {
      const hex = x.toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    })
    .join("");

export const DEFAULT_PALLETE: string[] = [
  PRIMARY_COLOR,
  SECONDARY_COLOR,
  COMPLEMENTARY_COLOR,
  "#ffffff",
  "#c3c3c3",
  "#666666",
  "#000000",

  "#f67575",
  "#ff0000",
  "#7c0606",

  "#f6b375",
  "#ff9700",
  "#7c3606",

  "#f6d875",
  "#ffc100",
  "#7c5d06",

  "#f6ed75",
  "#fbff00",
  "#7c7506",

  "#c3f675",
  "#9aff00",
  "#4d7c06",

  "#75f6bf",
  "#00ffbb",
  "#0d6d53",

  "#75e9f6",
  "#0015ff",
  "#1b0d6d",

  "#7d75f6",
  "#9200ff",
  "#460d6d",

  "#ce75f6",
  "#ea00ff",
  "#660d6d",

  "#f675e4",
  "#ff009d",
  "#6d0d45",
];
