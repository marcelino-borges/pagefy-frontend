import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { AxiosResponse } from "axios";
import { useForm } from "react-hook-form";
import { Button, Grid, useMediaQuery } from "@mui/material";
import {
  Public as PublicIcon,
  PublicOff as PublicOffIcon,
  ImageSearch as ImageSearchIcon,
  Delete as DeleteIcon,
  Code,
  Add as AddIcon,
} from "@mui/icons-material";
import BackgroundColorIcon from "../../../assets/icons/custom-icons/background-color";
import FontColorIcon from "../../../assets/icons/custom-icons/font-color";
import { IUserComponent, IUserPage } from "../../../store/user-pages/types";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { IApplicationState } from "./../../../store";
import PAGES_ROUTES from "./../../../routes/paths";
import ThinWidthContent from "../../components/site-content/thin-width";
import { setPageBeingManaged } from "../../../store/page-management/actions";
import {
  PageToolbar,
  PageName,
  PageUrl,
  BottomToolbarRoot,
  EditPenIcon,
  ToolsMenuIcon,
} from "./style";
import strings from "../../../localization";
import TransparentTextField from "./../../components/transparent-textfield";
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
import ToolsDialog from "./dialogs/tools-dialog";
import IconsDialog from "./dialogs/icons-dialog";
import ButtonDialog from "./dialogs/button-dialog";
import VideoDialog from "./dialogs/video-dialog";
import LaunchDialog from "./dialogs/launch-dialog";
import UploadImageDialog from "../../components/dialog-upload-image";
import Navigation from "./../../components/navigation";
import {
  ANALYTICS_EVENTS,
  GalleryContext,
  IMAGE_EXTENSIONS,
} from "../../../constants";
import IconsComponent from "../../components/page-renderer/component-types/icon";
import DialogConfirmation from "./../../components/dialog-confirmation";
import ProfileEditableAvatar from "../../components/profile-editable-avatar";
import PrivateRouteChecker from "./../../components/private-route-checker";
import CustomTooltip from "../../components/tooltip";
import ColorPicker from "./../../components/color-picker";
import { getUser, updateUser } from "../../../store/user/actions";
import IconButton from "../../components/icon-button";
import { getPageByUrl } from "../../../services/user-pages";
import { showErrorToast, showSuccessToast } from "./../../../utils/toast";
import { clearLoading } from "../../../store/shared/actions";
import { ACESSIBILITY_GREEN, LIGHT_GREY } from "../../../styles/colors";
import PagePreviewDialog from "./dialogs/page-preview-dialog";
import Footer from "./../../components/footer";
import CustomScriptDialog from "./dialogs/custom-script-dialog";
import ButtonScrollUp from "../../components/button-scroll-up";
import MapsDialog from "./dialogs/maps-dialog";
import SpotifyDialog from "./dialogs/spotify-dialog";
import ProgressBarDialog from "./dialogs/progress-bar-dialog";
import CountersDialog from "./dialogs/counters-dialog";
import PagePreviewPhone from "./page-preview-phone";
import { Icon } from "@iconify/react";
import Meta from "../../components/meta";
import images from "../../../assets/img";
import { logAnalyticsEvent } from "../../../services/firebase-analytics";
import { toBase64 } from "../../../utils";
import OnboardingTour from "../../components/onboarding-tour";
import { ONBOARDING_STEPS_PAGE_EDITOR_GENERAL } from "./constants";
import { PageEditorOnboardingEvent } from "./types";

