import { Step } from "react-joyride";
import strings from "../../../localization";

export const ONBOARDING_STEPS_PAGE_EDITOR_GENERAL: Step[] = Object.keys(
  strings.onboardings.pageEditor.general
).map(
  (key, index): Step => ({
    target: `#page-editor-general-tour${index + 1}`,
    content: (
      <p className="legible-text">
        {strings.onboardings.pageEditor.general[key]}
      </p>
    ),
    placement: "bottom-end",
    placementBeacon: "bottom-start",
  })
);

export const ONBOARDING_STEPS_PAGE_EDITOR_CREATE_DIALOG: Step[] = [
  {
    target: `#page-editor-createDialog-tour1`,
    content: (
      <p className="legible-text">
        {strings.onboardings.pageEditor.createDialog.step1}
      </p>
    ),
    placement: "bottom-end",
    placementBeacon: "bottom-start",
  },
];
