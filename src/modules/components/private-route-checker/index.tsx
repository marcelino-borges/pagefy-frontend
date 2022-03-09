import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import routes from "../../../routes/paths";
import { IApplicationState } from "../../../store";

const PrivateRouteChecker = () => {
  const navigate = useNavigate();
  const authState = useSelector((state: IApplicationState) => state.auth.auth);

  useEffect(() => {
    if (!authState) {
      navigate(routes.root);
    }
  }, [navigate, authState]);
  return <></>;
};

export default PrivateRouteChecker;
