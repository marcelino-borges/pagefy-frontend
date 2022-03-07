import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  MenuItem,
  Select,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import strings from "../../../localization";
import { IComponentAnimation } from "../../../store/user-pages/types";
import { PRIMARY_COLOR } from "../../../styles/colors";
import { capitalizeFirstLetter } from "../../../utils";
import { COMPONENT_ANIMATIONS } from "../../constants";
import { AnimatedSquare } from "./styles";

interface IProps {
  open: boolean;
  onClose: () => void;
  saveAnimation: (animation: IComponentAnimation) => void;
  existingAnimation?: IComponentAnimation | undefined;
}

const DialogChooseAnimation = ({
  open,
  onClose,
  saveAnimation,
  existingAnimation,
}: IProps) => {
  const theme = useTheme();
  const isSmallerThanSM = useMediaQuery(theme.breakpoints.down("sm"));

  const [selectedAnimation, setSelectedAnimation] = useState<string>("");
  const [duration, setDuration] = useState<number>(1);
  const [startDelay, setStartDelay] = useState<number>(0);
  const [isInfinite, setIsInfinite] = useState(false);
  const [errorAnimationField, setErrorAnimationField] = useState<string>();

  useEffect(() => {
    if (existingAnimation) {
      setSelectedAnimation(existingAnimation.name);
      setDuration(existingAnimation.duration);
      setStartDelay(existingAnimation.startDelay);
      setIsInfinite(existingAnimation.infinite);
    }
  }, [existingAnimation]);

  const clearErrors = () => {
    setErrorAnimationField(undefined);
  };

  const clearStates = () => {
    setSelectedAnimation("");
    setDuration(1);
    setStartDelay(0);
    setIsInfinite(false);
    clearErrors();
  };

  const submitAnimation = () => {
    clearErrors();

    if (!selectedAnimation || selectedAnimation === "") {
      setErrorAnimationField(strings.requiredField);
      return;
    }

    saveAnimation({
      name: selectedAnimation,
      duration,
      startDelay,
      infinite: isInfinite,
    });
    clearStates();
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      fullScreen={isSmallerThanSM}
      maxWidth="sm"
      style={{ minWidth: "300px" }}
    >
      <DialogTitle>{strings.chooseAnimation}</DialogTitle>
      <DialogContent
        style={{
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        <Grid container direction="column">
          <Grid
            container
            item
            xs={12}
            justifyContent="center"
            alignItems="center"
            style={{
              paddingTop: "16px",
            }}
          >
            <FormControl fullWidth error={!!errorAnimationField}>
              <Select
                displayEmpty
                variant="outlined"
                onChange={(e: any) => {
                  setSelectedAnimation(e.target.value);
                }}
                value={selectedAnimation}
                sx={{ minWidth: "100px" }}
              >
                <MenuItem selected value="">
                  <em>{strings.noAnimation}</em>
                </MenuItem>
                {COMPONENT_ANIMATIONS.map((animation: string) => (
                  <MenuItem value={animation} key={animation}>
                    {capitalizeFirstLetter(animation)}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{errorAnimationField || ""}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid
            container
            item
            xs={12}
            justifyContent="center"
            alignItems="center"
            style={{
              paddingTop: "24px",
            }}
          >
            <Grid item xs={6}>
              <TextField
                label={strings.duration + " (s)"}
                placeholder={"1.5"}
                type="number"
                fullWidth
                variant="outlined"
                onChange={(e: any) => {
                  setDuration(+e.target.value.replaceAll(",", "."));
                }}
                value={duration}
                sx={{ minWidth: "100px" }}
              />
            </Grid>
            <Grid item xs={6} pl="24px">
              <TextField
                label={strings.startDelay + " (s)"}
                placeholder={"1.5"}
                type="number"
                fullWidth
                variant="outlined"
                onChange={(e: any) => {
                  setStartDelay(+e.target.value.replaceAll(",", "."));
                }}
                value={startDelay}
                sx={{ minWidth: "100px" }}
              />
            </Grid>
          </Grid>
          <Grid
            container
            item
            xs={12}
            justifyContent="center"
            alignItems="center"
            style={{
              paddingTop: "24px",
            }}
          >
            <FormControlLabel
              label={strings.repeatInfinitely}
              control={
                <Checkbox
                  checked={isInfinite}
                  onChange={(e: any) => {
                    setIsInfinite(e.target.checked);
                  }}
                />
              }
            />
          </Grid>
          <Grid
            container
            item
            xs={12}
            justifyContent="center"
            alignItems="center"
            style={{
              paddingTop: "32px",
              fontSize: "16px",
            }}
            direction="column"
          >
            <AnimatedSquare
              container
              item
              justifyContent="center"
              alignItems="center"
              p="16px 24px"
              color="white"
              width="unset"
              height="56px"
              mt="16px"
              borderRadius="10px"
              bgcolor={PRIMARY_COLOR}
              animation={selectedAnimation}
              duration={duration}
              delay={startDelay}
              infinite={isInfinite}
            >
              {strings.animationInstruction}
            </AnimatedSquare>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            clearStates();
            onClose();
          }}
        >
          {strings.back}
        </Button>
        <Button
          onClick={() => {
            submitAnimation();
          }}
        >
          {strings.save}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogChooseAnimation;
