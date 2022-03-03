import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  useMediaQuery,
} from "@mui/material";
import strings from "../../../../localization/index";
import { DescriptionText } from "./styles";
import theme from "../../../../theme";
import { useDispatch } from "react-redux";
import { ComponentType, IUserComponent } from "../../../../store/user/types";
import { addMiddleComponentInPage } from "../../../../store/user/actions";
import { v4 as uuidv4 } from "uuid";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import TimePicker from "@mui/lab/TimePicker";
import moment from "moment";
import { RENDERED_PAGE_LAUNCH_COMPONENT_ROWS } from "../../../constants";

interface IIconsDialogProps {
  pageId?: string;
  open: boolean;
  handleClose: any;
}

const LaunchDialog = ({ pageId, open, handleClose }: IIconsDialogProps) => {
  const defaultLaunchDate = moment().toISOString();

  const dispatch = useDispatch();
  const isSmallerThanSM = useMediaQuery(theme.breakpoints.down("sm"));

  const [message, setMessage] = useState<string>("");
  const [messageFieldError, setMessageFieldError] = useState<string>();
  const [url, setUrl] = useState<string>("");
  const [urlFieldError, setUrlFieldError] = useState<string>();
  const [launchDate, setLaunchDate] = useState<string>(defaultLaunchDate);
  const [dateTimeFieldError, setDateTimeFieldError] = useState<string>();
  const [launchTime, setLaunchTime] = useState<string>(defaultLaunchDate);

  const clearStates = () => {
    setMessageFieldError(undefined);
    setUrlFieldError(undefined);
    setDateTimeFieldError(undefined);
    setMessage("");
    setUrl("");
    setLaunchDate(defaultLaunchDate);
    setLaunchTime(defaultLaunchDate);
  };

  const onAddVideo = () => {
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
      _id: uuidv4(),
      text: message,
      url,
      style: undefined,
      visible: true,
      clicks: 0,
      layout: {
        rows: RENDERED_PAGE_LAUNCH_COMPONENT_ROWS,
        columns: 2,
      },
      launchDate: launch.toISOString(),
      type: ComponentType.Launch,
      mediaUrl: message,
      iconDetails: undefined,
    };
    dispatch(addMiddleComponentInPage(newComponent, pageId));
    clearStates();
    handleClose();
  };

  const handleLaunchDate = (newDate: any) => {
    setLaunchDate(moment(newDate).toISOString());
  };

  const handleLaunchTime = (newDate: any) => {
    setLaunchTime(moment(newDate).toISOString());
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
      <DialogTitle>{strings.addLaunch}</DialogTitle>
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
                renderInput={(params) => (
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
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>{strings.back}</Button>
        <Button
          onClick={() => {
            onAddVideo();
          }}
        >
          {strings.add}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LaunchDialog;
