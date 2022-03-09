import { Grid, Stack, useMediaQuery, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { IApplicationState } from "./../../../../store/index";
import ProfileEditablePicture from "./../../profile-editable-picture";
import { SubtitleLinks, SubtitleLinksNoUser, UserName } from "./style";
import routes from "../../../../routes/paths";
import strings from "../../../../localization";
import { signOut } from "./../../../../store/auth/actions";
import { useNavigate } from "react-router-dom";
import { LIGHTER_GREY } from "../../../../styles/colors";

const UserLoggedIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userState = useSelector((state: IApplicationState) => state.user);
  const authState = useSelector((state: IApplicationState) => state.auth);
  const theme = useTheme();
  const isSmallerThanMD = useMediaQuery(theme.breakpoints.down("md"));

  const get2FirstNames = () => {
    if (!userState.profile) return "";

    const hasntFirstName =
      !userState.profile.firstName || userState.profile.firstName.length < 1;

    const hasntLastName =
      !userState.profile.lastName || userState.profile.lastName.length < 1;

    if (hasntLastName) {
      if (hasntFirstName) {
        return "";
      } else {
        const names: string[] = userState.profile.firstName.split(" ");

        return names[0];
      }
    }
    if (!hasntFirstName) {
      const firstNames: string[] = userState.profile.firstName.split(" ");
      const lastNames: string[] = userState.profile.lastName.split(" ");

      return `${firstNames[0]} ${lastNames[0]}`;
    } else {
      const lastNames: string[] = userState.profile.lastName.split(" ");
      return lastNames[0];
    }
  };

  return authState.auth && authState.auth.accessToken ? (
    <Grid
      container
      item
      direction={isSmallerThanMD ? "column" : "row"}
      justifyContent="flex-end"
      pr={!isSmallerThanMD ? "32px" : "0px"}
    >
      <Grid
        container={!!isSmallerThanMD ? true : undefined}
        item
        justifyContent="center"
      >
        <ProfileEditablePicture
          imageUrl={userState.profile?.profileImageUrl}
          onClick={() => {
            //
          }}
          width="50px"
          height="50px"
          badgeBgSize="22px"
          badgeIconSize="15px"
          noUserIconSize="36px"
        />
      </Grid>
      <Stack direction="column" pl={!isSmallerThanMD ? "12px" : "0px"}>
        <UserName>{get2FirstNames()}</UserName>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent={isSmallerThanMD ? "center" : undefined}
        >
          <SubtitleLinks to={routes.profile}>{strings.profile}</SubtitleLinks>
          <Grid item px="8px" color={LIGHTER_GREY}>
            |
          </Grid>
          <SubtitleLinks
            onClick={() => {
              dispatch(
                signOut(() => {
                  navigate(routes.root);
                })
              );
            }}
            to="#"
          >
            {strings.signOut}
          </SubtitleLinks>
        </Stack>
      </Stack>
    </Grid>
  ) : (
    <Stack direction="row" pl="12px" alignItems="center">
      <SubtitleLinksNoUser to={routes.signIn}>
        {strings.signIn2}
      </SubtitleLinksNoUser>
      <Grid item px="8px" color={LIGHTER_GREY}>
        |
      </Grid>
      <SubtitleLinksNoUser to={routes.signUp}>
        {strings.signUp}
      </SubtitleLinksNoUser>
    </Stack>
  );
};

export default UserLoggedIn;
