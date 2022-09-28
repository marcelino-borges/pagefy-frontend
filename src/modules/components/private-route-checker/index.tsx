import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import routes from "../../../routes/paths";
import { IApplicationState } from "../../../store";
import { signInSuccess, signOut } from "../../../store/auth/actions";
import { getStorage } from "./../../../utils/storage/index";
import { IUserAuth } from "./../../../store/auth/types";
import { IUser } from "../../../store/user/types";
import { getUserSuccess } from "../../../store/user/actions";

const PrivateRouteChecker = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authState = useSelector((state: IApplicationState) => state.auth.auth);

  useEffect(() => {
    if (!authState) {
      const storedAuth = getStorage("auth");
      const storedUser = getStorage("user");

      if (!storedAuth || !storedUser) {
        dispatch(signOut());
        navigate(routes.root);
      } else {
        const auth: IUserAuth = JSON.parse(storedAuth) as IUserAuth;
        const user: IUser = JSON.parse(storedUser) as IUser;
        dispatch(signInSuccess(auth));
        dispatch(getUserSuccess(user));
      }
    }
  }, [navigate, authState, dispatch]);
  return <></>;
};

export default PrivateRouteChecker;
