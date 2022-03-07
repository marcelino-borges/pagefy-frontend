import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  useMediaQuery,
} from "@mui/material";
import {
  Visibility as ShowPasswordIcon,
  VisibilityOff as HidePasswordIcon,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { IApplicationState } from "../../../store/index";
import { useForm } from "react-hook-form";
import Header from "../../components/header/index";
import DashboardContent from "../../components/site-content";
import { useState } from "react";
import strings from "../../../localization";
import { PrimaryColoredText } from "./style";

const BREAK_TOOLBAR_TEXT = true;
const BREAK_POINT_TOOLBAR_TEXT = 12;

const SignInPage = () => {
  const dispatch = useDispatch();
  const isSmallerThanMD = useMediaQuery("(max-width: 600px)");

  const { handleSubmit } = useForm();

  let navigate = useNavigate();
  let { id } = useParams();

  const userPagesState = useSelector(
    (state: IApplicationState) => state.userPages
  );

  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [receiveCommunications, setReceiveCommunications] = useState(false);
  const [showingPassword, setShowingPassword] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmit = () => {};

  return (
    <>
      <Header />
      <DashboardContent>
        <h1 style={{ textAlign: "center", marginBottom: "56px" }}>
          {strings.createYourAccount}
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
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
              <FormControlLabel
                label={strings.wishesCommunications}
                style={{ marginTop: "16px" }}
                control={
                  <Checkbox
                    checked={receiveCommunications}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      setReceiveCommunications(event.target.checked);
                    }}
                  />
                }
              />
            </Grid>

            {/* Last line - Buttons */}
            <Grid container item justifyContent="center" p="12px">
              <Button type="submit" variant="contained">
                {strings.register}
              </Button>
            </Grid>
          </Grid>
        </form>
      </DashboardContent>
    </>
  );
};

export default SignInPage;
