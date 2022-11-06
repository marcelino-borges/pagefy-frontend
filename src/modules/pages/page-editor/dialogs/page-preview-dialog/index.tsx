import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from "@mui/material";
import strings from "../../../../../localization";
import PageRenderer from "../../../../components/page-renderer";
import { clearPageBeingRendered } from "../../../../../store/page-renderer/actions";
import { IUserPage } from "../../../../../store/user-pages/types";

interface IPreviewPageDialogProps {
  open: boolean;
  onClose: () => void;
  page: IUserPage;
}

const PagePreviewDialog = ({
  open,
  onClose,
  page,
}: IPreviewPageDialogProps) => {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearPageBeingRendered());
    };
  }, [dispatch]);

  return (
    <Dialog
      fullWidth
      fullScreen
      open={open}
      onClose={onClose}
      style={{ minWidth: "300px" }}
    >
      <DialogTitle>{strings.pagePreview}</DialogTitle>
      <DialogContent style={{ backgroundImage: page.style?.backgroundImage }}>
        <Grid container justifyContent="center">
          <PageRenderer pageToRender={page} isPagePreview />
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{strings.back}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default PagePreviewDialog;
