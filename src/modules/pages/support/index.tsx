import Header from "../../components/header";
import ThinWidthContent from "../../components/site-content/thin-width";
import PageTitle from "./../../components/page-title";
import strings from "./../../../localization/index";
import { PRIMARY_COLOR } from "./../../../styles/colors";
import { Grid, TextField, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IUserContact } from "../../../store/support/types";
import {
  clearSupportState,
  sendSupportEmail,
} from "../../../store/support/actions";
import { showErrorToast } from "./../../../utils/toast/index";
import { SentUserContactResult } from "./../../../store/support/types";
import { callRecaptcha, setRecaptchaScript } from "../../../utils/recaptcha-v3";
import { Link } from "react-router-dom";
import routes from "./../../../routes/paths";
import { IApplicationState } from "./../../../store/index";

const INITIAL_VALUES: IUserContact = {
  name: "",
  email: "",
  message: "",
};

const Support = () => {
  const { handleSubmit } = useForm();
  const dispatch = useDispatch();
  const [values, setValues] = useState<IUserContact>(INITIAL_VALUES);
  const [hasAlreadySentEmail, setHasAlreadySentEmail] =
    useState<boolean>(false);

  const userProfile = useSelector(
    (state: IApplicationState) => state.user.profile
  );

  useEffect(() => {
    setRecaptchaScript(document);
  }, []);

  const onSubmit = () => {
    callRecaptcha(window, (token?: string) => {
      if (token) {
        const userContact: IUserContact = values;
        dispatch(
          sendSupportEmail(
            userContact,
            token,
            (result: SentUserContactResult) => {
              if (result) {
                setHasAlreadySentEmail(true);
                dispatch(clearSupportState());
              } else {
                showErrorToast(strings.errorSendingSupportContact);
              }
            },
            (_: string) => {
              showErrorToast(strings.errorSendingSupportContact);
            }
          )
        );
      }
    });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
      <Header />
      <ThinWidthContent>
        <PageTitle
          title={strings.support}
          subtitle={strings.supportDescription}
          increasingSize
          colors={[PRIMARY_COLOR, "#000", "#000"]}
        />
        <Grid container>
          {hasAlreadySentEmail ? (
            <Grid container mt="100px" justifyContent="center" fontWeight={600}>
              <Grid
                container
                justifyContent="center"
                fontWeight={600}
                mb="50px"
              >
                {strings.successSendingSupportContact}
              </Grid>
              {!userProfile ? (
                <Grid
                  container
                  justifyContent="center"
                  color={PRIMARY_COLOR}
                  fontWeight={600}
                >
                  <Link to={routes.root}>{strings.goToHomePage}</Link>{" "}
                </Grid>
              ) : (
                <Grid
                  container
                  justifyContent="center"
                  color={PRIMARY_COLOR}
                  fontWeight={600}
                >
                  <Link to={routes.pages}>{strings.goToPages}</Link>
                </Grid>
              )}
            </Grid>
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              style={{
                width: "100%",
                paddingTop: "50px",
              }}
            >
              <Grid container mt="16px">
                <TextField
                  label={strings.name}
                  name="name"
                  type="text"
                  fullWidth
                  required
                  variant="outlined"
                  onChange={handleInputChange}
                  value={values.name}
                  inputProps={{
                    maxLength: 50,
                  }}
                />
              </Grid>
              <Grid container mt="16px">
                <TextField
                  label={strings.email}
                  name="email"
                  type="email"
                  fullWidth
                  required
                  variant="outlined"
                  onChange={handleInputChange}
                  value={values.email}
                  inputProps={{
                    maxLength: 50,
                  }}
                />
              </Grid>
              <Grid container mt="16px">
                <TextField
                  label={strings.message}
                  name="message"
                  type="text"
                  fullWidth
                  required
                  variant="outlined"
                  onChange={handleInputChange}
                  value={values.message}
                  multiline
                  minRows={4}
                  inputProps={{
                    maxLength: 1024,
                  }}
                />
              </Grid>
              <Grid container mt="16px" justifyContent="center">
                <Button variant="contained" type="submit">
                  {strings.send}
                </Button>
              </Grid>
            </form>
          )}
        </Grid>
      </ThinWidthContent>
    </>
  );
};

export default Support;
