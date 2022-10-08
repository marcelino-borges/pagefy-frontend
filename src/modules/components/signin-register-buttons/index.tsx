import { Stack } from "@mui/material";
import strings from "../../../localization";
import routes from "../../../routes/paths";
import { SignInButton, SignUpButton } from "./style";

const SignInRegisterButtons = () => {
  return (
    <Stack direction="row" pl="12px" alignItems="center" gap="16px">
      <SignInButton to={routes.signIn}>{strings.signIn2}</SignInButton>
      <SignUpButton to={routes.signUp}>
        {strings.registerImperative}
      </SignUpButton>
    </Stack>
  );
};

export default SignInRegisterButtons;
