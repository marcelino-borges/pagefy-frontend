import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./../modules/pages/dashboard/index";
import routes from "./paths";
import Support from "./../modules/pages/support/index";
import UserPages from "./../modules/pages/user-pages/index";
import strings from "./../localization/index";
import UserPage from "./../modules/pages/user-page/index";
import LoadingSpinner from "../modules/components/loading-spinner";
import Header from "../modules/components/header";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { IApplicationState } from "../store";

const AppRoutes = () => {
  const appState = useSelector((state: IApplicationState) => state);

  useEffect(() => {
    const isAppLoading = appState.user.loading;

    setIsLoading(isAppLoading);
  }, [appState]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <BrowserRouter>
      {isLoading && <LoadingSpinner />}
      <Header />
      <Routes>
        <Route path={routes.root} element={<Dashboard />} />
        <Route path={routes.pages} element={<UserPages />}>
          <Route path=":pageUrl" element={<UserPage />} />
        </Route>
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
