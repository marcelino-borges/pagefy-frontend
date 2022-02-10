import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from "@mui/material";
import {
  Construction as CreateComponentIcon,
  InsertEmoticon as InsertIconIcon,
  YouTube as YouTubeIcon,
} from "@mui/icons-material";
import {
  ComponentType,
  IUserComponent,
  IUserPage,
} from "../../../store/user/types";
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
  DeleteIconOverlay,
  DeleteIcon,
  DeleteIconOverlaySpan,
} from "./style";
import strings from "../../../localization";
import { EditPenIcon } from "./style";
import TransparentTextField from "./../../components/transparent-textfield/index";
import { useForm } from "react-hook-form";
import {
  deleteComponentFromPage,
  updateUserPageName,
} from "../../../store/user/actions";
import DraggableUserComponent from "./draggable-component/index";
import IconsDialog from "./icons-dialog";
// import iconPacks from "../../../assets/icons/react-icons";
// import { IIconPack } from "./../../../assets/icons/react-icons/index";
import CustomTooltip from "./../../components/tooltip/index";
import { v4 as uuidv4 } from "uuid";
import { Icon, listIcons } from "@iconify/react";

const BREAK_TOOLBAR_TEXT = true;
const BREAK_POINT_TOOLBAR_TEXT = 12;

const UserPage = () => {
  const dispatch = useDispatch();
  const [nonIconComponentsList, setNonIconComponentsList] =
    useState<IUserComponent[]>();
  const [iconComponentsList, setIconComponentsList] =
    useState<IUserComponent[]>();
  const [page, setPage] = useState<IUserPage>();
  const [isEdittingPageName, setIsEdittingPageName] = useState(false);
  const [pageName, setPageName] = useState("");
  const [openIconsDialog, setOpenIconsDialog] = useState(false);
  const [openDeleteComponentConfirmation, setOpenDeleteComponentConfirmation] =
    useState(false);
  const [idComponenteEditted, setIdComponenteEditted] = useState<string>("");

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
        const nonIconsComponents = pageFound.components.filter(
          (comp: IUserComponent) => comp.type !== ComponentType.Icon
        );
        const iconComponents = pageFound.components.filter(
          (comp: IUserComponent) => comp.type === ComponentType.Icon
        );
        setNonIconComponentsList(nonIconsComponents);
        setIconComponentsList(iconComponents);
      } else {
        navigate(routes.notFound);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, userProfileState?.pages]);

  useEffect(() => {
    if (page && page._id) dispatch(setPageBeingManaged(page._id));
  }, [dispatch, page, page?._id]);

  const handleChangePageName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPageName(event.target.value);
  };

  const onSubmitPageNameForm = () => {
    if (!page || !page._id) return;
    setIsEdittingPageName(false);
    dispatch(updateUserPageName(page._id, pageName));
  };

  const handleOpenIconsDialog = () => {
    if (!page?._id) return;

    setOpenIconsDialog(true);
  };

  const handleCloseIconsDialog = () => {
    setOpenIconsDialog(false);
  };

  const ToolBar = () => {
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
                            <span key={uuidv4()}>
                              {word} <br />
                            </span>
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
                  <ToolbarButton onClick={handleOpenIconsDialog}>
                    <InsertIconIcon />
                    <ToolbarIconText>
                      {BREAK_TOOLBAR_TEXT &&
                      strings.addIcon.length > BREAK_POINT_TOOLBAR_TEXT &&
                      strings.addIcon.split(" ").length > 1 ? (
                        strings.addIcon.split(" ").map((word: string) => {
                          return (
                            <span key={uuidv4()}>
                              {word} <br />
                            </span>
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
                            <span key={uuidv4()}>
                              {word} <br />
                            </span>
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

  const DeleteComponentConfirmationDialog = () => {
    return (
      <Dialog
        open={openDeleteComponentConfirmation}
        onClose={() => {
          setOpenDeleteComponentConfirmation(false);
        }}
        fullWidth
        maxWidth="sm"
        style={{ minWidth: "300px" }}
      >
        <DialogTitle>{strings.deleteIcon}</DialogTitle>
        <DialogContent>{strings.deleteComponentConfirmation}</DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenDeleteComponentConfirmation(false);
            }}
          >
            {strings.no}
          </Button>
          <Button
            onClick={() => {
              if (!page || !page._id) return;
              setOpenDeleteComponentConfirmation(false);
              dispatch(deleteComponentFromPage(idComponenteEditted, page._id));
            }}
          >
            {strings.yes}
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  const handleDeleteComponent = (iconComponent: IUserComponent) => {
    if (!page || !page._id || !iconComponent._id) return;
    setIdComponenteEditted(iconComponent._id);
    setOpenDeleteComponentConfirmation(true);
  };

  return (
    <SiteContent>
      <DeleteComponentConfirmationDialog />
      <IconsDialog
        open={openIconsDialog}
        handleClose={handleCloseIconsDialog}
        pageId={page?._id}
      />
      <ToolBar />
      {iconComponentsList && iconComponentsList.length > 0 && (
        <Grid
          container
          direction="row"
          style={{
            marginBottom: "24px",
          }}
          justifyContent="center"
        >
          {iconComponentsList.map((iconComponent: IUserComponent) => {
            if (iconComponent.iconDetails) {
              return (
                <CustomTooltip title={iconComponent.url}>
                  <DeleteIconOverlaySpan>
                    <Icon
                      icon={iconComponent.iconDetails.icon}
                      style={{
                        fontSize: "46px",
                        cursor: "pointer",
                        color: iconComponent.iconDetails.icon.includes("logos")
                          ? "unset"
                          : "black",
                      }}
                    />
                  </DeleteIconOverlaySpan>
                </CustomTooltip>
              );
            }
            return <></>;
          })}
        </Grid>
      )}
      {page && nonIconComponentsList && nonIconComponentsList.length > 0 ? (
        <Grid container direction="column" ref={listContainer}>
          {nonIconComponentsList.map(
            (component: IUserComponent, index: number) => (
              <DraggableUserComponent
                component={component}
                index={index}
                pageId={page._id}
                key={component._id}
              />
            )
          )}
        </Grid>
      ) : (
        <LoadingSpinner />
      )}
    </SiteContent>
  );
};

export default UserPage;
