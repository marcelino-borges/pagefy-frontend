import { IUser, PlansTypes } from "../../store/user/types";

export const canCreatePage = (
  userProfile: IUser | undefined,
  userPagesLength: number
): boolean => {
  if (!userProfile || userPagesLength === undefined) return false;
  if (userProfile?.plan === PlansTypes.FREE) {
    return userPagesLength < 1;
  } else if (userProfile?.plan === PlansTypes.VIP) {
    return userPagesLength < 5;
  } else if (userProfile?.plan === PlansTypes.PLATINUM) {
    return true;
  }
  return false;
};
