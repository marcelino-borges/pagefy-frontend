import { Button, styled } from "@mui/material";
import { ACESSIBILITY_RED } from "./../../../../../styles/colors";

export const DeleteButton = styled(Button)`
  &:hover {
    background-color: ${ACESSIBILITY_RED};
    color: white;
  }
`;
