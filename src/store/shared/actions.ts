import { SharedActionTypes } from "../shared/types";
import { ISharedState } from "./types";

export const setLoading =
  () => (dispatch: any, getState: () => ISharedState) => {
    const state: ISharedState = getState();
    setTimerCheckInSeconds(dispatch, state, 5);

    return {
      type: SharedActionTypes.SET_LOADING,
    };
  };

export const clearLoading = () => ({
  type: SharedActionTypes.CLEAR_LOADING,
});

export const incrementContinuousTimeLoading =
  () => (dispatch: any, getState: () => ISharedState) => {
    const state: ISharedState = getState();
    setTimerCheckInSeconds(dispatch, state, 5);
    return {
      type: SharedActionTypes.INCREMENT_CONTINUOUS_TIME_LOADING,
    };
  };

export const clearContinuousTimeLoading = () => ({
  type: SharedActionTypes.CLEAR_CONTINUOUS_TIME_LOADING,
});

const setTimerCheckInSeconds = (
  dispatch: any,
  state: ISharedState,
  delayInSeconds: number
) => {
  setTimeout(() => {
    if (state.loading && state.continuousTimeLoading < delayInSeconds)
      dispatch(incrementContinuousTimeLoading());
    else dispatch(clearContinuousTimeLoading());
  }, 1000);
};
