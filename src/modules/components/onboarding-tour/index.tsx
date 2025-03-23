import Joyride, {
  CallBackProps,
  Props as JoyrideProps,
  LIFECYCLE,
  ORIGIN,
  STATUS,
} from "react-joyride";
import strings from "../../../localization";
import { COMPLEMENTARY_COLOR, PRIMARY_COLOR } from "../../../styles/colors";
import { memo } from "react";

interface OnboardingTourProps extends JoyrideProps {
  keyJoyrider?: string;
  onFinishTour?: () => void;
}

const OnboardingTour = ({
  keyJoyrider,
  onFinishTour,
  ...originalProps
}: OnboardingTourProps) => {
  const tourId = "Tour open. First Target " + originalProps.steps[0].target;

  return (
    <Joyride
      callback={
        originalProps.callback ??
        (({ status, origin, lifecycle, ...rest }: CallBackProps) => {
          if (
            status === STATUS.FINISHED &&
            origin === ORIGIN.BUTTON_PRIMARY &&
            lifecycle === LIFECYCLE.COMPLETE
          )
            onFinishTour?.();

          console.log({
            tour: tourId,
            callback: {
              status,
              origin,
              lifecycle,
              ...rest,
            },
          });
        })
      }
      {...originalProps}
      key={keyJoyrider}
      locale={{
        back: strings.back,
        close: strings.close,
        last: strings.understoodEverything,
        next: strings.next,
        open: strings.open,
        skip: strings.skip,
      }}
      styles={{
        tooltipContent: {
          whiteSpace: "pre-line",
          textAlign: "start",
          fontWeight: 400,
          fontFamily: "Comfortaa",
        },
        buttonNext: {
          backgroundColor: PRIMARY_COLOR,
          borderRadius: "32px",
          textTransform: "unset",
          fontSize: "0.9em",
          boxShadow: "none",
          paddingTop: "14px",
          paddingBottom: "14px",
          paddingLeft: "20px",
          paddingRight: "20px",
        },
        buttonBack: {
          color: PRIMARY_COLOR,
        },
        beaconInner: {
          backgroundColor: COMPLEMENTARY_COLOR,
          zIndex: 999_999,
        },
        beaconOuter: {
          borderColor: COMPLEMENTARY_COLOR,
          backgroundColor: COMPLEMENTARY_COLOR + "50",
          zIndex: 999_999,
        },
        beacon: {
          zIndex: 999_999,
        },
      }}
    />
  );
};

export default memo(OnboardingTour);
