import { Step } from "react-joyride";
import strings from "../../../localization";

export const ONBOARDING_STEPS_PAGE_EDITOR_GENERAL: Step[] = Object.keys(
  strings.onboardings.pageEditor.general
).map(
  (key, index): Step => ({
    target: `#page-editor-general-tour${index + 1}`,
    content: (
      <p className="legible-text">
        {
          (strings.onboardings.pageEditor.general as Record<string, string>)[
            key
          ]
        }
      </p>
    ),
    placement: "bottom-end",
    placementBeacon: "bottom-start",
  })
);

export const ONBOARDING_STEPS_PAGE_EDITOR_CREATE_DIALOG: Step[] = Object.keys(
  strings.onboardings.pageEditor.createDialog
).map((key, index) => ({
  target: `#page-editor-createDialog-tour${index + 1}`,
  content: (
    <p className="legible-text">
      {
        (strings.onboardings.pageEditor.createDialog as Record<string, string>)[
          key
        ]
      }
    </p>
  ),
  placement: "bottom-end",
  placementBeacon: "bottom-start",
}));
