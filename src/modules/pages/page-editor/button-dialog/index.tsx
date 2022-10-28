import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
  useMediaQuery,
} from "@mui/material";
import {
  TextFields as TextFieldsIcon,
  Image as ImageIcon,
  ViewColumn as ColumnsIcon,
  TableRows as RowsIcon,
  Category as CategoryIcon,
  Feedback as FeedbackIcon,
  InsertLink as InsertLinkIcon,
  ImageSearch as ImageSearchIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Timer as TimerIcon,
  AutoFixHigh as ChooseAnimationIcon,
  Circle,
  WhatsApp as WhatsappIcon,
  HelpOutline as HelpCenterIcon,
  WbIncandescent as LightIcon,
} from "@mui/icons-material";
import strings from "../../../../localization/index";
import {
  ComponentDetailsButton,
  LayoutPickerContainer,
  LayoutPickerHeaderText,
  SectionHeader,
} from "./styles";
import theme from "../../../../theme";
import { useDispatch, useSelector } from "react-redux";
import {
  ACESSIBILITY_GREEN,
  ACESSIBILITY_RED,
  LIGHTER_GREY,
  LIGHT_GREY,
  PRIMARY_COLOR,
  SECONDARY_COLOR,
} from "../../../../styles/colors";
import CustomTooltip from "../../../components/tooltip";

import FontColorIcon from "../../../../assets/icons/custom-icons/font-color";
import BackgroundColorIcon from "../../../../assets/icons/custom-icons/background-color";
import UploadImageDialog from "../../../components/dialog-upload-image";
import {
  ComponentBorderRadius,
  ComponentShadowStyle,
  COMPONENT_MAX_COLUMNS,
  COMPONENT_MAX_ROWS,
  GalleryContext,
  IMAGE_EXTENSIONS,
} from "../../../../constants";
import {
  ComponentType,
  IComponentAnimation,
  IUserComponent,
} from "../../../../store/user-pages/types";
import { showErrorToast } from "../../../../utils/toast/index";
import { addMiddleComponentInPage } from "../../../../store/user-pages/actions";
import DialogChooseAnimation from "../../../components/dialog-choose-animation/index";
import DialogVisibleDate from "../../../components/dialog-visible-date";
import ColorPicker from "../../../components/color-picker/index";
import { getFirebaseToken } from "../../../../utils/firebase-config";
import { uploadImage } from "../../../../services/files";
import { clearLoading, setLoading } from "../../../../store/shared/actions";
import { IApplicationState } from "../../../../store";
import { UserStorageFolder } from "../../../../store/shared/types";
import { PlansTypes } from "../../../../store/user/types";
import WhatsappDialog from "../whatsapp-dialog";
import { translateShadowStyleEnum } from "./../../../../utils/index";

interface IComponentDialogProps {
  pageId?: string;
  open: boolean;
  handleClose: any;
}

