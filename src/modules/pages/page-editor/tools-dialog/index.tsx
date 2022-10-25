import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ToolbarButton, ToolbarIconText } from "../style";
import {
  Construction as CreateComponentIcon,
  InsertEmoticon as InsertIconIcon,
  YouTube as YouTubeIcon,
  RocketLaunch as LaunchIcon,
} from "@mui/icons-material";
import strings from "../../../../localization";
import { v4 as uuidv4 } from "uuid";
import DialogActions from "@mui/material/DialogActions/DialogActions";

const BREAK_TOOLBAR_TEXT = true;
const BREAK_POINT_TOOLBAR_TEXT = 12;

interface IToolsDialogProps {
  isSmallerThan600: boolean;
  handleOpenComponentDialog: () => void;
  isSmallerThan370: boolean;
  handleOpenIconsDialog: () => void;
  handleOpenVideoDialog: () => void;
  handleOpenLaunchDialog: () => void;
  handleClose: () => void;
  open: boolean;
}

const ToolsDialog = ({
  open,
  handleClose,
  isSmallerThan600,
  handleOpenComponentDialog,
  isSmallerThan370,
  handleOpenIconsDialog,
  handleOpenVideoDialog,
  handleOpenLaunchDialog,
}: IToolsDialogProps) => {
  const theme = useTheme();
  const isSmallerThanSM = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      fullScreen={isSmallerThanSM}
      maxWidth="sm"
    >
      <DialogTitle>{strings.chooseOneToCreate}</DialogTitle>
      <DialogContent>
        <Grid
          container
          item
          direction="row"
          justifyContent={isSmallerThan600 ? "space-evenly" : "center"}
          alignItems="center"
          paddingTop={isSmallerThan600 ? "24px" : "0"}
          my="32px"
          height="100%"
        >
          <Grid item xs={3}>
            <Grid container item direction="column" alignItems="center">
              <ToolbarButton
                onClick={() => {
                  handleOpenComponentDialog();
                  handleClose();
                }}
              >
                <CreateComponentIcon />

                {!isSmallerThan370 && (
                  <ToolbarIconText>
                    {BREAK_TOOLBAR_TEXT &&
                    strings.addLink.length > BREAK_POINT_TOOLBAR_TEXT &&
                    strings.addLink.split(" ").length > 1 ? (
                      strings.addLink.split(" ").map((word: string) => {
                        return (
                          <span key={uuidv4()}>
                            {word} <br />
                          </span>
                        );
                      })
                    ) : (
                      <>{strings.addLink}</>
                    )}
                  </ToolbarIconText>
                )}
              </ToolbarButton>
            </Grid>
          </Grid>

          <Grid item xs={3}>
            <Grid container item direction="column" alignItems="center">
              <ToolbarButton
                onClick={() => {
                  handleOpenIconsDialog();
                  handleClose();
                }}
              >
                <InsertIconIcon />

                {!isSmallerThan370 && (
                  <ToolbarIconText>
                    {BREAK_TOOLBAR_TEXT &&
                    strings.addIcon.length > BREAK_POINT_TOOLBAR_TEXT &&
                    strings.addIcon.split(" ").length > 1 ? (
                      strings.addIcon.split(" ").map((word: string) => {
                        return (
                          <span key={uuidv4()}>
                            {word} <br />
                          </span>
                        );
                      })
                    ) : (
                      <>{strings.addIcon}</>
                    )}
                  </ToolbarIconText>
                )}
              </ToolbarButton>
            </Grid>
          </Grid>

          <Grid item xs={3}>
            <Grid container item direction="column" alignItems="center">
              <ToolbarButton
                onClick={() => {
                  handleOpenVideoDialog();
                  handleClose();
                }}
              >
                <YouTubeIcon />

                {!isSmallerThan370 && (
                  <ToolbarIconText>
                    {BREAK_TOOLBAR_TEXT &&
                    strings.addVideo.length > BREAK_POINT_TOOLBAR_TEXT &&
                    strings.addVideo.split(" ").length > 1 ? (
                      strings.addVideo.split(" ").map((word: string) => {
                        return (
                          <span key={uuidv4()}>
                            {word} <br />
                          </span>
                        );
                      })
                    ) : (
                      <>{strings.addVideo}</>
                    )}
                  </ToolbarIconText>
                )}
              </ToolbarButton>
            </Grid>
          </Grid>

          <Grid item xs={3}>
            <Grid container item direction="column" alignItems="center">
              <ToolbarButton
                onClick={() => {
                  handleOpenLaunchDialog();
                  handleClose();
                }}
              >
                <LaunchIcon />

                {!isSmallerThan370 && (
                  <ToolbarIconText>
                    {BREAK_TOOLBAR_TEXT &&
                    strings.addLaunch.length > BREAK_POINT_TOOLBAR_TEXT &&
                    strings.addLaunch.split(" ").length > 1 ? (
                      strings.addLaunch.split(" ").map((word: string) => {
                        return (
                          <span key={uuidv4()}>
                            {word} <br />
                          </span>
                        );
                      })
                    ) : (
                      <>{strings.addLaunch}</>
                    )}
                  </ToolbarIconText>
                )}
              </ToolbarButton>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            handleClose();
          }}
        >
          {strings.back}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ToolsDialog;
