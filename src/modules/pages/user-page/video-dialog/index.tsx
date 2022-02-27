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
  YOUTUBE_EMBED_URL_IDENTIFIER,
  YOUTUBE_FULL_URL_IDENTIFIER,
  YOUTUBE_SHORT_URL_IDENTIFIER,
} from "../../../constants";
import { ComponentType, IUserComponent } from "../../../../store/user/types";
import { addMiddleComponentInPage } from "../../../../store/user/actions";
import { v4 as uuidv4 } from "uuid";

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

  const getYoutubeIdByUrlIdentifier = (url: string, urlIdentifier: string) => {
    const identifierIndex = url.indexOf(urlIdentifier);
    const id = url.substring(
      identifierIndex + urlIdentifier.length,
      url.length
    );
    return id;
  };

  const getYoutubeIdFromUrl = (url: string) => {
    let id;
    if (url.includes(YOUTUBE_SHORT_URL_IDENTIFIER)) {
      id = getYoutubeIdByUrlIdentifier(url, YOUTUBE_SHORT_URL_IDENTIFIER);
    } else if (url.includes(YOUTUBE_FULL_URL_IDENTIFIER)) {
      id = getYoutubeIdByUrlIdentifier(url, YOUTUBE_FULL_URL_IDENTIFIER);
    } else if (url.includes(YOUTUBE_EMBED_URL_IDENTIFIER)) {
      id = getYoutubeIdByUrlIdentifier(url, YOUTUBE_EMBED_URL_IDENTIFIER);
    } else {
      setUrlError(strings.invalidUrl);
      return null;
    }
    return id;
  };

  const onAddVideo = () => {
    setUrlError("");

    if (!pageId) return;

    console.log("Video ID: " + videoId);

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
      _id: uuidv4(),
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
      mediaUrl: undefined,
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
