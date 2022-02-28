import { useSelector } from "react-redux";
import { IApplicationState } from "../../../store";
import { IUserPage } from "../../../store/user/types";
import Header from "../../components/header";
import SiteContent from "../../components/site-content";
import PageCard from "./page-card/index";

const UserPages = () => {
  const userProfileState = useSelector(
    (state: IApplicationState) => state.user.profile
  );

  return (
    <>
      <Header />
      <SiteContent>
        {userProfileState?.pages.map((page: IUserPage) => {
          return <PageCard page={page} key={page._id} />;
        })}
      </SiteContent>
    </>
  );
};

export default UserPages;
