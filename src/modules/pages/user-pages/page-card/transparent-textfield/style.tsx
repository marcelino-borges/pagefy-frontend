import { styled } from "@mui/system";
import { TextField } from "@mui/material";

export const TransparentTextFieldStyled = styled(TextField)`
  & .MuiInputBase-input {
    color: black;
    font-weight: 700;
    border: 0;
  }

  & .MuiInputBase-root {
    border: 0;
  }

  & .MuiInputBase-root:before {
    border: 0;
  }

  & .MuiInputBase-root:hover:before {
    border: 0;
  }

  & .MuiInputBase-root:after {
    border: 0;
  }

  & .MuiInputBase-root:hover:after {
    border: 0;
  }
`;
