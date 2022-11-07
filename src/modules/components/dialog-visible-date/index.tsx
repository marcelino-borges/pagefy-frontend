import React, { useState } from "react";
import moment from "moment";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import TimePicker from "@mui/lab/TimePicker";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import strings from "../../../localization";
import { DialogInstructions } from "./styles";

interface IDialogVisibleDateProps {
  open: boolean;
  onClose: () => void;
  setDateTime: (dateTime: string) => void;
}

const DialogVisibleDate = ({
  open,
  onClose,
  setDateTime,
}: IDialogVisibleDateProps) => {
  const theme = useTheme();
  const isSmallerThanSM = useMediaQuery(theme.breakpoints.down("sm"));
  const isSmallerThanXM = useMediaQuery(theme.breakpoints.down("xm"));
  const defaultVisibleDate = moment().toISOString();

  const [visibleDate, setVisibleDate] = useState<string>(defaultVisibleDate);
  const [visibleTime, setVisibleTime] = useState<string>(defaultVisibleDate);

  const clearStates = () => {
    setVisibleDate(defaultVisibleDate);
  };

  const handleVisibleDate = (newDate: any) => {
    setVisibleDate(moment(newDate).toISOString());
  };

  const handleVisibleTime = (newDate: any) => {
    setVisibleTime(moment(newDate).toISOString());
  };

  const submitVisibleDate = () => {
    const time = new Date(visibleTime);
    const hour = time.getHours();
    const minute = time.getMinutes();
    const second = time.getSeconds();

    let visibleDateTime = moment(visibleDate)
      .hour(hour)
      .minute(minute)
      .second(second);

    setDateTime(visibleDateTime.toISOString());
    onClose();
    clearStates();
  };

  return (
    <Dialog
      open={open}
      onClose={() => {}}
      fullWidth
      fullScreen={isSmallerThanSM}
      maxWidth="sm"
      style={{ minWidth: "300px" }}
    >
      <DialogTitle>{strings.scheduleComponentVisibleDate}</DialogTitle>
      <DialogContent
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Grid container direction="column">
          <DialogInstructions>
            {strings.scheduleComponentVisibleDateInstructions}
          </DialogInstructions>
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
                  value={moment(visibleDate)}
                  onChange={handleVisibleDate}
                  renderInput={(params: any) => (
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
                  value={moment(visibleDate)}
                  onChange={handleVisibleDate}
                  renderInput={(params: any) => (
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
                label={strings.time}
                ampm={false}
                value={moment(visibleTime).toDate()}
                onChange={handleVisibleTime}
                renderInput={(params: any) => (
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
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            clearStates();
            onClose();
          }}
        >
          {strings.back}
        </Button>
        <Button
          onClick={() => {
            submitVisibleDate();
          }}
        >
          {strings.save}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default React.memo(DialogVisibleDate);
