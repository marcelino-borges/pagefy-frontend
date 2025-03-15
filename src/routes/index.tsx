import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { IApplicationState } from "../store";
import PAGES_ROUTES from "./paths";
import Support from "./../modules/pages/support";
import UserPages from "./../modules/pages/user-pages";
import strings from "./../localization";
import UserPage from "./../modules/pages/page-editor";
import LoadingSpinner from "../modules/components/loading-spinner";
import PageRenderer from "./../modules/components/page-renderer";
import SignInPage from "../modules/pages/sign-in";
import SignUpPage from "../modules/pages/sign-up";
import "../config/firebase";
import { updatePage } from "./../store/user-pages/actions";
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
import PlansPage from "../modules/pages/plans";
import Home2 from "../modules/pages/homes/home2";
import CheckoutSuccess from "../modules/pages/checkout-success";
import CheckoutCancel from "../modules/pages/checkout-cancel";
import Subscribe from "../modules/pages/subscribe";

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
        <Route path={PAGES_ROUTES.root} element={<Home2 />} />
        <Route path={PAGES_ROUTES.signIn} element={<SignInPage />} />
        <Route path={PAGES_ROUTES.signUp} element={<SignUpPage />} />
        <Route path={PAGES_ROUTES.pages} element={<UserPages />} />
        <Route path={`${PAGES_ROUTES.page}/:id`} element={<UserPage />} />
        <Route path="/:url" element={<PageRenderer />} />
        <Route path={PAGES_ROUTES.faq} element={<Faq />} />
        <Route path={PAGES_ROUTES.support} element={<Support />} />
        <Route path={PAGES_ROUTES.profile} element={<Profile />} />
        <Route path={PAGES_ROUTES.privacy} element={<PrivacyPage />} />
        <Route path={PAGES_ROUTES.terms} element={<TermsPage />} />
        <Route path={PAGES_ROUTES.cookies} element={<CoockiesPoliciesPage />} />
        <Route
          path={`${PAGES_ROUTES.subscribe}/:planId`}
          element={<Subscribe />}
        />
        <Route path={PAGES_ROUTES.plans} element={<PlansPage />} />
        <Route
          path={PAGES_ROUTES.checkoutSuccess}
          element={<CheckoutSuccess />}
        />
        <Route
          path={PAGES_ROUTES.checkoutCancel}
          element={<CheckoutCancel />}
        />
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
