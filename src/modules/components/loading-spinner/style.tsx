import { styled } from "@mui/system";
import { Grid, CircularProgress } from "@mui/material";

export const Root = styled(Grid)`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 100000;
`;

interface ICircularProgressIconProps {
  color?: string;
  size: number;
}

export const CircularProgressIcon = styled(
  ({ color, ...rest }: ICircularProgressIconProps) => (
    <CircularProgress {...rest} />
  )
)(
  ({ color = "white" }) => `
  color: ${color};
`
);
