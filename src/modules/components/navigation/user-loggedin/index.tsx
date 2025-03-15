import { Grid, Stack, useMediaQuery, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { IApplicationState } from "./../../../../store/index";
import ProfileEditableAvatar from "../../profile-editable-avatar";
import { SubtitleLinks, UserName } from "./style";
import PAGES_ROUTES from "../../../../routes/paths";
import strings from "../../../../localization";
import { signOut } from "./../../../../store/auth/actions";
import { useNavigate } from "react-router-dom";
import { LIGHTER_GREY } from "../../../../styles/colors";
import UploadImageDialog from "../../dialog-upload-image";
import { useState } from "react";
import { GalleryContext, IMAGE_EXTENSIONS } from "../../../../constants";
import {
  setUserProfileImage,
  uploadAndSetUserProfileImage,
} from "../../../../store/user/actions";
import { clearLoading } from "./../../../../store/shared/actions";
import SignInRegisterButtons from "../../signin-register-buttons";
import React from "react";

const UserLoggedIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const userState = useSelector((state: IApplicationState) => state.user);
  const isSmallerThanMD = useMediaQuery(theme.breakpoints.down("md"));

  const [openChooseFileBGDialog, setOpenChooseFileBGDialog] = useState(false);
  const [chosenImage, setChosenImage] = useState<File>();

  const getTwoFirstNames = () => {
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

  return userState.profile && userState.profile._id ? (
    <Grid
      container
      item
      direction={isSmallerThanMD ? "column" : "row"}
      justifyContent="flex-end"
      wrap="nowrap"
      width="unset"
      ml="16px"
    >
      <Grid
        container={!!isSmallerThanMD ? true : undefined}
        item
        justifyContent="center"
        my="auto"
        mb={isSmallerThanMD ? "16px" : "auto"}
      >
        <ProfileEditableAvatar
          imageUrl={userState.profile?.profileImageUrl}
          onClick={() => {
            setOpenChooseFileBGDialog(true);
          }}
          width="50px"
          height="50px"
          badgeBgSize="22px"
          badgeIconSize="15px"
          noUserIconSize="36px"
          isEditable={false}
        />
      </Grid>
      <Stack
        direction="column"
        justifyContent="center"
        pl={!isSmallerThanMD ? "12px" : "0px"}
        flexWrap="nowrap"
      >
        <UserName>{getTwoFirstNames()}</UserName>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent={isSmallerThanMD ? "center" : undefined}
          flexWrap="nowrap"
        >
          <SubtitleLinks to={PAGES_ROUTES.profile}>
            {strings.profile}
          </SubtitleLinks>
          <Grid item px="8px" color={LIGHTER_GREY}>
            |
          </Grid>
          <SubtitleLinks
            onClick={() => {
              dispatch(
                signOut(() => {
                  navigate(PAGES_ROUTES.root);
                })
              );
            }}
            to="#"
          >
            {strings.signOut}
          </SubtitleLinks>
        </Stack>
      </Stack>
      <UploadImageDialog
        openChooseFileDialog={openChooseFileBGDialog}
        setOpenChooseFileDialog={setOpenChooseFileBGDialog}
        chosenImage={chosenImage}
        setChosenImage={setChosenImage}
        acceptedFiles={IMAGE_EXTENSIONS}
        context={[GalleryContext.USER_PROFILE]}
        existingImageUrl={userState.profile.profileImageUrl}
        submitDialog={async (imageUrl?: string) => {
          if (!userState.profile) return;
          const clearLoadingFromState = () => {
            dispatch(clearLoading());
          };

          if (chosenImage) {
            dispatch(
              uploadAndSetUserProfileImage(
                chosenImage,
                userState.profile,
                clearLoadingFromState,
                clearLoadingFromState
              )
            );
          } else {
            dispatch(
              setUserProfileImage(
                imageUrl || "",
                userState.profile,
                clearLoadingFromState,
                clearLoadingFromState
              )
            );
          }
          setChosenImage(undefined);
          setOpenChooseFileBGDialog(false);
        }}
        cancelDialog={() => {
          setChosenImage(undefined);
          setOpenChooseFileBGDialog(false);
        }}
      />
    </Grid>
  ) : (
    <SignInRegisterButtons />
  );
};

export default React.memo(UserLoggedIn);
