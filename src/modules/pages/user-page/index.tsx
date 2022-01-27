import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DraggableList from "react-draggable-list";
import { Grid } from "@mui/material";
import DraggableUserComponentClass from "./draggable-user-component/outer-class/index";
import { IUserComponent, IUserPage } from "../../../store/user/types";
import { useSelector } from "react-redux";
import { IApplicationState } from "./../../../store/index";
import routes from "./../../../routes/paths";
import SiteContent from "../../components/site-content";

const UserPage = () => {
  const [componentsList, setComponentsList] = useState<IUserComponent[]>();
  const [page, setPage] = useState<IUserPage>();

  const navigate = useNavigate();

  const userProfileState = useSelector(
    (state: IApplicationState) => state.user.profile
  );

  const listContainer = useRef(null);

  let { pageUrl } = useParams();

  useEffect(() => {
    if (
      !!userProfileState &&
      userProfileState.pages &&
      userProfileState.pages.length > 0
    ) {
      const pageFound = userProfileState.pages.find(
        (page: IUserPage) => page.url === pageUrl
      );
      if (pageFound) {
        setPage(pageFound);
      } else {
        navigate(routes.notFound);
      }
    }
  }, [pageUrl]);

  const onListChange = (newList: any) => {
    setComponentsList(newList);
    console.log(newList);
  };

  if (!page) return <>Página inexistente</>;

  return (
    <SiteContent>
      <Grid
        container
        direction="column"
        style={{
          width: "80%",
          overflow: "auto",
          border: "1px solid grey",
        }}
        ref={listContainer}
      >
        <DraggableList<IUserComponent, void, DraggableUserComponentClass>
          itemKey="label"
          template={DraggableUserComponentClass}
          list={componentsList}
          onMoveEnd={(newList) => onListChange(newList)}
          container={() => listContainer.current}
        />
      </Grid>
    </SiteContent>
  );
};

export default UserPage;
