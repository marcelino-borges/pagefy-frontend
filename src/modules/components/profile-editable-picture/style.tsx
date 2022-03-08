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

export const PageAvatar = styled(({ width, height, ...rest }: any) => (
  <Avatar {...rest} />
))`
  height: ${(props) => props.height || "100px"};
  width: ${(props) => props.width || "100px"};
  font-size: 2em;
  position: relative;
  cursor: pointer;

  &:hover .MuiAvatar-root {
    display: flex;
  }
`;

export const AvatarOverlay = styled(({ ...rest }: any) => <Avatar {...rest} />)`
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
