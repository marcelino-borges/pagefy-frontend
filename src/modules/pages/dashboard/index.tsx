import { useDispatch, useSelector } from "react-redux";
import { IApplicationState } from "../../../store";
import UserPage from "../user-page";

const Dashboard = () => {
  const dispatch = useDispatch();
  const userState = useSelector((state: IApplicationState) => state.user);

  return <>Dashboard</>;
};

export default Dashboard;
