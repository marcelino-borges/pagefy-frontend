import { useState } from "react";
import { useSelector } from "react-redux";
import { Button, Grid } from "@mui/material";
import { IApplicationState } from "../../../store";
import { IUserPage } from "../../../store/user/types";
import Header from "../../components/header";
import DashboardContent from "../../components/site-content";
import PageCard from "./page-card/index";
import CreatePageDialog from "./dialog-create-page/index";
import strings from "../../../localization";

const UserPages = () => {
  const userProfileState = useSelector(
    (state: IApplicationState) => state.user.profile
  );

  const [showCreatePageDialog, setShowCreatePageDialog] = useState(false);

  return (
    <>
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
          {userProfileState?.pages.map((page: IUserPage) => {
            return <PageCard page={page} key={page._id} />;
          })}
        </Grid>
      </DashboardContent>
    </>
  );
};

export default UserPages;
