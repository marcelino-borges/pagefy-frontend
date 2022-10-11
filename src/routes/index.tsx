import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { IApplicationState } from "../store";
import routes from "./paths";
import Support from "./../modules/pages/support";
import UserPages from "./../modules/pages/user-pages";
import strings from "./../localization";
import UserPage from "./../modules/pages/user-page";
import LoadingSpinner from "../modules/components/loading-spinner";
import PageRenderer from "./../modules/components/page-renderer";
import SignInPage from "../modules/pages/sign-in";
import SignUpPage from "../modules/pages/sign-up";
import "../utils/firebase-config";
import { updatePage } from "./../store/user-pages/actions";
import Home from "./../modules/pages/home";
import Faq from "../modules/pages/faq";
import { showSuccessToast } from "../utils/toast";
import { showErrorToast } from "./../utils/toast/index";
import Profile from "../modules/pages/profile/index";
import PrivacyPage from "./../modules/pages/privacy/index";
import TermsPage from "./../modules/pages/terms/index";
import CoockiesPoliciesPage from "../modules/pages/cookies-policies";
import GDPRPopup from "../modules/components/gdpr-popup";
import { getStorage, setStorage } from "./../utils/storage/index";
import { GDPR_CONSENT_STORAGE_KEY } from "../constants";
import PurchasePlanPage from "../modules/pages/purchase-plan";

const AppRoutes = () => {
  const dispatch = useDispatch();
  const appState = useSelector((state: IApplicationState) => state);
  const [openCookiesConsent, setOpenCookiesConsent] = useState(false);

  useEffect(() => {
    const isAppLoading =
      (appState.user.loading === true ||
        appState.auth.loading === true ||
        appState.userPages.loading === true ||
        appState.shared.loading === true ||
        appState.support.loading === true) &&
      !appState.pageRendered.page;

    setIsLoading(isAppLoading);
  }, [
    appState.user,
    appState.auth,
    appState.userPages,
    appState.shared,
    appState.pageRendered.page,
    appState.support,
  ]);

  useEffect(() => {
    if (appState.userPages.pageBeingSaved) {
      dispatch(
        updatePage(
          appState.userPages.pageBeingSaved,
          () => {
            showSuccessToast(strings.successUpdatePage);
          },
          (translatedError: string | undefined, _: any) => {
            if (translatedError) showErrorToast(translatedError);
          }
        )
      );
    }
  }, [dispatch, appState.userPages.pageBeingSaved]);

  useEffect(() => {
    const hasConsentedGDPR = getStorage(GDPR_CONSENT_STORAGE_KEY);

    if (!hasConsentedGDPR) {
      setOpenCookiesConsent(true);
    }
  }, []);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <BrowserRouter>
      {openCookiesConsent && (
        <GDPRPopup
          onConsentCallback={() => {
            setOpenCookiesConsent(false);
            setStorage(GDPR_CONSENT_STORAGE_KEY, "true");
          }}
        />
      )}
      {isLoading && <LoadingSpinner isFullPage />}
      <Routes>
        <Route path={routes.root} element={<Home />} />
        <Route path={routes.signIn} element={<SignInPage />} />
        <Route path={routes.signUp} element={<SignUpPage />} />
        <Route path={routes.pages} element={<UserPages />} />
        <Route path={`${routes.page}/:id`} element={<UserPage />} />
        <Route path="/:url" element={<PageRenderer />} />
        <Route path={routes.faq} element={<Faq />} />
        <Route path={routes.support} element={<Support />} />
        <Route path={routes.profile} element={<Profile />} />
        <Route path={routes.privacy} element={<PrivacyPage />} />
        <Route path={routes.terms} element={<TermsPage />} />
        <Route path={routes.cookies} element={<CoockiesPoliciesPage />} />
        <Route path={routes.purchasePlan} element={<PurchasePlanPage />} />
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
