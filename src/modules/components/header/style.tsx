import { styled } from "@mui/system";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";

export const Parent = styled(Grid)`
  border: 1px solid #e9e9e9;
  height: 125px;
  background-color: white;
`;

export const HeaderLink = styled(Link)`
  color: black;
  padding-bottom: 53px;
  transition: all 0.2s ease-in-out;
  position: relative;
  height: 100%;
  margin-right: 24px;

  &:hover {
    color: var(--primary);
    text-decoration: none;
  }

  &:before {
    content: "";
    position: absolute;
    width: 100%;
    height: 3px;
    bottom: 0;
    left: 0;
    background-color: var(--primary);
    visibility: hidden;
    transform: scaleX(0);
    transition: all 0.2s ease-in-out;
  }

  &:hover:before {
    visibility: visible;
    transform: scaleX(1);
  }
`;
