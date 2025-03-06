import { IUser, PlansTypes } from "../../store/user/types";

export const canCreatePage = (
  userProfile: IUser | undefined,
  userPagesLength: number
): boolean => {
  if (!userProfile || userPagesLength === undefined) return false;
  if (userProfile?.plan === PlansTypes.FREE) {
    return userPagesLength < 1;
  } else if (userProfile?.plan === PlansTypes.NEON) {
    return userPagesLength < 5;
  } else if (userProfile?.plan === PlansTypes.BOOST) {
    return true;
  }
  return false;
};
