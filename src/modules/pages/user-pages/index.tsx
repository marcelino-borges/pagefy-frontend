import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Grid } from "@mui/material";
import { IApplicationState } from "../../../store";
import Header from "../../components/header";
import DashboardContent from "../../components/site-content";
import PageCard from "./page-card/index";
import CreatePageDialog from "./dialog-create-page/index";
import strings from "../../../localization";
import { IUserPage } from "../../../store/user-pages/types";
import PrivateRouteChecker from "./../../components/private-route-checker/index";
import { getUser } from "../../../store/user/actions";
import { clearLoading } from "./../../../store/shared/actions";

const UserPages = () => {
  const dispatch = useDispatch();

  const userPagesState = useSelector(
    (state: IApplicationState) => state.userPages
  );

  const [showCreatePageDialog, setShowCreatePageDialog] = useState(false);

  const userEmailState = useSelector(
    (state: IApplicationState) => state.user.profile?.email
  );

  useEffect(() => {
    if (userEmailState) dispatch(getUser(userEmailState, null));

    return () => {
      dispatch(clearLoading());
    };
  }, [dispatch, userEmailState]);

  return (
    <>
      <PrivateRouteChecker />
      <Header />
      <CreatePageDialog
        open={showCreatePageDialog}
        title={strings.createPage}
        onClose={() => {
          setShowCreatePageDialog(false);
        }}
      />
      <DashboardContent container direction="column">
        <Grid
          container
          justifyContent="center"
          style={{ padding: "16px 0px 24px 0px" }}
        >
          <Button
            onClick={() => {
              setShowCreatePageDialog(true);
            }}
          >
            Criar página
          </Button>
        </Grid>
        <Grid container>
          {userPagesState.pages &&
            userPagesState.pages.length > 0 &&
            userPagesState.pages.map((page: IUserPage) => {
              return <PageCard page={page} key={page._id} />;
            })}
        </Grid>
      </DashboardContent>
    </>
  );
};

export default UserPages;
