import { Stack } from "@mui/material";
import { styled } from "@mui/system";
import { LIGHTER_GREY, LIGHT_GREY } from "../../../styles/colors";

export const ColorPickerStyleOverride = styled("span")`
  & .react-colorful {
    margin-top: 24px;
    width: 100%;
    height: 400px;
  }

  & .react-colorful__saturation {
    border-radius: 0px;
  }

  & .react-colorful__hue {
    margin-top: 16px;
    border-radius: 10px;
  }

  & .react-colorful__hue-pointer {
  }

  & .react-colorful__last-control {
  }

  & .react-colorful__interactive {
  }
`;

export const RGBContainer = styled(Stack)`
  position: relative;
  margin-top: 32px;
  gap: 16px;
  border: 2px dashed ${LIGHTER_GREY};
  padding: 16px;
  border-radius: 10px;
`;

export const RGBContainerLabel = styled(Stack)`
  position: absolute;
  color: ${LIGHT_GREY};
  top: -12px;
  left: 12px;
  background-color: white;
  font-size: 0.8em;
  font-weight: 500;
  padding: 4px;
`;

export const PalleteItem = styled("div")(
  ({ color }) => `
  width: 24px;
  height: 24px;
  background-color: ${color};
  cursor: pointer;
  border: 1px solid black;

  &:hover {
    transform: scale(1.2);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.2);
  }
`
);
