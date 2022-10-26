import { useNavigate } from "react-router-dom";
import {
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
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import Navigation from "../../components/navigation";
import ThinWidthContent from "../../components/site-content/thin-width";
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
import Footer from "../../components/footer";
import { IApplicationState } from "../../../store";

const INITIAL_VALUES = {
  email: "",
  password: "",
};

const SignInPage = () => {
  const dispatch = useDispatch();

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

  const onSubmit = () => {
    runAfterValidateRecaptcha(window, () => {
      const credentials: IUserCredentials = {
        email: String(values.email).trim(),
        password: values.password,
      };

      dispatch(
        signIn(
          credentials,
          (token: string, auth: IUserAuth) => {
            setSessionStorage("auth", JSON.stringify(auth));
            dispatch(
              getUser(credentials.email, token, (user: IUser) => {
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
      <Navigation />
      <ThinWidthContent pb="50px">
        <h2 style={{ textAlign: "center", marginBottom: "56px" }}>
          {strings.accessAccount}
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Grid container maxWidth="400px">
            <Grid container>
              {/* Line 1 */}
              <Grid container item p="24px">
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

              {/* Line 2 */}
              <Grid container item p="24px">
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
            </Grid>

            {/* Last line - Buttons */}
            <Grid container item justifyContent="center" p="36px">
              <Button type="submit" variant="contained">
                {strings.signIn}
              </Button>
            </Grid>
            <Grid
              container
              item
              justifyContent="center"
              fontSize="0.9em"
              pt="12px"
            >
              <InternalLink to={routes.signUp}>
                {strings.noAccountYet}
              </InternalLink>
            </Grid>
          </Grid>
        </form>
      </ThinWidthContent>
      <Footer />
    </>
  );
};

export default SignInPage;
