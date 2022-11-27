import { Edit } from "@mui/icons-material";
import { Avatar, styled } from "@mui/material";
import { MEDIUM_GREY, PRIMARY_COLOR } from "../../../styles/colors";

export const AvatarEditBadge = styled(({ size, ...rest }: any) => (
  <Avatar {...rest} />
))`
  height: ${(props) => props.size || "32px"};
  width: ${(props) => props.size || "32px"};
  font-size: 2em;
  border-radius: 50%;
  background-color: ${PRIMARY_COLOR};
  cursor: pointer;
`;

export const EditPenIcon = styled(Edit)`
  color: ${MEDIUM_GREY};
  font-size: 20px;
  cursor: pointer;
  margin-left: 4px;

  &:hover {
    color: ${PRIMARY_COLOR};
  }
`;

export const PageAvatar = styled(
  ({
    width,
    height,
    maxWidth,
    maxHeight,
    minWidth,
    minHeight,
    isEditable,
    ...rest
  }: any) => <Avatar {...rest} />
)(
  ({
    width,
    height,
    maxWidth,
    maxHeight,
    minWidth,
    minHeight,
    isEditable = true,
  }) => `
  height: ${height};
  width: ${width};
  max-width: ${maxWidth};
  max-height: ${maxHeight};
  min-width: ${minWidth};
  min-height: ${minHeight};
  font-size: 2em;
  position: relative;
  cursor: ${isEditable ? "pointer" : ""};

  &:hover .MuiAvatar-root {
    display: flex;
  }

  &:hover div {
    display: flex;
    background-color: ${PRIMARY_COLOR};
  }
`
);

export const AvatarOverlay = styled(({ ...rest }: any) => <div {...rest} />)`
  font-size: 2em;
  border-radius: 50%;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${PRIMARY_COLOR};
  opacity: 0.5;
  cursor: pointer;
  display: none;

  & svg {
    display: none;
  }
`;
