import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Box,
  Button,
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
import { useEffect, useState } from "react";
import strings from "../../../localization";
import {
  signIn,
  signInWithProvider,
  signOut,
} from "../../../store/auth/actions";
import PAGES_ROUTES from "../../../routes/paths";
import { IUserAuth, IUserCredentials } from "../../../store/auth/types";
import { showErrorToast } from "../../../utils/toast";
import { getUser, getUserOrCreate } from "../../../store/user/actions";
import { IUser } from "../../../store/user/types";
import { setSessionStorage } from "../../../utils/storage";
import {
  runAfterValidateRecaptcha,
  setRecaptchaScript,
} from "../../../utils/recaptcha-v3";
import InternalLink from "../../components/internal-link";
import BannerHalfLayout from "../../components/site-content/banner-half-layout";
import { Icon } from "@iconify/react";
import { LoginProviderContainer } from "./style";
import CustomTooltip from "./../../components/tooltip/index";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  OAuthProvider,
} from "firebase/auth";
import Meta from "../../components/meta";
import images from "../../../assets/img";
import { ANALYTICS_EVENTS } from "../../../constants";
import { logAnalyticsEvent } from "../../../services/firebase-analytics";

const INITIAL_VALUES = {
  email: "",
  password: "",
};

const SignInPage = () => {
  const dispatch = useDispatch();

  const { handleSubmit } = useForm();

  let navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const planId = searchParams.get("planId");
  const redirectTo = searchParams.get("redirectTo");

  const [values, setValues] = useState(INITIAL_VALUES);
  const [showingPassword, setShowingPassword] = useState(false);

  useEffect(() => {
    dispatch(signOut());
    setRecaptchaScript(document);
  }, [dispatch]);

  useEffect(() => {
    logAnalyticsEvent(ANALYTICS_EVENTS.pageView, {
      page_path: PAGES_ROUTES.signIn,
      page_title: "Sign In",
    });
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const loadDashboardOrPurchase = () => {
    if (planId?.length) {
      navigate(`${PAGES_ROUTES.subscribe}/${planId}`);

      return;
    }

    navigate(PAGES_ROUTES.userPages);
  };

  const onSubmitSignInCredentials = () => {
    runAfterValidateRecaptcha(window, () => {
      const credentials: IUserCredentials = {
        email: String(values.email).trim(),
        password: values.password,
      };

      dispatch(
        signIn(
          credentials,
          (
            _token: string,
            auth: IUserAuth,
            _userData: IUser,
            providerName?: string
          ) => {
            setSessionStorage("auth", JSON.stringify(auth));
            logAnalyticsEvent(ANALYTICS_EVENTS.login, {
              method: providerName,
              userAuthId: auth.uid,
            });

            dispatch(
              getUser(credentials.email, (user: IUser) => {
                setSessionStorage("user", JSON.stringify(user));

                if (redirectTo?.length) {
                  navigate(redirectTo);
                  return;
                }

                loadDashboardOrPurchase();
              })
            );
          },
          (errorTranslated: any) => {
            showErrorToast(errorTranslated);
          }
        )
      );
    });
  };

  const onSignInWithProvider = (
    provider: GoogleAuthProvider | FacebookAuthProvider | OAuthProvider
  ) => {
    runAfterValidateRecaptcha(window, () => {
      dispatch(
        signInWithProvider(
          provider,
          (_: string, auth: IUserAuth, user: IUser, providerName?: string) => {
            setSessionStorage("auth", JSON.stringify(auth));
            logAnalyticsEvent(ANALYTICS_EVENTS.login, {
              method: providerName ?? "externalProvider",
              userAuthId: auth.uid,
            });

            dispatch(
              getUserOrCreate(user, (user: IUser) => {
                setSessionStorage("user", JSON.stringify(user));
                loadDashboardOrPurchase();
              })
            );
          },
          (errorTranslated: any) => {
            showErrorToast(errorTranslated);
          }
        )
      );
    });
  };

  return (
    <>
      <Meta
        lang={strings.getLanguage()}
        locale={strings.getInterfaceLanguage()}
        title={strings.appName}
        description={strings.appDescription}
        image={images.screenshots.login}
      />
      <BannerHalfLayout>
        <form
          onSubmit={handleSubmit(onSubmitSignInCredentials)}
          style={{ width: "100%", height: "100%" }}
        >
          <h2 style={{ marginBottom: "16px" }}>{strings.welcomeBack}</h2>
          <div>{strings.fillDataToAccessAccount}</div>
          {/* Line 1 */}
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

          {/* Line 2 */}
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
          </Grid>

          {/* Last line - Buttons */}
          <Grid container item justifyContent="center" mt="24px">
            <Button type="submit" variant="contained" fullWidth>
              {strings.signIn}
            </Button>
          </Grid>
          <Grid
            container
            item
            justifyContent="center"
            fontSize="0.9em"
            mt="36px"
          >
            {strings.signInWith}:
          </Grid>
          <Grid
            container
            item
            justifyContent="center"
            alignItems="center"
            fontSize="0.9em"
            pt="12px"
            gap="24px"
          >
            <LoginProviderContainer item>
              <CustomTooltip title="Google">
                <Icon
                  icon="logos:google-icon"
                  onClick={() => onSignInWithProvider(new GoogleAuthProvider())}
                />
              </CustomTooltip>
            </LoginProviderContainer>
            <LoginProviderContainer item>
              <CustomTooltip title="Facebook">
                <Icon
                  icon="uiw:facebook"
                  color="#4267B2"
                  onClick={() =>
                    onSignInWithProvider(new FacebookAuthProvider())
                  }
                />
              </CustomTooltip>
            </LoginProviderContainer>
            <LoginProviderContainer item>
              <CustomTooltip title="Microsoft">
                <Icon
                  icon="logos:microsoft-icon"
                  fontSize="0.9em"
                  onClick={() =>
                    onSignInWithProvider(new OAuthProvider("microsoft.com"))
                  }
                />
              </CustomTooltip>
            </LoginProviderContainer>
          </Grid>
          <Grid
            container
            item
            justifyContent="center"
            fontSize="0.9em"
            pt="12px"
            mt="12px"
          >
            <InternalLink
              to={
                PAGES_ROUTES.signUp +
                `${planId?.length ? `?planId=${planId}` : ""}`
              }
            >
              {strings.noAccountYet}
            </InternalLink>
          </Grid>
          <Box mt="32px" fontSize="0.7rem" color="gray">
            This site is protected by reCAPTCHA and the Google{" "}
            <a href="https://policies.google.com/privacy">Privacy Policy</a> and{" "}
            <a href="https://policies.google.com/terms">Terms of Service</a>{" "}
            apply.
          </Box>
        </form>
      </BannerHalfLayout>
    </>
  );
};

export default SignInPage;
