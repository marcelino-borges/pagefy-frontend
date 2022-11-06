import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import strings from "../../../../../localization";
import { useForm } from "react-hook-form";

interface IWhatsappDialogProps {
  open: boolean;
  handleClose: any;
  onMountUrl: (url: string) => void;
}

const WhatsappDialog = ({
  open,
  handleClose,
  onMountUrl,
}: IWhatsappDialogProps) => {
  const theme = useTheme();
  const isSmallerThanSM = useMediaQuery(theme.breakpoints.down("sm"));

  const { handleSubmit } = useForm();

  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [phoneNumberError, setPhoneNumberError] = useState<string>("");
  const [messageError, setMessageError] = useState<string>("");

  const onSubmitUrl = () => {};

  const clearStates = () => {
    setPhoneNumberError("");
    setMessageError("");
    setPhoneNumber("");
  };

  const onSubmit = () => {
    // dispatch(addMiddleComponentInPage(newComponent, pageId));
    const templateUrl = "https://wa.me/{{phoneNumber}}?text={{message}}";
    const mountedUrl = String(templateUrl)
      .replace("{{phoneNumber}}", phoneNumber)
      .replace("{{message}}", encodeURIComponent(message));
    onMountUrl(mountedUrl);
    clearStates();
    handleClose();
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
      <DialogTitle>{strings.tools.whatsapp.name}</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmitUrl)}>
          <TextField
            error={!!phoneNumberError && phoneNumberError.length > 0}
            helperText={
              !!phoneNumberError && phoneNumberError.length > 0
                ? phoneNumberError
                : ""
            }
            autoFocus
            required
            placeholder="+5521999999999"
            type="text"
            label={strings.phoneNumber}
            fullWidth
            variant="outlined"
            onChange={(e: any) => {
              setPhoneNumberError("");
              const input: string = e.target.value;
              setPhoneNumber(input);
            }}
            value={phoneNumber}
            sx={{
              minWidth: "100px",
              mt: "24px",
            }}
          />
          <TextField
            fullWidth
            autoFocus
            required
            multiline
            maxRows={6}
            minRows={2}
            error={!!messageError && messageError.length > 0}
            helperText={
              !!messageError && messageError.length > 0 ? messageError : ""
            }
            placeholder={strings.messageExample}
            type="text"
            label={strings.message}
            variant="outlined"
            onChange={(e: any) => {
              setMessageError("");
              const input: string = e.target.value;
              setMessage(input);
            }}
            value={message}
            sx={{
              minWidth: "100px",
              mt: "24px",
              mb: "30px",
            }}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>{strings.back}</Button>
        <Button
          onClick={() => {
            onSubmit();
          }}
        >
          {strings.mountURL}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default WhatsappDialog;
