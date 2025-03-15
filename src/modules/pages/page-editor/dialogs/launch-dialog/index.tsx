import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  MenuItem,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import strings from "../../../../../localization/index";
import { DescriptionText } from "./styles";
import {
  ComponentType,
  IUserComponent,
} from "../../../../../store/user-pages/types";
import { addMiddleComponentInPage } from "../../../../../store/user-pages/actions";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import TimePicker from "@mui/lab/TimePicker";
import moment from "moment";
import {
  ComponentBorderRadius,
  ComponentShadowStyle,
  RENDERED_PAGE_COMPONENT_HEIGHT,
  RENDERED_PAGE_LAUNCH_COMPONENT_ROWS,
} from "../../../../../constants";
import { LIGHT_GREY, PRIMARY_COLOR } from "../../../../../styles/colors";
import CustomTooltip from "../../../../components/tooltip";
import BackgroundColorIcon from "../../../../../assets/icons/custom-icons/background-color";
import ColorPicker from "../../../../components/color-picker";
import FontColorIcon from "../../../../../assets/icons/custom-icons/font-color";
import { translateShadowStyleEnum } from "../../../../../utils";
import LaunchComponent from "../../../../components/page-renderer/component-types/launch";

interface IIconsDialogProps {
  pageId?: string;
  open: boolean;
  handleClose: () => void;
  onUpdatePage?: () => void;
}

