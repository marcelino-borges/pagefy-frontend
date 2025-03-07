import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import routes from "../../../routes/paths";
import { IApplicationState } from "../../../store";
import { signInSuccess, signOut } from "../../../store/auth/actions";
import { getStorage } from "./../../../utils/storage";
import { IUserAuth } from "./../../../store/auth/types";
import { IUser } from "../../../store/user/types";
import { getUserSuccess } from "../../../store/user/actions";

const PrivateRouteChecker = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const authState = useSelector((state: IApplicationState) => state.auth.auth);

  useEffect(() => {
    if (!authState) {
      const storedAuth = getStorage("auth");
      const storedUser = getStorage("user");

      if (!storedAuth || !storedUser) {
        dispatch(signOut());
        navigate(`${routes.signIn}?redirectTo=${location.pathname}`);
      } else {
        const auth: IUserAuth = JSON.parse(storedAuth) as IUserAuth;
        const user: IUser = JSON.parse(storedUser) as IUser;
        dispatch(signInSuccess(auth));
        dispatch(getUserSuccess(user));
      }
    }
  }, [navigate, authState, dispatch, location]);
  return <></>;
};

export default PrivateRouteChecker;
