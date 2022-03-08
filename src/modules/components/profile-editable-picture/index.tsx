import { Badge } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import {
  AvatarEditBadge,
  AvatarOverlay,
  EditPenIcon,
  PageAvatar,
} from "./style";
import { MEDIUM_GREY } from "./../../../styles/colors";

interface IProps {
  onClick: any;
  text?: string | undefined;
  imageUrl?: string | undefined;
  height?: string | undefined;
  width?: string | undefined;
  badgeBgSize?: string | undefined;
  badgeIconSize?: string | undefined;
  noUserIconSize?: string | undefined;
}

const ProfileEditablePicture = ({
  text,
  imageUrl,
  onClick,
  width,
  height,
  badgeBgSize,
  badgeIconSize,
  noUserIconSize,
}: IProps) => {
  return (
    <Badge
      overlap="circular"
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      onClick={onClick}
      badgeContent={
        <AvatarEditBadge size={badgeBgSize}>
          <EditPenIcon
            style={{ fontSize: badgeIconSize || "20px", color: "white" }}
          />
        </AvatarEditBadge>
      }
    >
      <PageAvatar
        src={imageUrl}
        height={height}
        width={width}
        sx={{ bgcolor: MEDIUM_GREY }}
      >
        {text && text.length > 1 ? (
          <>{text.split(" ")[0][0]}</>
        ) : !imageUrl || imageUrl.length < 1 ? (
          <PersonIcon
            fontSize="inherit"
            sx={{ fontSize: noUserIconSize || "48px" }}
          />
        ) : (
          <EditPenIcon style={{ fontSize: "20px", color: "white" }} />
        )}
        <AvatarOverlay />
      </PageAvatar>
    </Badge>
  );
};

export default ProfileEditablePicture;
