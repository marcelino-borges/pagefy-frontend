import { useState } from "react";
import { Grid } from "@mui/material";
import Navigation from "../../components/navigation";
import PrivateRouteChecker from "../../components/private-route-checker";
import Footer from "../../components/footer";
import ProfileLeftMenu from "./left-menu";
import { ProfileContent } from "./style";
import PersonalData from "./personal-data";
import { ProfileTab } from "./utils";
import Finance from "./finance";
import Gallery from "./gallery";
import { useSelector } from "react-redux";
import { IApplicationState } from "../../../store";
import { IUser } from "../../../store/user/types";
import { GLOBAL_LIGHT_BG } from "../../../styles/colors";
import UserTestimonials from "./testimonials";

const Profile = () => {
  const [selectedMenu, setSelectedMenu] = useState<ProfileTab>(
    ProfileTab.PERSONAL
  );

  const userProfile: IUser | undefined = useSelector(
    (state: IApplicationState) => state.user.profile
  );

  return (
    <>
      <PrivateRouteChecker />
      <Navigation />
      <Grid container direction="row" wrap="nowrap">
        <ProfileLeftMenu
          setSelectedMenuItem={(menuNumber: number) => {
            setSelectedMenu(menuNumber);
          }}
          selectedMenuItem={selectedMenu}
        />
        <ProfileContent item justifyContent="center" bgcolor={GLOBAL_LIGHT_BG}>
          {userProfile && selectedMenu === ProfileTab.PERSONAL && (
            <PersonalData userProfile={userProfile} />
          )}
          {userProfile?._id && selectedMenu === ProfileTab.FINANCE && (
            <Finance userId={userProfile._id} />
          )}
          {selectedMenu === ProfileTab.GALLERY && <Gallery />}
          {selectedMenu === ProfileTab.TESTIMONIALS && <UserTestimonials />}
        </ProfileContent>
      </Grid>
      <Footer />
    </>
  );
};

export default Profile;
