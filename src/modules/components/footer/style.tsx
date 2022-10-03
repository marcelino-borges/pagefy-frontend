import { styled } from "@mui/material";
import { FOOTER_HEIGHT } from "./../../../constants/index";

export const FooterRoot = styled((props: any) => <div {...props} />)(
  (_: any) => `
    background-color: white;
    width: 100%;
    margin-top: 150px;
    border-top: 1px solid #e9e9e9;
    height: ${FOOTER_HEIGHT};
  `
);
