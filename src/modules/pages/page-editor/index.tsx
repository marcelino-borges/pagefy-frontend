import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Grid, useMediaQuery } from "@mui/material";
import {
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  ImageSearch as ImageSearchIcon,
  Delete as DeleteIcon,
  OpenInNew as OpenInNewIcon,
  Code,
  Add as AddIcon,
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
  PageUrl,
  ToolbarBottomToolsStyled,
  EditPenIcon,
  ToolsMenuIcon,
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
import Navigation from "./../../components/navigation";
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
import { PlansTypes } from "../../../store/user/types";
import ToolsDialog from "./tools-dialog";

const PageEditor = () => {
  const dispatch = useDispatch();
  const isLargerThan800 = useMediaQuery("(min-width:800px)");
  const isSmallerThan600 = useMediaQuery("(max-width:600px)");
  const isSmallerThan500 = useMediaQuery("(max-width:500px)");
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
  const [openToolsDialog, setOpenToolsDialog] = useState<boolean>(false);

  const { handleSubmit } = useForm();

  let navigate = useNavigate();
  let { id } = useParams();

  const userPagesState = useSelector(
    (state: IApplicationState) => state.userPages
  );

  const userProfile = useSelector(
    (state: IApplicationState) => state.user.profile
  );

  const listContainer = useRef(null);

  useEffect(() => {
    if (userProfile?.email) dispatch(getUser(userProfile.email, null));
  }, [dispatch, userProfile?.email]);

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

  const onSubmitPageNameForm = useCallback(() => {
    if (!page || !page._id) return;
    if (pageName !== page.name)
      dispatch(updateUserPageName(page._id, pageName));
    setIsEdittingPageName(false);
  }, [dispatch, page, pageName]);

  const onSubmitPageUrlForm = useCallback(() => {
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
  }, [dispatch, page, pageUrl]);

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

  const savePageBGImage = useCallback(
    async (imageUrl?: string) => {
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
    },
    [chosenImage, dispatch, page]
  );

  const ToolbarBottomTools = useCallback(() => {
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
              size={isSmallerThan370 ? "small" : "medium"}
              onClick={() => toggleIsPublic()}
              hoverBackgroundColor={LIGHT_GREY}
            >
              {page?.isPublic ? (
                <VisibilityIcon
                  color="primary"
                  fontSize={isSmallerThan370 ? "small" : "medium"}
                />
              ) : (
                <VisibilityOffIcon
                  fontSize={isSmallerThan370 ? "small" : "medium"}
                />
              )}
            </IconButton>
          </Grid>
        </CustomTooltip>

        <CustomTooltip title={strings.backgroundColor}>
          <Grid item>
            <IconButton
              size={isSmallerThan370 ? "small" : "medium"}
              onClick={() => {
                setShowBackgroundColorPicker(!showBackgroundColorPicker);
              }}
              hoverBackgroundColor={LIGHT_GREY}
            >
              <BackgroundColorIcon
                size={isSmallerThan370 ? 16 : 26}
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
              size={isSmallerThan370 ? "small" : "medium"}
              onClick={() => {
                setShowFontColorPicker(!showFontColorPicker);
              }}
            >
              <FontColorIcon
                size={isSmallerThan370 ? 16 : 26}
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
              size={isSmallerThan370 ? "small" : "medium"}
              onClick={() => {
                setOpenChooseFileBGDialog(true);
              }}
              hoverBackgroundColor={LIGHT_GREY}
            >
              <ImageSearchIcon
                fontSize={isSmallerThan370 ? "small" : "medium"}
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

        <CustomTooltip
          title={
            userProfile?.plan === PlansTypes.PLATINUM
              ? strings.customScripts.insertCustomScript
              : strings.upgradeYourPlan
          }
        >
          <Grid item>
            <IconButton
              size={isSmallerThan370 ? "small" : "medium"}
              disabled={userProfile?.plan !== PlansTypes.PLATINUM}
              onClick={() => {
                setOpenCustomScriptDialog(true);
              }}
              hoverBackgroundColor={LIGHT_GREY}
            >
              <Code
                fontSize={isSmallerThan370 ? "small" : "medium"}
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
              size={isSmallerThan370 ? "small" : "medium"}
              onClick={() => {
                setShowDeletePageConfirmation(true);
              }}
              hoverBackgroundColor={LIGHT_GREY}
            >
              <DeleteIcon fontSize={isSmallerThan370 ? "small" : "medium"} />
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
                  size={isSmallerThan370 ? "small" : "medium"}
                  hoverBackgroundColor={LIGHT_GREY}
                >
                  <OpenInNewIcon
                    fontSize={isSmallerThan370 ? "small" : "medium"}
                  />
                </IconButton>
              </Link>
            ) : (
              <IconButton
                onClick={() => {
                  setOpenPreviewDialog(true);
                }}
                size={isSmallerThan370 ? "small" : "medium"}
                hoverBackgroundColor={LIGHT_GREY}
              >
                <OpenInNewIcon
                  fontSize={isSmallerThan370 ? "small" : "medium"}
                />
              </IconButton>
            )}
          </Grid>
        </CustomTooltip>
      </ToolbarBottomToolsStyled>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    page?.isPublic,
    page?.style?.backgroundColor,
    page?.style?.color,
    page?.style?.backgroundImage,
    page?.customScripts?.endBody,
    page?.customScripts?.header,
    page?.url,
    userProfile?.plan,
  ]);

  const ToolBar = useCallback(
    () => (
      <PageToolbar
        container
        item
        direction={!isSmallerThan500 ? "row" : "column"}
        alignItems="center"
        justifyContent="space-between"
      >
        <Grid item justifyContent="center" alignItems="center">
          {page && (
            <ProfileEditableAvatar
              width="15vw"
              height="15vw"
              maxWidth="100px"
              maxHeight="100px"
              minWidth="80px"
              minHeight="80px"
              text={page.name}
              imageUrl={page.pageImageUrl}
              onClick={() => setOpenChooseFilePageDialog(true)}
            />
          )}
        </Grid>

        <Grid item alignItems="center">
          <PageName item>
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

          <PageUrl item>
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
        </Grid>
        <CustomTooltip title={strings.create} disabled={isSmallerThan500}>
          <Grid
            item
            justifyContent="center"
            alignItems="center"
            py="16px"
            width={isSmallerThan500 ? "100%" : "unset"}
          >
            {isSmallerThan500 || isLargerThan800 ? (
              <Button
                fullWidth
                color="primary"
                variant="contained"
                sx={{ color: "white" }}
                onClick={() => {
                  setOpenToolsDialog(true);
                }}
              >
                <AddIcon color="inherit" sx={{ marginRight: "4px" }} />
                {strings.create}
              </Button>
            ) : (
              <ToolsMenuIcon
                onClick={() => {
                  setOpenToolsDialog(true);
                }}
              >
                <AddIcon color="inherit" />
              </ToolsMenuIcon>
            )}
          </Grid>
        </CustomTooltip>
      </PageToolbar>
    ),
    [
      handleSubmit,
      isEdittingPageName,
      isEdittingPageUrl,
      isLargerThan800,
      isSmallerThan500,
      onSubmitPageNameForm,
      onSubmitPageUrlForm,
      page,
      pageName,
      pageUrl,
      urlFieldError,
    ]
  );

  const Dialogs = () => (
    <>
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
      <ToolsDialog
        open={openToolsDialog}
        handleClose={() => {
          setOpenToolsDialog(false);
        }}
        isSmallerThan600={isSmallerThan600}
        handleOpenComponentDialog={handleOpenComponentDialog}
        isSmallerThan370={isSmallerThan370}
        handleOpenIconsDialog={handleOpenIconsDialog}
        handleOpenVideoDialog={handleOpenVideoDialog}
        handleOpenLaunchDialog={handleOpenLaunchDialog}
      />
    </>
  );

  const MiddleComponents = useCallback(() => {
    if (page && page.middleComponents) {
      return (
        <>
          {page.middleComponents.map(
            (component: IUserComponent, index: number) => (
              <DraggableUserComponent
                component={component}
                index={index}
                pageId={page?._id}
                key={uuidv4()}
              />
            )
          )}
        </>
      );
    }
    return <></>;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page?.middleComponents]);

  return (
    <>
      <PrivateRouteChecker />
      <Navigation />
      <ThinWidthContent pb="100px">
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
            <MiddleComponents />
          </Grid>
        ) : (
          <></>
        )}
        {page && page.bottomComponents && page.bottomComponents.length > 0 && (
          <IconsComponent iconsList={page.bottomComponents} />
        )}
      </ThinWidthContent>
      <Footer />
      <Dialogs />
    </>
  );
};

export default PageEditor;
