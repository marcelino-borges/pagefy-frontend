import { styled } from "@mui/system";
import { Grid } from "@mui/material";
import { LIGHTER_GREY, LIGHT_GREY } from "../../../../../styles/colors";
import { PRIMARY_COLOR } from "../../../../../styles/colors";
import { MEDIUM_GREY } from "../../../../../styles/colors";

export const IconsResult = styled((props: any) => <Grid {...props} />)`
  font-size: 64px;
  padding: 8px;
  cursor: pointer;
  border-radius: 8px;
  color: grey;
`;

export const SectionHeader = styled((props: any) => <Grid {...props} />)`
  position: relative;
  margin-bottom: 16px;
  border-bottom: 1px solid ${LIGHTER_GREY};
  color: ${LIGHT_GREY};
  font-weight: 500;
  width: 100%;
  display: flex;
  flex-direction: row;
`;

export const ComponentDetailsButton = styled(
  ({
    isSelected,
    size,
    fontSize,
    iconSize,
    borderRadius,
    shadow,
    ...rest
  }: any) => <div {...rest} />
)(
  ({ isSelected, size, iconSize, fontSize, borderRadius, shadow }) => `
  padding: 8px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: ${borderRadius !== undefined ? borderRadius : 8}px;
  color: grey;
  width: ${size || "100px"};
  height: ${size || "100px"};
  background-color: ${LIGHTER_GREY};
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: ${shadow};
  font-size: ${fontSize || "1em"};

  @media (max-width: 400px) {
    margin: 12px 0px;
  }

  &:hover {
    background-color: ${LIGHT_GREY};
    color: white;
  }

  &:active {
    background-color: ${MEDIUM_GREY};
    color: white;
  }

  ${
    !isSelected
      ? ""
      : `
    color: white;
    background-color: ${PRIMARY_COLOR};
  `
  }

  svg {
    font-size: ${iconSize || "64px"};
  }
`
);

export const LayoutPickerContainer = styled(
  ({ mt, mb, ml, mr, ...rest }: any) => <Grid {...rest} />
)`
  padding: 8px;
  border-radius: 8px;
  width: 50%;

  margin-top: ${(props) => props.mt || ""};
  margin-bottom: ${(props) => props.mb || ""};
  margin-left: ${(props) => props.ml || ""};
  margin-right: ${(props) => props.mr || ""};
`;

export const LayoutPickerHeaderText = styled(({ ...rest }: any) => (
  <div {...rest} />
))`
  margin-left: 8px;
  display: flex;
  flex-direction: row;
`;
