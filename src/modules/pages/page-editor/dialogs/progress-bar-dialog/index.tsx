import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import strings from "../../../../../localization/index";
import {
  ComponentType,
  IUserComponent,
} from "../../../../../store/user-pages/types";
import { addMiddleComponentInPage } from "../../../../../store/user-pages/actions";
import ProgressBar from "../../../../components/progress-bar";
import { LIGHT_GREY, PRIMARY_COLOR } from "../../../../../styles/colors";
import ColorPicker from "../../../../components/color-picker";
import CustomTooltip from "../../../../components/tooltip";
import BackgroundColorIcon from "../../../../../assets/icons/custom-icons/background-color";
import { ProgressBarContainer, ProgressBarContainerLabel } from "./styles";

interface IProgressBarDialogProps {
  pageId?: string;
  open: boolean;
  handleClose: any;
}

const ProgressBarDialog = ({
  pageId,
  open,
  handleClose,
}: IProgressBarDialogProps) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isSmallerThanSM = useMediaQuery(theme.breakpoints.down("sm"));

  const [labelError, setLabelError] = useState<string>("");
  const [label, setLabel] = useState<string>("");
  const [progressValue, setProgressValue] = useState<number>(50);
  const [url, setUrl] = useState<string>("");
  const [barBgColor, setBarBgColor] = useState<string>("black");
  const [barFillColor, setBarFillColor] = useState<string>(PRIMARY_COLOR);
  const [showBackgroundColorPicker, setShowBackgroundColorPicker] =
    useState<boolean>(false);
  const [showFillColorPicker, setShowFillColorPicker] =
    useState<boolean>(false);

  const clearStates = () => {
    setLabelError("");
    setLabel("");
    setProgressValue(0);
    setBarBgColor("black");
    setBarFillColor(PRIMARY_COLOR);
    setShowBackgroundColorPicker(false);
    setShowFillColorPicker(false);
  };

  const onCreateProgressBar = () => {
    setLabelError("");

    if (!pageId) return;

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
        color: barFillColor,
        backgroundColor: barBgColor,
      },
      progressValue,
      url,
      type: ComponentType.ProgressBar,
    };
    dispatch(addMiddleComponentInPage(newComponent, pageId));
    clearStates();
    handleClose();
  };

  const handleChangeBackgroundColorComplete = (color: any) => {
    setBarBgColor(color.hex);
    setShowBackgroundColorPicker(false);
  };

  const handleChangeFillColorComplete = (color: any) => {
    setBarFillColor(color.hex);
    setShowFillColorPicker(false);
  };

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
      <DialogTitle>{strings.tools.progressBar.name}</DialogTitle>
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
          required
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

        <ProgressBarContainer direction="column">
          <ProgressBarContainerLabel>
            {strings.tools.progressBar.name}
          </ProgressBarContainerLabel>
          <Stack direction="row" alignItems="center">
            {strings.tools.progressBar.textfieldProgressLabel}:
            <TextField
              sx={{ ml: "16px", mr: "4px" }}
              type="number"
              value={progressValue}
              onChange={(event: any) => {
                const value: number = Number(event.target.value);

                if (value > 100) {
                  setProgressValue(100);
                } else if (value < 0) {
                  setProgressValue(0);
                } else {
                  setProgressValue(event.target.value);
                }
              }}
              InputProps={{
                inputProps: { min: 1, max: 100 },
              }}
            />
            <span style={{ fontSize: "1.5em" }}>%</span>
          </Stack>
          <Stack
            direction="row"
            flexWrap="nowrap"
            gap="32px"
            mt="16px"
            mb="32px"
          >
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
                      selectedColor={barBgColor}
                    />
                  </IconButton>
                  {showBackgroundColorPicker && (
                    <ColorPicker
                      color={barBgColor}
                      onChangeComplete={handleChangeBackgroundColorComplete}
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
              {strings.fillColor}:
              <CustomTooltip
                disableInteractive
                leaveDelay={0.1}
                title={strings.fillColor}
                placement="bottom"
              >
                <div>
                  <IconButton
                    onClick={() => {
                      setShowFillColorPicker(!showBackgroundColorPicker);
                    }}
                  >
                    <BackgroundColorIcon
                      bucketColor={LIGHT_GREY}
                      selectedColor={barFillColor}
                    />
                  </IconButton>
                  {showFillColorPicker && (
                    <ColorPicker
                      color={barFillColor}
                      onChangeComplete={handleChangeFillColorComplete}
                      onCancel={() => setShowFillColorPicker(false)}
                    />
                  )}
                </div>
              </CustomTooltip>
            </Stack>
          </Stack>

          <ProgressBar
            progressValue={progressValue}
            bgColor={barBgColor}
            fillColor={barFillColor}
            valueVerticalOffset={1}
          />
        </ProgressBarContainer>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>{strings.back}</Button>
        <Button
          disabled={!progressValue || !label}
          onClick={() => {
            onCreateProgressBar();
          }}
        >
          {strings.create}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProgressBarDialog;
