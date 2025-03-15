import { EventNameString, logEvent } from "firebase/analytics";
import { firebaseAnalytics } from "../../config/firebase";
import { EventParamsByEvent } from "./types";

export const logAnalyticsEvent = <T extends EventNameString | string>(
  eventName: T,
  params?: T extends keyof EventParamsByEvent
    ? EventParamsByEvent[T]
    : Record<string, any>
) => {
  const isServer = !window.location.href.includes("localhost");

  if (isServer) logEvent(firebaseAnalytics, eventName as string, params);
};
