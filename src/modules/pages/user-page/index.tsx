import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DraggableList from "react-draggable-list";
import { Grid, IconButton } from "@mui/material";
import {
  Construction as CreateComponentIcon,
  InsertEmoticon as InsertIconIcon,
  YouTube as YouTubeIcon,
} from "@mui/icons-material";
import DraggableUserComponentClass from "./draggable-user-component/outer-class/index";
import { IUserComponent, IUserPage } from "../../../store/user/types";
import { useDispatch, useSelector } from "react-redux";
import { IApplicationState } from "./../../../store/index";
import routes from "./../../../routes/paths";
import SiteContent from "../../components/site-content";
import LoadingSpinner from "../../components/loading-spinner";
import { setPageBeingManaged } from "../../../store/page-management/actions";
import {
  PageToolbar,
  PageName,
  PageImage,
  ToolbarGridItem,
  ToolbarIconText,
} from "./style";
import strings from "../../../localization";

const BREAK_TOOLBAR_TEXT = true;
const BREAK_POINT_TOOLBAR_TEXT = 14;

const UserPage = () => {
  const dispatch = useDispatch();
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
  }, [id, userProfileState?.pages]);

  useEffect(() => {
    if (page && page._id) dispatch(setPageBeingManaged(page._id));
  }, [dispatch, page, page?._id]);

  const onListChange = (newList: any) => {
    setComponentsList(newList);
  };

  const TopTools = () => {
    return (
      <PageToolbar
        container
        item
        direction="column"
        alignItems="center"
        justifyContent="space-between"
      >
        <Grid container justifyContent="space-evenly" alignItems="center">
          <Grid item xs={12} md={3}>
            <Grid container justifyContent="center">
              {page && page.pageImageUrl ? (
                <PageImage imgUrl={page.pageImageUrl} />
              ) : (
                <></>
              )}
            </Grid>
          </Grid>

          <Grid item xs={12} md={9}>
            <Grid container item direction="row" justifyContent="center">
              <ToolbarGridItem item xs={12} sm={3}>
                <Grid container item direction="column" alignItems="center">
                  <CreateComponentIcon />
                  <ToolbarIconText>
                    {BREAK_TOOLBAR_TEXT &&
                    strings.addComponent.length > BREAK_POINT_TOOLBAR_TEXT &&
                    strings.addComponent.split(" ").length > 1 ? (
                      strings.addComponent.split(" ").map((word: string) => {
                        return (
                          <>
                            {word} <br />
                          </>
                        );
                      })
                    ) : (
                      <>{strings.addComponent}</>
                    )}
                  </ToolbarIconText>
                </Grid>
              </ToolbarGridItem>

              <ToolbarGridItem item xs={12} sm={3}>
                <Grid container item direction="column" alignItems="center">
                  <InsertIconIcon />
                  <ToolbarIconText>
                    {BREAK_TOOLBAR_TEXT &&
                    strings.addIcon.length > BREAK_POINT_TOOLBAR_TEXT &&
                    strings.addIcon.split(" ").length > 1 ? (
                      strings.addIcon.split(" ").map((word: string) => {
                        return (
                          <>
                            {word} <br />
                          </>
                        );
                      })
                    ) : (
                      <>{strings.addIcon}</>
                    )}
                  </ToolbarIconText>
                </Grid>
              </ToolbarGridItem>

              <ToolbarGridItem item xs={12} sm={3}>
                <Grid container item direction="column" alignItems="center">
                  <YouTubeIcon />
                  <ToolbarIconText>
                    {BREAK_TOOLBAR_TEXT &&
                    strings.addVideo.length > BREAK_POINT_TOOLBAR_TEXT &&
                    strings.addVideo.split(" ").length > 1 ? (
                      strings.addVideo.split(" ").map((word: string) => {
                        return (
                          <>
                            {word} <br />
                          </>
                        );
                      })
                    ) : (
                      <>{strings.addVideo}</>
                    )}
                  </ToolbarIconText>
                </Grid>
              </ToolbarGridItem>
            </Grid>
          </Grid>
        </Grid>

        <PageName container justifyContent="center" alignItems="center">
          {page?.name}
        </PageName>
      </PageToolbar>
    );
  };

  return (
    <SiteContent>
      <TopTools />
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
