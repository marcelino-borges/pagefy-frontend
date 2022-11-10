import { useState } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Stack,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Remove as RemoveIcon } from "@mui/icons-material";
import strings from "../../../../../localization";
import {
  ComponentType,
  ICounter,
  IUserComponent,
} from "../../../../../store/user-pages/types";
import { addMiddleComponentInPage } from "../../../../../store/user-pages/actions";
import { LIGHT_GREY, PRIMARY_COLOR } from "../../../../../styles/colors";
import ColorPicker from "../../../../components/color-picker";
import CustomTooltip from "../../../../components/tooltip";
import BackgroundColorIcon from "../../../../../assets/icons/custom-icons/background-color";
import {
  AddCounterButton,
  CounterContainer,
  CounterContainerLabel,
  CounterRemoveIcon,
} from "./styles";
import Counters from "../../../../components/counters";
import FontColorIcon from "../../../../../assets/icons/custom-icons/font-color";

interface ICountersDialogProps {
  pageId?: string;
  open: boolean;
  handleClose: any;
}

const BLANK_COUNTER: ICounter = {
  number: 0,
  label: "Label",
};

const CountersDialog = ({
  pageId,
  open,
  handleClose,
}: ICountersDialogProps) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isSmallerThanSM = useMediaQuery(theme.breakpoints.down("sm"));

  const [labelError, setLabelError] = useState<string>("");
  const [label, setLabel] = useState<string>("");
  const [url, setUrl] = useState<string>("");

  const [counters, setCounters] = useState<ICounter[]>([BLANK_COUNTER]);

  const [bgColor, setBgColor] = useState<string>("black");
  const [fontColor, setFontColor] = useState<string>(PRIMARY_COLOR);
  const [showBackgroundColorPicker, setShowBackgroundColorPicker] =
    useState<boolean>(false);
  const [showFontColorPicker, setShowFontColorPicker] =
    useState<boolean>(false);

  const clearStates = () => {
    setLabelError("");
    setLabel("");
    setBgColor("black");
    setFontColor(PRIMARY_COLOR);
    setShowBackgroundColorPicker(false);
    setShowFontColorPicker(false);
  };

  const onCreateCounters = () => {
    setLabelError("");

    if (!pageId || !isValid()) return;

    if (!label?.length) {
      setLabelError(strings.textInComponentRequired);
      return;
    }

    const newComponent: IUserComponent = {
      text: label,
      visible: true,
      clicks: 0,
      layout: {
        rows: 2,
        columns: 2,
      },
      style: {
        color: fontColor,
        backgroundColor: bgColor,
      },

      url,
      type: ComponentType.Counter,
      counters,
    };
    dispatch(addMiddleComponentInPage(newComponent, pageId));
    clearStates();
    handleClose();
  };

  const handleChangeBackgroundColorComplete = (color: any) => {
    setBgColor(color);
    setShowBackgroundColorPicker(false);
  };

  const handleChangeFillColorComplete = (color: any) => {
    setFontColor(color);
    setShowFontColorPicker(false);
  };

  const addCounter = () => {
    setCounters([...counters, BLANK_COUNTER]);
  };

  const removeCounter = (indexToRemove: number) => {
    setCounters([
      ...counters.filter(
        (counter: ICounter, index: number) => index !== indexToRemove
      ),
    ]);
  };

  const isValid = () =>
    counters.length > 0 && counters[0] !== BLANK_COUNTER && label.length > 0;

  return (
    <Dialog
      open={open}
      onClose={() => {
        clearStates();
        handleClose();
      }}
      fullWidth
      fullScreen={isSmallerThanSM}
      maxWidth="sm"
      style={{ minWidth: "300px" }}
    >
      <DialogTitle>{strings.tools.counters.name}</DialogTitle>
      <DialogContent>
        <TextField
          error={!!labelError && labelError.length > 0}
          helperText={!!labelError && labelError.length > 0 ? labelError : ""}
          autoFocus
          required
          type="text"
          label={strings.text}
          fullWidth
          variant="outlined"
          onChange={(e: any) => {
            setLabelError("");
            const input: string = e.target.value;
            setLabel(input);
          }}
          value={label}
          sx={{ mt: "16px" }}
        />
        <TextField
          autoFocus
          type="text"
          label={strings.url}
          fullWidth
          variant="outlined"
          onChange={(e: any) => {
            const input: string = e.target.value;
            setUrl(input);
          }}
          value={url}
          sx={{ mt: "16px" }}
        />

        <Grid
          container
          direction="column"
          gap="16px"
          pl="16px"
          pt={counters.length > 0 ? "32px" : "0px"}
        >
          {counters.map((_: ICounter, index: number) => (
            <CounterContainer
              container
              item
              direction="row"
              xs={12}
              wrap="nowrap"
              alignItems="center"
              key={uuidv4()}
            >
              <CounterContainerLabel>
                {`${strings.tools.counters.textfieldCounterLabel} ${index + 1}`}
              </CounterContainerLabel>
              <CounterRemoveIcon
                onClick={() => {
                  removeCounter(index);
                }}
              >
                <RemoveIcon />
              </CounterRemoveIcon>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label={strings.tools.counters.number}
                  type="number"
                  value={counters[index].number}
                  onChange={(event: any) => {
                    const { value } = event.target;
                    const updatedCounters = [...counters];
                    updatedCounters[index] = {
                      ...updatedCounters[index],
                      number: value,
                    };
                    setCounters(updatedCounters);
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label={strings.tools.counters.label}
                  type="text"
                  value={counters[index].label}
                  onChange={(event: any) => {
                    const { value } = event.target;
                    const updatedCounters = [...counters];
                    updatedCounters[index] = {
                      ...updatedCounters[index],
                      label: value,
                    };
                    setCounters(updatedCounters);
                  }}
                />
              </Grid>
            </CounterContainer>
          ))}
        </Grid>

        <AddCounterButton container>
          <div onClick={() => addCounter()}>
            <span style={{ fontSize: "1.5em", marginRight: "8px" }}>+</span>
            {`${
              strings.add
            } ${strings.tools.counters.textfieldCounterLabel.toLowerCase()}`}
          </div>
        </AddCounterButton>

        <Stack direction="row" flexWrap="nowrap" gap="32px" mt="16px" mb="32px">
          <Stack
            direction="row"
            flexWrap="nowrap"
            alignItems="center"
            gap="8px"
            borderRight={`1px solid ${LIGHT_GREY}`}
            pr="28px"
          >
            {strings.backgroundColor}:
            <CustomTooltip
              disableInteractive
              leaveDelay={0.1}
              title={strings.backgroundColor}
              placement="bottom"
            >
              <div>
                <IconButton
                  onClick={() => {
                    setShowBackgroundColorPicker(!showBackgroundColorPicker);
                  }}
                >
                  <BackgroundColorIcon
                    bucketColor={LIGHT_GREY}
                    selectedColor={bgColor}
                  />
                </IconButton>
                {showBackgroundColorPicker && (
                  <ColorPicker
                    initialColor={bgColor}
                    onChooseColor={handleChangeBackgroundColorComplete}
                    onCancel={() => setShowBackgroundColorPicker(false)}
                  />
                )}
              </div>
            </CustomTooltip>
          </Stack>
          <Stack
            direction="row"
            flexWrap="nowrap"
            alignItems="center"
            gap="8px"
          >
            {strings.fontColor}:
            <CustomTooltip
              disableInteractive
              leaveDelay={0.1}
              title={strings.fontColor}
              placement="bottom"
            >
              <div>
                <IconButton
                  onClick={() => {
                    setShowFontColorPicker(!showBackgroundColorPicker);
                  }}
                >
                  <FontColorIcon
                    bucketColor={LIGHT_GREY}
                    selectedColor={fontColor}
                  />
                </IconButton>
                {showFontColorPicker && (
                  <ColorPicker
                    initialColor={fontColor}
                    onChooseColor={handleChangeFillColorComplete}
                    onCancel={() => setShowFontColorPicker(false)}
                  />
                )}
              </div>
            </CustomTooltip>
          </Stack>
        </Stack>
        <Counters counters={counters} bgColor={bgColor} color={fontColor} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>{strings.back}</Button>
        <Button
          disabled={!isValid()}
          onClick={() => {
            onCreateCounters();
          }}
        >
          {strings.create}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CountersDialog;
