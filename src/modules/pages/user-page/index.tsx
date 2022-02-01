import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DraggableList from "react-draggable-list";
import { Grid } from "@mui/material";
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
  ToolbarButton,
  ToolbarIconText,
  VisibilityIcon,
} from "./style";
import strings from "../../../localization";
import { EditPenIcon } from "./style";
import TransparentTextField from "./../../components/transparent-textfield/index";
import { useForm } from "react-hook-form";
import { updateUserPageName } from "../../../store/user/actions";

const BREAK_TOOLBAR_TEXT = true;
const BREAK_POINT_TOOLBAR_TEXT = 12;

const UserPage = () => {
  const dispatch = useDispatch();
  const [componentsList, setComponentsList] = useState<IUserComponent[]>();
  const [page, setPage] = useState<IUserPage>();
  const [isEdittingPageName, setIsEdittingPageName] = useState(false);
  const [pageName, setPageName] = useState("");

  const { handleSubmit } = useForm();

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

  const handleChangePageName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPageName(event.target.value);
  };

  const onSubmitPageNameForm = () => {
    if (!page || !page._id) return;
    setIsEdittingPageName(false);
    dispatch(updateUserPageName(page._id, pageName));
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
              <Grid item xs={12} sm={3}>
                <Grid container item direction="column" alignItems="center">
                  <ToolbarButton>
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
                  </ToolbarButton>
                </Grid>
              </Grid>

              <Grid item xs={12} sm={3}>
                <Grid container item direction="column" alignItems="center">
                  <ToolbarButton>
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
                  </ToolbarButton>
                </Grid>
              </Grid>

              <Grid item xs={12} sm={3}>
                <Grid container item direction="column" alignItems="center">
                  <ToolbarButton>
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
                  </ToolbarButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <PageName container justifyContent="center" alignItems="center">
          {isEdittingPageName ? (
            <form onSubmit={handleSubmit(onSubmitPageNameForm)}>
              <TransparentTextField
                autoFocus
                color="#bfbfbf"
                fontSize="26px"
                InputProps={{
                  style: { width: "100%" },
                }}
                value={pageName}
                onChange={handleChangePageName}
                onBlur={() => {
                  if (page) setPageName(page.name);
                  setIsEdittingPageName(false);
                }}
              />
            </form>
          ) : (
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              onClick={() => {
                if (page) setPageName(page.name);
                setIsEdittingPageName(true);
              }}
              style={{ cursor: "pointer" }}
            >
              {page?.name}
              <EditPenIcon />
            </Grid>
          )}
          {/* <VisibilityIcon /> */}
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
