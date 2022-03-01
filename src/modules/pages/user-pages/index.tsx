import { useSelector } from "react-redux";
import { IApplicationState } from "../../../store";
import { IUserPage } from "../../../store/user/types";
import Header from "../../components/header";
import DashboardContent from "../../components/site-content";
import PageCard from "./page-card/index";

const UserPages = () => {
  const userProfileState = useSelector(
    (state: IApplicationState) => state.user.profile
  );

  return (
    <>
      <Header />
      <DashboardContent>
        {userProfileState?.pages.map((page: IUserPage) => {
          return <PageCard page={page} key={page._id} />;
        })}
      </DashboardContent>
    </>
  );
};

export default UserPages;
