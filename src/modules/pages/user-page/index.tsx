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
import LoadingSpinner from "../../components/loading-spinner";

const UserPage = () => {
  const [componentsList, setComponentsList] = useState<IUserComponent[]>();
  const [page, setPage] = useState<IUserPage>();

  let navigate = useNavigate();
  let { id } = useParams();

  const userProfileState = useSelector(
    (state: IApplicationState) => state.user.profile
  );

  const listContainer = useRef(null);

  useEffect(() => {
    if (
      id &&
      !!userProfileState &&
      userProfileState.pages &&
      userProfileState.pages.length > 0
    ) {
      const pageFound = userProfileState.pages.find(
        (page: IUserPage) => page._id === id
      );
      if (pageFound) {
        setPage(pageFound);
        setComponentsList(pageFound.components);
      } else {
        navigate(routes.notFound);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const onListChange = (newList: any) => {
    setComponentsList(newList);
  };

  return (
    <SiteContent>
      {page && componentsList && componentsList.length > 0 ? (
        <Grid container direction="column" ref={listContainer}>
          <DraggableList<IUserComponent, void, DraggableUserComponentClass>
            itemKey="_id"
            template={DraggableUserComponentClass}
            list={componentsList}
            onMoveEnd={(newList) => onListChange(newList)}
            container={() => listContainer.current}
          />
        </Grid>
      ) : (
        <LoadingSpinner />
      )}
    </SiteContent>
  );
};

export default UserPage;
