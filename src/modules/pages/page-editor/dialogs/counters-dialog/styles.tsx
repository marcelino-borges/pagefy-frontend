import { styled } from "@mui/system";
import { Grid } from "@mui/material";
import {
  LIGHTER_GREY,
  LIGHT_GREY,
  PRIMARY_COLOR,
} from "../../../../../styles/colors";

export const CounterContainer = styled(({ ...rest }: any) => (
  <Grid {...rest} />
))`
  gap: 16px;
  border: 2px dashed ${LIGHTER_GREY};
  padding: 32px 16px;
  border-radius: 10px;
  position: relative;
`;

export const CounterContainerLabel = styled("span")`
  background: white;
  border-radius: 20px;
  font-size: 0.9em;
  font-weight: bold;
  color: ${LIGHT_GREY};
  position: absolute;
  top: -13px;
  left: 12px;
  padding: 4px;
`;

export const CounterRemoveIcon = styled("div")`
  position: absolute;
  top: 44px;
  left: -17px;
  background-color: white;
  border-radius: 50%;
  width: 26px;
  height: 26px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid red;
  transition: border 0.25s ease-in-out;

  svg {
    color: red;
    font-size: 1.2em;
    transition: color 0.2s ease-in-out;
  }

  &:hover {
    border: 1px solid #950c0c;

    svg {
      color: #950c0c;
    }
  }
`;

export const AddCounterButton = styled(Grid)`
  padding: 16px 0px 16px 16px;

  div {
    cursor: pointer;

    &:hover {
      color: ${PRIMARY_COLOR};
    }
  }
`;
