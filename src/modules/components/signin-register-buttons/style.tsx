import { styled } from "@mui/material";
import { Link } from "react-router-dom";
import { PRIMARY_COLOR, PRIMARY_COLOR_DARK } from "../../../styles/colors";

const basicButton = `
padding: 16px 24px;
border-radius: 32px;
font-size: 0.9em;
width: 100px;
text-align: center;`;

export const SignInButton = styled(Link)`
  border: 1px solid ${PRIMARY_COLOR};
  color: ${PRIMARY_COLOR};
  background-color: white;
  transition: color 0.25s, background-color 0.25s;

  ${basicButton}

  &:hover {
    color: white;
    background-color: ${PRIMARY_COLOR_DARK};
  }
`;

export const SignUpButton = styled(Link)`
  border: 1px solid ${PRIMARY_COLOR};
  color: black;
  background-color: ${PRIMARY_COLOR};
  transition: color 0.25s, background-color 0.25s;

  ${basicButton}

  &:hover {
    color: white;
    background-color: ${PRIMARY_COLOR_DARK};
  }
`;
