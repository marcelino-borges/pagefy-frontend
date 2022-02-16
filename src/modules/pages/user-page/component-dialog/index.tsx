import { useMemo, useState } from "react";
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
  AutoFixHigh as ChooseEffectsIcon,
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
  LIGHTER_GREY,
  LIGHT_GREY,
  TRANSPARENT,
} from "./../../../../styles/colors";
import { showErrorToast } from "./../../../../utils/toast/index";
import CustomTooltip from "../../../components/tooltip";

import { v4 as getId } from "uuid";
import { useForm } from "react-hook-form";
import FontColorIcon from "./../../../../assets/icons/custom-icons/font-color";
import BackgroundColorIcon from "./../../../../assets/icons/custom-icons/background-color";
import { SketchPicker } from "react-color";
import ChooseFileDialog from "../../../components/dialog-file-upload";
import { IMAGE_EXTENSIONS } from "../../../constants";
import moment from "moment";

interface IIconsDialogProps {
  pageId?: string;
  open: boolean;
  handleClose: any;
}

enum LayoutDirection {
  Row,
  Column,
}

interface ILayoutSelectorProps {
  direction: LayoutDirection;
}

const ComponentDialog = ({ pageId, open, handleClose }: IIconsDialogProps) => {
  const defaultLaunchDate = moment().utc().toString();

  const dispatch = useDispatch();
  const isSmallerThanSM = useMediaQuery(theme.breakpoints.down("sm"));
  const isSmallerThanXM = useMediaQuery(theme.breakpoints.down("xm"));

  const { handleSubmit, register } = useForm();

  const [selectedType, setSelectedType] = useState<number>(4);
  const [selectedColumnsCount, setSelectedColumnsCount] = useState<number>(4);
  const [selectedRowsCount, setSelectedRowsCount] = useState<number>(4);

  const [typeError, setTypeError] = useState<string>();
  const [columnsError, setColumnsError] = useState<string>();
  const [rowsError, setRowsError] = useState<string>();

  const [step, setStep] = useState<number>(0);
  const [showStep2, setShowStep2] = useState<boolean>(false);
  const [errorLabelField, setErrorLabelField] = useState<string>();
  const [errorUrlField, setErrorUrlField] = useState<string>();
  const [label, setLabel] = useState<string>();
  const [url, setUrl] = useState<string>();
  const [fontColor, setFontColor] = useState<string>(TRANSPARENT);
  const [backgroundColor, setBackgroundColor] = useState<string>(TRANSPARENT);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [showBackgroundColorPicker, setShowBackgroundColorPicker] =
    useState<boolean>(false);
  const [showFontColorPicker, setShowFontColorPicker] =
    useState<boolean>(false);
  const [showUploadDialog, setShowUploadDialog] = useState<boolean>(false);
  const [chosenImage, setChosenImage] = useState();
  const [showLaunchDateDialog, setShowLaunchDateDialog] =
    useState<boolean>(false);
  const [launchDate, setLaunchDate] = useState<string>(defaultLaunchDate);

  const clearStates = () => {
    // Step 1 buttons
    setSelectedType(4);
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
  };

  const onSubmit = () => {
    clearErrors();

    if (step === 0) {
      let hasErros = false;

      if (selectedType === 4) {
        setTypeError("Selecione um tipo de componente");
        hasErros = true;
      }
      if (selectedColumnsCount === 4) {
        setColumnsError("Selecione a quantidade de colunas");
        hasErros = true;
      }
      if (selectedRowsCount === 4) {
        setRowsError("Selecione a quantidade de linhas");
        hasErros = true;
      }

      if (hasErros) {
        return;
      }

      handleGoToStep(1, 350);
    } else if (step === 1) {
      //dispatch(addComponentInPage(newComponent, pageId));
      console.log("selectedType === 0: ", selectedType === 0);
      console.log("selectedType === 1: ", selectedType === 1);
      console.log("selectedType === 2: ", selectedType === 2);
      //handleClose();
    }
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

  const Section = ({ title, icon, error }: any) => (
    <SectionHeader item>
      {icon}
      <LayoutPickerHeaderText>
        {title}
        {error !== undefined && (
          <CustomTooltip title={error}>
            <FeedbackIcon
              fontSize="small"
              color="primary"
              style={{ marginLeft: "4px" }}
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
      <DialogContent>
        <div
          style={{
            paddingTop: "16px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          {!isSmallerThanSM ? (
            <DesktopDatePicker
              label={strings.date}
              inputFormat="DD/MM/yyyy"
              value={moment(launchDate)}
              onChange={(e: any) => {
                console.log("date: ", e.target);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          ) : (
            <MobileDatePicker
              label={strings.date}
              inputFormat="DD/MM/yyyy"
              value={moment(launchDate)}
              onChange={(e: any) => {
                console.log("date: ", e.target);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          )}
        </div>
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
          }}
        >
          <>
            <Section
              title={strings.type}
              icon={<CategoryIcon />}
              error={typeError}
            />
            <Grid container wrap={isSmallerThanXM ? "wrap" : "nowrap"}>
              <Grid container item xs={12} sm={4} justifyContent="center">
                <ComponentDetailsButton
                  isSelected={selectedType === 0}
                  onClick={() => setSelectedType(0)}
                >
                  <TextFieldsIcon />
                </ComponentDetailsButton>
              </Grid>

              <Grid container item xs={12} sm={4} justifyContent="center">
                <ComponentDetailsButton
                  isSelected={selectedType === 2}
                  onClick={() => setSelectedType(2)}
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
                  isSelected={selectedType === 1}
                  onClick={() => setSelectedType(1)}
                >
                  <ImageIcon />
                </ComponentDetailsButton>
              </Grid>
            </Grid>
          </>

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
        </DialogContent>
      ) : (
        /*
         * STEP 2
         */

        <DialogContent
          style={{
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
                    error={!!errorLabelField}
                    helperText={errorLabelField}
                    autoFocus
                    required
                    placeholder={strings.text}
                    type="text"
                    fullWidth
                    variant="outlined"
                    onChange={(e: any) => setLabel(e.target.value)}
                    value={label}
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
                      {showFontColorPicker && (
                        <ColorPickerSpan>
                          <SketchPicker
                            color={fontColor}
                            onChangeComplete={handleChangeFontColorComplete}
                          />
                        </ColorPickerSpan>
                      )}
                    </IconButton>
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
                      {showBackgroundColorPicker && (
                        <ColorPickerSpan>
                          <SketchPicker
                            color={backgroundColor}
                            onChangeComplete={
                              handleChangeBackgroundColorComplete
                            }
                          />
                        </ColorPickerSpan>
                      )}
                    </IconButton>
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
