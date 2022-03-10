import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import strings from "../../../localization";
import { Check as CheckIcon } from "@mui/icons-material";
import { Dropzone, DropzoneFileReady } from "./styles";
import { MAXIMUM_FILE_SIZE } from "../../../constants";
import { showErrorToast } from "./../../../utils/toast/index";

interface IProps {
  openChooseFileDialog: boolean;
  setOpenChooseFileDialog: any;
  chosenImage: any;
  setChosenImage: any;
  acceptedFiles?: string;
  submitDialog?: any;
  cancelDialog?: any;
}

const ChooseFileDialog = ({
  openChooseFileDialog,
  setOpenChooseFileDialog,
  chosenImage,
  setChosenImage,
  acceptedFiles,
  submitDialog,
  cancelDialog,
}: IProps) => {
  const theme = useTheme();
  const isSmallerThanSM = useMediaQuery(theme.breakpoints.down("sm"));

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      console.log("file.size: " + file.size);
      const actualSizeInMB = file.size / 1000;

      if (actualSizeInMB > MAXIMUM_FILE_SIZE) {
        showErrorToast(
          strings.maximumFileSizeOf + " " + MAXIMUM_FILE_SIZE + "MB"
        );
        return;
      }
    }
    setChosenImage(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedFiles,
  });

  const showDropzoneText = () => {
    if (isDragActive) return <p>{strings.dropYourImageHere}</p>;
    else
      return (
        <p>
          {strings.dragAndDropYourImage}
          <br />
          {strings.or}
          <br />
          {strings.clickToSearchIt.toLowerCase()}.
          <br />
          <br />
          <br />
          {strings.maximumFileSizeOf}
          <br />
          {MAXIMUM_FILE_SIZE + "MB"}
        </p>
      );
  };
  return (
    <Dialog
      open={openChooseFileDialog}
      onClose={() => {
        setOpenChooseFileDialog(false);
      }}
      fullWidth
      fullScreen={isSmallerThanSM}
      maxWidth="sm"
      style={{ minWidth: "300px" }}
    >
      <DialogTitle>{strings.chooseFile}</DialogTitle>
      <DialogContent>
        {!chosenImage ? (
          <Dropzone container {...getRootProps()}>
            <input {...getInputProps()} />
            {showDropzoneText()}
          </Dropzone>
        ) : (
          <>
            <DropzoneFileReady
              container
              alignItems="center"
              justifyContent="center"
            >
              <CheckIcon fontSize="medium" />
              <span style={{ color: "black" }}>
                {strings.fileReadyToUpload}
              </span>
            </DropzoneFileReady>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={cancelDialog}>{strings.back}</Button>
        <Button onClick={submitDialog}>{strings.send}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ChooseFileDialog;
