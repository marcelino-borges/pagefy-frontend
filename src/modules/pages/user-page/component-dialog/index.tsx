import { useState } from "react";
import { useForm } from "react-hook-form";
import { SketchPicker } from "react-color";
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
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import TimePicker from "@mui/lab/TimePicker";
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
} from "@mui/icons-material";
import strings from "../../../../localization/index";
import {
  ColorPickerSpan,
  ComponentDetailsButton,
  LayoutPickerContainer,
  LayoutPickerHeaderText,
  SectionHeader,
} from "./styles";
import theme from "../../../../theme";
import { useDispatch } from "react-redux";
import {
  ACESSIBILITY_GREEN,
  ACESSIBILITY_RED,
  LIGHTER_GREY,
  LIGHT_GREY,
  PRIMARY_COLOR,
  TRANSPARENT,
} from "./../../../../styles/colors";
import CustomTooltip from "../../../components/tooltip";

import FontColorIcon from "./../../../../assets/icons/custom-icons/font-color";
import BackgroundColorIcon from "./../../../../assets/icons/custom-icons/background-color";
import ChooseFileDialog from "../../../components/dialog-file-upload";
import { IMAGE_EXTENSIONS } from "../../../constants";
import moment from "moment";
import { ComponentType, IUserComponent } from "../../../../store/user/types";
import { showErrorToast } from "./../../../../utils/toast/index";

interface IIconsDialogProps {
  pageId?: string;
  open: boolean;
  handleClose: any;
}

