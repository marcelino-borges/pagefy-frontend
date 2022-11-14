import { Stack } from "@mui/material";
import strings from "../../../localization";
import routes from "../../../routes/paths";
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
        <SignInButton to={routes.signIn}>{strings.signIn2}</SignInButton>
      )}
      {signUp && (
        <SignUpButton to={routes.signUp}>
          {strings.registerImperative}
        </SignUpButton>
      )}
    </Stack>
  );
};

export default SignInRegisterButtons;
