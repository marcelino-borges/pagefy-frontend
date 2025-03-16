import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Grid, IconButton, InputAdornment, useMediaQuery } from "@mui/material";
import {
  Link as LinkIcon,
  ImageSearch as ImageSearchIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Delete as DeleteIcon,
  AutoFixHigh as ChooseAnimationIcon,
  TableRows as RowsIcon,
  ViewColumn as ColumnsIcon,
  TouchApp as ClicksCountIcon,
  Category as ComponentTypeIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  Timer as TimerIcon,
  Save as SaveIcon,
  CopyAll as CopyAllIcon,
  Percent as PercentIcon,
} from "@mui/icons-material";
import {
  Parent,
  MainContent,
  Overlay,
  LabelText,
  PrefixIconItem,
  UrlTextItem,
  ToolsColumn,
  ToolIconButton,
  ToolGridItem,
  AnalyticsGridItem,
  AnalyticsGridContainer,
  ContentRow,
  DarkBG,
  ComponentArrowGridItem,
  DeleteContainer,
  ToolsColumnAnimatedBG,
} from "./style";
import { PRIMARY_COLOR } from "../../../../styles/colors";
import {
  isBgAndFontCustomizable,
  isButtonType,
  isClickableType,
  isImageType,
  isUrlEditable,
  removeCssUrlWrapper,
} from "../../../../utils";
import CustomTooltip from "../../../components/tooltip";
import strings from "../../../../localization";
import TransparentTextField from "../../../components/transparent-textfield";
import { IApplicationState } from "../../../../store";
import {
  addMiddleComponentInPage,
  decreaseComponentIndexInPage,
  deleteMiddleComponentFromPage,
  increaseComponentIndexInPage,
  setComponentAnimation,
  setComponentBackgroundColor,
  setComponentFontColor,
  uploadAndSetComponentImage,
  setComponentLabel,
  setComponentUrl,
  setComponentVisibleDate,
  toggleComponentVisibility,
  setComponentImage,
  setComponentProgressValue,
} from "../../../../store/user-pages/actions";
import {
  ComponentType,
  IComponentAnimation,
  IUserComponent,
} from "../../../../store/user-pages/types";
import BackgroundColorIcon from "../../../../assets/icons/custom-icons/background-color";
import FontColorIcon from "../../../../assets/icons/custom-icons/font-color";
import UploadImageDialog from "../../../components/dialog-upload-image";
import { GalleryContext, IMAGE_EXTENSIONS } from "../../../../constants";
import DialogConfirmation from "../../../components/dialog-confirmation";
import YoutubeEmbed from "../../../components/youtube-embed";
import { getYoutubeIdFromUrl } from "./../../../../utils/index";
import DialogChooseAnimation from "../../../components/dialog-choose-animation";
import DialogVisibleDate from "./../../../components/dialog-visible-date/index";
import ColorPicker from "./../../../components/color-picker/index";
import { MEDIUM_GREY } from "./../../../../styles/colors";
import { clearLoading } from "../../../../store/shared/actions";
import { getLocalizedStringByComponentType } from "../../../../localization/utils";
import { showSuccessToast } from "../../../../utils/toast";
import { showErrorToast } from "./../../../../utils/toast/index";
import MapEmbed from "../../../components/map-embed";
import SpotifyEmbed from "./../../../components/spotify-embed/index";

export interface DraggableUserComponentProps {
  component: IUserComponent;
  index: number;
  pageId: string | undefined;
  onClick?: () => any;
  onUpdatePage?: () => any;
}

