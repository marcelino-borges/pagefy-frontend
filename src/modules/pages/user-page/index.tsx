import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Grid, useMediaQuery } from "@mui/material";
import {
  Construction as CreateComponentIcon,
  InsertEmoticon as InsertIconIcon,
  YouTube as YouTubeIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  ImageSearch as ImageSearchIcon,
  Delete as DeleteIcon,
  RocketLaunch as LaunchIcon,
  OpenInNew as OpenInNewIcon,
  Code,
} from "@mui/icons-material";
import BackgroundColorIcon from "../../../assets/icons/custom-icons/background-color";
import FontColorIcon from "../../../assets/icons/custom-icons/font-color";
import { IUserComponent, IUserPage } from "../../../store/user-pages/types";
import { useDispatch, useSelector } from "react-redux";
import { IApplicationState } from "./../../../store/index";
import routes from "./../../../routes/paths";
import ThinWidthContent from "../../components/site-content/thin-width";
import { setPageBeingManaged } from "../../../store/page-management/actions";
import {
  PageToolbar,
  PageName,
  ToolbarButton,
  ToolbarIconText,
  PageUrl,
  ToolbarBottomToolsStyled,
  EditPenIcon,
} from "./style";
import strings from "../../../localization";
import TransparentTextField from "./../../components/transparent-textfield/index";
import { useForm } from "react-hook-form";
import {
  deletePage,
  deleteTopComponentFromPage,
  setPageBackgroundColor,
  setPageBGImage,
  setPageFontColor,
  uploadAndSetPageImage,
  togglePageIsPublic,
  updatePage,
  updateUserPageName,
  updateUserPageUrl,
  setPageImage,
} from "../../../store/user-pages/actions";
import DraggableUserComponent from "./draggable-component";
import { v4 as uuidv4 } from "uuid";
import IconsDialog from "./icons-dialog";
import ComponentDialog from "./create-component-dialog";
import VideoDialog from "./video-dialog";
import Header from "./../../components/header";
import UploadImageDialog from "../../components/dialog-upload-image";
import { GalleryContext, IMAGE_EXTENSIONS } from "../../../constants";
import IconsComponent from "../../components/page-renderer/component-types/icon";
import DialogConfirmation from "./../../components/dialog-confirmation";
import LaunchDialog from "./launch-dialog";
import ProfileEditableAvatar from "../../components/profile-editable-avatar";
import PrivateRouteChecker from "./../../components/private-route-checker";
import CustomTooltip from "../../components/tooltip";
import ColorPicker from "./../../components/color-picker";
import { getUser } from "../../../store/user/actions";
import IconButton from "../../components/icon-button";
import { getPageByUrl } from "../../../services/user-pages";
import { AxiosResponse } from "axios";
import { showErrorToast, showSuccessToast } from "./../../../utils/toast";
import { clearLoading, setLoading } from "../../../store/shared/actions";
import { deleteImage } from "../../../services/files";
import { getFirebaseToken } from "../../../utils/firebase-config";
import { LIGHT_GREY } from "../../../styles/colors";
import PreviewPageDialog from "./preview-dialog";
import Footer from "./../../components/footer";
import CustomScriptDialog from "./custom-script-dialog";

const BREAK_TOOLBAR_TEXT = true;
const BREAK_POINT_TOOLBAR_TEXT = 12;

