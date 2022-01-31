import { styled } from "@mui/system";
import { Button, Grid } from "@mui/material";
import { LIGHTER_GREY, LIGHT_GREY, MEDIUM_GREY } from "../../../styles/colors";

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

export const ToolbarGridItem = styled(({ ...rest }: any) => <Grid {...rest} />)`
  ${toolbarIcon}
  height: 130px;
  width: 130px;
  display: flex;
  align-items: center;

  &:hover {
    border: 1px solid ${LIGHTER_GREY};
    border-radius: 50%;
    background-color: ${LIGHTER_GREY};
  }
`;

export const ToolbarIconText = styled(({ ...rest }: any) => <span {...rest} />)`
  font-size: 14px;
  margin-top: 8px;
  color: grey;
`;
