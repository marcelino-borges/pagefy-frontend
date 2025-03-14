import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Grid, useMediaQuery } from "@mui/material";
import { Add } from "@mui/icons-material";
import { IApplicationState } from "../../../store";
import Navigation from "../../components/navigation";
import ThinWidthContent from "../../components/site-content/thin-width";
import PageCard from "./page-card/index";
import CreatePageDialog from "./dialog-create-page/index";
import strings from "../../../localization";
import { IUserPage } from "../../../store/user-pages/types";
import PrivateRouteChecker from "./../../components/private-route-checker/index";
import Footer from "../../components/footer";
import { IUser } from "../../../store/user/types";
import { showErrorToast } from "./../../../utils/toast/index";
import ButtonScrollUp from "../../components/button-scroll-up";
import { UPPER_MEDIUM_GREY } from "../../../styles/colors";
import Meta from "../../components/meta";
import images from "../../../assets/img";
import { canUserCreatePage } from "../../../services/user";
import { ANALYTICS_EVENTS } from "../../../constants";
import PAGES_ROUTES from "../../../routes/paths";
import { logAnalyticsEvent } from "../../../services/firebase-analytics";
import { toBase64 } from "../../../utils";

const UserPages = () => {
  const isSmallerThan900 = useMediaQuery("(max-width:900px)");

  const userPagesState = useSelector(
    (state: IApplicationState) => state.userPages
  );

  const [showCreatePageDialog, setShowCreatePageDialog] = useState(false);

  const profileState: IUser | undefined = useSelector(
    (state: IApplicationState) => state.user.profile
  );

  useEffect(() => {
    logAnalyticsEvent(ANALYTICS_EVENTS.pageView, {
      page_path: PAGES_ROUTES.pages,
      page_title: "User Pages",
      email: toBase64(profileState?.email),
    });
  }, [profileState?.email]);

  const handleCreatePage = async () => {
    if (!profileState?._id) return;

    const res = await canUserCreatePage(profileState._id);

    if (!res.data) {
      showErrorToast(strings.plansBlockings.yourPlanDoesntAllowCreateNewPage);
      return;
    }

    setShowCreatePageDialog(true);
  };

  return (
    <>
      <Meta
        lang={strings.getLanguage()}
        locale={strings.getInterfaceLanguage()}
        title={"Pagefy"}
        description={strings.appDescription}
        image={images.screenshots.userPages}
      />
      <PrivateRouteChecker />
      <Navigation />
      <CreatePageDialog
        open={showCreatePageDialog}
        title={strings.createPage}
        onClose={() => {
          setShowCreatePageDialog(false);
        }}
      />
      <ThinWidthContent
        container
        center
        direction="column"
        minHeight="70vh"
        pb="100px"
      >
        <Grid
          container
          justifyContent="center"
          height="80px"
          padding="16px 0px 16px 0px"
          mt={isSmallerThan900 ? "-24px" : "-16px"}
          mb="32px"
          borderRadius="0px 0px 19px 19px"
          bgcolor="white"
          boxShadow="0px 4px 4px rgba(0, 0, 0, 0.06)"
        >
          <Button onClick={handleCreatePage} sx={{ color: UPPER_MEDIUM_GREY }}>
            <Add style={{ fontSize: "20px", marginRight: "4px" }} />
            {strings.createPage}
          </Button>
        </Grid>

        <Grid container>
          {userPagesState.pages &&
            userPagesState.pages.length > 0 &&
            userPagesState.pages.map((page: IUserPage) => {
              return <PageCard page={page} key={page._id} />;
            })}
        </Grid>
      </ThinWidthContent>
      <ButtonScrollUp />
      <Footer />
    </>
  );
};

export default UserPages;
