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
import { DescriptionText } from "./styles";
import { isUrlValid } from "../../../../../utils/validators/url";
import { useDispatch } from "react-redux";
import {
  ComponentType,
  IUserComponent,
} from "../../../../../store/user-pages/types";
import { addMiddleComponentInPage } from "../../../../../store/user-pages/actions";
import SpotifyEmbed from "./../../../../components/spotify-embed/index";

interface ISpotifyDialogProps {
  pageId?: string;
  open: boolean;
  handleClose: () => void;
  onUpdatePage?: () => void;
}

const SpotifyDialog = ({
  pageId,
  open,
  handleClose,
  onUpdatePage,
}: ISpotifyDialogProps) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isSmallerThanSM = useMediaQuery(theme.breakpoints.down("sm"));

  const [urlError, setUrlError] = useState<string>("");
  const [labelError, setLabelError] = useState<string>("");
  const [label, setLabel] = useState<string>("");
  const [spotifyUrl, setSpotifyUrl] = useState<string>("");

  const clearStates = () => {
    setUrlError("");
    setLabelError("");
    setLabel("");
    setSpotifyUrl("");
  };

  const onCreatePlayer = () => {
    setUrlError("");
    setLabelError("");

    if (!pageId) return;

    if (!isUrlValid(spotifyUrl) || !spotifyUrl.includes("spotify.com")) {
      setUrlError(strings.invalidUrl);
      return;
    } else if (!label?.length) {
      setLabelError(strings.textInComponentRequired);
    }

    const newComponent: IUserComponent = {
      text: label,
      url: spotifyUrl,
      visible: true,
      clicks: 0,
      layout: {
        rows: 2,
        columns: 2,
      },
      type: ComponentType.Spotify,
    };
    dispatch(addMiddleComponentInPage(newComponent, pageId));
    onUpdatePage?.();
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
      <DialogTitle>{strings.tools.spotify.name}</DialogTitle>
      <DialogContent>
        <DescriptionText>{strings.spotifyInstructions}</DescriptionText>

        <TextField
          error={!!labelError && labelError.length > 0}
          helperText={!!labelError && labelError.length > 0 ? labelError : ""}
          autoFocus
          required
          type="text"
          label={strings.text}
          fullWidth
          variant="outlined"
          onChange={(e: any) => {
            setLabelError("");
            const input: string = e.target.value;
            setLabel(input);
          }}
          value={label}
          sx={{ marginBottom: "16px" }}
        />

        <TextField
          error={!!urlError && urlError.length > 0}
          helperText={!!urlError && urlError.length > 0 ? urlError : ""}
          autoFocus
          required
          placeholder={`https://open.spotify.com/playlist/3MwVBJHmk0zllR1axPoQaK?si=0818f4bd784f4b89`}
          type="text"
          label={strings.tools.spotify.textfieldSpotifyUrlLabel}
          fullWidth
          variant="outlined"
          onChange={(e: any) => {
            setUrlError("");
            const input: string = e.target.value;
            setSpotifyUrl(input);
          }}
          value={spotifyUrl}
          sx={{ marginBottom: "16px" }}
        />

        {spotifyUrl && <SpotifyEmbed url={spotifyUrl} />}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>{strings.back}</Button>
        <Button
          disabled={
            !spotifyUrl ||
            !isUrlValid(spotifyUrl) ||
            !spotifyUrl.includes("spotify.com")
          }
          onClick={() => {
            onCreatePlayer();
          }}
        >
          {strings.create}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SpotifyDialog;
