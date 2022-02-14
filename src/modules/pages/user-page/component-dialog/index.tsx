import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  useMediaQuery,
} from "@mui/material";
import {
  TextFields as TextFieldsIcon,
  Image as ImageIcon,
  ViewColumn as ColumnsIcon,
  TableRows as RowsIcon,
  Category as CategoryIcon,
  Feedback as FeedbackIcon,
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
import { LIGHTER_GREY } from "./../../../../styles/colors";
import { showErrorToast } from "./../../../../utils/toast/index";
import CustomTooltip from "../../../components/tooltip";

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

  const [selectedType, setSelectedType] = useState<number>(4);
  const [selectedColumnsCount, setSelectedColumnsCount] = useState<number>(4);
  const [selectedRowsCount, setSelectedRowsCount] = useState<number>(4);

  const [typeError, setTypeError] = useState<string>();
  const [columnsError, setColumnsError] = useState<string>();
  const [rowsError, setRowsError] = useState<string>();

  const [step, setStep] = useState<number>(0);

  const clearStates = () => {
    // Step 1 buttons
    setSelectedType(4);
    setSelectedColumnsCount(4);
    setSelectedRowsCount(4);
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

      setStep(1);
    } else if (step === 1) {
      //dispatch(addComponentInPage(newComponent, pageId));
      console.log("selectedType === 0: ", selectedType === 0);
      console.log("selectedType === 1: ", selectedType === 1);
      console.log("selectedType === 2: ", selectedType === 2);
      //handleClose();
    }
  };

  const handleBackButton = () => {
    if (step === 1) {
      setStep(0);
    } else if (step === 0) {
      handleClose();
      clearStates();
    }
  };

  const TypeSelector = () => (
    <>
      <Section title={strings.type} icon={<CategoryIcon />} error={typeError} />
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
  );

  const LayoutSelector = ({ direction }: ILayoutSelectorProps) => (
    <Grid container item wrap="nowrap">
      <Grid container item xs={12} sm={6} justifyContent="center">
        <ComponentDetailsButton
          size="60px"
          fontSize="27px"
          isSelected={
            direction === LayoutDirection.Column
              ? selectedColumnsCount === 1
              : selectedRowsCount === 1
          }
          onClick={() => {
            if (direction === LayoutDirection.Column) {
              setSelectedColumnsCount(1);
            } else {
              setSelectedRowsCount(1);
            }
          }}
        >
          1
        </ComponentDetailsButton>
      </Grid>

      <Grid container item xs={12} sm={6} justifyContent="center">
        <ComponentDetailsButton
          size="60px"
          fontSize="27px"
          isSelected={
            direction === LayoutDirection.Column
              ? selectedColumnsCount === 2
              : selectedRowsCount === 2
          }
          onClick={() => {
            if (direction === LayoutDirection.Column) {
              setSelectedColumnsCount(2);
            } else {
              setSelectedRowsCount(2);
            }
          }}
        >
          2
        </ComponentDetailsButton>
      </Grid>
    </Grid>
  );

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

  const Step1 = () => (
    <DialogContent>
      <TypeSelector />

      <Grid container>
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

          <LayoutSelector direction={LayoutDirection.Column} />
        </LayoutPickerContainer>

        <LayoutPickerContainer
          container
          item
          mt="16px"
          direction="column"
          xs={12}
          sm={6}
        >
          <Section title={strings.rows} icon={<RowsIcon />} error={rowsError} />
          <LayoutSelector direction={LayoutDirection.Row} />
        </LayoutPickerContainer>
      </Grid>
    </DialogContent>
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
      {step === 0 ? <Step1 /> : <Step2 />}
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
