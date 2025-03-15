import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import Navigation from "../../components/navigation";
import PrivateRouteChecker from "../../components/private-route-checker";
import Footer from "../../components/footer";
import ProfileLeftMenu from "./left-menu";
import { ProfileContent } from "./style";
import PersonalData from "./personal-data";
import { ProfileTab } from "./utils";
import YourSubscriptions from "./your-subscriptions";
import Gallery from "./gallery";
import { useDispatch, useSelector } from "react-redux";
import { IApplicationState } from "../../../store";
import { IUser } from "../../../store/user/types";
import { GLOBAL_LIGHT_BG } from "../../../styles/colors";
import UserTestimonials from "./testimonials";
import {
  PlanFeatures,
  UserSubscription,
} from "../../../store/user-subscriptions";
import { getActiveSubscription } from "../../../store/user/actions";
import { showErrorToast } from "../../../utils/toast";
import strings from "../../../localization";

const Profile = () => {
  const dispatch = useDispatch();

  const [selectedMenu, setSelectedMenu] = useState<ProfileTab>(
    ProfileTab.PERSONAL
  );

  const userProfile: IUser | undefined = useSelector(
    (state: IApplicationState) => state.user.profile
  );

  const activeSubscription: UserSubscription | undefined = useSelector(
    (state: IApplicationState) => state.user.activeSubscription
  );

  const planFeatures: PlanFeatures | undefined = useSelector(
    (state: IApplicationState) => state.user.planFeatures
  );

  const auth = useSelector((state: IApplicationState) => state.auth.auth);

  useEffect(() => {
    if (!userProfile?._id || !auth?.accessToken) return;

    dispatch(
      getActiveSubscription(userProfile._id, null, (error) => {
        showErrorToast(`${error}. ${strings.signInAgain}`);
      })
    );
  }, [dispatch, userProfile, auth]);

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
          {userProfile?._id && selectedMenu === ProfileTab.SUBSCRIPTIONS && (
            <YourSubscriptions
              userId={userProfile._id}
              activeSubscription={activeSubscription}
              planFeatures={planFeatures}
            />
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
