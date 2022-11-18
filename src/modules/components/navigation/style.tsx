import { styled } from "@mui/system";
import { Grid, SwipeableDrawer } from "@mui/material";
import { Link } from "react-router-dom";
import { Close, Menu } from "@mui/icons-material";
import { PRIMARY_COLOR } from "../../../styles/colors";

export const Parent = styled(
  ({ block, transparent, isFixed, children, ...rest }: any) => (
    <Grid {...rest}>{children}</Grid>
  )
)(
  ({ transparent, isFixed }: any) => `
  border-bottom: ${!transparent ? "1px solid #e9e9e9" : "unset"};
  box-shadow: ${!transparent ? "0px 3px 6px 1px rgba(0, 0, 0, 0.03)" : "unset"};
  background-color: ${!transparent ? "white" : "unset"};
  min-width: 320px;
  z-index: 1000;
  position: ${isFixed ? "fixed" : "absolute"};
  width: 101%;
  transition: all 0.2s ease;
`
);

const HeaderLinkDesktopInner = styled(
  ({ isLocation, children, ...rest }: any) => <div {...rest}>{children}</div>
)(
  ({ isLocation }: any) => `
  border-radius: 10px;
  padding: 4px;
  display: inherit;
  background-color: ${isLocation ? `${PRIMARY_COLOR}30` : ""};
`
);

export const HeaderLinkDesktop = styled(
  ({ isLocation, children, ...rest }: any) => (
    <Link {...rest}>
      <HeaderLinkDesktopInner isLocation={isLocation}>
        {children}
      </HeaderLinkDesktopInner>
    </Link>
  )
)(
  ({ isLocation }: any) => `
  color: black;
  padding-bottom: 41px; /* distance from text to underline when hover */
  transition: all 0.2s ease-in-out;
  position: relative;
  height: 100%;
  text-align: center;

  &:hover {
    ${!isLocation ? `color: ${PRIMARY_COLOR}` : ""};
    text-decoration: none;
  }

  /*
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
  }*/
`
);

export const HamburguerMenuIcon = styled(Menu)`
  color: var(--primary);
  font-size: 30px;
  cursor: pointer;
`;

export const DrawerMenu = styled(SwipeableDrawer)`
  color: var(--primary);
  padding: 32px 16px 32px 16px;
  position: relative;
  z-index: 200000;

  .MuiPaper-root.MuiDrawer-paper {
    width: 50%;
    overflow: visible;
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
