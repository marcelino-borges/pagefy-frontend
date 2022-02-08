import { styled } from "@mui/system";
import { Grid } from "@mui/material";
import { Visibility, Edit, Delete } from "@mui/icons-material";
import {
  LIGHTER_GREY,
  MEDIUM_GREY,
  PRIMARY_COLOR,
} from "./../../../styles/colors";

export const PageToolbar = styled(
  ({ fontWeight, color, fontSize, fontStyle, ...rest }: any) => (
    <Grid {...rest} />
  )
)`
  padding: 32px;
  border-radius: 0px 0px 15px 15px;
  background-color: white;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.06);
  margin-bottom: 24px;
  min-width: 320px;
`;

export const PageName = styled(
  ({ fontWeight, color, fontSize, fontStyle, ...rest }: any) => (
    <Grid {...rest} />
  )
)`
  font-weight: 700;
  font-size: 1.4em;
  margin-top: 24px;
  text-align: center;
`;

export const PageImage = styled(({ imgUrl, ...rest }: any) => (
  <div {...rest} />
))`
  height: 100px;
  width: 100px;
  padding: 16px;
  border-radius: 50%;
  background-size: cover;
  background-position: center;
  background-image: url(${(props) => props.imgUrl});
`;

const toolbarIcon = `
  text-align: center;
  color: ${MEDIUM_GREY};
  svg {
    font-size: 50px;
  }
`;

export const ToolbarButton = styled(({ ...rest }: any) => <span {...rest} />)`
  ${toolbarIcon}
  height: 130px;
  width: 130px;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-wrap: wrap;
  -webkit-box-pack: center;
  box-sizing: border-box;
  flex-direction: column;
  margin: 6px;
  border-radius: 50%;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;

  &:hover {
    background-color: ${LIGHTER_GREY};
    color: ${PRIMARY_COLOR};
  }

  &:hover span {
    background-color: ${LIGHTER_GREY};
    color: ${PRIMARY_COLOR};
  }
`;

export const ToolbarIconText = styled(({ ...rest }: any) => <span {...rest} />)`
  font-size: 14px;
  margin-top: 8px;
  color: grey;
`;

export const VisibilityIcon = styled(({ ...rest }: any) => (
  <Visibility {...rest} />
))`
  font-size: 24px;
  color: ${MEDIUM_GREY};
  cursor: pointer;
  margin-left: 16px;

  &:hover {
    color: ${PRIMARY_COLOR};
  }
`;

export const EditPenIcon = styled(Edit)`
  color: ${MEDIUM_GREY};
  font-size: 20px;
  cursor: pointer;
  margin-left: 16px;

  &:hover {
    color: ${PRIMARY_COLOR};
  }
`;

export const DeleteIconOverlaySpan = styled("span")`
  color: ${MEDIUM_GREY};
  font-size: 20px;
  margin: 8px;

  &:hover svg {
    color: grey;
    opacity: 0.5;
  }
`;

export const DeleteIconOverlay = styled("div")`
  position: absolute;
  top: 0;
  left: 0;
  width: 56px;
  height: 56px;
  cursor: pointer;
  transform: translateX(48%) translateY(35%);
`;

export const DeleteIcon = styled(Delete)`
  font-size: 20px;
  margin: 8px;
  left: 0;
  cursor: pointer;
  opacity: 0;
`;
