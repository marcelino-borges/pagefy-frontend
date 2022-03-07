import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SketchPicker } from "react-color";
import { Badge, Grid, IconButton, useMediaQuery } from "@mui/material";
import {
  Construction as CreateComponentIcon,
  InsertEmoticon as InsertIconIcon,
  YouTube as YouTubeIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  ImageSearch as ImageSearchIcon,
  Delete as DeleteIcon,
  RocketLaunch as LaunchIcon,
} from "@mui/icons-material";
import BackgroundColorIcon from "../../../assets/icons/custom-icons/background-color";
import FontColorIcon from "../../../assets/icons/custom-icons/font-color";
import { IUserComponent, IUserPage } from "../../../store/user-pages/types";
import { useDispatch, useSelector } from "react-redux";
import { IApplicationState } from "./../../../store/index";
import routes from "./../../../routes/paths";
import DashboardContent from "../../components/site-content";
import LoadingSpinner from "../../components/loading-spinner";
import { setPageBeingManaged } from "../../../store/page-management/actions";
import {
  PageToolbar,
  PageName,
  PageAvatar,
  ToolbarButton,
  ToolbarIconText,
  PageUrl,
  AvatarEditBadge,
  AvatarOverlay,
  ToolbarBottomToolsStyled,
  ColorPickerSpan,
} from "./style";
import strings from "../../../localization";
import { EditPenIcon } from "./style";
import TransparentTextField from "./../../components/transparent-textfield/index";
import { useForm } from "react-hook-form";
import {
  deletePage,
  setPageBackgroundColor,
  setPageFontColor,
  togglePageIsPublic,
  updateUserPageName,
  updateUserPageUrl,
} from "../../../store/user-pages/actions";
import DraggableUserComponent from "./draggable-component";
import { v4 as uuidv4 } from "uuid";
import IconsDialog from "./icons-dialog";
import ComponentDialog from "./component-dialog";
import VideoDialog from "./video-dialog/index";
import Header from "./../../components/header/index";
import ChooseFileDialog from "./../../components/dialog-file-upload/index";
import { IMAGE_EXTENSIONS } from "../../constants";
import IconsComponent from "../../components/page-renderer/component-types/icon";
import DialogConfirmation from "./../../components/dialog-confirmation/index";
import LaunchDialog from "./launch-dialog";

const BREAK_TOOLBAR_TEXT = true;
const BREAK_POINT_TOOLBAR_TEXT = 12;