const ButtonDialog = ({ pageId, open, handleClose }: IComponentDialogProps) => {
  const dispatch = useDispatch();
  const isSmallerThanSM = useMediaQuery(theme.breakpoints.down("sm"));
  const isSmallerThanXM = useMediaQuery(theme.breakpoints.down("xm"));

  const userState = useSelector(
    (state: IApplicationState) => state.user.profile
  );

  const { handleSubmit, register } = useForm();

  const [selectedType, setSelectedType] = useState<ComponentType>(
    ComponentType.Text
  );
  const [selectedColumnsCount, setSelectedColumnsCount] = useState<number>(1);
  const [selectedRowsCount, setSelectedRowsCount] = useState<number>(1);
  const [selectedBorder, setSelectedBorder] = useState<ComponentBorderRadius>(
    ComponentBorderRadius.SQUARE
  );
  const [shadowStyle, setShadowStyle] = useState<ComponentShadowStyle>(
    ComponentShadowStyle.NONE
  );

  const [typeError, setTypeError] = useState<string>();
  const [columnsError, setColumnsError] = useState<string>();
  const [rowsError, setRowsError] = useState<string>();

  const [step, setStep] = useState<number>(0);
  const [showStep2, setShowStep2] = useState<boolean>(false);
  const [errorTextField, setErrorTextField] = useState<string>();
  const [errorUrlField, setErrorUrlField] = useState<string>();
  const [text, setText] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [fontColor, setFontColor] = useState<string>("black");
  const [backgroundColor, setBackgroundColor] = useState<string>(PRIMARY_COLOR);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [showBackgroundColorPicker, setShowBackgroundColorPicker] =
    useState<boolean>(false);
  const [showFontColorPicker, setShowFontColorPicker] =
    useState<boolean>(false);
  const [showUploadDialog, setShowUploadDialog] = useState<boolean>(false);
  const [chosenImage, setChosenImage] = useState<File>();
  const [existingImage, setExistingImage] = useState<string>();
  const [showVisibleDateDialog, setShowVisibleDateDialog] =
    useState<boolean>(false);
  const [visibleDateTime, setVisibleDateTime] = useState<string>();
  const [showAnimationDialog, setShowAnimationDialog] =
    useState<boolean>(false);
  const [animation, setAnimation] = useState<IComponentAnimation>({
    name: "",
    duration: 0,
    startDelay: 0,
    infinite: false,
  });
  const [openWhatsappDialog, setOpenWhatsappDialog] = useState<boolean>(false);

  const clearStates = () => {
    // Step 1 buttons
    setSelectedType(ComponentType.Text);
    setSelectedColumnsCount(1);
    setSelectedRowsCount(1);
    setSelectedBorder(ComponentBorderRadius.SQUARE);
    setShowStep2(false);
    setStep(0);
    setFontColor("black");
    setBackgroundColor(PRIMARY_COLOR);
    setIsVisible(true);
    setShowBackgroundColorPicker(false);
    setShowFontColorPicker(false);
    setShowUploadDialog(false);
    setChosenImage(undefined);
    clearErrors();
  };

  const clearErrors = () => {
    setTypeError(undefined);
    setColumnsError(undefined);
    setRowsError(undefined);
    setErrorUrlField(undefined);
    setErrorTextField(undefined);
  };

  const onSubmit = async () => {
    clearErrors();

    if (step === 0) {
      if (!isStep1Valid()) {
        showErrorToast(strings.selectAllOptions);
        return;
      }

      handleGoToStep(1, 350);
    } else if (step === 1) {
      if (!isStep2Valid()) {
        return;
      }
      const token = await getFirebaseToken();
      let urlMedia: string | undefined = undefined;

      if (token && userState && userState._id) {
        if (existingImage) {
          urlMedia = existingImage;
        } else if (chosenImage) {
          dispatch(setLoading());
          urlMedia = (
            await uploadImage(
              userState._id,
              chosenImage,
              UserStorageFolder.UPLOADED_IMAGES,
              token
            )
          ).data;
          dispatch(clearLoading());
        }
      }

      const newComponent: IUserComponent = {
        text: selectedType !== ComponentType.Image ? text : undefined,
        url,
        style: {
          backgroundColor:
            selectedType !== ComponentType.TextOverImage ? backgroundColor : "",
          color: fontColor,
          borderRadius: selectedBorder.toString() + "px",
          boxShadow: shadowStyle,
        },
        visible: isVisible,
        clicks: 0,
        layout: {
          rows: selectedRowsCount,
          columns: selectedColumnsCount,
        },
        type: selectedType,
        mediaUrl: urlMedia,
        iconDetails: undefined,
        visibleDate: visibleDateTime,
        animation,
      };

      if (pageId) {
        dispatch(addMiddleComponentInPage(newComponent, pageId));
      }
      handleClose();
      clearStates();
    }
  };

  const isStep1Valid = (): boolean => {
    let isValid = true;

    if (selectedType === 4) {
      setTypeError("Selecione um tipo de componente");
      isValid = false;
    }

    if (
      selectedColumnsCount < 1 ||
      selectedColumnsCount > COMPONENT_MAX_COLUMNS
    ) {
      setColumnsError("Selecione a quantidade de colunas");
      isValid = false;
    }

    if (selectedRowsCount > COMPONENT_MAX_ROWS || selectedRowsCount < 1) {
      setRowsError("Selecione a quantidade de linhas");
      isValid = false;
    }

    return isValid;
  };

  const isStep2Valid = (): boolean => {
    let isValid = true;

    if (url.length < 1) {
      setErrorUrlField(strings.urlRequired);
      isValid = false;
    }

    if (selectedType !== ComponentType.Image && (!text || text.length < 1)) {
      setErrorTextField(strings.textInComponentRequired);
      isValid = false;
    }

    if (selectedType !== ComponentType.Text && !existingImage && !chosenImage) {
      showErrorToast(strings.imageInComponentRequired);
      isValid = false;
    }

    return isValid;
  };

  const handleGoToStep = (targetStep: number, delay: number) => {
    setStep(targetStep);
    setTimeout(() => setShowStep2(targetStep === 1), delay);
  };

  const handleBackButton = () => {
    if (step === 1) {
      handleGoToStep(0, 50);
    } else if (step === 0) {
      handleClose();
      clearStates();
    }
  };

  const handleChangeBackgroundColorComplete = (color: any) => {
    setBackgroundColor(color.hex);
    setShowBackgroundColorPicker(false);
  };

  const handleChangeFontColorComplete = (color: any) => {
    setFontColor(color.hex);
    setShowFontColorPicker(false);
  };

  const Section = ({ title, icon, error, helpText }: any) => (
    <SectionHeader item>
      {icon}
      <LayoutPickerHeaderText>
        {title}
        <CustomTooltip title={helpText}>
          <HelpCenterIcon
            fontSize="inherit"
            style={{
              marginLeft: "4px",
              color: SECONDARY_COLOR,
              fontSize: "1em",
              cursor: "pointer",
            }}
          />
        </CustomTooltip>
        {error !== undefined && (
          <CustomTooltip title={error}>
            <FeedbackIcon
              fontSize="small"
              style={{ marginLeft: "4px", color: ACESSIBILITY_RED }}
            />
          </CustomTooltip>
        )}
      </LayoutPickerHeaderText>
    </SectionHeader>
  );

  return (
    <Dialog
      open={open}
      onClose={() => {}}
      fullWidth
      fullScreen={isSmallerThanSM}
      maxWidth="sm"
      style={{ minWidth: "300px" }}
    >
      <DialogTitle>{strings.tools.button.dialogTitle}</DialogTitle>
      {!showStep2 ? (
        /*
         * STEP 1
         */

        <DialogContent
          style={{
            transform: step === 0 ? "unset" : "translateX(-1000px)",
            transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
            display: "flex",
            alignItems: "flex-start",
          }}
        >
          <Grid container direction="column">
            <Section
              title={strings.type}
              icon={<CategoryIcon sx={{ transform: "translateY(-4px)" }} />}
              error={typeError}
              helpText={strings.tools.button.typeHelpText}
            />

            {/* TYPE section */}
            <Grid
              container
              wrap={isSmallerThanXM ? "wrap" : "nowrap"}
              justifyContent="flex-start"
            >
              {/* Only text */}
              <Grid item pr="24px">
                <ComponentDetailsButton
                  size="60px"
                  isSelected={selectedType === ComponentType.Text}
                  onClick={() => setSelectedType(ComponentType.Text)}
                >
                  <TextFieldsIcon style={{ fontSize: "40px" }} />
                </ComponentDetailsButton>
              </Grid>

              {/* Image & Text */}
              <Grid item pr="24px">
                <ComponentDetailsButton
                  size="60px"
                  isSelected={selectedType === ComponentType.TextImage}
                  onClick={() => setSelectedType(ComponentType.TextImage)}
                >
                  <ImageIcon
                    style={{ fontSize: "30px", marginBottom: "25px" }}
                  />
                  +
                  <TextFieldsIcon
                    style={{ fontSize: "30px", marginTop: "30px" }}
                  />
                </ComponentDetailsButton>
              </Grid>

              {/* Only image */}
              <Grid item pr="24px">
                <ComponentDetailsButton
                  size="60px"
                  isSelected={selectedType === ComponentType.Image}
                  onClick={() => setSelectedType(ComponentType.Image)}
                >
                  <ImageIcon style={{ fontSize: "40px" }} />
                </ComponentDetailsButton>
              </Grid>

              {/* Text over image */}
              <Grid item>
                <ComponentDetailsButton
                  size="60px"
                  isSelected={selectedType === ComponentType.TextOverImage}
                  onClick={() => setSelectedType(ComponentType.TextOverImage)}
                >
                  <ImageIcon
                    style={{ fontSize: "70px", position: "absolute" }}
                  />
                  <TextFieldsIcon
                    style={{
                      fontSize: "30px",
                      position: "absolute",
                      color: LIGHTER_GREY,
                      marginBottom: "12px",
                    }}
                  />
                </ComponentDetailsButton>
              </Grid>
            </Grid>

            {/* Columns selector */}
            <Grid container width="100%" pt="24px">
              <Grid item width="100%" xs={12} sm={6}>
                <Section
                  title={`${strings.columns} (1 - ${COMPONENT_MAX_COLUMNS})`}
                  icon={<ColumnsIcon sx={{ transform: "translateY(-4px)" }} />}
                  error={columnsError}
                  helpText={strings.tools.button.columnsHelpText}
                />
                <LayoutPickerContainer container item direction="column">
                  <TextField
                    sx={{ mb: "8px" }}
                    type="number"
                    value={selectedColumnsCount}
                    onChange={(event: any) => {
                      const value: number = Number(event.target.value);

                      if (value > COMPONENT_MAX_COLUMNS) {
                        setSelectedColumnsCount(COMPONENT_MAX_COLUMNS);
                      } else if (value < 1) {
                        setSelectedColumnsCount(1);
                      } else {
                        setSelectedColumnsCount(event.target.value);
                      }
                    }}
                    InputProps={{
                      inputProps: { min: 1, max: COMPONENT_MAX_COLUMNS },
                    }}
                  />
                </LayoutPickerContainer>
              </Grid>

              {/* Rows selector */}
              <Grid item xs={12} sm={6}>
                <Section
                  title={`${strings.rows} (1 - ${COMPONENT_MAX_ROWS})`}
                  icon={<RowsIcon sx={{ transform: "translateY(-4px)" }} />}
                  error={rowsError}
                  helpText={strings.tools.button.rowsHelpText}
                />
                <LayoutPickerContainer container item direction="column">
                  <TextField
                    sx={{ mb: "8px" }}
                    type="number"
                    value={selectedRowsCount}
                    onChange={(event: any) => {
                      const value: number = Number(event.target.value);

                      if (value > COMPONENT_MAX_ROWS) {
                        setSelectedRowsCount(COMPONENT_MAX_ROWS);
                      } else if (value < 1) {
                        setSelectedRowsCount(1);
                      } else {
                        setSelectedRowsCount(event.target.value);
                      }
                    }}
                    InputProps={{
                      inputProps: { min: 1, max: COMPONENT_MAX_ROWS },
                    }}
                  />
                </LayoutPickerContainer>
              </Grid>
            </Grid>

            {/* Border Radius */}
            <Grid container width="100%" pt="24px">
              <Section
                title={strings.componentBorderRadius}
                icon={
                  <Circle
                    sx={{ width: "16px", transform: "translateY(-4px)" }}
                  />
                }
                helpText={strings.tools.button.borderRadiusHelpText}
              />
              <Grid container width="100%" gap="24px">
                {Object.values(ComponentBorderRadius)
                  .filter((v) => !isNaN(Number(v)))
                  .map(
                    (radius: string | ComponentBorderRadius, index: number) => {
                      return (
                        <Grid key={radius.toString() + index.toString()} item>
                          <ComponentDetailsButton
                            size="60px"
                            iconSize="27px"
                            isSelected={selectedBorder === radius}
                            borderRadius={radius}
                            onClick={() => {
                              setSelectedBorder(
                                radius as ComponentBorderRadius
                              );
                            }}
                          >
                            {radius}
                          </ComponentDetailsButton>
                        </Grid>
                      );
                    }
                  )}
              </Grid>
            </Grid>

            {/* Shadow */}
            <Grid container width="100%" pt="24px">
              <Section
                title={strings.shadow}
                icon={
                  <LightIcon
                    sx={{ width: "20px", transform: "translateY(-4px)" }}
                  />
                }
                helpText={strings.tools.button.shadowHelpText}
              />
              <Grid container width="100%" gap="24px">
                {Object.values(ComponentShadowStyle).map(
                  (shadow: string | ComponentShadowStyle, index: number) => {
                    return (
                      <Grid key={shadow.toString() + index.toString()} item>
                        <ComponentDetailsButton
                          size="60px"
                          fontSize="0.9em"
                          isSelected={shadowStyle === shadow}
                          shadow={shadow}
                          onClick={() => {
                            setShadowStyle(shadow as ComponentShadowStyle);
                          }}
                        >
                          {translateShadowStyleEnum(
                            shadow as ComponentShadowStyle
                          )}
                        </ComponentDetailsButton>
                      </Grid>
                    );
                  }
                )}
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
      ) : (
        /*
         * STEP 2
         */

        <DialogContent
          style={{
            display: "flex",
            alignItems: "center",
            transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          <UploadImageDialog
            context={[GalleryContext.BUTTONS, GalleryContext.BACKGROUND]}
            openChooseFileDialog={showUploadDialog}
            setOpenChooseFileDialog={setShowUploadDialog}
            chosenImage={chosenImage}
            setChosenImage={setChosenImage}
            acceptedFiles={IMAGE_EXTENSIONS}
            submitDialog={(imageUrl?: string) => {
              setExistingImage(imageUrl);
              setShowUploadDialog(false);
            }}
            cancelDialog={() => {
              setChosenImage(undefined);
              setShowUploadDialog(false);
            }}
          />
          <DialogVisibleDate
            open={showVisibleDateDialog}
            onClose={() => {
              setShowVisibleDateDialog(false);
            }}
            setDateTime={setVisibleDateTime}
          />
          <DialogChooseAnimation
            open={showAnimationDialog}
            onClose={() => {
              setShowAnimationDialog(false);
            }}
            saveAnimation={setAnimation}
          />
          <Grid container direction="column">
            <form onSubmit={handleSubmit(onSubmit)}>
              {selectedType !== 1 && (
                <Grid
                  container
                  wrap="nowrap"
                  alignItems="center"
                  sx={{ padding: "12px 24px 12px 0px" }}
                >
                  <TextFieldsIcon
                    sx={{ color: LIGHTER_GREY, fontSize: "37px" }}
                  />
                  <TextField
                    {...register("label")}
                    error={!!errorTextField}
                    helperText={errorTextField}
                    autoFocus
                    required
                    placeholder={strings.text}
                    type="text"
                    fullWidth
                    variant="outlined"
                    onChange={(e: any) => setText(e.target.value)}
                    value={text}
                    sx={{ minWidth: "100px", marginLeft: "16px" }}
                  />
                </Grid>
              )}
              <Grid
                container
                wrap="nowrap"
                alignItems="center"
                sx={{ padding: "12px 24px 24px 0px" }}
              >
                <InsertLinkIcon
                  sx={{ color: LIGHTER_GREY, fontSize: "37px" }}
                />
                <TextField
                  {...register("url")}
                  error={!!errorUrlField}
                  helperText={errorUrlField}
                  autoFocus
                  required
                  placeholder={strings.webSiteExample}
                  type="text"
                  fullWidth
                  variant="outlined"
                  onChange={(e: any) => setUrl(e.target.value)}
                  value={url}
                  sx={{ minWidth: "100px", marginLeft: "16px" }}
                />
              </Grid>
            </form>
            <Grid
              container
              wrap="nowrap"
              justifyContent="center"
              alignItems="center"
            >
              {/* Pick Image */}
              {selectedType !== 0 && (
                <Grid item>
                  <CustomTooltip
                    disableInteractive
                    leaveDelay={0.1}
                    title={strings.uploadImage}
                    placement="bottom"
                  >
                    <Grid item>
                      <IconButton
                        onClick={() => {
                          setChosenImage(undefined);
                          setShowUploadDialog(true);
                        }}
                      >
                        <ImageSearchIcon
                          sx={{
                            fontSize: "28px",
                            color: chosenImage
                              ? ACESSIBILITY_GREEN
                              : LIGHT_GREY,
                          }}
                        />
                      </IconButton>
                    </Grid>
                  </CustomTooltip>
                </Grid>
              )}

              {/* Font Color */}
              {selectedType !== ComponentType.Image && (
                <Grid item>
                  <CustomTooltip
                    disableInteractive
                    leaveDelay={0.1}
                    title={strings.fontColor}
                    placement="bottom"
                  >
                    <Grid item>
                      <IconButton
                        onClick={() => {
                          setShowFontColorPicker(!showFontColorPicker);
                        }}
                      >
                        <FontColorIcon
                          bucketColor={LIGHT_GREY}
                          selectedColor={fontColor}
                        />
                      </IconButton>
                      {showFontColorPicker && (
                        <ColorPicker
                          color={fontColor}
                          onChangeComplete={handleChangeFontColorComplete}
                          onCancel={() => setShowFontColorPicker(false)}
                        />
                      )}
                    </Grid>
                  </CustomTooltip>
                </Grid>
              )}

              {/* Background Color */}

              {selectedType !== ComponentType.Image &&
                selectedType !== ComponentType.TextOverImage && (
                  <Grid item>
                    <CustomTooltip
                      disableInteractive
                      leaveDelay={0.1}
                      title={strings.backgroundColor}
                      placement="bottom"
                    >
                      <Grid item>
                        <IconButton
                          onClick={() => {
                            setShowBackgroundColorPicker(
                              !showBackgroundColorPicker
                            );
                          }}
                        >
                          <BackgroundColorIcon
                            bucketColor={LIGHT_GREY}
                            selectedColor={backgroundColor}
                          />
                        </IconButton>
                        {showBackgroundColorPicker && (
                          <ColorPicker
                            color={backgroundColor}
                            onChangeComplete={
                              handleChangeBackgroundColorComplete
                            }
                            onCancel={() => setShowBackgroundColorPicker(false)}
                          />
                        )}
                      </Grid>
                    </CustomTooltip>
                  </Grid>
                )}

              {/* Visibility */}
              <Grid item>
                <CustomTooltip
                  disableInteractive
                  leaveDelay={0.1}
                  title={strings.toggleVisibility}
                  placement="bottom"
                >
                  <Grid item>
                    <IconButton
                      onClick={() => {
                        setIsVisible(!isVisible);
                      }}
                    >
                      {isVisible ? (
                        <VisibilityIcon
                          sx={{ fontSize: "28px", color: LIGHT_GREY }}
                        />
                      ) : (
                        <VisibilityOffIcon
                          sx={{ fontSize: "28px", color: LIGHT_GREY }}
                        />
                      )}
                    </IconButton>
                  </Grid>
                </CustomTooltip>
              </Grid>

              {/* VisibleDate */}
              <Grid item>
                <CustomTooltip
                  disableInteractive
                  leaveDelay={0.1}
                  title={
                    userState?.plan === PlansTypes.FREE
                      ? strings.plansBlockings
                          .yourPlanDoesntAllowComponentScheduling
                      : strings.scheduleComponentVisibleDate
                  }
                  placement="bottom"
                >
                  <Grid item>
                    <IconButton
                      disabled={userState?.plan === PlansTypes.FREE}
                      onClick={() => {
                        setShowVisibleDateDialog(true);
                      }}
                    >
                      <TimerIcon sx={{ fontSize: "28px", color: LIGHT_GREY }} />
                    </IconButton>
                  </Grid>
                </CustomTooltip>
              </Grid>

              {/* Choose Animation */}
              <Grid item>
                <CustomTooltip
                  disableInteractive
                  leaveDelay={0.1}
                  title={
                    userState?.plan === PlansTypes.FREE
                      ? strings.plansBlockings.yourPlanDoesntAllowAnimation
                      : strings.chooseAnimation
                  }
                  placement="bottom"
                >
                  <Grid item>
                    <IconButton
                      disabled={userState?.plan === PlansTypes.FREE}
                      onClick={() => {
                        if (userState?.plan === PlansTypes.FREE) return;
                        setShowAnimationDialog(true);
                      }}
                    >
                      <ChooseAnimationIcon
                        sx={{ fontSize: "26px", color: LIGHT_GREY }}
                      />
                    </IconButton>
                  </Grid>
                </CustomTooltip>
              </Grid>

              {/* Mount Whatsapp URL */}
              <Grid item>
                <CustomTooltip
                  disableInteractive
                  leaveDelay={0.1}
                  title={strings.mountWhatsappURL}
                  placement="bottom"
                >
                  <Grid item>
                    <IconButton
                      onClick={() => {
                        setOpenWhatsappDialog(true);
                      }}
                    >
                      <WhatsappIcon
                        sx={{ fontSize: "26px", color: LIGHT_GREY }}
                      />
                    </IconButton>
                  </Grid>
                </CustomTooltip>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
      )}
      <DialogActions>
        <Button onClick={handleBackButton}>{strings.back}</Button>
        <Button
          onClick={() => {
            onSubmit();
          }}
        >
          {step === 0 ? strings.next : strings.create}
        </Button>
      </DialogActions>
      <WhatsappDialog
        open={openWhatsappDialog}
        handleClose={() => setOpenWhatsappDialog(false)}
        onMountUrl={(url: string) => {
          setUrl(url);
        }}
      />
    </Dialog>
  );
};

export default ButtonDialog;
