import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import strings from "../../../../localization";
import { IUserPage } from "../../../../store/user-pages/types";
import { useDispatch, useSelector } from "react-redux";
import { createUserPage } from "../../../../store/user-pages/actions";
import { IApplicationState } from "./../../../../store/index";

interface IProps {
  open: boolean;
  onClose: any;
  title: string;
}

const CreatePageDialog = ({ open, onClose, title }: IProps) => {
  const dispatch = useDispatch();
  const userId = useSelector(
    (state: IApplicationState) => state.user.profile?._id
  );

  const [errorPageNameField, setErrorPageNameField] = useState<string>();
  const [errorPageUrlField, setErrorPageUrlField] = useState<string>();
  const [pageName, setPageName] = useState<string>("");
  const [pageUrl, setPageUrl] = useState<string>("");

  const { handleSubmit, register } = useForm();

  const clearStates = () => {
    setPageName("");
    setPageUrl("");
    setErrorPageNameField(undefined);
    setErrorPageUrlField(undefined);
  };

  const onSubmit = () => {
    if (!userId) return;
    setErrorPageNameField(undefined);
    setErrorPageUrlField(undefined);
    let hasErrors = false;

    if (pageName.length < 1) {
      hasErrors = true;
      setErrorPageNameField(strings.requiredField);
    }
    if (pageUrl.length < 1) {
      hasErrors = true;
      setErrorPageUrlField(strings.requiredField);
    } else if (!pageUrl.match("^[/]?[a-z-]{3,}[a-z]$")) {
      hasErrors = true;
      setErrorPageUrlField(strings.pageUrlBadFormat);
    }

    if (hasErrors) {
      return;
    }

    let url = pageUrl;

    if (url[0] === "/") {
      url = pageUrl.slice(1, pageUrl.length);
    }

    const newPage: IUserPage = {
      name: pageName,
      userId,
      url,
      isPublic: false,
      views: 0,
      topComponents: [],
      middleComponents: [],
      bottomComponents: [],
    };

    dispatch(createUserPage(newPage));
    onClose();
    clearStates();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      style={{ minWidth: "300px" }}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container direction="column">
            <Grid item>
              <TextField
                {...register("pageName")}
                error={!!errorPageNameField}
                helperText={errorPageNameField}
                autoFocus
                required
                placeholder={strings.pageName}
                type="text"
                fullWidth
                variant="outlined"
                onChange={(e: any) => setPageName(e.target.value)}
                value={pageName}
                sx={{ marginTop: "16px" }}
              />
            </Grid>
            <Grid item>
              <TextField
                {...register("pageUrl")}
                error={!!errorPageUrlField}
                helperText={errorPageUrlField}
                autoFocus
                required
                placeholder={strings.pageUrlExample}
                type="text"
                fullWidth
                variant="outlined"
                onChange={(e: any) => setPageUrl(e.target.value)}
                value={pageUrl}
                sx={{ marginTop: "16px" }}
              />
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            clearStates();
            onClose();
          }}
        >
          {strings.cancel}
        </Button>
        <Button onClick={onSubmit}>{strings.create}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreatePageDialog;
