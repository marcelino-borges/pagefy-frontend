import { Link, useNavigate } from "react-router-dom";
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
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import Header from "../../components/header/index";
import DashboardContent from "../../components/site-content";
import { useState } from "react";
import strings from "../../../localization";
import { signIn } from "../../../store/auth/actions";
import routes from "../../../routes/paths";
import { IUserCredentials } from "../../../store/auth/types";
import { showErrorToast } from "../../../utils/toast";
import { getUser } from "../../../store/user/actions";

const INITIAL_VALUES = {
  email: "",
  password: "",
};

const SignInPage = () => {
  const dispatch = useDispatch();

  const { handleSubmit } = useForm();

  let navigate = useNavigate();

  const [values, setValues] = useState(INITIAL_VALUES);
  const [showingPassword, setShowingPassword] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmit = () => {
    const credentials: IUserCredentials = {
      email: values.email,
      password: values.password,
    };

    dispatch(
      signIn(
        credentials,
        (token: string) => {
          dispatch(
            getUser(credentials.email, token, () => {
              navigate(routes.pages);
            })
          );
        },
        (errorTranslated: any) => {
          showErrorToast(errorTranslated);
        }
      )
    );
  };

  return (
    <>
      <Header />
      <DashboardContent>
        <h1 style={{ textAlign: "center", marginBottom: "56px" }}>
          {strings.accessAccount}
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Grid container maxWidth="350px">
            <Grid container>
              {/* Line 1 */}
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

              {/* Line 2 */}
              <Grid container item p="12px">
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
            <Grid container item justifyContent="center" p="24px">
              <Button type="submit" variant="contained">
                {strings.signIn}
              </Button>
            </Grid>
            <Grid container item justifyContent="center" fontSize="0.9em">
              <Link to={routes.signUp}>{strings.noAccountYet}</Link>
            </Grid>
          </Grid>
        </form>
      </DashboardContent>
    </>
  );
};

export default SignInPage;
