import { styled } from "@mui/system";
import { IconButton } from "@mui/material";
import { PRIMARY_COLOR } from "./../../../styles/colors";

export const IconButtonCustom = styled(({ ...rest }: any) => (
  <IconButton {...rest} />
))`
  &:hover {
    background-color: ${PRIMARY_COLOR};
  }
`;
