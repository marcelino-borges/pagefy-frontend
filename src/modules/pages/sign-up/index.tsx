import { useNavigate, useSearchParams } from "react-router-dom";
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
import Navigation from "../../components/navigation";
import ThinWidthContent from "../../components/site-content/thin-width";
import { useEffect, useState } from "react";
import strings from "../../../localization";
import { ALLOW_SIGNUP, EMAIL_REGEX, PASSWORD_REGEX } from "../../../constants";
import { signIn, signOut, signUp } from "../../../store/auth/actions";
import { showErrorToast } from "./../../../utils/toast";
import routes from "./../../../routes/paths";
import { PlansTypes, IUser } from "../../../store/user/types";
import { getUser } from "./../../../store/user/actions";
import { capitalizeOnlyFirstLetter } from "../../../utils";
import { setSessionStorage } from "../../../utils/storage";
import { IUserAuth } from "../../../store/auth/types";
import { setRecaptchaScript } from "../../../utils/recaptcha-v3";
import InternalLink from "../../components/internal-link";
import BannerHalfLayout from "../../components/site-content/banner-half-layout";
import Meta from "../../components/meta";
import images from "../../../assets/img";

const INITIAL_VALUES = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpPage = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const planId = searchParams.get("planId");

  const { handleSubmit } = useForm();
  let navigate = useNavigate();

  const [values, setValues] = useState(INITIAL_VALUES);
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [receiveCommunications, setReceiveCommunications] = useState(false);
  const [showingPassword, setShowingPassword] = useState(false);

  useEffect(() => {
    dispatch(signOut());
    setRecaptchaScript(document);
  }, [dispatch]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const loadDashboardOrPurchase = () => {
    if (planId?.length) {
      navigate(`${routes.subscribe}/${planId}`);

      return;
    }

    navigate(routes.pages);
  };

  const onSubmit = () => {
    // runAfterValidateRecaptcha(window, () => {
    if (!agreePrivacy) {
      showErrorToast(strings.requiredPrivacyAccept);
      return;
    }

    const newUser = {
      firstName: capitalizeOnlyFirstLetter(String(values.firstName).trim()),
      lastName: capitalizeOnlyFirstLetter(String(values.lastName).trim()),
      email: String(values.email).trim().toLowerCase(),
      password: values.password,
      confirmPassword: values.confirmPassword,
      receiveCommunications,
      agreePrivacy,
      plan: PlansTypes.FREE,
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
        async (user: IUser) => {
          dispatch(
            signIn(
              { email: values.email, password: values.password },
              (_: string, auth: IUserAuth) => {
                setSessionStorage("auth", JSON.stringify(auth));
                dispatch(
                  getUser(user.email, (user: IUser) => {
                    setSessionStorage("user", JSON.stringify(user));
                    loadDashboardOrPurchase();
                  })
                );
                loadDashboardOrPurchase();
              }
            )
          );
        },
        (errorTranslated: any) => {
          showErrorToast(errorTranslated);
        }
      )
    );
    // });
  };

  if (!ALLOW_SIGNUP) {
    return (
      <>
        <Navigation />
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
      <Meta
        lang={strings.getLanguage()}
        locale={strings.getInterfaceLanguage()}
        title={"Pagefy"}
        description={strings.appDescription}
        image={images.screenshots.signup}
      />
      <BannerHalfLayout>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ width: "100%", height: "100%" }}
        >
          <h2 style={{ marginBottom: "16px" }}>{strings.createYourAccount}</h2>
          <div>{strings.fillYourPersonalData}</div>
          {/* Line 1 */}
          <Grid container item mt="24px">
            <TextField
              autoFocus
              label={strings.firstName}
              name="firstName"
              placeholder="John"
              type="text"
              fullWidth
              required
              variant="filled"
              onChange={handleInputChange}
              value={values.firstName}
            />
          </Grid>
          <Grid container item mt="24px">
            <TextField
              label={strings.lastName}
              name="lastName"
              type="text"
              placeholder="Doe"
              fullWidth
              required
              variant="filled"
              onChange={handleInputChange}
              value={values.lastName}
            />
          </Grid>
          <Grid container item mt="24px">
            <TextField
              label={strings.email}
              name="email"
              placeholder={strings.emailExample}
              type="text"
              fullWidth
              required
              variant="filled"
              onChange={handleInputChange}
              value={values.email}
            />
          </Grid>
          <Grid container item mt="24px">
            <TextField
              label={strings.password}
              name="password"
              type={showingPassword ? "text" : "password"}
              fullWidth
              required
              variant="filled"
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
                          <ShowPasswordIcon fontSize="medium" color="primary" />
                        ) : (
                          <HidePasswordIcon fontSize="medium" color="primary" />
                        )}
                      </IconButton>
                    </InputAdornment>
                  </>
                ),
              }}
            />
            <div
              style={{
                whiteSpace: "pre",
                fontSize: "0.7em",
                marginTop: "8px",
              }}
            >
              {strings.passwordRequirements}
            </div>
          </Grid>
          <Grid container item mt="24px">
            <TextField
              label={strings.confirmPassword}
              name="confirmPassword"
              type={showingPassword ? "text" : "password"}
              fullWidth
              required
              variant="filled"
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
                          <ShowPasswordIcon fontSize="medium" color="primary" />
                        ) : (
                          <HidePasswordIcon fontSize="medium" color="primary" />
                        )}
                      </IconButton>
                    </InputAdornment>
                  </>
                ),
              }}
            />
          </Grid>
          <Grid container item mt="24px">
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
                  <InternalLink to={routes.terms}>
                    {strings.termsOfUse}
                  </InternalLink>{" "}
                  {strings.and}{" "}
                  <InternalLink to={routes.privacy}>
                    {strings.privacyPolicies}
                  </InternalLink>
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
          <Grid container item justifyContent="center" mt="24px">
            <Button
              type="submit"
              variant="contained"
              disabled={!agreePrivacy}
              fullWidth
            >
              {strings.register}
            </Button>
          </Grid>
          <Grid
            container
            item
            justifyContent="center"
            fontSize="0.9em"
            mt="24px"
          >
            <InternalLink
              to={
                routes.signIn + `${planId?.length ? `?planId=${planId}` : ""}`
              }
            >
              {strings.alreadyHaveAccount}
            </InternalLink>
          </Grid>
        </form>
      </BannerHalfLayout>
    </>
  );
};

export default SignUpPage;
