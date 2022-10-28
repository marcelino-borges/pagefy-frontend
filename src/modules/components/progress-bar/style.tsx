import { styled } from "@mui/material";

export const BG = styled("div")`
  border-radius: 19px;
  padding: 8px;
`;

export const Fill = styled("div")`
  border-radius: 10px;
  height: 32px;
  position: relative;
`;

export const Value = styled("div")`
  position: absolute;
  right: 8px;
  top: 0;
  font-weight: 600;
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
    1px 1px 0 #000;
`;
