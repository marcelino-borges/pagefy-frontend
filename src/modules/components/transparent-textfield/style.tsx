import { styled } from "@mui/system";
import { TextField } from "@mui/material";

export const TransparentTextFieldStyled = styled(
  ({ fontWeight, color, fontSize, fontStyle, ...rest }: any) => (
    <TextField {...rest} />
  )
)`
  & .MuiInputBase-input {
    color: 
    font-weight: ${(props) => props.color || "black"};
    font-weight: ${(props) => props.fontWeight || "700"};
    border: 0;
    font-size: ${(props) => props.fontSize || "1.5em"};
    padding: 0;
    width: 100%;
    font-family: 'Source Sans Pro';
    font-style: ${(props) => props.fontStyle || "normal"};
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