const ComponentDialog = ({ pageId, open, handleClose }: IIconsDialogProps) => {
  const defaultLaunchDate = moment().utc().toString();

  const dispatch = useDispatch();
  const isSmallerThanSM = useMediaQuery(theme.breakpoints.down("sm"));
  const isSmallerThanXM = useMediaQuery(theme.breakpoints.down("xm"));

  const { handleSubmit, register } = useForm();

  const [selectedType, setSelectedType] = useState<ComponentType>(
    ComponentType.Video
  );
  const [selectedColumnsCount, setSelectedColumnsCount] = useState<number>(4);
  const [selectedRowsCount, setSelectedRowsCount] = useState<number>(4);

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
  const [showLaunchDateDialog, setShowLaunchDateDialog] =
    useState<boolean>(false);
  const [launchDate, setLaunchDate] = useState<string>(defaultLaunchDate);
  const [launchTime, setLaunchTime] = useState<string>(defaultLaunchDate);

  const clearStates = () => {
    // Step 1 buttons
    setSelectedType(ComponentType.Video);
    setSelectedColumnsCount(4);
    setSelectedRowsCount(4);
    setShowStep2(false);
    setStep(0);
    setFontColor(TRANSPARENT);
    setBackgroundColor(TRANSPARENT);
    setIsVisible(true);
    setShowBackgroundColorPicker(false);
    setShowFontColorPicker(false);
    setShowUploadDialog(false);
    setChosenImage(undefined);
    setLaunchDate(defaultLaunchDate);
    clearErrors();
  };

  const clearErrors = () => {
    setTypeError(undefined);
    setColumnsError(undefined);
    setRowsError(undefined);
    setErrorUrlField(undefined);
    setErrorTextField(undefined);
  };

  const onSubmit = () => {
    clearErrors();

    if (step === 0) {
      if (!isStep1Valid()) {
        showErrorToast(strings.selectAllOptions);
        return;
      }

      handleGoToStep(1, 350);
    } else if (step === 1) {
      //dispatch(addComponentInPage(newComponent, pageId));
      if (!isStep2Valid()) {
        return;
      }

      // const newComponent: IUserComponent = {
      //   text: selectedType !== ComponentType.Image ? text : undefined,
      //   url,
      //   style: {
      //     backgroundColor,
      //     color: fontColor,
      //   },
      //   visible: isVisible,
      //   clicks: 0,
      //   layout: {
      //     rows: selectedRowsCount,
      //     columns: selectedColumnsCount,
      //   },
      //   type: selectedType,
      //   mediaUrl: undefined,
      //   iconDetails: undefined,

      // };
      //handleClose();
      console.log("add component");
    }
  };

  const isStep1Valid = (): boolean => {
    let isValid = true;

    if (selectedType === 4) {
      setTypeError("Selecione um tipo de componente");
      isValid = false;
    }

    if (selectedColumnsCount === 4) {
      setColumnsError("Selecione a quantidade de colunas");
      isValid = false;
    }

    if (selectedRowsCount === 4) {
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

    if (selectedType !== ComponentType.Text && !chosenImage) {
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
  };

  const handleChangeFontColorComplete = (color: any) => {
    setFontColor(color.hex);
  };

  const handleLaunchDate = (newDate: any) => {
    setLaunchDate(moment(newDate).utc().toString());
  };

  const handleLaunchTime = (newDate: any) => {
    setLaunchTime(moment(newDate).utc().toString());
  };

  const Section = ({ title, icon, error }: any) => (
    <SectionHeader item>
      {icon}
      <LayoutPickerHeaderText>
        {title}
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

  const DialogLaunchDate = () => (
    <Dialog
      open={showLaunchDateDialog}
      onClose={() => {}}
      fullWidth
      fullScreen={isSmallerThanSM}
      maxWidth="sm"
      style={{ minWidth: "300px" }}
    >
      <DialogTitle>{strings.scheduleLaunchComponentDate}</DialogTitle>
      <DialogContent
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          style={{
            paddingTop: "16px",
          }}
        >
          <Grid
            item
            xs={12}
            md={7}
            style={{
              paddingRight: !!isSmallerThanXM ? "unset" : "24px",
              paddingBottom: !!isSmallerThanXM ? "24px" : "unset",
            }}
          >
            {!isSmallerThanSM ? (
              <DesktopDatePicker
                label={strings.date}
                inputFormat="DD/MM/yyyy"
                value={moment(launchDate)}
                onChange={handleLaunchDate}
                renderInput={(params) => (
                  <TextField
                    style={{
                      width: "100%",
                    }}
                    {...params}
                  />
                )}
              />
            ) : (
              <MobileDatePicker
                label={strings.date}
                inputFormat="DD/MM/yyyy"
                value={moment(launchDate)}
                onChange={handleLaunchDate}
                renderInput={(params) => (
                  <TextField
                    style={{
                      width: "100%",
                    }}
                    {...params}
                  />
                )}
              />
            )}
          </Grid>
          <Grid item xs={12} md={5}>
            <TimePicker
              label="Time"
              value={moment(launchTime).toDate()}
              onChange={handleLaunchTime}
              renderInput={(params) => (
                <TextField
                  style={{
                    width: "100%",
                  }}
                  {...params}
                />
              )}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            setLaunchDate(defaultLaunchDate);
            setShowLaunchDateDialog(false);
          }}
        >
          {strings.back}
        </Button>
        <Button
          onClick={() => {
            setShowLaunchDateDialog(false);
          }}
        >
          {strings.save}
        </Button>
      </DialogActions>
    </Dialog>
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
      <DialogTitle>{strings.addComponent}</DialogTitle>
      {!showStep2 ? (
        /*
         * STEP 1
         */

        <DialogContent
          style={{
            transform: step === 0 ? "unset" : "translateX(-1000px)",
            transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Grid container direction="column">
            <Section
              title={strings.type}
              icon={<CategoryIcon />}
              error={typeError}
            />
            <Grid container wrap={isSmallerThanXM ? "wrap" : "nowrap"}>
              <Grid container item xs={12} sm={4} justifyContent="center">
                <ComponentDetailsButton
                  isSelected={selectedType === ComponentType.Text}
                  onClick={() => setSelectedType(ComponentType.Text)}
                >
                  <TextFieldsIcon />
                </ComponentDetailsButton>
              </Grid>

              <Grid container item xs={12} sm={4} justifyContent="center">
                <ComponentDetailsButton
                  isSelected={selectedType === ComponentType.TextImage}
                  onClick={() => setSelectedType(ComponentType.TextImage)}
                >
                  <TextFieldsIcon
                    style={{ fontSize: "40px", marginBottom: "45px" }}
                  />
                  +
                  <ImageIcon style={{ fontSize: "40px", marginTop: "50px" }} />
                </ComponentDetailsButton>
              </Grid>

              <Grid container item xs={12} sm={4} justifyContent="center">
                <ComponentDetailsButton
                  isSelected={selectedType === ComponentType.Image}
                  onClick={() => setSelectedType(ComponentType.Image)}
                >
                  <ImageIcon />
                </ComponentDetailsButton>
              </Grid>
            </Grid>

            {/* Layout selector */}
            <Grid container>
              {/* Columns selector */}
              <LayoutPickerContainer
                container
                item
                mt="16px"
                direction="column"
                xs={12}
                sm={6}
              >
                <Section
                  title={strings.columns}
                  icon={<ColumnsIcon />}
                  error={columnsError}
                />
                <Grid container item wrap="nowrap">
                  <Grid container item xs={12} sm={6} justifyContent="center">
                    <ComponentDetailsButton
                      size="60px"
                      fontSize="27px"
                      isSelected={selectedColumnsCount === 1}
                      onClick={() => {
                        setSelectedColumnsCount(1);
                      }}
                    >
                      1
                    </ComponentDetailsButton>
                  </Grid>

                  <Grid container item xs={12} sm={6} justifyContent="center">
                    <ComponentDetailsButton
                      size="60px"
                      fontSize="27px"
                      isSelected={selectedColumnsCount === 2}
                      onClick={() => {
                        setSelectedColumnsCount(2);
                      }}
                    >
                      2
                    </ComponentDetailsButton>
                  </Grid>
                </Grid>
              </LayoutPickerContainer>

              {/* Rows selector */}
              <LayoutPickerContainer
                container
                item
                mt="16px"
                direction="column"
                xs={12}
                sm={6}
              >
                <Section
                  title={strings.rows}
                  icon={<RowsIcon />}
                  error={rowsError}
                />
                <Grid container item wrap="nowrap">
                  <Grid container item xs={12} sm={6} justifyContent="center">
                    <ComponentDetailsButton
                      size="60px"
                      fontSize="27px"
                      isSelected={selectedRowsCount === 1}
                      onClick={() => {
                        setSelectedRowsCount(1);
                      }}
                    >
                      1
                    </ComponentDetailsButton>
                  </Grid>

                  <Grid container item xs={12} sm={6} justifyContent="center">
                    <ComponentDetailsButton
                      size="60px"
                      fontSize="27px"
                      isSelected={selectedRowsCount === 2}
                      onClick={() => {
                        setSelectedRowsCount(2);
                      }}
                    >
                      2
                    </ComponentDetailsButton>
                  </Grid>
                </Grid>
              </LayoutPickerContainer>
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
          <ChooseFileDialog
            openChooseFileDialog={showUploadDialog}
            setOpenChooseFileDialog={setShowUploadDialog}
            chosenImage={chosenImage}
            setChosenImage={setChosenImage}
            acceptedFiles={IMAGE_EXTENSIONS}
            submitDialog={() => {
              if (!chosenImage) {
                return;
              }
              // TODO: Send file
              setShowUploadDialog(false);
            }}
            cancelDialog={() => {
              setChosenImage(undefined);
              setShowUploadDialog(false);
            }}
          />
          <DialogLaunchDate />
          <Grid container direction="column">
            <form onSubmit={handleSubmit(onSubmit)}>
              {selectedType !== 1 && (
                <Grid
                  container
                  wrap="nowrap"
                  alignItems="center"
                  sx={{ padding: "12px 24px 24px 0px" }}
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
                      <ColorPickerSpan>
                        <SketchPicker
                          color={fontColor}
                          onChangeComplete={handleChangeFontColorComplete}
                        />
                      </ColorPickerSpan>
                    )}
                  </Grid>
                </CustomTooltip>
              </Grid>

              {/* Background Color */}
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
                      <ColorPickerSpan>
                        <SketchPicker
                          color={backgroundColor}
                          onChangeComplete={handleChangeBackgroundColorComplete}
                        />
                      </ColorPickerSpan>
                    )}
                  </Grid>
                </CustomTooltip>
              </Grid>

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

              {/* LaunchDate */}
              <Grid item>
                <CustomTooltip
                  disableInteractive
                  leaveDelay={0.1}
                  title={strings.chooseEffect}
                  placement="bottom"
                >
                  <Grid item>
                    <IconButton
                      onClick={() => {
                        setShowLaunchDateDialog(true);
                      }}
                    >
                      <TimerIcon sx={{ fontSize: "28px", color: LIGHT_GREY }} />
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
          {step === 0 ? strings.next : strings.add}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ComponentDialog;
