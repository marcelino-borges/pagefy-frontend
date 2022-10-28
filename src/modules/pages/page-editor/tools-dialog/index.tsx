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
  Crop169 as CreateButtonIcon,
  InsertEmoticon as InsertIconIcon,
  YouTube as YouTubeIcon,
  RocketLaunch as LaunchIcon,
  Map as MapIcon,
} from "@mui/icons-material";
import strings from "../../../../localization";
import { v4 as uuidv4 } from "uuid";
import DialogActions from "@mui/material/DialogActions/DialogActions";
import { Icon } from "@iconify/react";

const BREAK_TOOLBAR_TEXT = true;
const BREAK_POINT_TOOLBAR_TEXT = 12;

interface IToolsDialogProps {
  isSmallerThan600: boolean;
  handleOpenComponentDialog: () => void;
  isSmallerThan370: boolean;
  handleOpenIconsDialog: () => void;
  handleOpenVideoDialog: () => void;
  handleOpenLaunchDialog: () => void;
  handleOpenMapDialog: () => void;
  handleOpenSpotifyDialog: () => void;
  handleOpenProgressBarDialog: () => void;
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
  handleOpenMapDialog,
  handleOpenSpotifyDialog,
  handleOpenProgressBarDialog,
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
          justifyContent="flex-start"
          alignItems="flex-start"
          paddingTop={isSmallerThan600 ? "24px" : "0"}
        >
          <Grid item xs={3} py="16px">
            <Grid container item direction="column">
              <ToolbarButton
                onClick={() => {
                  handleOpenComponentDialog();
                  handleClose();
                }}
              >
                <CreateButtonIcon />

                {!isSmallerThan370 && (
                  <ToolbarIconText>
                    {BREAK_TOOLBAR_TEXT &&
                    strings.tools.button.name.length >
                      BREAK_POINT_TOOLBAR_TEXT &&
                    strings.tools.button.name.split(" ").length > 1 ? (
                      strings.tools.button.name
                        .split(" ")
                        .map((word: string) => {
                          return (
                            <span key={uuidv4()}>
                              {word} <br />
                            </span>
                          );
                        })
                    ) : (
                      <>{strings.tools.button.name}</>
                    )}
                  </ToolbarIconText>
                )}
              </ToolbarButton>
            </Grid>
          </Grid>

          <Grid item xs={3} py="16px">
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
                    strings.tools.icon.name.length > BREAK_POINT_TOOLBAR_TEXT &&
                    strings.tools.icon.name.split(" ").length > 1 ? (
                      strings.tools.icon.name.split(" ").map((word: string) => {
                        return (
                          <span key={uuidv4()}>
                            {word} <br />
                          </span>
                        );
                      })
                    ) : (
                      <>{strings.tools.icon.name}</>
                    )}
                  </ToolbarIconText>
                )}
              </ToolbarButton>
            </Grid>
          </Grid>

          <Grid item xs={3} py="16px">
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
                    strings.tools.video.name.length >
                      BREAK_POINT_TOOLBAR_TEXT &&
                    strings.tools.video.name.split(" ").length > 1 ? (
                      strings.tools.video.name
                        .split(" ")
                        .map((word: string) => {
                          return (
                            <span key={uuidv4()}>
                              {word} <br />
                            </span>
                          );
                        })
                    ) : (
                      <>{strings.tools.video.name}</>
                    )}
                  </ToolbarIconText>
                )}
              </ToolbarButton>
            </Grid>
          </Grid>

          <Grid item xs={3} py="16px">
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
                    strings.tools.launch.name.length >
                      BREAK_POINT_TOOLBAR_TEXT &&
                    strings.tools.launch.name.split(" ").length > 1 ? (
                      strings.tools.launch.name
                        .split(" ")
                        .map((word: string) => {
                          return (
                            <span key={uuidv4()}>
                              {word} <br />
                            </span>
                          );
                        })
                    ) : (
                      <>{strings.tools.launch.name}</>
                    )}
                  </ToolbarIconText>
                )}
              </ToolbarButton>
            </Grid>
          </Grid>

          <Grid item xs={3} py="16px">
            <Grid container item direction="column" alignItems="center">
              <ToolbarButton
                onClick={() => {
                  handleOpenMapDialog();
                  handleClose();
                }}
              >
                <MapIcon />

                {!isSmallerThan370 && (
                  <ToolbarIconText>
                    {BREAK_TOOLBAR_TEXT &&
                    strings.tools.map.name.length > BREAK_POINT_TOOLBAR_TEXT &&
                    strings.tools.map.name.split(" ").length > 1 ? (
                      strings.tools.map.name.split(" ").map((word: string) => {
                        return (
                          <span key={uuidv4()}>
                            {word} <br />
                          </span>
                        );
                      })
                    ) : (
                      <>{strings.tools.map.name}</>
                    )}
                  </ToolbarIconText>
                )}
              </ToolbarButton>
            </Grid>
          </Grid>

          <Grid item xs={3} py="16px">
            <Grid container item direction="column" alignItems="center">
              <ToolbarButton
                onClick={() => {
                  handleOpenSpotifyDialog();
                  handleClose();
                }}
              >
                <Icon icon="akar-icons:spotify-fill" />

                {!isSmallerThan370 && (
                  <ToolbarIconText>
                    {BREAK_TOOLBAR_TEXT &&
                    strings.tools.spotify.name.length >
                      BREAK_POINT_TOOLBAR_TEXT &&
                    strings.tools.spotify.name.split(" ").length > 1 ? (
                      strings.tools.spotify.name
                        .split(" ")
                        .map((word: string) => {
                          return (
                            <span key={uuidv4()}>
                              {word} <br />
                            </span>
                          );
                        })
                    ) : (
                      <>{strings.tools.spotify.name}</>
                    )}
                  </ToolbarIconText>
                )}
              </ToolbarButton>
            </Grid>
          </Grid>

          <Grid item xs={3} py="16px">
            <Grid container item direction="column" alignItems="center">
              <ToolbarButton
                onClick={() => {
                  handleOpenProgressBarDialog();
                  handleClose();
                }}
              >
                <Icon icon="pajamas:progress" />

                {!isSmallerThan370 && (
                  <ToolbarIconText>
                    {BREAK_TOOLBAR_TEXT &&
                    strings.tools.progressBar.name.length >
                      BREAK_POINT_TOOLBAR_TEXT &&
                    strings.tools.progressBar.name.split(" ").length > 1 ? (
                      strings.tools.progressBar.name
                        .split(" ")
                        .map((word: string) => {
                          return (
                            <span key={uuidv4()}>
                              {word} <br />
                            </span>
                          );
                        })
                    ) : (
                      <>{strings.tools.progressBar.name}</>
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
