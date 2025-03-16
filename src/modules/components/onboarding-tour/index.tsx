import Joyride, { CallBackProps, Props as JoyrideProps, STATUS } from "react-joyride";
import strings from "../../../localization";
import { COMPLEMENTARY_COLOR, PRIMARY_COLOR } from "../../../styles/colors";

interface OnboardingTourProps extends JoyrideProps {
  keyJoyrider?: string;
  onFinishTour?: () => void;
}

const OnboardingTour = ({
  keyJoyrider,
  onFinishTour,
  ...originalProps
}: OnboardingTourProps) => {
  return (
    <Joyride
      callback={(data: CallBackProps) => {
        if (data.status === STATUS.FINISHED) onFinishTour?.();
      }}
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
        },
        beaconOuter: {
          borderColor: COMPLEMENTARY_COLOR,
          backgroundColor: COMPLEMENTARY_COLOR + "50",
        },
      }}
    />
  );
};

export default OnboardingTour;
