import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { IApplicationState } from "../store";
import Dashboard from "./../modules/pages/dashboard/index";
import routes from "./paths";
import Support from "./../modules/pages/support/index";
import UserPages from "./../modules/pages/user-pages/index";
import strings from "./../localization/index";
import UserPage from "./../modules/pages/user-page/index";
import LoadingSpinner from "../modules/components/loading-spinner";
import PageRenderer from "./../modules/components/page-renderer/index";
import SignInPage from "../modules/pages/sign-in";
import SignUpPage from "../modules/pages/sign-up";
import "../utils/firebase-config";
import { updatePage } from "./../store/user-pages/actions";

const AppRoutes = () => {
  const dispatch = useDispatch();
  const appState = useSelector((state: IApplicationState) => state);

  useEffect(() => {
    const isAppLoading =
      appState.user.loading === true || appState.auth.loading === true;

    setIsLoading(isAppLoading);
  }, [appState.user, appState.auth, appState.userPages]);

  useEffect(() => {
    if (appState.userPages.pageBeingSaved) {
      dispatch(updatePage(appState.userPages.pageBeingSaved));
    }
  }, [dispatch, appState.userPages.pageBeingSaved]);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <BrowserRouter>
      {isLoading && <LoadingSpinner />}
      <Routes>
        <Route path={routes.root} element={<SignInPage />} />
        <Route path={routes.signIn} element={<SignInPage />} />
        <Route path={routes.signUp} element={<SignUpPage />} />
        <Route path={routes.pages} element={<UserPages />} />
        <Route path={`${routes.page}/:id`} element={<UserPage />} />
        <Route path="/:url" element={<PageRenderer />} />
        <Route path={routes.support} element={<Support />} />
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>{strings.pageNotFound}</p>
            </main>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
