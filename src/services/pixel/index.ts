import ReactPixel from "react-facebook-pixel";
import { EventNameStringByString, EventParamsByEvent } from "./types";

export const logPixelDefaultEvent = <T extends EventNameStringByString>(
  eventName: T,
  params?: T extends keyof EventParamsByEvent
    ? EventParamsByEvent[T]
    : Record<string, any>
) => {
  ReactPixel.track(eventName, params);
};

export const logPixelCustomEvent = (eventName: string, params?: any) => {
  ReactPixel.trackCustom(eventName, params);
};
