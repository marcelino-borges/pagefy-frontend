import { styled } from "@mui/system";
import { IconButton } from "@mui/material";

export const IconButtonCustom = styled(
  ({ hoverBackgroundColor, ...rest }: any) => <IconButton {...rest} />
)(
  ({ hoverBackgroundColor }) => `
  &:hover {
    background-color: ${hoverBackgroundColor};
  }
`
);
