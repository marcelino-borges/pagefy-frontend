import { MenuItem, Root } from "./style";
import { Stack, useMediaQuery } from "@mui/material";
import CustomTooltip from "../../../components/tooltip";
import strings from "../../../../localization";
import { ProfileTab } from "../utils";
import { Icon } from "@iconify/react";

interface IProfileLeftMenuProps {
  setSelectedMenuItem: (tab: ProfileTab) => void;
  selectedMenuItem: ProfileTab;
}

interface IProfileItem {
  menuType: ProfileTab;
  icon: string;
  text: string;
}

const ProfileLeftMenu = ({
  setSelectedMenuItem,
  selectedMenuItem,
}: IProfileLeftMenuProps) => {
  const isSmallerThanMD = useMediaQuery("(max-width: 903px)");

  const items: IProfileItem[] = [
    {
      menuType: ProfileTab.PERSONAL,
      icon: "bi:person-fill",
      text: strings.personalData,
    },
    {
      menuType: ProfileTab.SUBSCRIPTIONS,
      icon: "dashicons:money-alt",
      text: strings.yourSubscriptions,
    },
    {
      menuType: ProfileTab.GALLERY,
      icon: "ooui:image-gallery",
      text: strings.yourGallery,
    },
    {
      menuType: ProfileTab.TESTIMONIALS,
      icon: "fluent:person-feedback-16-filled",
      text: strings.testimonials.testimonialsTitle,
    },
  ];

  return (
    <Root container item direction="column">
      {items.map((item: IProfileItem) => (
        <MenuItem
          container
          item
          onClick={() => setSelectedMenuItem(item.menuType)}
          wrap="nowrap"
          isSelected={selectedMenuItem === item.menuType}
          key={`${item.text} ${item.menuType.toString()}`}
        >
          <CustomTooltip title={item.text} disabled={!isSmallerThanMD}>
            <Stack direction="row" alignItems="center" gap="8px">
              <Icon icon={item.icon} />
              {!isSmallerThanMD && item.text}
            </Stack>
          </CustomTooltip>
        </MenuItem>
      ))}
    </Root>
  );
};

export default ProfileLeftMenu;
