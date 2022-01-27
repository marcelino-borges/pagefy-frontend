import { useDispatch, useSelector } from "react-redux";
import { IApplicationState } from "../../../store";
import SiteContent from "../../components/site-content";

const Dashboard = () => {
  const dispatch = useDispatch();
  const userState = useSelector((state: IApplicationState) => state.user);

  return <SiteContent>Dashboard</SiteContent>;
};

export default Dashboard;
