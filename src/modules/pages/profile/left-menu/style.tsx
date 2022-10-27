import { Grid, styled } from "@mui/material";
import {
  HEADER_HEIGHT_DESKTOP,
  HEADER_HEIGHT_MOBILE,
} from "../../../../constants";
import {
  LIGHTER_GREY,
  LIGHT_GREY,
  PRIMARY_COLOR,
  UPPER_MEDIUM_GREY,
} from "../../../../styles/colors";

export const Root = styled(Grid)`
  padding-top: ${HEADER_HEIGHT_DESKTOP};
  border-right: 1px solid #e9e9e9;
  box-shadow: inset 10px 10px 10px rgba(0, 0, 0, 0.03);
  width: 230px;
  flex-basis: 230px;
  flex-grow: 0;

  @media (max-width: 903px) {
    padding-top: ${HEADER_HEIGHT_MOBILE};
    width: 48px;
    flex-basis: 48px;
  }
`;

export const MenuItem = styled(({ isSelected, children, ...rest }: any) => (
  <Grid {...rest}>{children}</Grid>
))(
  ({ isSelected }) => `
  padding: 12px 12px;
  cursor: pointer;
  background-color: ${isSelected ? LIGHTER_GREY : ""};
  color: ${isSelected ? "" : LIGHT_GREY};
  white-space: nowrap;
  border-right: ${
    isSelected ? "3px solid" + PRIMARY_COLOR : "3px solid transparent"
  };
  box-shadow:  ${isSelected && "inset 10px 10px 10px rgba(0, 0, 0, 0.03)"};

  &:hover {
    color: ${!isSelected && UPPER_MEDIUM_GREY};
    background-color: ${!isSelected && "white"};
    border-right: 3px solid ${!isSelected && LIGHTER_GREY};
  }
`
);
