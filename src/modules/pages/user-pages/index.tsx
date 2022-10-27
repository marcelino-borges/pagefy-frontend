import { useState } from "react";
import { useSelector } from "react-redux";
import { Button, Grid } from "@mui/material";
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
import { canCreatePage } from "../../../utils/plan-enablements";
import CustomTooltip from "../../components/tooltip";
import { showErrorToast } from "./../../../utils/toast/index";
import ButtonScrollTop from "../../components/button-scroll-top";

const UserPages = () => {
  const userPagesState = useSelector(
    (state: IApplicationState) => state.userPages
  );

  const [showCreatePageDialog, setShowCreatePageDialog] = useState(false);

  const profileState: IUser | undefined = useSelector(
    (state: IApplicationState) => state.user.profile
  );

  const pagesState: IUserPage[] | undefined = useSelector(
    (state: IApplicationState) => state.userPages.pages
  );

  return (
    <>
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
        direction="column"
        minHeight="70vh"
        justifyContent="start"
        pb="100px"
      >
        <Grid
          container
          justifyContent="center"
          padding="16px 0px 16px 0px"
          mt="-16px"
          mb="32px"
          borderRadius="0px 0px 19px 19px"
          bgcolor="white"
          boxShadow="0px 4px 4px rgb(0 0 0 / 6%)"
        >
          <CustomTooltip
            title={
              canCreatePage(profileState, pagesState.length)
                ? strings.createPage
                : strings.plansBlockings.yourPlanDoesntAllowCreateNewPage
            }
          >
            <Button
              variant="contained"
              onClick={() => {
                if (!canCreatePage(profileState, pagesState.length)) {
                  showErrorToast(
                    strings.plansBlockings.yourPlanDoesntAllowCreateNewPage
                  );
                  return;
                }
                setShowCreatePageDialog(true);
              }}
            >
              <Add style={{ fontSize: "20px", marginRight: "4px" }} />
              {strings.createPage}
            </Button>
          </CustomTooltip>
        </Grid>

        <Grid container>
          {userPagesState.pages &&
            userPagesState.pages.length > 0 &&
            userPagesState.pages.map((page: IUserPage) => {
              return <PageCard page={page} key={page._id} />;
            })}
        </Grid>
      </ThinWidthContent>
      <ButtonScrollTop />
      <Footer />
    </>
  );
};

export default UserPages;
