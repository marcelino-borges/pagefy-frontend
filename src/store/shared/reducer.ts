import { IAction, ISharedState, SharedActionTypes } from "../shared/types";

const initialState: ISharedState = {
  loading: false,
};

const userReducer = (
  state: any = initialState,
  action: IAction
): ISharedState => {
  switch (action.type) {
    case SharedActionTypes.SET_LOADING:
      return {
        loading: true,
      };

    case SharedActionTypes.CLEAR_LOADING:
      return {
        loading: false,
      };

    default:
      return { ...state };
  }
};

export default userReducer;