const PageEditor = () => {
  const dispatch = useDispatch();
  const isLargerThan1150 = useMediaQuery("(min-width:1150px)");
  const isLargerThan800 = useMediaQuery("(min-width:800px)");
  const isSmallerThan600 = useMediaQuery("(max-width:600px)");
  const isSmallerThan500 = useMediaQuery("(max-width:500px)");
  const isSmallerThan370 = useMediaQuery("(max-width:370px)");
  const { pathname } = useLocation();

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
  const [openMapDialog, setOpenMapDialog] = useState<boolean>(false);
  const [openSpotifyDialog, setOpenSpotifyDialog] = useState<boolean>(false);
  const [openProgressBarDialog, setOpenProgressBarDialog] =
    useState<boolean>(false);
  const [openCountersDialog, setOpenCountersDialog] = useState<boolean>(false);
  const [runTourGeneral, setRunTourGeneral] = useState(false);

  const { handleSubmit } = useForm();

  let navigate = useNavigate();
  let { id } = useParams();

  const userPagesState = useSelector(
    (state: IApplicationState) => state.userPages
  );

  const userProfile = useSelector(
    (state: IApplicationState) => state.user.profile
  );

  const planFeatures = useSelector(
    (state: IApplicationState) => state.user.planFeatures
  );

  const onboardings = useSelector(
    (state: IApplicationState) => state.user.profile?.onboardings
  );

  const listContainer = useRef(null);

  useEffect(
    function getUserPageEditor() {
      if (userProfile?.email) dispatch(getUser(userProfile.email, null));
    },
    [dispatch, userProfile?.email]
  );

  useEffect(
    function findPageOrNotFoundPageEditor() {
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
          navigate(PAGES_ROUTES.notFound);
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [id, navigate, userPagesState]
  );

  useEffect(
    function setPageBeingManagedPageEditor() {
      if (page && page._id) {
        dispatch(setPageBeingManaged(page._id));
        setPageName(page.name);
        setPageUrl(page.url);
      }
    },
    [dispatch, page, page?._id]
  );

  useEffect(
    function logAnalyticsPageViewEventPageEditor() {
      logAnalyticsEvent(ANALYTICS_EVENTS.pageView, {
        page_path: PAGES_ROUTES.pageEditor,
        page_title: "Page Editor",
        email: toBase64(userProfile?.email),
      });
    },
    [userProfile?.email]
  );

  useEffect(
    function decideToRunTourPageEditor() {
      setRunTourGeneral(
        !onboardings?.pageEditor?.general &&
          pathname.includes(PAGES_ROUTES.pageEditor)
      );
    },
    [onboardings, pathname]
  );

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

  const onSubmitPageScripts = useCallback(
    (
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
    },
    [dispatch, page]
  );

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

  const handleOpenMapDialog = () => {
    if (!page?._id) return;

    setOpenMapDialog(true);
  };

  const handleCloseMapDialog = () => {
    setOpenMapDialog(false);
  };

  const handleOpenSpotifyDialog = () => {
    if (!page?._id) return;

    setOpenSpotifyDialog(true);
  };

  const handleCloseSpotifyDialog = () => {
    setOpenSpotifyDialog(false);
  };

  const handleOpenProgressBarDialog = () => {
    if (!page?._id) return;

    setOpenProgressBarDialog(true);
  };

  const handleCloseProgressBarDialog = () => {
    setOpenProgressBarDialog(false);
  };

  const handleOpenCountersDialog = () => {
    if (!page?._id) return;

    setOpenCountersDialog(true);
  };

  const handleCloseCountersDialog = () => {
    setOpenCountersDialog(false);
  };

  const handleChangeBackgroundColorComplete = useCallback(
    (color: any) => {
      if (!page || !page._id) return;

      dispatch(setPageBackgroundColor(page._id, String(color)));
      setShowBackgroundColorPicker(false);
    },
    [dispatch, page]
  );

  const handleChangeFontColorComplete = useCallback(
    (color: any) => {
      if (page && page._id) {
        dispatch(setPageFontColor(page._id, String(color)));
        setShowFontColorPicker(false);
      }
    },
    [dispatch, page]
  );

  const updateUserOnboardingGeneral = (key: PageEditorOnboardingEvent) => {
    if (!userProfile) return;

    try {
      dispatch(
        updateUser({
          ...userProfile,
          onboardings: {
            ...userProfile?.onboardings,
            pageEditor: {
              ...userProfile?.onboardings?.pageEditor,
              [key]: true,
            },
          },
        })
      );
    } catch (error) {
      console.log(
        `Couldn't update onboarding event for pageEditor.${key}`,
        error
      );
    }
  };

  const toggleIsPublic = useCallback(() => {
    if (!page || !page._id) return;

    dispatch(togglePageIsPublic(page._id));

    logAnalyticsEvent(
      page.isPublic
        ? ANALYTICS_EVENTS.userTurnsPagePrivate
        : ANALYTICS_EVENTS.userTurnsPagePublic,
      {
        page_id: page._id,
        email: toBase64(userProfile?.email),
      }
    );
  }, [dispatch, page, userProfile?.email]);

  const savePageImage = async (imageUrl?: string) => {
    if (!page || !page._id) return;

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
    if (chosenImage) {
      dispatch(
        uploadAndSetPageImage(chosenImage, page, successCallback, errorCallback)
      );
    } else {
      dispatch(
        setPageImage(imageUrl || "", page._id, successCallback, errorCallback)
      );
    }

    setChosenImage(undefined);
  };

  const savePageBGImage = useCallback(
    async (imageUrl?: string) => {
      if (!page || !page._id) return;

      const successCallback = (url: string) => {
        const pageToSave: IUserPage = {
          ...page,
          style: {
            ...page.style,
            backgroundImage: url ? `url(${url})` : "",
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
                  backgroundImage: url ? `url(${url})` : "",
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
      if (chosenImage) {
        dispatch(
          setPageBGImage(chosenImage, page, successCallback, errorCallback)
        );
      } else {
        dispatch(
          setPageImage(imageUrl || "", page._id, successCallback, errorCallback)
        );
      }

      setChosenImage(undefined);
    },
    [chosenImage, dispatch, page]
  );

  const BottomToolbar = useCallback(() => {
    return (
      <BottomToolbarRoot
        container
        justifyContent="space-around"
        alignItems="center"
      >
        <CustomTooltip
          title={
            page?.isPublic ? strings.makePagePrivate : strings.makePagePublic
          }
        >
          <Grid item>
            <IconButton
              size={isSmallerThan370 ? "small" : "medium"}
              onClick={() => toggleIsPublic()}
              hoverBackgroundColor={LIGHT_GREY}
              id="page-editor-general-tour5"
            >
              {page?.isPublic ? (
                <PublicIcon
                  style={{
                    color: ACESSIBILITY_GREEN,
                  }}
                  fontSize={isSmallerThan370 ? "small" : "medium"}
                />
              ) : (
                <PublicOffIcon
                  fontSize={isSmallerThan370 ? "small" : "medium"}
                />
              )}
            </IconButton>
          </Grid>
        </CustomTooltip>

        <CustomTooltip title={strings.fontColor}>
          <Grid item id="page-editor-general-tour6">
            <IconButton
              hoverBackgroundColor={LIGHT_GREY}
              size={isSmallerThan370 ? "small" : "medium"}
              onClick={() => {
                setShowFontColorPicker(!showFontColorPicker);
              }}
            >
              <FontColorIcon
                size={isSmallerThan370 ? 16 : 26}
                bucketColor="rgba(0, 0, 0, 0.54)"
                selectedColor={page?.style?.color || "rgba(0, 0, 0, 0.54)"}
              />
            </IconButton>
            {showFontColorPicker && (
              <ColorPicker
                id="font-color-picker"
                initialColor={page?.style?.color || "white"}
                onChooseColor={handleChangeFontColorComplete}
                onCancel={() => setShowFontColorPicker(false)}
                title={strings.pickFontColorUserPage}
              />
            )}
          </Grid>
        </CustomTooltip>

        <CustomTooltip title={strings.backgroundColor}>
          <Grid item id="page-editor-general-tour7">
            <IconButton
              size={isSmallerThan370 ? "small" : "medium"}
              onClick={() => {
                setShowBackgroundColorPicker(!showBackgroundColorPicker);
              }}
              hoverBackgroundColor={LIGHT_GREY}
            >
              <BackgroundColorIcon
                size={isSmallerThan370 ? 16 : 26}
                bucketColor="rgba(0, 0, 0, 0.54)"
                selectedColor={
                  page?.style?.backgroundColor || "rgba(0, 0, 0, 0.54)"
                }
              />
            </IconButton>
            {showBackgroundColorPicker && (
              <ColorPicker
                id="bg-color-picker"
                initialColor={page?.style?.backgroundColor || "white"}
                onChooseColor={handleChangeBackgroundColorComplete}
                onCancel={() => setShowBackgroundColorPicker(false)}
                title={strings.pickBGColorUserPage}
              />
            )}
          </Grid>
        </CustomTooltip>

        <CustomTooltip title={strings.uploadBackgroundImage}>
          <Grid item id="page-editor-general-tour8">
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
              existingImageUrl={page?.style?.backgroundImage}
              submitDialog={async (imageUrl?: string) => {
                savePageBGImage(imageUrl);
                setOpenChooseFileBGDialog(false);

                if (imageUrl === undefined && page) {
                  setPage({
                    ...page,
                    style: {
                      ...page.style,
                      backgroundImage: undefined,
                    },
                  });
                }
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
            planFeatures?.customJs
              ? strings.customScripts.insertCustomScript
              : strings.notAvailableInYourPlan
          }
        >
          <Grid item>
            <IconButton
              size={isSmallerThan370 ? "small" : "medium"}
              disabled={!planFeatures?.customJs}
              onClick={() => {
                setOpenCustomScriptDialog(true);
              }}
              hoverBackgroundColor={LIGHT_GREY}
              id="page-editor-general-tour9"
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

        <CustomTooltip title={strings.remove} id="page-editor-general-tour10">
          <Grid item>
            <IconButton
              size={isSmallerThan370 ? "small" : "medium"}
              onClick={() => {
                setShowDeletePageConfirmation(true);
              }}
              hoverBackgroundColor={LIGHT_GREY}
              id="page-editor-general-tour10"
            >
              <DeleteIcon fontSize={isSmallerThan370 ? "small" : "medium"} />
            </IconButton>
          </Grid>
        </CustomTooltip>

        <CustomTooltip title={strings.viewPage}>
          <Grid item id="page-editor-general-tour11">
            {page?.isPublic ? (
              <Link
                to={"/" + page?.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconButton
                  size={isSmallerThan370 ? "small" : "medium"}
                  hoverBackgroundColor={LIGHT_GREY}
                >
                  <Icon icon="iconoir:open-in-browser" />
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
                <Icon icon="iconoir:open-in-browser" />
              </IconButton>
            )}
          </Grid>
        </CustomTooltip>
      </BottomToolbarRoot>
    );
  }, [
    page,
    isSmallerThan370,
    showFontColorPicker,
    handleChangeFontColorComplete,
    showBackgroundColorPicker,
    handleChangeBackgroundColorComplete,
    openChooseFileBGDialog,
    chosenImage,
    planFeatures,
    userPagesState.pages.length,
    openCustomScriptDialog,
    toggleIsPublic,
    savePageBGImage,
    onSubmitPageScripts,
  ]);

  const ToolBar = useCallback(
    () => (
      <PageToolbar
        container
        item
        direction={!isSmallerThan500 ? "row" : "column"}
        alignItems="center"
        justifyContent="space-between"
        position="relative"
      >
        <span
          id="page-editor-general-tour1"
          style={{ position: "absolute", left: 0, top: 30, width: "30px" }}
        />
        <Grid item justifyContent="center" alignItems="center">
          {page && (
            <ProfileEditableAvatar
              id="page-editor-general-tour2"
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

        <Grid item alignItems="center" id="page-editor-general-tour3">
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
        <CustomTooltip
          title={strings.create}
          disabled={isLargerThan800 || isSmallerThan500}
        >
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
                onClick={() => {
                  setOpenToolsDialog(true);
                }}
                id="page-editor-general-tour4"
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
            dispatch(
              deletePage(page._id, () => {
                if (page && page._id)
                  logAnalyticsEvent(ANALYTICS_EVENTS.userPageDelete, {
                    page_id: page._id,
                    email: toBase64(userProfile?.email),
                  });
              })
            );
            navigate(PAGES_ROUTES.userPages);
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
        existingImageUrl={page?.pageImageUrl}
        submitDialog={async (imageUrl?: string) => {
          savePageImage(imageUrl);
          setOpenChooseFilePageDialog(false);

          if (imageUrl === undefined && page) {
            setPage({
              ...page,
              pageImageUrl: undefined,
            });
          }
        }}
        cancelDialog={() => {
          setChosenImage(undefined);
          setOpenChooseFilePageDialog(false);
        }}
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
        handleOpenMapDialog={handleOpenMapDialog}
        handleOpenSpotifyDialog={handleOpenSpotifyDialog}
        handleOpenProgressBarDialog={handleOpenProgressBarDialog}
        handleOpenCountersDialog={handleOpenCountersDialog}
      />
      <ButtonDialog
        open={openComponentDialog}
        handleClose={handleCloseComponentDialog}
        pageId={page?._id}
      />
      <IconsDialog
        open={openIconsDialog}
        handleClose={handleCloseIconsDialog}
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
      <MapsDialog
        open={openMapDialog}
        handleClose={handleCloseMapDialog}
        pageId={page?._id}
      />
      <SpotifyDialog
        open={openSpotifyDialog}
        handleClose={handleCloseSpotifyDialog}
        pageId={page?._id}
      />
      <ProgressBarDialog
        open={openProgressBarDialog}
        handleClose={handleCloseProgressBarDialog}
        pageId={page?._id}
      />
      <CountersDialog
        open={openCountersDialog}
        handleClose={handleCloseCountersDialog}
        pageId={page?._id}
      />
    </>
  );

  const MiddleComponents = useMemo(() => {
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

  const renderPagePreviewPhone = useMemo(
    () => <PagePreviewPhone page={page} />,
    [page]
  );

  return (
    <>
      <OnboardingTour
        steps={ONBOARDING_STEPS_PAGE_EDITOR_GENERAL}
        run={runTourGeneral}
        scrollToFirstStep={false}
        disableScrolling
        onFinishTour={() => updateUserOnboardingGeneral("general")}
        continuous
      />
      <Meta
        lang={strings.getLanguage()}
        locale={strings.getInterfaceLanguage()}
        title={strings.appName}
        description={strings.appDescription}
        image={images.screenshots.pageEditor}
      />
      <PrivateRouteChecker />
      <Navigation />
      {isLargerThan1150 && renderPagePreviewPhone}
      <ThinWidthContent center={!isLargerThan1150} pb="100px">
        {page && (
          <PagePreviewDialog
            page={page}
            open={openPreviewDialog}
            onClose={() => {
              setOpenPreviewDialog(false);
            }}
          />
        )}
        <ToolBar />
        <BottomToolbar />
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
            {MiddleComponents}
          </Grid>
        ) : (
          <></>
        )}
        {page && page.bottomComponents && page.bottomComponents.length > 0 && (
          <IconsComponent iconsList={page.bottomComponents} />
        )}
      </ThinWidthContent>
      <ButtonScrollUp />
      <Footer />
      <Dialogs />
    </>
  );
};

export default PageEditor;
