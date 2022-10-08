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
import { createPage } from "../../../../store/user-pages/actions";
import { IApplicationState } from "./../../../../store/index";
import { useNavigate } from "react-router-dom";
import routes from "../../../../routes/paths";
import { canCreatePage } from "../../../../utils/plan-enablements";

interface ICreatePageDialogProps {
  open: boolean;
  onClose: any;
  title: string;
}

const CreatePageDialog = ({ open, onClose, title }: ICreatePageDialogProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userProfile = useSelector(
    (state: IApplicationState) => state.user.profile
  );
  const userPagesLength = useSelector(
    (state: IApplicationState) => state.userPages.pages.length
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
    if (!canCreatePage(userProfile, userPagesLength) || !userProfile?._id)
      return;
    if (!userProfile) return;
    setErrorPageNameField(undefined);
    setErrorPageUrlField(undefined);
    let hasErrors = false;

    //Page name validation
    if (pageName.length < 1) {
      hasErrors = true;
      setErrorPageNameField(strings.requiredField);
    }

    //Page URL validation
    if (pageUrl.length < 1) {
      hasErrors = true;
      setErrorPageUrlField(strings.requiredField);
    } else if (!pageUrl.match("^[/]?[a-z-]{3,}[a-z]$")) {
      hasErrors = true;
      setErrorPageUrlField(strings.createPageError.pageUrlBadFormat);
    } else if (pageUrl.includes(" ")) {
      hasErrors = true;
      setErrorPageUrlField(strings.createPageError.cannotContainWhiteSpaces);
    }

    if (hasErrors) {
      return;
    }

    let url = pageUrl.trim();

    if (url[0] === "/") {
      url = pageUrl.slice(1, pageUrl.length);
    }

    const newPage: IUserPage = {
      name: pageName,
      userId: userProfile._id,
      url,
      isPublic: false,
      views: 0,
      topComponents: [],
      middleComponents: [],
      bottomComponents: [],
    };

    dispatch(
      createPage(
        newPage,
        (newPage: IUserPage) => {
          onClose();
          clearStates();
          if (!newPage._id) return;

          navigate(routes.page + "/" + newPage._id);
        },
        (errorMsg: string) => {
          console.log(errorMsg);
          setErrorPageUrlField(errorMsg);
        }
      )
    );
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
