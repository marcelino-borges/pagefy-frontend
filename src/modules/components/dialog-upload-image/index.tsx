import { useCallback } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useMediaQuery,
  useTheme,
  Grid,
} from "@mui/material";
import { useDropzone } from "react-dropzone";
import strings from "../../../localization";
import { Check as CheckIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { APP_ENVIROMENT, MAXIMUM_FILE_SIZE } from "../../../constants";
import { showErrorToast } from "../../../utils/toast/index";
import { ACESSIBILITY_GREEN, MEDIUM_GREY } from "../../../styles/colors";
import UserGallery from "../gallery-user";
import { Dropzone, DropzoneFileReady, Text } from "./styles";

interface IUploadImageDialogProps {
  openChooseFileDialog: boolean;
  setOpenChooseFileDialog: any;
  chosenImage: any;
  setChosenImage: any;
  acceptedFiles?: string;
  submitDialog?: (imageUrl?: string) => void;
  cancelDialog?: any;
}

const UploadImageDialog = ({
  openChooseFileDialog,
  setOpenChooseFileDialog,
  chosenImage,
  setChosenImage,
  acceptedFiles,
  submitDialog,
  cancelDialog,
}: IUploadImageDialogProps) => {
  const theme = useTheme();
  const isSmallerThanSM = useMediaQuery(theme.breakpoints.down("sm"));

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    let hasError = false;
    if (file) {
      const actualSizeInMB = file.size / 1000000;

      if (actualSizeInMB > MAXIMUM_FILE_SIZE) {
        showErrorToast(
          strings.maximumFileSizeOf + " " + MAXIMUM_FILE_SIZE + "MB"
        );
        hasError = true;
      }
    }

    if (!hasError) setChosenImage(file);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      maxWidth="md"
      style={{ minWidth: "300px" }}
    >
      <DialogTitle>{strings.chooseImage}</DialogTitle>
      <DialogContent>
        <>
          {APP_ENVIROMENT === "DEV" && (
            <UserGallery
              onClickImage={(imageUrl: string) => {
                if (submitDialog) submitDialog(imageUrl);
              }}
            />
          )}
          <Text>{strings.orUploadANewFile}</Text>
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
                <Grid container direction="column" alignItems="center">
                  {chosenImage && (
                    <Grid container item justifyContent="center">
                      <img
                        src={URL.createObjectURL(chosenImage)}
                        alt="Uploaded file"
                        style={{ width: "100%" }}
                      />
                    </Grid>
                  )}
                  <Grid container alignItems="flex-start" direction="column">
                    <Grid
                      item
                      style={{ color: "black" }}
                      color={ACESSIBILITY_GREEN + " !important"}
                    >
                      <CheckIcon
                        color="inherit"
                        fontSize="medium"
                        style={{
                          transform: "translateY(5px)",
                          marginRight: "4px",
                        }}
                      />
                      {strings.fileReadyToUpload}
                    </Grid>
                    <Grid
                      item
                      color={MEDIUM_GREY}
                      style={{ cursor: "pointer" }}
                      onClick={() => setChosenImage(undefined)}
                    >
                      <DeleteIcon
                        style={{
                          transform: "translateY(5px)",
                          marginRight: "4px",
                        }}
                      />
                      {strings.remove}
                    </Grid>
                  </Grid>
                </Grid>
              </DropzoneFileReady>
            </>
          )}
        </>
      </DialogContent>
      <DialogActions>
        <Button onClick={cancelDialog}>{strings.back}</Button>
        <Button
          onClick={() => {
            if (submitDialog) submitDialog();
          }}
        >
          {strings.send}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UploadImageDialog;
