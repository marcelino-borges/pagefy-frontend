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
  ComponentDetailsButton,
  LayoutPickerContainer,
  LayoutPickerHeaderText,
  SectionHeader,
} from "./styles";
import theme from "../../../../theme";
import { useDispatch } from "react-redux";
import { LIGHTER_GREY, LIGHT_GREY } from "./../../../../styles/colors";
import { showErrorToast } from "./../../../../utils/toast/index";
import CustomTooltip from "../../../components/tooltip";

import { v4 as getId } from "uuid";
import { useForm } from "react-hook-form";
import FontColorIcon from "./../../../../assets/icons/custom-icons/font-color";
import BackgroundColorIcon from "./../../../../assets/icons/custom-icons/background-color";

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
  const [fontColor, setFontColor] = useState<string>(LIGHT_GREY);
  const [backgroundColor, setBackgroundColor] = useState<string>(LIGHT_GREY);
  const [isVisible, setIsVisible] = useState<boolean>(true);

  const clearStates = () => {
    // Step 1 buttons
    setSelectedType(4);
    setSelectedColumnsCount(4);
    setSelectedRowsCount(4);
    setShowStep2(false);
    setStep(0);
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

  const Step2 = () => <DialogContent>Passo 2</DialogContent>;

  return (
    <Dialog
      open={open}
      onClose={() => {}}
      fullWidth
      fullScreen={isSmallerThanSM}
      maxWidth="sm"
      style={{ minWidth: "300px" }}
    >
      <DialogTitle>{strings.addIcon}</DialogTitle>
      {!showStep2 ? (
        // STEP 1
        <DialogContent
          style={{
            transform: step === 0 ? "unser" : "translateX(-1000px)",
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
                  <TextFieldsIcon />
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
        <Grid container direction="column">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid
              container
              wrap="nowrap"
              alignItems="center"
              sx={{ padding: "12px 24px" }}
            >
              <TextFieldsIcon sx={{ color: LIGHTER_GREY, fontSize: "37px" }} />
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
            <Grid
              container
              wrap="nowrap"
              alignItems="center"
              sx={{ padding: "12px 24px" }}
            >
              <InsertLinkIcon sx={{ color: LIGHTER_GREY, fontSize: "37px" }} />
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
                    <IconButton onClick={() => {}}>
                      <ImageSearchIcon
                        sx={{ fontSize: "28px", color: LIGHT_GREY }}
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
                  <IconButton onClick={() => {}}>
                    <FontColorIcon
                      bucketColor={LIGHT_GREY}
                      selectedColor={fontColor}
                    />
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
                  <IconButton onClick={() => {}}>
                    <BackgroundColorIcon
                      bucketColor={LIGHT_GREY}
                      selectedColor={backgroundColor}
                    />
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

            <Grid item>
              <CustomTooltip
                disableInteractive
                leaveDelay={0.1}
                title={strings.chooseEffect}
                placement="bottom"
              >
                <Grid item>
                  <IconButton onClick={() => {}}>
                    <TimerIcon sx={{ fontSize: "28px", color: LIGHT_GREY }} />
                  </IconButton>
                </Grid>
              </CustomTooltip>
            </Grid>
          </Grid>
        </Grid>
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
