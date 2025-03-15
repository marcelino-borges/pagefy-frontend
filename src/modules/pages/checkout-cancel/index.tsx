import { useNavigate, useSearchParams } from "react-router-dom";
import BannerHalfLayout from "../../components/site-content/banner-half-layout";
import { Button, Stack } from "@mui/material";
import strings from "../../../localization";
import PAGES_ROUTES from "../../../routes/paths";
import { useCallback, useEffect, useState } from "react";
import { logAnalyticsEvent } from "../../../services/firebase-analytics";
import { ANALYTICS_EVENTS } from "../../../constants";
import { getCheckoutSessionById } from "../../../services/payments";
import LoadingSpinner from "../../components/loading-spinner";
import { CheckoutSession } from "../../../store/checkout";

const CheckoutCancel = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sessionIdParam = searchParams.get("session_id");
  const productIdParam = searchParams.get("product_id");
  const productNameParam = searchParams.get("product_name");
  const [isLoading, setIsLoading] = useState(true);
  const [sessionDetails, setSessionDetails] = useState<CheckoutSession>();

  const fetchCheckoutSession = useCallback(
    async (sessionId: string) => {
      try {
        const res = await getCheckoutSessionById(sessionId);
        const checkoutSession = res.data;

        setIsLoading(false);
        setSessionDetails(checkoutSession);

        logAnalyticsEvent(ANALYTICS_EVENTS.purchaseCancel, {
          transaction_id: checkoutSession.id,
          value: checkoutSession.amount_total,
          currency: checkoutSession.currency,
          items: [
            {
              creative_name: productNameParam ?? undefined,
              item_name: productNameParam ?? undefined,
              item_id: productIdParam ?? undefined,
              coupon: checkoutSession.discounts[0].coupon,
              discount: checkoutSession.total_details.amount_discount,
              price: checkoutSession.amount_total,
            },
          ],
        });
      } catch (error) {
        console.log("Error fetching session details: ", error);
      }
    },
    [productIdParam, productNameParam]
  );

  useEffect(() => {
    if (sessionIdParam) fetchCheckoutSession(sessionIdParam);
  }, [fetchCheckoutSession, sessionIdParam]);

  useEffect(() => {
    logAnalyticsEvent(ANALYTICS_EVENTS.pageView, {
      page_path: PAGES_ROUTES.checkoutCancel,
    });
  }, []);

  return (
    <BannerHalfLayout bannerIndexToUse={9} bgPosition="0% 100%">
      {isLoading && <LoadingSpinner color="primary" />}
      {!isLoading && sessionDetails && (
        <Stack gap="32px">
          <h2 style={{ marginBottom: "16px" }}>
            {strings.subscriptionPayment.paymentCancelled}
          </h2>
          <Button
            variant="contained"
            fullWidth={false}
            onClick={() => navigate(PAGES_ROUTES.pages)}
          >
            {strings.accessDashboard}
          </Button>
        </Stack>
      )}
    </BannerHalfLayout>
  );
};

export default CheckoutCancel;
