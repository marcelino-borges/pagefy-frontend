import { styled } from "@mui/material";

export const GDPRPopupRoot = styled((props: any) => <div {...props} />)(
  (_: any) => `
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: white;
    z-index: 2000;
    padding: 16px;
    border-top: 1px solid #e9e9e9;
  `
);
