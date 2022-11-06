import { useState } from "react";
import { useDispatch } from "react-redux";
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
import {
  ComponentType,
  IUserComponent,
} from "../../../../../store/user-pages/types";
import { addMiddleComponentInPage } from "../../../../../store/user-pages/actions";
import MapEmbed from "../../../../components/map-embed";

interface IMapsDialogProps {
  pageId?: string;
  open: boolean;
  handleClose: any;
}

const MapsDialog = ({ pageId, open, handleClose }: IMapsDialogProps) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isSmallerThanSM = useMediaQuery(theme.breakpoints.down("sm"));

  const [urlError, setUrlError] = useState<string>("");
  const [labelError, setLabelError] = useState<string>("");
  const [label, setLabel] = useState<string>("");
  const [mapUrl, setMapUrl] = useState<string>("");

  const clearStates = () => {
    setUrlError("");
    setLabelError("");
    setLabel("");
    setMapUrl("");
  };

  const onCreateMap = () => {
    setUrlError("");
    setLabelError("");

    if (!pageId) return;

    if (!isUrlValid(mapUrl)) {
      setUrlError(strings.invalidUrl);
      return;
    } else if (!label?.length) {
      setLabelError(strings.textInComponentRequired);
    }

    const newComponent: IUserComponent = {
      text: label,
      url: mapUrl,
      visible: true,
      clicks: 0,
      layout: {
        rows: 2,
        columns: 2,
      },
      type: ComponentType.Map,
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
      <DialogTitle>{strings.tools.map.name}</DialogTitle>
      <DialogContent>
        <DescriptionText>{strings.mapsInstructions}</DescriptionText>

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
          placeholder={`https://www.google.com/maps/place/Arthur's+Quay+Park/@52.6650587,-8.6269249,16.25z/data=!4m9!1m2!2m1!1smap!3m5!1s0x485b5c67aff19bc7:0xb513204a83a70bfe!8m2!3d52.6654858!4d-8.6270145!16s%2Fg%2F11c2mzmgw4?hl=en`}
          type="text"
          label={strings.tools.map.textfieldMapUrlLabel}
          fullWidth
          variant="outlined"
          onChange={(e: any) => {
            setUrlError("");
            const input: string = e.target.value;
            setMapUrl(input);
          }}
          value={mapUrl}
          sx={{ marginBottom: "16px" }}
        />

        {mapUrl && <MapEmbed mapUrl={mapUrl} />}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>{strings.back}</Button>
        <Button
          disabled={!mapUrl}
          onClick={() => {
            onCreateMap();
          }}
        >
          {strings.create}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MapsDialog;