const DraggableUserComponent = ({
  component,
  index,
  pageId,
  onClick,
  onUpdatePage,
}: DraggableUserComponentProps) => {
  const dispatch = useDispatch();

  const { handleSubmit: handleSubmitLabel } = useForm();
  const { handleSubmit: handleSubmitUrl } = useForm();
  const { handleSubmit: handleSubmitProgressValue } = useForm();

  const isLargerThan400 = useMediaQuery("(min-width: 400px)");
  const isSmallerThan400 = useMediaQuery("(max-width: 399px)");
  const isSmallerThan600 = useMediaQuery("(max-width: 600px)");

  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [isKeepToolsOpen, setIsKeepToolsOpen] = useState<boolean>(false);
  const [isEdittingLabel, setIsEdittingLabel] = useState<boolean>(false);
  const [isEdittingUrl, setIsEdittingUrl] = useState<boolean>(false);
  const [isEdittingProgressValue, setIsEdittingProgressValue] =
    useState<boolean>(false);
  const [showBackgroundColorPicker, setShowBackgroundColorPicker] =
    useState<boolean>(false);
  const [showFontColorPicker, setShowFontColorPicker] =
    useState<boolean>(false);
  const [values, setValues] = useState({
    label: component.text || "",
    url: component.url,
    progressValue: component.progressValue || 0,
  });
  const [openChooseFileDialog, setOpenChooseFileDialog] = useState(false);
  const [openChooseAnimationDialog, setOpenChooseAnimationDialog] =
    useState(false);
  const [chosenImage, setChosenImage] = useState<File | undefined>();
  const [openDeleteComponentConfirmation, setOpenDeleteComponentConfirmation] =
    useState(false);
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  const [openVisibleDateDialog, setOpenVisibleDateDialog] = useState(false);

  const userState = useSelector(
    (state: IApplicationState) => state.user.profile
  );

  const planFeatures = useSelector(
    (state: IApplicationState) => state.user.planFeatures
  );

  const AnalyticsItem = ({ tooltipKey, tooltipValue, icon }: any) => {
    return (
      <AnalyticsGridItem item alignItems="center">
        <CustomTooltip
          leaveDelay={1}
          placement={isSmallerThan400 ? "bottom" : "left"}
          title={`${tooltipKey}: ${tooltipValue}`}
        >
          {icon}
        </CustomTooltip>
      </AnalyticsGridItem>
    );
  };

  const handleChangeLabel = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, label: event.target.value });
  };

  const handleChangeUrl = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, url: event.target.value });
  };

  const handleChangeProgressValue = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let value: number = Number(event.target.value);

    if (value > 100) {
      value = 100;
    } else if (value < 0) {
      value = 0;
    } else {
      value = Number(event.target.value);
    }
    setValues({ ...values, progressValue: value });
  };

  const onSubmitLabelForm = () => {
    if (!component._id || !pageId) return;
    setIsEdittingLabel(false);
    dispatch(setComponentLabel(pageId, component._id, values.label));
  };

  const onSubmitUrlForm = () => {
    if (!component._id || !pageId || !values.url) return;
    setIsEdittingUrl(false);
    dispatch(setComponentUrl(pageId, component._id, values.url));
  };
  const onSubmitProgressValueForm = () => {
    if (!component._id || !pageId || !values.url) return;
    setIsEdittingProgressValue(false);
    dispatch(
      setComponentProgressValue(pageId, component._id, values.progressValue)
    );
  };

  const deleteComponent = () => {
    if (!component._id || !pageId) return;
    setIsDeleted(true);
    setTimeout(() => {
      if (!component._id || !pageId) return;
      dispatch(
        deleteMiddleComponentFromPage(
          component._id,
          pageId,
          () => {
            showSuccessToast(strings.successRemoveComponent);
            setIsDeleted(false);
          },
          () => {
            showErrorToast(strings.errorRemoveComponent);
            setIsDeleted(false);
          }
        )
      );
    }, 250);
  };

  const toggleVisibility = () => {
    if (!component._id || !pageId) return;
    dispatch(toggleComponentVisibility(pageId, component._id));
    onUpdatePage?.();
  };

  const handleChangeBackgroundColorComplete = (color: any) => {
    if (!component._id || !pageId) return;

    dispatch(setComponentBackgroundColor(pageId, component._id, String(color)));
    setIsKeepToolsOpen(false);
    setShowBackgroundColorPicker(false);
  };

  const handleChangeFontColorComplete = (color: any) => {
    if (!component._id || !pageId) return;
    dispatch(setComponentFontColor(pageId, component._id, String(color)));
    setIsKeepToolsOpen(false);
    setShowFontColorPicker(false);
  };

  const Dialogs = () => {
    return (
      <>
        <DialogConfirmation
          open={openDeleteComponentConfirmation}
          onClose={() => {
            setOpenDeleteComponentConfirmation(false);
          }}
          onConfirmCallback={() => {
            deleteComponent();
            onUpdatePage?.();
          }}
          title={strings.removeIcon}
          message={strings.removeComponentConfirmation}
        />
        <UploadImageDialog
          existingImageUrl={component.style?.backgroundImage}
          context={[GalleryContext.BUTTONS, GalleryContext.BACKGROUND]}
          openChooseFileDialog={openChooseFileDialog}
          setOpenChooseFileDialog={setOpenChooseFileDialog}
          chosenImage={chosenImage}
          setChosenImage={setChosenImage}
          acceptedFiles={IMAGE_EXTENSIONS}
          submitDialog={async (imageUrl?: string) => {
            if (
              userState === undefined ||
              userState._id === undefined ||
              component._id === undefined ||
              pageId === undefined
            ) {
              return;
            }

            const clearLoadingFromState = () => {
              dispatch(clearLoading());
            };

            if (chosenImage) {
              dispatch(
                uploadAndSetComponentImage(
                  chosenImage,
                  component._id,
                  pageId,
                  userState._id,
                  clearLoadingFromState,
                  clearLoadingFromState
                )
              );
            } else {
              dispatch(
                setComponentImage(
                  imageUrl || "",
                  component._id,
                  pageId,
                  clearLoadingFromState,
                  clearLoadingFromState
                )
              );
              onUpdatePage?.();
            }

            setOpenChooseFileDialog(false);
            setChosenImage(undefined);
          }}
          cancelDialog={() => {
            setChosenImage(undefined);
            setOpenChooseFileDialog(false);
          }}
        />
        <DialogChooseAnimation
          open={openChooseAnimationDialog}
          onClose={() => {
            setOpenChooseAnimationDialog(false);
          }}
          saveAnimation={(animation: IComponentAnimation) => {
            if (!pageId || !component._id) return;

            dispatch(setComponentAnimation(pageId, component._id, animation));
            onUpdatePage?.();
          }}
          existingAnimation={component.animation}
        />
        <DialogVisibleDate
          open={openVisibleDateDialog}
          onClose={() => {
            setOpenVisibleDateDialog(false);
          }}
          setDateTime={(dateTime: string) => {
            if (!pageId || !component._id) return;

            dispatch(setComponentVisibleDate(pageId, component._id, dateTime));
            onUpdatePage?.();
          }}
        />
      </>
    );
  };

  return (
    <Parent
      container
      item
      direction="row"
      wrap="nowrap"
      onMouseLeave={() => {
        if (!isKeepToolsOpen) setIsHovering(false);
      }}
      onClick={() => {
        if (onClick) onClick();
      }}
    >
      {isDeleted && <DeleteContainer />}

      <MainContent
        container
        item
        direction="row"
        onMouseOver={() => setIsHovering(true)}
        xs={10}
        md={11}
        wrap="nowrap"
        id="main-content"
      >
        <Overlay
          id="overlay"
          style={{
            border: isHovering
              ? `1px solid ${PRIMARY_COLOR}`
              : `1px solid rgba(0, 0, 0, 0)`,
          }}
        />
        {/* Handler */}
        <Grid
          container
          item
          xs={1}
          alignItems="flex-start"
          direction="column"
          justifyContent="space-between"
          style={{
            paddingLeft: "2px",
          }}
          id="handler"
        >
          <ComponentArrowGridItem
            item
            up
            onClick={() => {
              if (pageId) dispatch(decreaseComponentIndexInPage(index, pageId));
            }}
          >
            <KeyboardArrowUpIcon
              color="inherit"
              style={{ color: MEDIUM_GREY }}
            />
          </ComponentArrowGridItem>
          <ComponentArrowGridItem
            item
            down
            onClick={() => {
              if (pageId) dispatch(increaseComponentIndexInPage(index, pageId));
            }}
          >
            <KeyboardArrowDownIcon
              color="inherit"
              style={{ color: MEDIUM_GREY }}
            />
          </ComponentArrowGridItem>
        </Grid>

        {/* Content */}
        <Grid
          container
          item
          xs={11}
          direction={isSmallerThan600 ? "column" : "row"}
          justifyContent="center"
          wrap="nowrap"
          maxWidth="70%"
        >
          {/* 1st content column */}
          <Grid
            container
            item
            xs={12}
            sm={9}
            justifyContent="center"
            direction="column"
            gap="12px"
            py="32px"
            wrap="nowrap"
            style={{
              maxHeight: isSmallerThan400 ? "100px" : "unset",
            }}
          >
            {/* Label */}
            {component.text && component.text.length > 0 && (
              <ContentRow alignItems="center" direction="row">
                {isEdittingLabel ? (
                  <form onSubmit={handleSubmitLabel(onSubmitLabelForm)}>
                    <LabelText item>
                      <TransparentTextField
                        autoFocus
                        InputProps={{
                          style: { width: "100%" },
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => onSubmitLabelForm()}
                                edge="end"
                              >
                                <SaveIcon fontSize="medium" color="disabled" />
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        onChange={handleChangeLabel}
                        value={values.label}
                        fontSize={isSmallerThan600 ? "15px" : "18px"}
                        onBlur={() => {
                          onSubmitLabelForm();
                          setIsEdittingLabel(false);
                        }}
                      />
                    </LabelText>
                  </form>
                ) : (
                  <LabelText
                    item
                    onClick={() => {
                      setIsEdittingLabel(true);
                      setValues({ ...values, label: component.text || "" });
                    }}
                  >
                    {component.text}
                  </LabelText>
                )}
              </ContentRow>
            )}

            {/* Video (Only in Video type) */}
            {component.url && component.type === ComponentType.Video && (
              <ContentRow
                direction="row"
                alignItems="center"
                style={{
                  paddingLeft: "16px",
                  paddingTop: isSmallerThan400 ? "36px" : "24px",
                }}
              >
                <YoutubeEmbed
                  embedId={getYoutubeIdFromUrl(component.url) || ""}
                  allowFullScreen
                  width={
                    !isSmallerThan600
                      ? "250px"
                      : !isSmallerThan400
                      ? "180px"
                      : "140px"
                  }
                  height={
                    !isSmallerThan600
                      ? "150px"
                      : !isSmallerThan400
                      ? "100px"
                      : "80px"
                  }
                />
              </ContentRow>
            )}

            {/* Map (Only in Map type) */}
            {component.url && component.type === ComponentType.Map && (
              <ContentRow
                direction="row"
                alignItems="center"
                style={{
                  paddingLeft: "16px",
                  paddingTop: isSmallerThan400 ? "36px" : "24px",
                }}
              >
                <MapEmbed
                  mapUrl={component.url}
                  width={
                    !isSmallerThan600
                      ? "250px"
                      : !isSmallerThan400
                      ? "180px"
                      : "140px"
                  }
                  height={
                    !isSmallerThan600
                      ? "150px"
                      : !isSmallerThan400
                      ? "100px"
                      : "80px"
                  }
                />
              </ContentRow>
            )}

            {/* Spotify (Only in Spotify type) */}
            {component.url && component.type === ComponentType.Spotify && (
              <ContentRow
                direction="row"
                alignItems="center"
                style={{
                  paddingLeft: "16px",
                  paddingTop: isSmallerThan400 ? "36px" : "24px",
                }}
              >
                <SpotifyEmbed
                  url={component.url}
                  width={
                    !isSmallerThan600
                      ? "250px"
                      : !isSmallerThan400
                      ? "180px"
                      : "140px"
                  }
                  height={
                    !isSmallerThan600
                      ? "150px"
                      : !isSmallerThan400
                      ? "100px"
                      : "80px"
                  }
                />
              </ContentRow>
            )}

            {/* ProgressBar (Only in ProgressBar type) */}
            {component.progressValue !== undefined &&
              component.type === ComponentType.ProgressBar && (
                <ContentRow
                  direction="row"
                  alignItems="center"
                  style={{
                    paddingLeft: "16px",
                    paddingTop: isSmallerThan400 ? "36px" : "24px",
                  }}
                >
                  <PrefixIconItem item mr="8px">
                    <PercentIcon fontSize="small" />
                  </PrefixIconItem>
                  {isEdittingProgressValue ? (
                    <form
                      onSubmit={handleSubmitProgressValue(
                        onSubmitProgressValueForm
                      )}
                    >
                      <LabelText item transform="unset">
                        <TransparentTextField
                          autoFocus
                          InputProps={{
                            inputProps: { min: 1, max: 100 },
                            style: { maxWidth: "100px" },
                            type: "number",
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={() => onSubmitProgressValueForm()}
                                  edge="end"
                                >
                                  <SaveIcon
                                    fontSize="medium"
                                    color="disabled"
                                  />
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                          onChange={handleChangeProgressValue}
                          value={values.progressValue.toString()}
                          fontSize={isSmallerThan600 ? "15px" : "18px"}
                          onBlur={() => {
                            onSubmitProgressValueForm();
                            setIsEdittingProgressValue(false);
                          }}
                        />
                      </LabelText>
                    </form>
                  ) : (
                    <LabelText
                      transform="unset"
                      item
                      onClick={() => {
                        setIsEdittingProgressValue(true);
                        setValues({
                          ...values,
                          progressValue: component.progressValue || 0,
                        });
                      }}
                    >
                      {component.progressValue.toString()}
                    </LabelText>
                  )}
                </ContentRow>
              )}

            {/* URL */}
            {isUrlEditable(component.type) && component.url && (
              <CustomTooltip title={component.url || ""}>
                <ContentRow alignItems="center" width="70%" direction="row">
                  <PrefixIconItem item>
                    <LinkIcon fontSize="small" />
                  </PrefixIconItem>
                  {isEdittingUrl ? (
                    <Grid container item>
                      <form
                        onSubmit={handleSubmitUrl(onSubmitUrlForm)}
                        style={{ width: "100%" }}
                      >
                        <LabelText item>
                          <TransparentTextField
                            autoFocus
                            onChange={handleChangeUrl}
                            value={values.url}
                            fontWeight="300"
                            color="#bfbfbf"
                            fontStyle="italic"
                            InputProps={{
                              style: {
                                width: "100%",
                                margin: !isSmallerThan400 ? "0px 16px" : "0",
                              },
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton
                                    onClick={() => onSubmitUrlForm()}
                                    edge="end"
                                  >
                                    <SaveIcon
                                      fontSize="medium"
                                      color="disabled"
                                    />
                                  </IconButton>
                                </InputAdornment>
                              ),
                            }}
                            fontSize={isSmallerThan600 ? "15px" : "18px"}
                            onBlur={() => {
                              onSubmitUrlForm();
                              setIsEdittingUrl(false);
                            }}
                          />
                        </LabelText>
                      </form>
                    </Grid>
                  ) : (
                    <UrlTextItem
                      item
                      onClick={() => {
                        setIsEdittingUrl(true);
                        setValues({ ...values, url: component.url || "" });
                      }}
                    >
                      {component.url}
                    </UrlTextItem>
                  )}
                </ContentRow>
              </CustomTooltip>
            )}

            {isImageType(component.type) &&
              component.mediaUrl &&
              component.mediaUrl.length > 0 && (
                <ContentRow alignItems="center" direction="row">
                  <img
                    src={removeCssUrlWrapper(component.mediaUrl)}
                    alt="Component media"
                    style={{
                      maxWidth: "100px",
                      maxHeight: "60px",
                      borderRadius: "5px",
                    }}
                  />
                </ContentRow>
              )}
          </Grid>

          {/* 2nd content column */}

          {/*
           * Analytics
           */}
          <AnalyticsGridContainer
            id="analytics-container"
            container
            item
            xs={12}
            sm={2}
            style={{
              width: isSmallerThan600 ? "100%" : "unset",
              maxHeight: isSmallerThan400 ? "80px" : "unset",
            }}
            alignItems={isSmallerThan600 ? "center" : "flex-end"}
            direction={isSmallerThan600 ? "row" : "column"}
            justifyContent={isSmallerThan600 ? "flex-start" : "center"}
            spacing={1}
          >
            <AnalyticsItem
              tooltipKey={strings.columns}
              tooltipValue={component.layout.columns.toString()}
              icon={<ColumnsIcon />}
            />
            <AnalyticsItem
              tooltipKey={strings.rows}
              tooltipValue={component.layout.rows.toString()}
              icon={<RowsIcon />}
            />

            {isClickableType(component.type) && (
              <AnalyticsItem
                tooltipKey={strings.clicks}
                tooltipValue={
                  planFeatures && planFeatures.analytics
                    ? component.clicks
                    : strings.notAvailableInYourPlan
                }
                icon={<ClicksCountIcon />}
              />
            )}
            <AnalyticsItem
              tooltipKey={strings.type}
              tooltipValue={getLocalizedStringByComponentType(component.type)}
              icon={<ComponentTypeIcon />}
            />
          </AnalyticsGridContainer>
        </Grid>
      </MainContent>

      {/* 3rd Column - Tools */}

      <ToolsColumn
        container
        item
        xs={2}
        md={1}
        justifyContent="center"
        alignItems="stretch"
        direction="column"
        id="tools-column"
      >
        <ToolsColumnAnimatedBG
          isHoveringComponent={isHovering}
          id="tools-column-animated-bg"
        />
        {/* BG Color */}
        {isBgAndFontCustomizable(component.type) && (
          <CustomTooltip
            disabled={!isHovering || showBackgroundColorPicker}
            disableInteractive
            leaveDelay={0.1}
            title={strings.backgroundColor}
            placement={isLargerThan400 ? "right" : "bottom"}
          >
            <ToolGridItem item id="bg-color">
              <ToolIconButton
                size="small"
                transitionDuration="0.25s"
                isHoveringComponent={isHovering}
                onClick={() => {
                  setShowBackgroundColorPicker(!showBackgroundColorPicker);
                  setIsKeepToolsOpen(true);
                }}
              >
                <BackgroundColorIcon
                  style={{ transform: "scale(0.7)" }}
                  bucketColor="white"
                  selectedColor={component.style?.backgroundColor}
                />
              </ToolIconButton>
              {showBackgroundColorPicker && (
                <ColorPicker
                  initialColor={component.style?.backgroundColor}
                  onChooseColor={handleChangeBackgroundColorComplete}
                  onCancel={() => setShowBackgroundColorPicker(false)}
                />
              )}
            </ToolGridItem>
          </CustomTooltip>
        )}

        {/* Font color picker */}
        {isBgAndFontCustomizable(component.type) && (
          <CustomTooltip
            disabled={!isHovering || showFontColorPicker}
            disableInteractive
            leaveDelay={0.1}
            title={strings.fontColor}
            placement={isLargerThan400 ? "right" : "bottom"}
          >
            <ToolGridItem item id="font-color-picker">
              <ToolIconButton
                size="small"
                transitionDuration="0.3s"
                isHoveringComponent={isHovering}
                onClick={() => {
                  setShowFontColorPicker(!showFontColorPicker);
                  setIsKeepToolsOpen(true);
                }}
              >
                <FontColorIcon
                  style={{ transform: "scale(0.7)" }}
                  bucketColor="white"
                  selectedColor={component.style?.color}
                />
              </ToolIconButton>
              {showFontColorPicker && (
                <ColorPicker
                  initialColor={component.style?.color}
                  onChooseColor={handleChangeFontColorComplete}
                  onCancel={() => setShowFontColorPicker(false)}
                />
              )}
            </ToolGridItem>
          </CustomTooltip>
        )}

        {/* Upload Image */}
        {isImageType(component.type) && (
          <CustomTooltip
            disabled={!isHovering}
            disableInteractive
            leaveDelay={0.1}
            title={strings.uploadImage}
            placement={isLargerThan400 ? "right" : "bottom"}
          >
            <ToolGridItem item id="upload-image">
              <ToolIconButton
                size="small"
                hoveringWhite
                transitionDuration="0.35s"
                isHoveringComponent={isHovering}
                onClick={() => {
                  setOpenChooseFileDialog(true);
                }}
              >
                <ImageSearchIcon
                  color="inherit"
                  style={{
                    transform: "scale(0.7)",
                  }}
                />
              </ToolIconButton>
            </ToolGridItem>
          </CustomTooltip>
        )}

        {/* Schedule visibility */}
        {isButtonType(component.type) && (
          <CustomTooltip
            disabled={!isHovering}
            disableInteractive
            leaveDelay={0.1}
            title={
              !planFeatures || !planFeatures.componentActivationSchedule
                ? strings.notAvailableInYourPlan
                : strings.scheduleComponentVisibleDate
            }
            placement={isLargerThan400 ? "right" : "bottom"}
          >
            <ToolGridItem item id="schedule-visibility">
              <ToolIconButton
                size="small"
                disabled={
                  !planFeatures || !planFeatures.componentActivationSchedule
                }
                hoveringWhite
                transitionDuration="0.4s"
                isHoveringComponent={isHovering}
                onClick={() => {
                  if (
                    !planFeatures ||
                    !planFeatures.componentActivationSchedule
                  )
                    return;
                  setOpenVisibleDateDialog(true);
                }}
              >
                <TimerIcon style={{ transform: "scale(0.7)" }} />
              </ToolIconButton>
            </ToolGridItem>
          </CustomTooltip>
        )}

        {/* Choose animation */}
        {isButtonType(component.type) && (
          <CustomTooltip
            disabled={!isHovering}
            disableInteractive
            leaveDelay={0.1}
            title={
              !planFeatures || !planFeatures.animations
                ? strings.notAvailableInYourPlan
                : strings.chooseAnimation
            }
            placement={isLargerThan400 ? "right" : "bottom"}
          >
            <ToolGridItem item id="choose-animation">
              <ToolIconButton
                size="small"
                disabled={!planFeatures || !planFeatures.animations}
                hoveringWhite
                transitionDuration="0.4s"
                isHoveringComponent={isHovering}
                onClick={() => {
                  if (!planFeatures || !planFeatures.animations) return;
                  setOpenChooseAnimationDialog(true);
                }}
              >
                <ChooseAnimationIcon style={{ transform: "scale(0.7)" }} />
              </ToolIconButton>
            </ToolGridItem>
          </CustomTooltip>
        )}

        {/* Toggle Visibility */}
        <CustomTooltip
          disabled={!isHovering}
          disableInteractive
          leaveDelay={0.1}
          title={strings.toggleVisibility}
          placement={isLargerThan400 ? "right" : "bottom"}
        >
          <ToolGridItem item id="toggle-visibility">
            <ToolIconButton
              size="small"
              hoveringWhite
              transitionDuration="0.45s"
              isHoveringComponent={isHovering}
              onClick={() => toggleVisibility()}
            >
              {component.visible ? (
                <VisibilityIcon style={{ transform: "scale(0.7)" }} />
              ) : (
                <VisibilityOffIcon style={{ transform: "scale(0.7)" }} />
              )}
            </ToolIconButton>
          </ToolGridItem>
        </CustomTooltip>

        {/* Duplicate component */}
        <CustomTooltip
          disabled={!isHovering}
          disableInteractive
          leaveDelay={0.1}
          title={strings.duplicate}
          placement={isLargerThan400 ? "right" : "bottom"}
        >
          <ToolGridItem item>
            <ToolIconButton
              size="small"
              hoveringWhite
              transitionDuration="0.5s"
              isHoveringComponent={isHovering}
              onClick={() => {
                if (!pageId) return;

                dispatch(
                  addMiddleComponentInPage(
                    { ...component, visible: false, _id: undefined },
                    pageId
                  )
                );
                onUpdatePage?.();
              }}
            >
              <CopyAllIcon style={{ transform: "scale(0.7)" }} />
            </ToolIconButton>
          </ToolGridItem>
        </CustomTooltip>

        {/* Remove component */}
        <CustomTooltip
          disabled={!isHovering}
          disableInteractive
          leaveDelay={0.1}
          title={strings.remove}
          placement={isLargerThan400 ? "right" : "bottom"}
        >
          <ToolGridItem item>
            <ToolIconButton
              size="small"
              hoveringWhite
              transitionDuration="0.5s"
              isHoveringComponent={isHovering}
              onClick={() => setOpenDeleteComponentConfirmation(true)}
            >
              <DeleteIcon style={{ transform: "scale(0.7)" }} />
            </ToolIconButton>
          </ToolGridItem>
        </CustomTooltip>
      </ToolsColumn>

      <DarkBG id="dark-bg" />

      <Dialogs />
    </Parent>
  );
};

export default DraggableUserComponent;
