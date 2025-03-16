import { useCallback, useEffect, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import DialogActions from "@mui/material/DialogActions/DialogActions";
import { Icon } from "@iconify/react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { ToolbarButton, ToolbarIconText } from "../../style";
import strings from "../../../../../localization";
import { ANALYTICS_EVENTS } from "../../../../../constants";
import { logAnalyticsEvent } from "../../../../../services/firebase-analytics";
import { IApplicationState } from "../../../../../store";
import { toBase64 } from "../../../../../utils";
import OnboardingTour from "../../../../components/onboarding-tour";
import { ONBOARDING_STEPS_PAGE_EDITOR_CREATE_DIALOG } from "../../constants";
import { PageEditorOnboardingEvent } from "../../types";
import { useLocation } from "react-router-dom";
import PAGES_ROUTES from "../../../../../routes/paths";
import { updateUser } from "../../../../../store/user/actions";

interface ITool {
  label: string;
  iconifyId: string;
  handleClick: () => void;
}

interface IToolsDialogProps {
  isSmallerThan600: boolean;
  isSmallerThan370: boolean;
  open: boolean;
  handleOpenComponentDialog: () => void;
  handleOpenIconsDialog: () => void;
  handleOpenVideoDialog: () => void;
  handleOpenLaunchDialog: () => void;
  handleOpenMapDialog: () => void;
  handleOpenSpotifyDialog: () => void;
  handleOpenProgressBarDialog: () => void;
  handleOpenCountersDialog: () => void;
  handleClose: () => void;
}

const ToolsDialog = ({
  open,
  handleClose,
  isSmallerThan600,
  handleOpenComponentDialog,
  handleOpenIconsDialog,
  handleOpenVideoDialog,
  handleOpenLaunchDialog,
  handleOpenMapDialog,
  handleOpenSpotifyDialog,
  handleOpenProgressBarDialog,
  handleOpenCountersDialog,
}: IToolsDialogProps) => {
  const theme = useTheme();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const isSmallerThanSM = useMediaQuery(theme.breakpoints.down("sm"));
  const userProfile = useSelector(
    (state: IApplicationState) => state.user.profile
  );
  const [runTourCreateDialog, setRunTourCreateDialog] = useState(false);

  useEffect(
    function decideToRunTourPageEditor() {
      if (
        !runTourCreateDialog &&
        !userProfile?.onboardings?.pageEditor?.createDialog &&
        pathname.includes(PAGES_ROUTES.pageEditor)
      ) {
        setRunTourCreateDialog(true);
      }
    },
    [
      pathname,
      userProfile?.onboardings?.pageEditor?.createDialog,
      runTourCreateDialog,
    ]
  );

  const updateUserOnboardingGeneral = useCallback(() => {
    if (!userProfile) return;
    console.log("has user");

    if (userProfile.onboardings?.pageEditor?.createDialog) return;

    try {
      dispatch(
        updateUser({
          ...userProfile,
          onboardings: {
            ...userProfile?.onboardings,
            pageEditor: {
              ...userProfile?.onboardings?.pageEditor,
              createDialog: true,
            },
          },
        })
      );
    } catch (error) {
      console.log(
        `Couldn't update onboarding event for pageEditor.createDialog`,
        error
      );
    }
  }, [dispatch, userProfile]);

  const ToolButton = ({ tool }: { tool: ITool }) => {
    return (
      <Grid item xs={3} py="16px">
        <Grid container item direction="column">
          <ToolbarButton
            onClick={() => {
              logAnalyticsEvent(ANALYTICS_EVENTS.selectContent, {
                content_type: "PageEditor / ToolsDialog",
                item_id: tool.label,
                email: toBase64(userProfile?.email),
              });
              tool.handleClick();
              handleClose();
            }}
          >
            <Icon icon={tool.iconifyId} />

            <ToolbarIconText>{tool.label}</ToolbarIconText>
          </ToolbarButton>
        </Grid>
      </Grid>
    );
  };

  const tools: ITool[] = [
    {
      label: strings.tools.button.name,
      iconifyId: "mdi:gesture-tap-button",
      handleClick: handleOpenComponentDialog,
    },
    {
      label: strings.tools.icon.name,
      iconifyId: "fluent:emoji-sparkle-16-regular",
      handleClick: handleOpenIconsDialog,
    },
    {
      label: strings.tools.video.name,
      iconifyId: "akar-icons:youtube-fill",
      handleClick: handleOpenVideoDialog,
    },
    {
      label: strings.tools.launch.name,
      iconifyId: "ic:round-rocket-launch",
      handleClick: handleOpenLaunchDialog,
    },
    {
      label: strings.tools.map.name,
      iconifyId: "clarity:map-solid",
      handleClick: handleOpenMapDialog,
    },
    {
      label: strings.tools.spotify.name,
      iconifyId: "akar-icons:spotify-fill",
      handleClick: handleOpenSpotifyDialog,
    },
    {
      label: strings.tools.progressBar.name,
      iconifyId: "pajamas:progress",
      handleClick: handleOpenProgressBarDialog,
    },
    {
      label: strings.tools.counters.name,
      iconifyId: "fluent:number-row-24-regular",
      handleClick: handleOpenCountersDialog,
    },
  ];

  const steps = useMemo(() => ONBOARDING_STEPS_PAGE_EDITOR_CREATE_DIALOG, []);

  const onboardingElement = useMemo(
    () => (
      <OnboardingTour
        steps={steps}
        run={runTourCreateDialog}
        scrollToFirstStep={false}
        disableScrolling
        onFinishTour={updateUserOnboardingGeneral}
        continuous
      />
    ),
    [runTourCreateDialog, steps, updateUserOnboardingGeneral]
  );

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      fullScreen={isSmallerThanSM}
      maxWidth="sm"
    >
      {onboardingElement}
      <DialogTitle>{strings.chooseOneToCreate}</DialogTitle>
      <DialogContent>
        <Grid
          container
          item
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
          paddingTop={isSmallerThan600 ? "24px" : "0"}
        >
          {tools.map((tool: ITool) => (
            <ToolButton tool={tool} key={uuidv4()} />
          ))}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            handleClose();
          }}
        >
          {strings.back}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ToolsDialog;
