import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import {
  Visibility as ShowPasswordIcon,
  VisibilityOff as HidePasswordIcon,
} from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import Header from "../../components/header/index";
import ThinWidthContent from "../../components/site-content/thin-width";
import { useEffect, useState } from "react";
import strings from "../../../localization";
import { PrimaryColoredText } from "./style";
import ChooseFileDialog from "./../../components/dialog-file-upload/index";
import {
  ALLOW_SIGNUP,
  EMAIL_REGEX,
  IMAGE_EXTENSIONS,
  PASSWORD_REGEX,
} from "../../../constants";
import ProfileEditablePicture from "../../components/profile-editable-picture";
import { signIn, signOut, signUp } from "../../../store/auth/actions";
import { showErrorToast } from "./../../../utils/toast/index";
import routes from "./../../../routes/paths";
import { IPlan, IUser } from "../../../store/user/types";
import { uploadImage } from "../../../services/files";
import { getUser, updateUser } from "./../../../store/user/actions";
import { capitalizeOnlyFirstLetter } from "../../../utils";
import { setStorage } from "../../../utils/storage";
import { IUserAuth } from "../../../store/auth/types";
import { UserStorageFolder } from "../../../store/shared/types";

const INITIAL_VALUES = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpPage = () => {
  const dispatch = useDispatch();

  const { handleSubmit } = useForm();
  let navigate = useNavigate();

  const [values, setValues] = useState(INITIAL_VALUES);
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [receiveCommunications, setReceiveCommunications] = useState(false);
  const [showingPassword, setShowingPassword] = useState(false);
  const [openUploadDialog, setOpenUploadDialog] = useState(false);
  const [chosenImage, setChosenImage] = useState<File>();
  const [profileImageTemporaryUrl, setProfileImageTemporaryUrl] =
    useState<any>(undefined);

  useEffect(() => {
    dispatch(signOut());
  }, [dispatch]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmit = () => {
    if (!agreePrivacy) {
      showErrorToast(strings.requiredPrivacyAccept);
      return;
    }

    const newUser = {
      firstName: capitalizeOnlyFirstLetter(values.firstName),
      lastName: capitalizeOnlyFirstLetter(values.lastName),
      email: values.email,
      password: values.password,
      confirmPassword: values.confirmPassword,
      receiveCommunications,
      agreePrivacy,
      plan: IPlan.FREE,
    };

    if (!newUser.email.match(EMAIL_REGEX)) {
      showErrorToast(strings.authErrors.invalidEmail);
      return;
    }

    if (!newUser.password.match(PASSWORD_REGEX)) {
      showErrorToast(strings.authErrors.passwordMustAttendRequirements);
      return;
    }

    dispatch(
      signUp(
        newUser,
        async (user: IUser, token: string) => {
          if (user._id && chosenImage) {
            const imageUrl: string = (
              await uploadImage(
                user._id,
                chosenImage,
                UserStorageFolder.UPLOADED_IMAGES,
                token
              )
            ).data;

            if (imageUrl && imageUrl.length > 0) {
              dispatch(
                updateUser({
                  ...newUser,
                  profileImageUrl: imageUrl,
                })
              );
            }
          }
          dispatch(
            signIn(
              { email: values.email, password: values.password },
              (_: string, auth: IUserAuth) => {
                setStorage("auth", JSON.stringify(auth));
                dispatch(
                  getUser(user.email, token, (user: IUser) => {
                    setStorage("user", JSON.stringify(user));
                    navigate(routes.pages);
                  })
                );
                navigate(routes.pages);
              }
            )
          );
        },
        (errorTranslated: any) => {
          showErrorToast(errorTranslated);
        }
      )
    );
  };

  if (!ALLOW_SIGNUP) {
    return (
      <>
        <Header />
        <ThinWidthContent style={{ height: "100vh" }}>
          <div style={{ textAlign: "center", margin: "auto" }}>
            <div>{strings.sorry + ","}</div>
            <div>{strings.generalErrors.signUpNotAllowed}</div>
          </div>
        </ThinWidthContent>
      </>
    );
  }

  return (
    <>
      <Header />
      <ChooseFileDialog
        openChooseFileDialog={openUploadDialog}
        setOpenChooseFileDialog={setOpenUploadDialog}
        chosenImage={chosenImage}
        setChosenImage={setChosenImage}
        acceptedFiles={IMAGE_EXTENSIONS}
        submitDialog={() => {
          if (!chosenImage) {
            return;
          }
          setProfileImageTemporaryUrl(URL.createObjectURL(chosenImage));
          setOpenUploadDialog(false);
        }}
        cancelDialog={() => {
          setChosenImage(undefined);
          setOpenUploadDialog(false);
        }}
      />
      <ThinWidthContent>
        <h1 style={{ textAlign: "center", marginBottom: "56px" }}>
          {strings.createYourAccount}
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container pb="24px">
            <Grid container justifyContent="center" alignItems="center">
              <ProfileEditablePicture
                imageUrl={profileImageTemporaryUrl}
                onClick={() => setOpenUploadDialog(true)}
                height="100px"
                width="100px"
                noUserIconSize="60px"
                badgeBgSize="36px"
              />
            </Grid>
          </Grid>
          <Grid container direction="row">
            {/* Line 1 */}
            <Grid item xs={12} sm={6} p="12px">
              <TextField
                autoFocus
                label={strings.firstName}
                name="firstName"
                placeholder="John"
                type="text"
                fullWidth
                required
                variant="outlined"
                onChange={handleInputChange}
                value={values.firstName}
              />
            </Grid>
            <Grid item xs={12} sm={6} p="12px">
              <TextField
                label={strings.lastName}
                name="lastName"
                type="text"
                placeholder="Doe"
                fullWidth
                required
                variant="outlined"
                onChange={handleInputChange}
                value={values.lastName}
              />
            </Grid>

            {/* Line 2 */}
            <Grid container item p="12px">
              <TextField
                label={strings.email}
                name="email"
                placeholder={strings.emailExample}
                type="text"
                fullWidth
                required
                variant="outlined"
                onChange={handleInputChange}
                value={values.email}
              />
            </Grid>

            {/* Line 3 */}
            <Grid container>
              <Grid container item xs={12} sm={6} p="12px">
                <TextField
                  label={strings.password}
                  name="password"
                  type={showingPassword ? "text" : "password"}
                  fullWidth
                  required
                  variant="outlined"
                  onChange={handleInputChange}
                  value={values.password}
                  InputProps={{
                    endAdornment: (
                      <>
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowingPassword(!showingPassword)}
                            edge="end"
                          >
                            {!showingPassword ? (
                              <ShowPasswordIcon
                                fontSize="medium"
                                color="primary"
                              />
                            ) : (
                              <HidePasswordIcon
                                fontSize="medium"
                                color="primary"
                              />
                            )}
                          </IconButton>
                        </InputAdornment>
                      </>
                    ),
                  }}
                />
              </Grid>
              <Grid container item xs={12} sm={6} p="12px">
                <TextField
                  label={strings.confirmPassword}
                  name="confirmPassword"
                  type={showingPassword ? "text" : "password"}
                  fullWidth
                  required
                  variant="outlined"
                  onChange={handleInputChange}
                  value={values.confirmPassword}
                  InputProps={{
                    endAdornment: (
                      <>
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowingPassword(!showingPassword)}
                            edge="end"
                          >
                            {!showingPassword ? (
                              <ShowPasswordIcon
                                fontSize="medium"
                                color="primary"
                              />
                            ) : (
                              <HidePasswordIcon
                                fontSize="medium"
                                color="primary"
                              />
                            )}
                          </IconButton>
                        </InputAdornment>
                      </>
                    ),
                  }}
                />
              </Grid>

              <Grid container item xs={12} p="12px">
                <span style={{ whiteSpace: "pre", fontSize: "0.7em" }}>
                  {strings.passwordRequirements}
                </span>
              </Grid>
            </Grid>

            {/* Line 4 */}
            <Grid container direction="column" p="12px">
              <FormControlLabel
                label={strings.wishesCommunications}
                control={
                  <Checkbox
                    checked={receiveCommunications}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      setReceiveCommunications(event.target.checked);
                    }}
                  />
                }
              />
              <FormControlLabel
                label={
                  <>
                    {strings.agreeWith}{" "}
                    <PrimaryColoredText>
                      {strings.termsOfUse}
                    </PrimaryColoredText>{" "}
                    {strings.and}{" "}
                    <PrimaryColoredText>
                      {strings.privacyPolicy}
                    </PrimaryColoredText>
                  </>
                }
                control={
                  <Checkbox
                    checked={agreePrivacy}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      setAgreePrivacy(event.target.checked);
                    }}
                  />
                }
              />
            </Grid>

            {/* Last line - Buttons */}
            <Grid container item justifyContent="center" p="36px">
              <Button
                type="submit"
                variant="contained"
                disabled={!agreePrivacy}
              >
                {strings.register}
              </Button>
            </Grid>
            <Grid container item justifyContent="center" fontSize="0.9em">
              <Link to={routes.signIn}>{strings.alreadyHaveAccount}</Link>
            </Grid>
          </Grid>
        </form>
      </ThinWidthContent>
    </>
  );
};

export default SignUpPage;
