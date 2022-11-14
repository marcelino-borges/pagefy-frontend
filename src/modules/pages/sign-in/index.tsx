import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  useMediaQuery,
} from "@mui/material";
import {
  Visibility as ShowPasswordIcon,
  VisibilityOff as HidePasswordIcon,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import strings from "../../../localization";
import { signIn, signOut } from "../../../store/auth/actions";
import routes from "../../../routes/paths";
import { IUserAuth, IUserCredentials } from "../../../store/auth/types";
import { showErrorToast } from "../../../utils/toast";
import { getUser } from "../../../store/user/actions";
import { IUser } from "../../../store/user/types";
import { setSessionStorage } from "../../../utils/storage";
import {
  runAfterValidateRecaptcha,
  setRecaptchaScript,
} from "../../../utils/recaptcha-v3";
import InternalLink from "../../components/internal-link";
import { IApplicationState } from "../../../store";
import images from "../../../assets/img";
import { Banner } from "./style";
import Logos from "../../../assets/img/logos";

const INITIAL_VALUES = {
  email: "",
  password: "",
};

const SignInPage = () => {
  const dispatch = useDispatch();
  const isSmallerThan800 = useMediaQuery("(max-width: 800px)");
  const isSmallerThan300 = useMediaQuery("(max-width: 300px)");

  const { handleSubmit } = useForm();

  let navigate = useNavigate();
  const purchaseState = useSelector(
    (state: IApplicationState) => state.purchase
  );

  const [values, setValues] = useState(INITIAL_VALUES);
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
    let destination = routes.pages;
    if (purchaseState.plan !== undefined) destination = routes.purchasePlan;
    navigate(destination);
  };

  const onSubmitSignIn = () => {
    runAfterValidateRecaptcha(window, () => {
      const credentials: IUserCredentials = {
        email: String(values.email).trim(),
        password: values.password,
      };

      dispatch(
        signIn(
          credentials,
          (auth: IUserAuth) => {
            setSessionStorage("auth", JSON.stringify(auth));
            dispatch(
              getUser(credentials.email, (user: IUser) => {
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
    <Stack
      direction={isSmallerThan800 ? "column" : "row"}
      alignItems="center"
      height="100vh"
      width="100%"
      pb={isSmallerThan800 ? "150px" : "unset"}
    >
      <Banner image={images.banner1}>
        <Link to={routes.root}>
          <img
            src={Logos.LogoHorizontalDarkBGPNG}
            alt="SocialBio"
            id="logo-signin"
          />
        </Link>
      </Banner>

      <Grid
        container
        item
        justifyContent="center"
        width={isSmallerThan800 ? "100vw" : "50vw"}
        pt={isSmallerThan800 ? (isSmallerThan300 ? "16px" : "32px") : "unset"}
      >
        <Stack
          direction="column"
          width={isSmallerThan800 ? "100%" : "60%"}
          px={isSmallerThan800 ? (isSmallerThan300 ? "16px" : "32px") : "unset"}
          maxWidth={isSmallerThan800 ? "400px" : "unset"}
        >
          <form
            onSubmit={handleSubmit(onSubmitSignIn)}
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
              pt="12px"
              mt="24px"
            >
              <InternalLink to={routes.signUp}>
                {strings.noAccountYet}
              </InternalLink>
            </Grid>
          </form>
        </Stack>
      </Grid>
    </Stack>
  );
};

export default SignInPage;
