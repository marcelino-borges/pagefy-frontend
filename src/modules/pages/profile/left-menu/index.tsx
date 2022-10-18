import { MenuItem, Root } from "./style";
import PersonIcon from "@mui/icons-material/Person";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import CollectionsIcon from "@mui/icons-material/Collections";
import { Stack, useMediaQuery } from "@mui/material";
import CustomTooltip from "../../../components/tooltip";
import strings from "../../../../localization";
import { ProfileTab } from "../utils";

interface IProfileLeftMenuProps {
  setSelectedMenuItem: (tab: ProfileTab) => void;
  selectedMenuItem: ProfileTab;
}

const ProfileLeftMenu = ({
  setSelectedMenuItem,
  selectedMenuItem,
}: IProfileLeftMenuProps) => {
  const isSmallerThanMD = useMediaQuery("(max-width: 903px)");

  return (
    <Root container item direction="column">
      <MenuItem
        onClick={() => setSelectedMenuItem(ProfileTab.PERSONAL)}
        item
        wrap="nowrap"
        isSelected={selectedMenuItem === ProfileTab.PERSONAL}
      >
        <CustomTooltip title={strings.personalData} disabled={!isSmallerThanMD}>
          <Stack direction="row" alignItems="center" gap="8px">
            <PersonIcon />
            {!isSmallerThanMD && strings.personalData}
          </Stack>
        </CustomTooltip>
      </MenuItem>
      <MenuItem
        onClick={() => setSelectedMenuItem(ProfileTab.FINANCE)}
        item
        wrap="nowrap"
        isSelected={selectedMenuItem === ProfileTab.FINANCE}
      >
        <CustomTooltip
          title={strings.finance.title}
          disabled={!isSmallerThanMD}
        >
          <Stack direction="row" alignItems="center" gap="8px">
            <CardMembershipIcon />
            {!isSmallerThanMD && strings.finance.title}
          </Stack>
        </CustomTooltip>
      </MenuItem>
      <MenuItem
        onClick={() => setSelectedMenuItem(ProfileTab.GALLERY)}
        item
        wrap="nowrap"
        isSelected={selectedMenuItem === ProfileTab.GALLERY}
      >
        <CustomTooltip title={strings.yourGallery} disabled={!isSmallerThanMD}>
          <Stack direction="row" alignItems="center" gap="8px">
            <CollectionsIcon />
            {!isSmallerThanMD && strings.yourGallery}
          </Stack>
        </CustomTooltip>
      </MenuItem>
    </Root>
  );
};

export default ProfileLeftMenu;
