import { useSelector } from "react-redux";
import { IApplicationState } from "../../../store";
import { IUserPage } from "../../../store/user/types";
import PageCard from "./page-card/index";

const UserPages = () => {
  const userProfileState = useSelector(
    (state: IApplicationState) => state.user.profile
  );

  return (
    <>
      Páginas
      {userProfileState?.pages.map((page: IUserPage) => {
        return <PageCard page={page} key={page._id} />;
      })}
    </>
  );
};

export default UserPages;