const UserPage = () => {
  const dispatch = useDispatch();
  const isSmallerThan600 = useMediaQuery("(max-width:600px)");

  const [page, setPage] = useState<IUserPage>();
  const [isEdittingPageName, setIsEdittingPageName] = useState(false);
  const [isEdittingPageUrl, setIsEdittingPageUrl] = useState(false);
  const [pageName, setPageName] = useState("");
  const [pageUrl, setPageUrl] = useState("");
  const [openIconsDialog, setOpenIconsDialog] = useState(false);
  const [openComponentDialog, setOpenComponentDialog] = useState(false);
  const [openVideoDialog, setOpenVideoDialog] = useState(false);
  const [openLaunchDialog, setOpenLaunchDialog] = useState(false);
  const [openUploadDialog, setOpenUploadDialog] = useState(false);
  const [chosenImage, setChosenImage] = useState<File>();
  const [showBackgroundColorPicker, setShowBackgroundColorPicker] =
    useState<boolean>(false);
  const [showFontColorPicker, setShowFontColorPicker] =
    useState<boolean>(false);
  const [openChooseFileDialog, setOpenChooseFileDialog] = useState(false);
  const [showDeletePageConfirmation, setShowDeletePageConfirmation] =
    useState(false);

  const { handleSubmit } = useForm();

  let navigate = useNavigate();
  let { id } = useParams();

  const userPagesState = useSelector(
    (state: IApplicationState) => state.userPages
  );

  const listContainer = useRef(null);

  useEffect(() => {
    if (
      id &&
      !!userPagesState &&
      userPagesState.pages &&
      userPagesState.pages.length > 0
    ) {
      const pageFound = userPagesState.pages.find(
        (page: IUserPage) => page._id === id
      );
      if (pageFound) {
        setPage(pageFound);
      } else {
        navigate(routes.notFound);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, userPagesState?.pages]);

  useEffect(() => {
    if (page && page._id) {
      dispatch(setPageBeingManaged(page._id));
      setPageName(page.name);
      setPageUrl(page.url);
    }
  }, [dispatch, page, page?._id]);

  const handleChangePageName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPageName(event.target.value);
  };

  const handleChangePageUrl = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPageUrl(event.target.value);
  };

  const onSubmitPageNameForm = () => {
    if (!page || !page._id) return;
    setIsEdittingPageName(false);
    dispatch(updateUserPageName(page._id, pageName));
  };

  const onSubmitPageUrlForm = () => {
    if (!page || !page._id) return;
    setIsEdittingPageUrl(false);
    dispatch(updateUserPageUrl(page._id, pageUrl));
  };

  const handleOpenIconsDialog = () => {
    if (!page?._id) return;

    setOpenIconsDialog(true);
  };

  const handleCloseIconsDialog = () => {
    setOpenIconsDialog(false);
  };

  const handleOpenComponentDialog = () => {
    if (!page?._id) return;

    setOpenComponentDialog(true);
  };

  const handleCloseComponentDialog = () => {
    setOpenComponentDialog(false);
  };

  const handleOpenVideoDialog = () => {
    if (!page?._id) return;

    setOpenVideoDialog(true);
  };

  const handleCloseVideoDialog = () => {
    setOpenVideoDialog(false);
  };

  const handleOpenLaunchDialog = () => {
    if (!page?._id) return;

    setOpenLaunchDialog(true);
  };

  const handleCloseLaunchDialog = () => {
    setOpenLaunchDialog(false);
  };

  const handleChangeBackgroundColorComplete = (color: any) => {
    if (page && page._id) {
      dispatch(setPageBackgroundColor(page._id, String(color.hex)));
    }
  };

  const handleChangeFontColorComplete = (color: any) => {
    if (page && page._id) {
      dispatch(setPageFontColor(page._id, String(color.hex)));
    }
  };

  const toggleIsPublic = () => {
    if (!page || !page._id) return;
    dispatch(togglePageIsPublic(page._id));
  };

  const ToolbarBottomTools = () => {
    return (
      <ToolbarBottomToolsStyled
        container
        justifyContent="space-around"
        alignItems="center"
        pt="16px"
        wrap="nowrap"
      >
        <Grid item>
          <IconButton size="large" onClick={() => toggleIsPublic()}>
            {page?.isPublic ? <VisibilityIcon /> : <VisibilityOffIcon />}
          </IconButton>
        </Grid>

        <Grid item>
          <IconButton
            size="large"
            onClick={() => {
              setShowBackgroundColorPicker(!showBackgroundColorPicker);
            }}
          >
            <BackgroundColorIcon
              bucketColor="rgba(0, 0, 0, 0.54)"
              selectedColor={
                page?.style?.backgroundColor || "rgba(0, 0, 0, 0.54)"
              }
            />
          </IconButton>
          {showBackgroundColorPicker && (
            <ColorPickerSpan>
              <SketchPicker
                color={page?.style?.backgroundColor || "white"}
                onChangeComplete={handleChangeBackgroundColorComplete}
              />
            </ColorPickerSpan>
          )}
        </Grid>

        <Grid item>
          <IconButton
            size="large"
            onClick={() => {
              setShowFontColorPicker(!showFontColorPicker);
            }}
          >
            <FontColorIcon
              bucketColor="rgba(0, 0, 0, 0.54)"
              selectedColor={page?.style?.color || "rgba(0, 0, 0, 0.54)"}
            />
          </IconButton>
          {showFontColorPicker && (
            <ColorPickerSpan>
              <SketchPicker
                color={page?.style?.color || "white"}
                onChangeComplete={handleChangeFontColorComplete}
              />
            </ColorPickerSpan>
          )}
        </Grid>

        <Grid item>
          <IconButton
            size="large"
            onClick={() => {
              setOpenChooseFileDialog(true);
            }}
          >
            <ImageSearchIcon />
          </IconButton>
          <ChooseFileDialog
            openChooseFileDialog={openChooseFileDialog}
            setOpenChooseFileDialog={setOpenChooseFileDialog}
            chosenImage={chosenImage}
            setChosenImage={setChosenImage}
            acceptedFiles={IMAGE_EXTENSIONS}
            submitDialog={() => {
              if (!chosenImage) return;
              // TODO: Send file
              setOpenChooseFileDialog(false);
            }}
            cancelDialog={() => {
              setChosenImage(undefined);
              setOpenChooseFileDialog(false);
            }}
          />
        </Grid>
        <Grid item>
          <IconButton
            size="large"
            onClick={() => {
              setShowDeletePageConfirmation(true);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Grid>
      </ToolbarBottomToolsStyled>
    );
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
        <Grid
          container
          justifyContent={!isSmallerThan600 ? "space-evenly" : "center"}
          alignItems="center"
          direction={isSmallerThan600 ? "column" : "row"}
        >
          <Grid item>
            <Grid container justifyContent="center" alignItems="center">
              {page && (
                <Badge
                  overlap="circular"
                  anchorOrigin={{ vertical: "top", horizontal: "right" }}
                  onClick={() => {
                    setOpenUploadDialog(true);
                  }}
                  badgeContent={
                    <AvatarEditBadge>
                      <EditPenIcon
                        style={{ fontSize: "20px", color: "white" }}
                      />
                    </AvatarEditBadge>
                  }
                >
                  <PageAvatar src={page.pageImageUrl}>
                    {page.name.split(" ")[0][0]}
                    <AvatarOverlay />
                  </PageAvatar>
                </Badge>
              )}
            </Grid>
          </Grid>

          <Grid item>
            <Grid
              container
              item
              direction="row"
              justifyContent={isSmallerThan600 ? "space-evenly" : "center"}
              style={{ paddingTop: isSmallerThan600 ? "24px" : "0" }}
            >
              <Grid item xs={3}>
                <Grid container item direction="column" alignItems="center">
                  <ToolbarButton onClick={handleOpenComponentDialog}>
                    <CreateComponentIcon />

                    <ToolbarIconText>
                      {BREAK_TOOLBAR_TEXT &&
                      strings.addLink.length > BREAK_POINT_TOOLBAR_TEXT &&
                      strings.addLink.split(" ").length > 1 ? (
                        strings.addLink.split(" ").map((word: string) => {
                          return (
                            <span key={uuidv4()}>
                              {word} <br />
                            </span>
                          );
                        })
                      ) : (
                        <>{strings.addLink}</>
                      )}
                    </ToolbarIconText>
                  </ToolbarButton>
                </Grid>
              </Grid>

              <Grid item xs={3}>
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

              <Grid item xs={3}>
                <Grid container item direction="column" alignItems="center">
                  <ToolbarButton onClick={handleOpenVideoDialog}>
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

              <Grid item xs={3}>
                <Grid container item direction="column" alignItems="center">
                  <ToolbarButton onClick={handleOpenLaunchDialog}>
                    <LaunchIcon />
                    <ToolbarIconText>
                      {BREAK_TOOLBAR_TEXT &&
                      strings.addLaunch.length > BREAK_POINT_TOOLBAR_TEXT &&
                      strings.addLaunch.split(" ").length > 1 ? (
                        strings.addLaunch.split(" ").map((word: string) => {
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
                textAlign="center"
                value={pageName}
                onChange={handleChangePageName}
                onBlur={() => {
                  if (page) setPageName(page.name);
                  setIsEdittingPageName(false);
                }}
              />
            </form>
          ) : (
            <span
              onClick={() => {
                onSubmitPageNameForm();
                setIsEdittingPageName(true);
              }}
              style={{ cursor: "pointer" }}
            >
              {pageName}
              <EditPenIcon />
            </span>
          )}
          {/* <VisibilityIcon /> */}
        </PageName>

        <PageUrl container justifyContent="center" alignItems="center">
          {isEdittingPageUrl ? (
            <form onSubmit={handleSubmit(onSubmitPageUrlForm)}>
              <TransparentTextField
                autoFocus
                color="#bfbfbf"
                fontSize="1.2em"
                InputProps={{
                  style: { width: "100%" },
                }}
                fontWeight="300"
                textAlign="center"
                value={pageUrl}
                onChange={handleChangePageUrl}
                onBlur={() => {
                  onSubmitPageUrlForm();
                  setIsEdittingPageUrl(false);
                }}
              />
            </form>
          ) : (
            <span
              onClick={() => {
                if (page) setPageUrl(page.url);
                setIsEdittingPageUrl(true);
              }}
              style={{ cursor: "pointer" }}
            >
              {pageUrl}
              <EditPenIcon />
            </span>
          )}
        </PageUrl>
      </PageToolbar>
    );
  };

  return (
    <>
      <Header />
      <DashboardContent>
        <DialogConfirmation
          open={showDeletePageConfirmation}
          title={strings.deletePage}
          onClose={() => {
            setShowDeletePageConfirmation(false);
          }}
          onConfirmCallback={() => {
            if (page && page._id) {
              dispatch(deletePage(page._id));
              navigate(routes.pages);
            }
          }}
          message={strings.deletePageConfirmation}
        />
        <ChooseFileDialog
          openChooseFileDialog={openUploadDialog}
          setOpenChooseFileDialog={setOpenUploadDialog}
          chosenImage={chosenImage}
          setChosenImage={setChosenImage}
          acceptedFiles={IMAGE_EXTENSIONS}
          submitDialog={() => {
            if (!chosenImage) {
              return;
            }
            // TODO: Send file
            setOpenUploadDialog(false);
          }}
          cancelDialog={() => {
            setChosenImage(undefined);
            setOpenUploadDialog(false);
          }}
        />
        <IconsDialog
          open={openIconsDialog}
          handleClose={handleCloseIconsDialog}
          pageId={page?._id}
        />
        <ComponentDialog
          open={openComponentDialog}
          handleClose={handleCloseComponentDialog}
          pageId={page?._id}
        />
        <VideoDialog
          open={openVideoDialog}
          handleClose={handleCloseVideoDialog}
          pageId={page?._id}
        />
        <LaunchDialog
          open={openLaunchDialog}
          handleClose={handleCloseLaunchDialog}
          pageId={page?._id}
        />
        <ToolBar />
        <ToolbarBottomTools />
        {page && page.topComponents && page.topComponents.length > 0 && (
          <IconsComponent iconsList={page.topComponents} />
        )}
        {page && page.middleComponents && page.middleComponents.length > 0 ? (
          <Grid container direction="column" ref={listContainer}>
            {page.middleComponents.map(
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
      </DashboardContent>
    </>
  );
};

export default UserPage;
