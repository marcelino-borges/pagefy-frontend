import { styled } from "@mui/material/styles";
import { SECONDARY_COLOR } from "../../../styles/colors";
import { IconButton } from "@mui/material";
import { SECONDARY_COLOR_DARK } from "./../../../styles/colors";

export const Root = styled(({ show, children, ...rest }: any) => (
  <IconButton {...rest}>{children}</IconButton>
))`
  border-radius: 50%;
  position: fixed;
  bottom: 86px;
  right: 16px;
  background-color: ${SECONDARY_COLOR};
  width: 56px;
  height: 56px;
  transition: transform 0.1s ease-in-out;
  transform: ${({ show }) => (show ? "translateX(0)" : "translateX(100px)")};

  &:hover {
    background-color: ${SECONDARY_COLOR_DARK};
  }

  svg {
    color: white;
    font-size: 30px;
  }
`;
