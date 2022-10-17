import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  TextField,
  useMediaQuery,
} from "@mui/material";
import { Clear as ClearIcon } from "@mui/icons-material";
import strings from "./../../../../localization/index";
import { DescriptionText } from "./styles";
import { useForm } from "react-hook-form";
import { isUrlValid } from "../../../../utils/validators/url";
import theme from "../../../../theme";
import { useDispatch } from "react-redux";
import YoutubeEmbed from "./../../../components/youtube-embed/index";
import {
  ComponentType,
  IUserComponent,
} from "../../../../store/user-pages/types";
import { addMiddleComponentInPage } from "../../../../store/user-pages/actions";
import { getYoutubeIdFromUrl } from "../../../../utils";

interface IIconsDialogProps {
  pageId?: string;
  open: boolean;
  handleClose: any;
}

const MIN_VIDEO_ID_LENGTH = 6;

const VideoDialog = ({ pageId, open, handleClose }: IIconsDialogProps) => {
  const dispatch = useDispatch();
  const isSmallerThanSM = useMediaQuery(theme.breakpoints.down("sm"));

  const { handleSubmit, register } = useForm();

  const [urlError, setUrlError] = useState<string>("");
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [videoId, setVideoId] = useState<string>("");

  const onSubmitUrl = () => {};

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const clearStates = () => {
    setUrlError("");
    setVideoUrl("");
    setVideoId("");
  };

  const onAddVideo = () => {
    setUrlError("");

    if (!pageId) return;

    if (
      videoUrl.length < MIN_VIDEO_ID_LENGTH ||
      !isUrlValid(videoUrl) ||
      !videoId ||
      videoId.length < MIN_VIDEO_ID_LENGTH
    ) {
      setUrlError(strings.invalidUrl);
      return;
    }

    const newComponent: IUserComponent = {
      text: undefined,
      url: videoUrl,
      style: undefined,
      visible: true,
      clicks: 0,
      layout: {
        rows: 2,
        columns: 2,
      },
      type: ComponentType.Video,
      mediaUrl: videoUrl,
      iconDetails: undefined,
    };
    dispatch(addMiddleComponentInPage(newComponent, pageId));
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
      <DialogTitle>{strings.addVideo}</DialogTitle>
      <DialogContent>
        <DescriptionText>
          {strings.youtubeIdInstructions}. {strings.videoComponentDescription}.
        </DescriptionText>

        <form onSubmit={handleSubmit(onSubmitUrl)}>
          <TextField
            {...register("url")}
            error={!!urlError && urlError.length > 0}
            helperText={!!urlError && urlError.length > 0 ? urlError : ""}
            autoFocus
            required
            placeholder={strings.youtubeUrlExample}
            type="text"
            label={strings.youtubeVideoId}
            fullWidth
            variant="outlined"
            onChange={(e: any) => {
              setVideoId("");
              setUrlError("");

              const input: string = e.target.value;
              const id = getYoutubeIdFromUrl(input);

              if (id) {
                setVideoId(id);
              }

              setVideoUrl(input);
            }}
            value={videoUrl}
            sx={{
              minWidth: "100px",
              transform: "translateY(-3px)",
              marginBottom: "24px",
            }}
            InputProps={{
              endAdornment: (
                <>
                  {videoUrl.length > 0 && (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={clearStates}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        <ClearIcon fontSize="medium" color="disabled" />
                      </IconButton>
                    </InputAdornment>
                  )}
                </>
              ),
            }}
          />
        </form>

        {videoId && videoId.length >= MIN_VIDEO_ID_LENGTH && (
          <YoutubeEmbed embedId={videoId} />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>{strings.back}</Button>
        <Button
          onClick={() => {
            onAddVideo();
          }}
        >
          {strings.add}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default VideoDialog;
