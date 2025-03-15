import { Stack } from "@mui/material";
import strings from "../../../localization";
import PAGES_ROUTES from "../../../routes/paths";
import { SignInButton, SignUpButton } from "./style";

interface ISignInRegisterButtonsProps {
  signIn?: boolean;
  signUp?: boolean;
}

const SignInRegisterButtons = ({
  signIn = true,
  signUp = false,
}: ISignInRegisterButtonsProps) => {
  return (
    <Stack direction="row" pl="12px" alignItems="center" gap="16px">
      {signIn && (
        <SignInButton to={PAGES_ROUTES.signIn}>{strings.signIn2}</SignInButton>
      )}
      {signUp && (
        <SignUpButton to={PAGES_ROUTES.signUp}>
          {strings.registerImperative}
        </SignUpButton>
      )}
    </Stack>
  );
};

export default SignInRegisterButtons;
