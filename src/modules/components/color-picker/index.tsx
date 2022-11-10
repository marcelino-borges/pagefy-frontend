import { useCallback, useEffect, useState } from "react";
// import { ColorPicker as ReactColorPicker, useColor } from "react-color-palette";
import strings from "../../../localization";
import {
  ColorPickerStyleOverride,
  PalleteItem,
  RGBContainer,
  RGBContainerLabel,
} from "./styles";
import { HexColorPicker } from "react-colorful";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  InputAdornment,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { DEFAULT_PALLETE, hexToRgb, rgbToHex } from "./utils";

interface IColorPickerProps {
  initialColor: any;
  onCancel: () => void;
  onChooseColor: (selectedColor: string) => void;
  id?: string;
}

const ColorPicker = ({
  initialColor = "#ffffff",
  onCancel,
  onChooseColor,
  id,
}: IColorPickerProps) => {
  const theme = useTheme();
  const isSmallerThanSM = useMediaQuery(theme.breakpoints.down("sm"));

  const [color, setColor] = useState(initialColor);
  const { r, g, b } = hexToRgb(initialColor);
  const [colorRGB, setColorRGB] = useState({ r, g, b });

  const escFunction = useCallback((event: any) => {
    if (event.keyCode === 27) {
      onCancel();
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", escFunction);

    return () => {
      document.removeEventListener("keydown", escFunction);
    };
  }, [escFunction]);

  useEffect(() => {
    setColorRGB(hexToRgb(color));
  }, [color]);

  const handleOnChange = (selectedColor: string) => {
    setColor(selectedColor);
  };

  return (
    <Dialog
      id={id}
      open={true}
      fullWidth
      fullScreen={isSmallerThanSM}
      maxWidth="xs"
    >
      <DialogTitle>{strings.colorPicker}</DialogTitle>
      <DialogContent>
        <ColorPickerStyleOverride>
          <HexColorPicker color={color} onChange={handleOnChange} />
        </ColorPickerStyleOverride>
        <Grid container mt="24px" gap="8px">
          {DEFAULT_PALLETE.map((color: string) => (
            <PalleteItem
              color={color}
              key={color}
              onClick={() => {
                setColor(color);
              }}
            />
          ))}
        </Grid>
        <Grid container mt="32px">
          <TextField
            label={strings.color + " (HEX)"}
            placeholder={"#ffffff"}
            type="text"
            fullWidth
            variant="outlined"
            value={color.replace("#", "")}
            onChange={({ target: { value } }: any) => {
              setColor("#" + value);
            }}
            InputLabelProps={{ shrink: true }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">#</InputAdornment>
              ),
            }}
          />
        </Grid>
        <RGBContainer direction="row" gap="16px">
          <RGBContainerLabel>{strings.color} RGB</RGBContainerLabel>
          <TextField
            type="number"
            fullWidth
            variant="outlined"
            value={colorRGB.r}
            onChange={({ target: { value } }: any) => {
              const hex = rgbToHex(Number(value), colorRGB.g, colorRGB.b);
              setColor(hex);
            }}
            InputProps={{
              inputProps: { min: 0, max: 255 },
              startAdornment: (
                <InputAdornment position="start">R:</InputAdornment>
              ),
            }}
          />
          <TextField
            type="number"
            fullWidth
            variant="outlined"
            value={colorRGB.g}
            onChange={({ target: { value } }: any) => {
              const hex = rgbToHex(colorRGB.r, Number(value), colorRGB.b);
              setColor(hex);
            }}
            InputProps={{
              inputProps: { min: 0, max: 255 },
              startAdornment: (
                <InputAdornment position="start">G:</InputAdornment>
              ),
            }}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            type="number"
            fullWidth
            variant="outlined"
            value={colorRGB.b}
            onChange={({ target: { value } }: any) => {
              const hex = rgbToHex(colorRGB.r, colorRGB.g, Number(value));
              setColor(hex);
            }}
            InputProps={{
              inputProps: { min: 0, max: 255 },
              startAdornment: (
                <InputAdornment position="start">B:</InputAdornment>
              ),
            }}
            InputLabelProps={{ shrink: true }}
          />
        </RGBContainer>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>{strings.cancel}</Button>
        <Button
          onClick={() => {
            onChooseColor(color);
          }}
        >
          {strings.save}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ColorPicker;
