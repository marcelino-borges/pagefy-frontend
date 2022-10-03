import Header from "../../components/header";
import ThinWidthContent from "../../components/site-content/thin-width";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { IApplicationState } from "./../../../store/index";
import { useEffect, useState } from "react";
import { PlansTypes, IUser } from "../../../store/user/types";
import strings from "../../../localization";
import PrivateRouteChecker from "../../components/private-route-checker";
import PageTitle from "../../components/page-title";
import ProfileEditableAvatar from "../../components/profile-editable-avatar";
import ChooseFileDialog from "../../components/dialog-file-upload";
import { IMAGE_EXTENSIONS } from "../../../constants";
import InternalLink from "./../../components/internal-link/index";
import routes from "./../../../routes/paths";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteUser } from "../../../services/user";
import { showSuccessToast } from "../../../utils/toast";
import DialogConfirmation from "../../components/dialog-confirmation";
import { showErrorToast } from "./../../../utils/toast/index";
import { signOut } from "../../../store/auth/actions";
import { ACESSIBILITY_RED } from "../../../styles/colors";
import { updateUser } from "../../../store/user/actions";

const INITIAL_STATE: IUser = {
  firstName: "",
  lastName: "",
  email: "",
  plan: PlansTypes.FREE,
  agreePrivacy: false,
  receiveCommunications: false,
};

const Profile = () => {
  const dispatch = useDispatch();

  const userState: IUser | undefined = useSelector(
    (state: IApplicationState) => state.user.profile
  );

  const token: string | undefined = useSelector(
    (state: IApplicationState) => state.auth.auth?.accessToken
  );

  const [values, setValues] = useState<IUser>(INITIAL_STATE);
  const [openUploadDialog, setOpenUploadDialog] = useState(false);
  const [openDeleteConfirmationDialog, setOpenDeleteConfirmationDialog] =
    useState(false);
  const [profileImageTemporaryUrl, setProfileImageTemporaryUrl] =
    useState<any>(undefined);
  const [chosenImage, setChosenImage] = useState<File>();

  useEffect(() => {
    if (userState) {
      setValues(userState);
      setProfileImageTemporaryUrl(userState.profileImageUrl);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userState]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const deleteUserFromFirebaseAndMongo = () => {
    if (userState && userState._id && userState.authId && token) {
      deleteUser(userState._id, userState.authId, token)
        .then(() => {
          showSuccessToast(strings.deleteAccountSuccess);
          dispatch(signOut());
        })
        .catch(() => {
          showErrorToast(strings.deleteAccountError);
        });
    }
  };

  return (
    <>
      <PrivateRouteChecker />
      <Header />
      <DialogConfirmation
        open={openDeleteConfirmationDialog}
        onClose={() => setOpenDeleteConfirmationDialog(false)}
        title={strings.deleteAccount}
        message={strings.deleteUserConfirmation}
        onConfirmCallback={deleteUserFromFirebaseAndMongo}
        onRefuseCallback={() => {
          setOpenDeleteConfirmationDialog(false);
        }}
      />
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
        <PageTitle
          title={strings.profile}
          subtitle={strings.profileSubtitle}
          increasingSize
        />
        <Grid container direction="column" justifyContent="center" mt="50px">
          <Grid container item justifyContent="center" pb="50px">
            <ProfileEditableAvatar
              imageUrl={profileImageTemporaryUrl}
              onClick={() => setOpenUploadDialog(true)}
              height="140px"
              width="140px"
              noUserIconSize="60px"
              badgeBgSize="38px"
              badgeIconSize="26px"
            />
          </Grid>
          <Grid container item direction="column" gap="16px">
            <Grid item>
              <TextField
                label={strings.firstName}
                name="firstName"
                type="text"
                fullWidth
                required
                variant="outlined"
                onChange={handleInputChange}
                value={values.firstName}
              />
            </Grid>
            <Grid item>
              <TextField
                label={strings.lastName}
                name="lastName"
                type="text"
                fullWidth
                required
                variant="outlined"
                onChange={handleInputChange}
                value={values.lastName}
              />
            </Grid>
            <Grid item>
              <TextField
                label={strings.email}
                name="email"
                type="text"
                fullWidth
                required
                variant="outlined"
                onChange={handleInputChange}
                value={values.email}
              />
            </Grid>
            <Grid item>
              <FormControl fullWidth>
                <Select
                  displayEmpty
                  variant="outlined"
                  onChange={(e: any) => {
                    setValues({
                      ...values,
                      plan: e.target.value,
                    });
                  }}
                  value={values.plan}
                  sx={{ minWidth: "100px" }}
                >
                  <MenuItem selected={values.plan === 0} value={0}>
                    <em>{strings.freePlan.name}</em>
                  </MenuItem>
                  <MenuItem selected={values.plan === 1} value={1}>
                    <em>{strings.vipPlan.name}</em>
                  </MenuItem>
                  <MenuItem selected={values.plan === 2} value={2}>
                    <em>{strings.platinumPlan.name}</em>
                  </MenuItem>
                </Select>
                <FormHelperText>{""}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid container item direction="row" justifyContent="space-between">
              <FormControlLabel
                label={strings.wishesCommunications}
                control={
                  <Checkbox
                    checked={values.receiveCommunications}
                    onChange={(e: any) => {
                      setValues({
                        ...values,
                        receiveCommunications: e.target.checked,
                      });
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
                    checked={values.agreePrivacy}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setValues({
                        ...values,
                        agreePrivacy: e.target.checked,
                      });
                    }}
                  />
                }
              />
            </Grid>
            <Grid container item pt="32px" justifyContent="center">
              <Button
                variant="contained"
                onClick={() => {
                  dispatch(
                    updateUser(
                      values,
                      () => {
                        showSuccessToast(strings.successUpdateUser);
                      },
                      () => {
                        showErrorToast(strings.errorUpdateUser);
                      }
                    )
                  );
                }}
              >
                {strings.save}
              </Button>
            </Grid>
            <Grid container item justifyContent="center" pt="50px" pb="50px">
              <Button
                onClick={() => {
                  setOpenDeleteConfirmationDialog(true);
                }}
              >
                <DeleteIcon
                  style={{ color: ACESSIBILITY_RED, marginRight: "8px" }}
                />
                <span style={{ color: ACESSIBILITY_RED }}>
                  {strings.deleteAccount}
                </span>
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </ThinWidthContent>
    </>
  );
};

export default Profile;
