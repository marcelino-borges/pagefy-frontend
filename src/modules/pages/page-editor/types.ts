import { UserOnboardings } from "../../../store/user/types";

export type PageEditorOnboardingEvent = keyof NonNullable<
  UserOnboardings["pageEditor"]
>;
