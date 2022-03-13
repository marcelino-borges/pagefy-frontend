import { SharedActionTypes } from "../shared/types";

export const setLoading = () => ({
  type: SharedActionTypes.SET_LOADING,
});

export const clearLoading = () => ({
  type: SharedActionTypes.CLEAR_LOADING,
});
