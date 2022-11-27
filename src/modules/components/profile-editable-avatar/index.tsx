import { Badge } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import {
  AvatarEditBadge,
  AvatarOverlay,
  EditPenIcon,
  PageAvatar,
} from "./style";
import { MEDIUM_GREY } from "../../../styles/colors";

interface IProfileEditableAvatarProps {
  onClick: any;
  text?: string | undefined;
  imageUrl?: string | undefined;
  height?: string | undefined;
  width?: string | undefined;
  maxWidth?: string | undefined;
  maxHeight?: string | undefined;
  minWidth?: string | undefined;
  minHeight?: string | undefined;
  badgeBgSize?: string | undefined;
  badgeIconSize?: string | undefined;
  noUserIconSize?: string | undefined;
  isEditable?: boolean;
}

const ProfileEditableAvatar = ({
  text,
  imageUrl,
  onClick,
  width = "100px",
  height = "100px",
  maxWidth = "",
  maxHeight = "",
  minWidth = "",
  minHeight = "",
  badgeBgSize,
  badgeIconSize = "20px",
  noUserIconSize = "48px",
  isEditable = true,
}: IProfileEditableAvatarProps) => {
  return (
    <Badge
      overlap="circular"
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      onClick={isEditable === true ? onClick : undefined}
      badgeContent={
        isEditable === true && (
          <AvatarEditBadge size={badgeBgSize}>
            <EditPenIcon style={{ fontSize: badgeIconSize, color: "white" }} />
          </AvatarEditBadge>
        )
      }
    >
      <PageAvatar
        src={imageUrl}
        height={height}
        width={width}
        maxWidth={maxWidth}
        maxHeight={maxHeight}
        minWidth={minWidth}
        minHeight={minHeight}
        isEditable={isEditable}
        sx={{ bgcolor: MEDIUM_GREY }}
      >
        {text && text.length > 1 ? (
          <>{text.split(" ")[0][0]}</>
        ) : !imageUrl || imageUrl.length < 1 ? (
          <PersonIcon fontSize="inherit" sx={{ fontSize: noUserIconSize }} />
        ) : (
          <EditPenIcon style={{ fontSize: "20px", color: "white" }} />
        )}
        <AvatarOverlay />
      </PageAvatar>
    </Badge>
  );
};

export default ProfileEditableAvatar;
