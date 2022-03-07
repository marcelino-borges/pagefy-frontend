import { IUser, UserActionTypes } from "./../user/types";

export const getUser = (email: string) => (dispatch: any) => {
  //Make request to backend
};

const getUserSuccess = (data: IUser) => ({
  payload: data,
  type: UserActionTypes.GET_USER_SUCCESS,
});

const getUserError = () => ({
  type: UserActionTypes.GET_USER_ERROR,
});