const UserPage = () => {
  const dispatch = useDispatch();
  const isSmallerThan600 = useMediaQuery("(max-width:600px)");
  const isSmallerThan370 = useMediaQuery("(max-width:370px)");

  const [page, setPage] = useState<IUserPage>();
  const [isEdittingPageName, setIsEdittingPageName] = useState(false);
  const [isEdittingPageUrl, setIsEdittingPageUrl] = useState(false);
  const [pageName, setPageName] = useState("");
  const [pageUrl, setPageUrl] = useState("");
  const [openIconsDialog, setOpenIconsDialog] = useState(false);
  const [openComponentDialog, setOpenComponentDialog] = useState(false);
  const [openVideoDialog, setOpenVideoDialog] = useState(false);
  const [openLaunchDialog, setOpenLaunchDialog] = useState(false);
  const [openChooseFilePageDialog, setOpenChooseFilePageDialog] =
    useState(false);
  const [chosenImage, setChosenImage] = useState<File>();
  const [showBackgroundColorPicker, setShowBackgroundColorPicker] =
    useState<boolean>(false);
  const [showFontColorPicker, setShowFontColorPicker] =
    useState<boolean>(false);
  const [openChooseFileBGDialog, setOpenChooseFileBGDialog] = useState(false);
  const [showDeletePageConfirmation, setShowDeletePageConfirmation] =
    useState(false);
  const [urlFieldError, setUrlFieldError] = useState<string | undefined>();
  const [openDeleteIconConfirmation, setOpenDeleteIconConfirmation] =
    useState(false);
  const [idIconToDelete, setIdIconToDelete] = useState<string | undefined>();
  const [openPreviewDialog, setOpenPreviewDialog] = useState<boolean>(false);
  const [openCustomScriptDialog, setOpenCustomScriptDialog] =
    useState<boolean>(false);

  const { handleSubmit } = useForm();

  let navigate = useNavigate();
  let { id } = useParams();

  const userPagesState = useSelector(
    (state: IApplicationState) => state.userPages
  );

  const userEmailState = useSelector(
    (state: IApplicationState) => state.user.profile?.email
  );

  const listContainer = useRef(null);

  useEffect(() => {
    if (userEmailState) dispatch(getUser(userEmailState, null));
  }, [dispatch, userEmailState]);

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
        setPage({ ...pageFound });
      } else {
        navigate(routes.notFound);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, userPagesState]);

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
    if (pageName !== page.name)
      dispatch(updateUserPageName(page._id, pageName));
    setIsEdittingPageName(false);
  };

  const onSubmitPageUrlForm = () => {
    const savePage = () => {
      if (page && page._id && pageUrl !== page.url) {
        console.log("saving");
        dispatch(updateUserPageUrl(page._id, pageUrl));
      }
    };

    setUrlFieldError(undefined);
    getPageByUrl(pageUrl)
      .then((result: AxiosResponse) => {
        if (page && page._id && result.data && result.data._id) {
          if (result.data._id !== page._id) {
            setUrlFieldError(strings.authErrors.urlAlreadyExists);
            setIsEdittingPageUrl(false);
          } else {
            savePage();
          }
        }
      })
      .catch(() => {
        savePage();
      })
      .finally(() => {
        setIsEdittingPageUrl(false);
      });
  };

  const onSubmitPageScripts = (
    headerScriptFromDialog: string | undefined,
    endBodyScriptFromDialog: string | undefined
  ) => {
    if (
      !page ||
      !page._id ||
      (headerScriptFromDialog === undefined &&
        endBodyScriptFromDialog === undefined)
    )
      return;
    const updatedPage: IUserPage = {
      ...page,
      customScripts: {
        header: headerScriptFromDialog || "",
        endBody: endBodyScriptFromDialog || "",
      },
    };
    dispatch(
      updatePage(updatedPage, () => {
        showSuccessToast(strings.successUpdatePage);
      })
    );
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
      setShowBackgroundColorPicker(false);
    }
  };

  const handleChangeFontColorComplete = (color: any) => {
    if (page && page._id) {
      dispatch(setPageFontColor(page._id, String(color.hex)));
      setShowFontColorPicker(false);
    }
  };

  const toggleIsPublic = () => {
    if (!page || !page._id) return;
    dispatch(togglePageIsPublic(page._id));
  };

  const savePageImage = async (imageUrl?: string) => {
    const token = await getFirebaseToken();
    if ((!imageUrl && !chosenImage) || !token || !page || !page._id) return;

    if (page.pageImageUrl && page.pageImageUrl.length > 0) {
      dispatch(setLoading());
      deleteImage(page.pageImageUrl, page.userId, token);
    }

    const successCallback = (url: string) => {
      const pageToSave: IUserPage = {
        ...page,
        pageImageUrl: url,
      };
      dispatch(
        updatePage(
          pageToSave,
          () => {
            dispatch(clearLoading());
            setPage({
              ...page,
              pageImageUrl: pageToSave.pageImageUrl,
            });
          },
          () => {
            dispatch(clearLoading());
          }
        )
      );
    };

    const errorCallback = (errorTranslated: string) => {
      showErrorToast(errorTranslated);
      dispatch(clearLoading());
    };

    if (imageUrl) {
      dispatch(setPageImage(imageUrl, successCallback, errorCallback));
    } else if (chosenImage) {
      dispatch(
        uploadAndSetPageImage(chosenImage, page, successCallback, errorCallback)
      );
    }

    setChosenImage(undefined);
  };

  const savePageBGImage = async (imageUrl?: string) => {
    const token = await getFirebaseToken();
    if ((!imageUrl && !chosenImage) || !token || !page || !page._id) return;

    if (
      page.style &&
      page.style.backgroundImage &&
      page.style.backgroundImage?.length > 0
    ) {
      const urlToDelete = page.style.backgroundImage
        .replace("url", "")
        .replaceAll("(", "")
        .replaceAll(")", "");
      dispatch(setLoading());
      deleteImage(urlToDelete, page.userId, token);
    }

    const successCallback = (url: string) => {
      const pageToSave: IUserPage = {
        ...page,
        style: {
          ...page.style,
          backgroundImage: `url(${url})`,
        },
      };
      dispatch(
        updatePage(
          pageToSave,
          () => {
            dispatch(clearLoading());
            setPage({
              ...page,
              style: {
                ...page.style,
                backgroundImage: `url(${url})`,
              },
            });
          },
          () => {
            dispatch(clearLoading());
          }
        )
      );
    };

    const errorCallback = (errorTranslated: string) => {
      dispatch(clearLoading());
      showErrorToast(errorTranslated);
    };

    if (imageUrl) {
      dispatch(setPageImage(imageUrl, successCallback, errorCallback));
    } else if (chosenImage) {
      dispatch(
        setPageBGImage(chosenImage, page, successCallback, errorCallback)
      );
    }

    setChosenImage(undefined);
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
        <CustomTooltip title={strings.toggleVisibility}>
          <Grid item>
            <IconButton
              size="large"
              onClick={() => toggleIsPublic()}
              hoverBackgroundColor={LIGHT_GREY}
            >
              {page?.isPublic ? (
                <VisibilityIcon color="primary" />
              ) : (
                <VisibilityOffIcon />
              )}
            </IconButton>
          </Grid>
        </CustomTooltip>

        <CustomTooltip title={strings.backgroundColor}>
          <Grid item>
            <IconButton
              size="large"
              onClick={() => {
                setShowBackgroundColorPicker(!showBackgroundColorPicker);
              }}
              hoverBackgroundColor={LIGHT_GREY}
            >
              <BackgroundColorIcon
                bucketColor={
                  page?.style?.backgroundColor || "rgba(0, 0, 0, 0.54)"
                }
                selectedColor={
                  page?.style?.backgroundColor || "rgba(0, 0, 0, 0.54)"
                }
              />
            </IconButton>
            {showBackgroundColorPicker && (
              <ColorPicker
                color={page?.style?.backgroundColor || "white"}
                onChangeComplete={handleChangeBackgroundColorComplete}
              />
            )}
          </Grid>
        </CustomTooltip>

        <CustomTooltip title={strings.fontColor}>
          <Grid item>
            <IconButton
              hoverBackgroundColor={LIGHT_GREY}
              size="large"
              onClick={() => {
                setShowFontColorPicker(!showFontColorPicker);
              }}
            >
              <FontColorIcon
                bucketColor={page?.style?.color || "rgba(0, 0, 0, 0.54)"}
                selectedColor={page?.style?.color || "rgba(0, 0, 0, 0.54)"}
              />
            </IconButton>
            {showFontColorPicker && (
              <ColorPicker
                color={page?.style?.color || "white"}
                onChangeComplete={handleChangeFontColorComplete}
              />
            )}
          </Grid>
        </CustomTooltip>

        <CustomTooltip title={strings.uploadBackgroundImage}>
          <Grid item>
            <IconButton
              size="large"
              onClick={() => {
                setOpenChooseFileBGDialog(true);
              }}
              hoverBackgroundColor={LIGHT_GREY}
            >
              <ImageSearchIcon
                color={page?.style?.backgroundImage ? "primary" : "inherit"}
              />
            </IconButton>
            <UploadImageDialog
              context={[GalleryContext.BACKGROUND]}
              openChooseFileDialog={openChooseFileBGDialog}
              setOpenChooseFileDialog={setOpenChooseFileBGDialog}
              chosenImage={chosenImage}
              setChosenImage={setChosenImage}
              acceptedFiles={IMAGE_EXTENSIONS}
              submitDialog={async (imageUrl?: string) => {
                savePageBGImage(imageUrl);
                setOpenChooseFileBGDialog(false);
              }}
              cancelDialog={() => {
                setChosenImage(undefined);
                setOpenChooseFileBGDialog(false);
              }}
            />
          </Grid>
        </CustomTooltip>

        <CustomTooltip title={strings.customScripts.insertCustomScript}>
          <Grid item>
            <IconButton
              size="large"
              onClick={() => {
                setOpenCustomScriptDialog(true);
              }}
              hoverBackgroundColor={LIGHT_GREY}
            >
              <Code
                color={
                  page?.customScripts?.endBody?.length ||
                  page?.customScripts?.header?.length
                    ? "primary"
                    : "inherit"
                }
              />
            </IconButton>
            <CustomScriptDialog
              existingHeaderScript={page?.customScripts?.header}
              existingEndBodyScript={page?.customScripts?.endBody}
              handleClose={(
                headerScriptFromDialog: string | undefined,
                endBodyScriptFromDialog: string | undefined
              ) => {
                onSubmitPageScripts(
                  headerScriptFromDialog,
                  endBodyScriptFromDialog
                );
                setOpenCustomScriptDialog(false);
              }}
              open={openCustomScriptDialog}
            />
          </Grid>
        </CustomTooltip>

        <CustomTooltip title={strings.remove}>
          <Grid item>
            <IconButton
              size="large"
              onClick={() => {
                setShowDeletePageConfirmation(true);
              }}
              hoverBackgroundColor={LIGHT_GREY}
            >
              <DeleteIcon />
            </IconButton>
          </Grid>
        </CustomTooltip>

        <CustomTooltip title={strings.viewPage}>
          <Grid item>
            {page?.isPublic ? (
              <Link
                to={"/" + page?.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconButton
                  onClick={() => {}}
                  size="large"
                  hoverBackgroundColor={LIGHT_GREY}
                >
                  <OpenInNewIcon />
                </IconButton>
              </Link>
            ) : (
              <IconButton
                onClick={() => {
                  setOpenPreviewDialog(true);
                }}
                size="large"
                hoverBackgroundColor={LIGHT_GREY}
              >
                <OpenInNewIcon />
              </IconButton>
            )}
          </Grid>
        </CustomTooltip>
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
                <ProfileEditableAvatar
                  text={page.name}
                  imageUrl={page.pageImageUrl}
                  onClick={() => setOpenChooseFilePageDialog(true)}
                />
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

                    {!isSmallerThan370 && (
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
                    )}
                  </ToolbarButton>
                </Grid>
              </Grid>

              <Grid item xs={3}>
                <Grid container item direction="column" alignItems="center">
                  <ToolbarButton onClick={handleOpenIconsDialog}>
                    <InsertIconIcon />

                    {!isSmallerThan370 && (
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
                    )}
                  </ToolbarButton>
                </Grid>
              </Grid>

              <Grid item xs={3}>
                <Grid container item direction="column" alignItems="center">
                  <ToolbarButton onClick={handleOpenVideoDialog}>
                    <YouTubeIcon />

                    {!isSmallerThan370 && (
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
                    )}
                  </ToolbarButton>
                </Grid>
              </Grid>

              <Grid item xs={3}>
                <Grid container item direction="column" alignItems="center">
                  <ToolbarButton onClick={handleOpenLaunchDialog}>
                    <LaunchIcon />

                    {!isSmallerThan370 && (
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
                          <>{strings.addLaunch}</>
                        )}
                      </ToolbarIconText>
                    )}
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
                textAlign="center"
                value={pageName}
                onChange={handleChangePageName}
                onBlur={() => {
                  if (page) setPageName(page.name);
                  setIsEdittingPageName(false);
                }}
                InputProps={{
                  style: { width: "100%" },
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
                error={!!urlFieldError}
                helperText={urlFieldError || ""}
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
      <PrivateRouteChecker />
      <Header />
      <ThinWidthContent>
        <DialogConfirmation
          open={openDeleteIconConfirmation}
          onClose={() => {
            setOpenDeleteIconConfirmation(false);
          }}
          onConfirmCallback={() => {
            if (
              !idIconToDelete ||
              idIconToDelete.length < 1 ||
              !page ||
              !page._id
            )
              return;
            dispatch(
              deleteTopComponentFromPage(
                idIconToDelete,
                page._id,
                null,
                (translatedError: string) => {
                  showErrorToast(translatedError);
                }
              )
            );
          }}
          title={strings.removeIcon}
          message={strings.removeIconConfirmation}
        />
        <DialogConfirmation
          open={showDeletePageConfirmation}
          title={strings.removePage}
          onClose={() => {
            setShowDeletePageConfirmation(false);
          }}
          onConfirmCallback={() => {
            if (page && page._id) {
              dispatch(deletePage(page._id));
              navigate(routes.pages);
            }
          }}
          message={strings.removePageConfirmation}
        />
        <UploadImageDialog
          context={[GalleryContext.PAGE_IMAGE]}
          openChooseFileDialog={openChooseFilePageDialog}
          setOpenChooseFileDialog={setOpenChooseFilePageDialog}
          chosenImage={chosenImage}
          setChosenImage={setChosenImage}
          acceptedFiles={IMAGE_EXTENSIONS}
          submitDialog={async (imageUrl?: string) => {
            savePageImage(imageUrl);
            setOpenChooseFilePageDialog(false);
          }}
          cancelDialog={() => {
            setChosenImage(undefined);
            setOpenChooseFilePageDialog(false);
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
        {page && (
          <PreviewPageDialog
            page={page}
            open={openPreviewDialog}
            onClose={() => {
              setOpenPreviewDialog(false);
            }}
          />
        )}
        <ToolBar />
        <ToolbarBottomTools />
        {page && page.topComponents && page.topComponents.length > 0 && (
          <IconsComponent
            iconsList={page.topComponents}
            pageId={page._id}
            onClickIcon={(iconComponent: IUserComponent) => {
              if (iconComponent._id) setIdIconToDelete(iconComponent._id);
              setOpenDeleteIconConfirmation(true);
            }}
          />
        )}
        {page && page.middleComponents && page.middleComponents.length > 0 ? (
          <Grid container direction="column" ref={listContainer}>
            {page.middleComponents.map(
              (component: IUserComponent, index: number) => (
                <DraggableUserComponent
                  component={component}
                  index={index}
                  pageId={page._id}
                  key={uuidv4()}
                />
              )
            )}
          </Grid>
        ) : (
          <></>
        )}
        {page && page.bottomComponents && page.bottomComponents.length > 0 && (
          <IconsComponent iconsList={page.bottomComponents} />
        )}
      </ThinWidthContent>
      <Footer />
    </>
  );
};

export default UserPage;
