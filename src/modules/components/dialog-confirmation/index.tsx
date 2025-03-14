import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import strings from "../../../localization";

interface IDialogConfirmationProps {
  open: boolean;
  onClose: () => void;
  title: string;
  message: string;
  onConfirmCallback?: () => void;
  onRefuseCallback?: () => void;
  confirmText?: string;
  refuseText?: string;
}

const DialogConfirmation = ({
  open,
  onClose,
  onConfirmCallback,
  onRefuseCallback,
  title,
  message,
  confirmText,
  refuseText,
}: IDialogConfirmationProps) => (
  <Dialog
    open={open}
    onClose={onClose}
    fullWidth
    maxWidth="sm"
    style={{ minWidth: "300px" }}
  >
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>{message}</DialogContent>
    <DialogActions>
      <Button
        onClick={() => {
          if (onRefuseCallback) onRefuseCallback();
          onClose();
        }}
      >
        {refuseText || strings.no}
      </Button>
      <Button
        onClick={() => {
          if (onConfirmCallback) onConfirmCallback();
          onClose();
        }}
      >
        {confirmText || strings.yes}
      </Button>
    </DialogActions>
  </Dialog>
);

export default React.memo(DialogConfirmation);
