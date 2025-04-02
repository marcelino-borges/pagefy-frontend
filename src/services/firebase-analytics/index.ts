import { EventNameString, logEvent } from "firebase/analytics";
import ReactPixel from "react-facebook-pixel";
import { firebaseAnalytics } from "../../config/firebase";
import { EventParamsByEvent } from "./types";
import { ANALYTICS_EVENTS } from "../../constants";

export const logAnalyticsEvent = <T extends EventNameString | string>(
  eventName: T,
  params?: T extends keyof EventParamsByEvent
    ? EventParamsByEvent[T]
    : Record<string, any>
) => {
  const isLocalhost = window.location.href.includes("localhost");

  if (isLocalhost) return;

  logEvent(firebaseAnalytics, eventName as string, params);

  if (eventName === ANALYTICS_EVENTS.pageView) {
    ReactPixel.pageView();
  } else {
    ReactPixel.trackCustom(eventName, params);
  }
};
