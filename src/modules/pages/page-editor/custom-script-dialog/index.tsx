import { useEffect, useState } from "react";
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
import strings from "./../../../../localization/index";
import { DescriptionText } from "./styles";
import { includesAnyInString } from "../../../../utils";
import { showErrorToast } from "./../../../../utils/toast/index";

interface ICustomScriptDialogProps {
  existingHeaderScript?: string;
  existingEndBodyScript?: string;
  handleClose: (
    headerScript: string | undefined,
    endBodyScript: string | undefined
  ) => void;
  open: boolean;
}

const CustomScriptDialog = ({
  handleClose,
  open,
  existingHeaderScript,
  existingEndBodyScript,
}: ICustomScriptDialogProps) => {
  const theme = useTheme();
  const isSmallerThanSM = useMediaQuery(theme.breakpoints.down("sm"));

  const [headerScript, setHeaderScript] = useState<string>("");
  // const [endBodyScript, setEndBodyScript] = useState<string>("");

  const clearStates = () => {
    setHeaderScript("");
    // setEndBodyScript("");
  };

  const isMaliciousCode = (script: string): boolean => {
    return includesAnyInString(script, [
      "fetch",
      "axios",
      "then",
      "import",
      "export",
      "exports",
      "module",
      "require",
      "eval",
      "localStorage",
    ]);
  };

  const sanitizeScript = (script: string) => {
    return script.replaceAll('"', "'");
  };

  const onSaveScripts = () => {
    if (isMaliciousCode(headerScript)) {
      showErrorToast(strings.customScripts.scriptNotValidated);
      return;
    }
    const sanitizedScript = sanitizeScript(headerScript);
    handleClose(sanitizedScript, undefined);
    clearStates();
  };

  useEffect(() => {
    if (existingHeaderScript) setHeaderScript(existingHeaderScript);
    // if (existingEndBodyScript) setEndBodyScript(existingEndBodyScript);

    return () => {
      clearStates();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Dialog
      open={open}
      onClose={() => {
        clearStates();
        handleClose(undefined, undefined);
      }}
      fullWidth
      fullScreen={isSmallerThanSM}
      maxWidth="sm"
      style={{ minWidth: "300px" }}
    >
      <DialogTitle>{strings.customScripts.insertCustomScript}</DialogTitle>
      <DialogContent>
        <DescriptionText>
          {strings.customScripts.customScriptDescription}
        </DescriptionText>

        <TextField
          multiline
          autoFocus
          type="text"
          label={strings.customScripts.headerScript}
          fullWidth
          variant="outlined"
          rows={4}
          value={headerScript}
          onChange={(event: any) => {
            const input: string = event.target.value;
            setHeaderScript(input);
          }}
          sx={{ marginBottom: "16px" }}
        />

        {/* <TextField
          multiline
          autoFocus
          type="text"
          label={strings.customScripts.endBodyScript}
          fullWidth
          variant="outlined"
          rows={4}
          value={endBodyScript}
          onChange={(event: any) => {
            const input: string = event.target.value;
            setEndBodyScript(input);
          }}
        /> */}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            clearStates();
            handleClose(undefined, undefined);
          }}
        >
          {strings.back}
        </Button>
        <Button onClick={onSaveScripts}>{strings.save}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CustomScriptDialog;
