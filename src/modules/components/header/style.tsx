import { styled } from "@mui/system";
import { Grid, Drawer } from "@mui/material";
import { Link } from "react-router-dom";
import { Close, Menu } from "@mui/icons-material";

export const Parent = styled(Grid)`
  border: 1px solid #e9e9e9;
  height: 125px;
  background-color: white;
  min-width: 320px;
`;

export const HeaderLinkDesktop = styled(Link)`
  color: black;
  padding-bottom: 50px; /* distance from text to underline when hover */
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

export const HamburguerMenuIcon = styled(Menu)`
  color: var(--primary);
  font-size: 40px;
  cursor: pointer;
`;

export const DrawerMenu = styled(Drawer)`
  color: var(--primary);
  padding: 32px 16px 32px 16px;
  overflow: unset;
  position: relative;

  .MuiPaper-root.MuiDrawer-paper {
    width: 50%;
  }

  @media (max-width: 500px) {
    .MuiPaper-root.MuiDrawer-paper {
      width: 75%;
    }
  }

  @media (max-width: 400px) {
    .MuiPaper-root.MuiDrawer-paper {
      width: 90%;
    }
  }
`;

export const MobileMenuGridItem = styled(Grid)`
  text-align: center;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  border-left: 3px solid rgba(0, 0, 0, 0);
  height: 56px;
  width: 100%;
  padding-top: 18px;
  cursor: pointer;

  &:hover {
    border-left: 3px solid var(--primary);
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

export const DrawerCloseButton = styled(Grid)`
  width: 40px;
  height: 40px;
  background-color: var(--primary);
  border-radius: 50%;
  left: -20px;
  top: 8px;
  position: absolute;
  cursor: pointer;

  &:hover {
    background-color: #9c1e22;
  }
`;

export const CloseIcon = styled(Close)`
  color: white;
`;
