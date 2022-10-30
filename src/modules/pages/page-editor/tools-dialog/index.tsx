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
import strings from "../../../../localization";
import { v4 as uuidv4 } from "uuid";
import DialogActions from "@mui/material/DialogActions/DialogActions";
import { Icon } from "@iconify/react";

interface ITool {
  label: string;
  iconifyId: string;
  handleClick: () => void;
}

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
  handleOpenCountersDialog: () => void;
  handleClose: () => void;
  open: boolean;
}

const ToolsDialog = ({
  open,
  handleClose,
  isSmallerThan600,
  handleOpenComponentDialog,
  handleOpenIconsDialog,
  handleOpenVideoDialog,
  handleOpenLaunchDialog,
  handleOpenMapDialog,
  handleOpenSpotifyDialog,
  handleOpenProgressBarDialog,
  handleOpenCountersDialog,
}: IToolsDialogProps) => {
  const theme = useTheme();
  const isSmallerThanSM = useMediaQuery(theme.breakpoints.down("sm"));

  const ToolButton = ({ tool }: { tool: ITool }) => {
    return (
      <Grid item xs={3} py="16px">
        <Grid container item direction="column">
          <ToolbarButton
            onClick={() => {
              tool.handleClick();
              handleClose();
            }}
          >
            <Icon icon={tool.iconifyId} />

            <ToolbarIconText>{tool.label}</ToolbarIconText>
          </ToolbarButton>
        </Grid>
      </Grid>
    );
  };

  const tools: ITool[] = [
    {
      label: strings.tools.button.name,
      iconifyId: "mdi:gesture-tap-button",
      handleClick: handleOpenComponentDialog,
    },
    {
      label: strings.tools.icon.name,
      iconifyId: "fluent:emoji-sparkle-16-regular",
      handleClick: handleOpenIconsDialog,
    },
    {
      label: strings.tools.video.name,
      iconifyId: "akar-icons:youtube-fill",
      handleClick: handleOpenVideoDialog,
    },
    {
      label: strings.tools.launch.name,
      iconifyId: "ic:round-rocket-launch",
      handleClick: handleOpenLaunchDialog,
    },
    {
      label: strings.tools.map.name,
      iconifyId: "clarity:map-solid",
      handleClick: handleOpenMapDialog,
    },
    {
      label: strings.tools.spotify.name,
      iconifyId: "akar-icons:spotify-fill",
      handleClick: handleOpenSpotifyDialog,
    },
    {
      label: strings.tools.progressBar.name,
      iconifyId: "pajamas:progress",
      handleClick: handleOpenProgressBarDialog,
    },
    {
      label: strings.tools.counters.name,
      iconifyId: "fluent:number-row-24-regular",
      handleClick: handleOpenCountersDialog,
    },
  ];

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
          {tools.map((tool: ITool) => (
            <ToolButton tool={tool} key={uuidv4()} />
          ))}
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