const LaunchDialog = ({
  pageId,
  open,
  handleClose,
  onUpdatePage,
}: IIconsDialogProps) => {
  const defaultLaunchDate = moment().toISOString();

  const dispatch = useDispatch();
  const theme = useTheme();
  const isSmallerThanSM = useMediaQuery(theme.breakpoints.down("sm"));

  const [message, setMessage] = useState<string>("");
  const [messageFieldError, setMessageFieldError] = useState<string>();
  const [url, setUrl] = useState<string>("");
  const [urlFieldError, setUrlFieldError] = useState<string>();
  const [launchDate, setLaunchDate] = useState<string>(defaultLaunchDate);
  const [dateTimeFieldError, setDateTimeFieldError] = useState<string>();
  const [launchTime, setLaunchTime] = useState<string>(defaultLaunchDate);

  const [fontColor, setFontColor] = useState<string>("white");
  const [backgroundColor, setBackgroundColor] = useState<string>(PRIMARY_COLOR);
  const [showBackgroundColorPicker, setShowBackgroundColorPicker] =
    useState<boolean>(false);
  const [showFontColorPicker, setShowFontColorPicker] =
    useState<boolean>(false);
  const [selectedBorder, setSelectedBorder] = useState<ComponentBorderRadius>(
    ComponentBorderRadius.SQUARE
  );
  const [shadowStyle, setShadowStyle] = useState<ComponentShadowStyle>(
    ComponentShadowStyle.NONE
  );

  const clearStates = () => {
    setMessageFieldError(undefined);
    setUrlFieldError(undefined);
    setDateTimeFieldError(undefined);
    setMessage("");
    setFontColor("black");
    setBackgroundColor(PRIMARY_COLOR);
    setUrl("");
    setLaunchDate(defaultLaunchDate);
    setLaunchTime(defaultLaunchDate);
  };

  const onCreateLaunch = () => {
    setMessageFieldError(undefined);
    setUrlFieldError(undefined);
    setDateTimeFieldError(undefined);

    if (!pageId) return;

    if (message.length < 1) {
      setMessageFieldError(strings.requiredField);
      return;
    }

    const time = new Date(launchTime);
    const hour = time.getHours();
    const minute = time.getMinutes();
    const second = time.getSeconds();
    let launch = moment(launchDate).hour(hour).minute(minute).second(second);

    if (launch <= moment()) {
      setDateTimeFieldError(strings.launchDateTimeBeforeToday);
      return;
    }

    const newComponent: IUserComponent = {
      text: message,
      url: url,
      style: {
        backgroundColor,
        color: fontColor,
        borderRadius: selectedBorder.toString() + "px",
        boxShadow: shadowStyle,
      },
      visible: true,
      clicks: 0,
      layout: {
        rows: RENDERED_PAGE_LAUNCH_COMPONENT_ROWS,
        columns: 2,
      },
      launchDate: launch.toISOString(),
      type: ComponentType.Launch,
      iconDetails: undefined,
    };
    dispatch(addMiddleComponentInPage(newComponent, pageId));
    onUpdatePage?.();
    clearStates();
    handleClose();
  };

  const handleLaunchDate = (newDate: any) => {
    setLaunchDate(moment(newDate).toISOString());
  };

  const handleLaunchTime = (newDate: any) => {
    setLaunchTime(moment(newDate).toISOString());
  };

  const handleChangeBackgroundColorComplete = (color: any) => {
    setBackgroundColor(color);
    setShowBackgroundColorPicker(false);
  };

  const handleChangeFontColorComplete = (color: any) => {
    setFontColor(color);
    setShowFontColorPicker(false);
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
      <DialogTitle>{strings.tools.launch.name}</DialogTitle>
      <DialogContent>
        <Grid container direction="column" wrap="nowrap">
          <DescriptionText>
            {strings.launchComponentInstructions}.
          </DescriptionText>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <MobileDatePicker
                label={strings.date}
                inputFormat="DD/MM/yyyy"
                value={moment(launchDate)}
                onChange={handleLaunchDate}
                renderInput={(params: any) => (
                  <TextField
                    error={!!dateTimeFieldError}
                    helperText={dateTimeFieldError || ""}
                    fullWidth
                    {...params}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TimePicker
                label={strings.time}
                ampm={false}
                value={moment(launchTime).toDate()}
                onChange={handleLaunchTime}
                renderInput={(params: any) => (
                  <TextField
                    error={dateTimeFieldError !== undefined}
                    helperText={dateTimeFieldError || ""}
                    fullWidth
                    {...params}
                  />
                )}
              />
            </Grid>
          </Grid>
          <Grid container style={{ paddingTop: "24px" }}>
            <TextField
              error={!!messageFieldError}
              helperText={messageFieldError || ""}
              autoFocus
              label={strings.launchMessageLabel}
              placeholder={strings.launchMessageExample}
              type="text"
              fullWidth
              variant="outlined"
              onChange={(e: any) => {
                setMessageFieldError("");
                setMessage(e.target.value);
              }}
              value={message}
              sx={{
                minWidth: "100px",
              }}
            />
          </Grid>
          <Grid container style={{ paddingTop: "24px" }}>
            <TextField
              error={!!urlFieldError}
              helperText={urlFieldError || ""}
              autoFocus
              label={strings.url}
              placeholder={strings.webSiteExample}
              type="text"
              fullWidth
              variant="outlined"
              onChange={(e: any) => {
                setUrlFieldError("");
                setUrl(e.target.value);
              }}
              value={url}
              sx={{
                minWidth: "100px",
              }}
            />
          </Grid>
          <Grid container pt="16px">
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
                      setShowBackgroundColorPicker(!showBackgroundColorPicker);
                    }}
                  >
                    <BackgroundColorIcon
                      bucketColor={LIGHT_GREY}
                      selectedColor={backgroundColor}
                    />
                  </IconButton>
                  {showBackgroundColorPicker && (
                    <ColorPicker
                      initialColor={backgroundColor}
                      onChooseColor={handleChangeBackgroundColorComplete}
                      onCancel={() => setShowBackgroundColorPicker(false)}
                    />
                  )}
                </Grid>
              </CustomTooltip>
            </Grid>
            <Grid item pr="6px">
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
                    sx={{ padding: "11px" }}
                  >
                    <FontColorIcon
                      bucketColor={LIGHT_GREY}
                      selectedColor={fontColor}
                    />
                  </IconButton>
                  {showFontColorPicker && (
                    <ColorPicker
                      initialColor={fontColor}
                      onChooseColor={handleChangeFontColorComplete}
                      onCancel={() => setShowFontColorPicker(false)}
                    />
                  )}
                </Grid>
              </CustomTooltip>
            </Grid>
            <Grid item pr="16px">
              <TextField
                select
                label={strings.borders}
                variant="outlined"
                onChange={(e: any) => {
                  setSelectedBorder(e.target.value as ComponentBorderRadius);
                }}
                value={selectedBorder}
                sx={{ minWidth: "100px" }}
              >
                {Object.values(ComponentBorderRadius)
                  .filter((v) => !isNaN(Number(v)))
                  .map((border: string | ComponentBorderRadius) => {
                    return (
                      <MenuItem
                        value={border as ComponentBorderRadius}
                        key={border}
                      >
                        {border}
                      </MenuItem>
                    );
                  })}
              </TextField>
            </Grid>
            <Grid item>
              <TextField
                select
                label={strings.shadow}
                variant="outlined"
                onChange={(e: any) => {
                  setShadowStyle(e.target.value as ComponentShadowStyle);
                }}
                value={shadowStyle}
                sx={{ minWidth: "100px" }}
              >
                {Object.values(ComponentShadowStyle).map(
                  (shadow: string | ComponentShadowStyle) => {
                    return (
                      <MenuItem
                        value={shadow as ComponentShadowStyle}
                        key={shadow}
                      >
                        {translateShadowStyleEnum(
                          shadow as ComponentShadowStyle
                        )}
                      </MenuItem>
                    );
                  }
                )}
              </TextField>
            </Grid>
          </Grid>
          <Grid item height={RENDERED_PAGE_COMPONENT_HEIGHT * 3} mt="32px">
            <LaunchComponent
              component={{
                clicks: 0,
                layout: {
                  columns: 2,
                  rows: 2,
                },
                type: ComponentType.Launch,
                visible: true,
                style: {
                  boxShadow: shadowStyle,
                  borderRadius: String(selectedBorder) + "px",
                  backgroundColor,
                  color: fontColor,
                },
                launchDate,
              }}
              isPagePreview={false}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>{strings.back}</Button>
        <Button
          onClick={() => {
            onCreateLaunch();
          }}
        >
          {strings.create}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LaunchDialog;
