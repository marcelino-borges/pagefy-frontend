import { useNavigate, useSearchParams } from "react-router-dom";
import BannerHalfLayout from "../../components/site-content/banner-half-layout";
import { useCallback, useEffect, useState } from "react";
import {
  getCheckoutSessionById,
  getSubscriptionById,
} from "../../../services/payments";
import { Button, Link, Stack } from "@mui/material";
import strings from "../../../localization";
import { CheckoutSession } from "../../../store/checkout";
import LoadingSpinner from "../../components/loading-spinner";
import { Invoice } from "../../../store/invoice";
import PAGES_ROUTES from "../../../routes/paths";
import { useDispatch } from "react-redux";
import { getActiveSubscription, getUser } from "../../../store/user/actions";
import { showErrorToast } from "../../../utils/toast";
import { IUser } from "../../../store/user/types";
import { logAnalyticsEvent } from "../../../services/firebase-analytics";
import { ANALYTICS_EVENTS } from "../../../constants";
import { logPixelDefaultEvent } from "../../../services/pixel";

const CheckoutSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sessionIdParam = searchParams.get("session_id");
  const productIdParam = searchParams.get("product_id");
  const productNameParam = searchParams.get("product_name");
  const [sessionDetails, setSessionDetails] = useState<CheckoutSession>();
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  const fetchCheckoutSession = useCallback(
    async (sessionId: string) => {
      let checkoutSession: CheckoutSession | undefined;

      try {
        const res = await getCheckoutSessionById(sessionId);
        checkoutSession = res.data;

        setIsLoading(false);
        setSessionDetails(checkoutSession);

        logAnalyticsEvent(ANALYTICS_EVENTS.purchase, {
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

        if (checkoutSession.customer_email) {
          dispatch(
            getUser(
              checkoutSession.customer_email,
              (user: IUser) => {
                if (!user._id) return;

                dispatch(
                  getActiveSubscription(user._id, null, (error) => {
                    showErrorToast(`${error}. ${strings.signInAgain}`);
                  })
                );
              },
              (error) => {
                showErrorToast(`${error}. ${strings.signInAgain}`);
              }
            )
          );
        }
      } catch (error) {
        console.log(`Error fetching session (${sessionId}) details: `, error);
      }

      if (!checkoutSession?.subscription) return;

      try {
        const subscription = await getSubscriptionById(
          checkoutSession.subscription
        );

        if (!subscription.data.items.data?.length) return;

        const item = subscription.data.items.data[0];

        logPixelDefaultEvent("Purchase", {
          contents: [
            {
              id: item.price.id,
              quantity: 1,
            },
          ],
          content_ids: [item.price.id],
          currency: item.price.currency,
          value: item.price.unit_amount / 100,
          num_items: 1,
          content_type: "product",
        });

        logPixelDefaultEvent("Subscribe", {
          currency: item.price.currency,
          value: item.price.unit_amount / 100,
          predicted_ltv: item.price.unit_amount / 100,
        });
      } catch (error) {
        console.log(
          `Error fetching subscription (${checkoutSession.subscription}) details: `,
          error
        );
      }
    },
    [dispatch, productIdParam, productNameParam]
  );

  useEffect(() => {
    if (sessionIdParam) fetchCheckoutSession(sessionIdParam);
  }, [sessionIdParam, fetchCheckoutSession]);

  useEffect(() => {
    logAnalyticsEvent(ANALYTICS_EVENTS.pageView, {
      page_path: PAGES_ROUTES.checkoutSuccess,
    });
  }, []);

  return (
    <BannerHalfLayout bannerIndexToUse={3} bgPosition="0% 100%">
      {isLoading && <LoadingSpinner color="primary" />}
      {!isLoading && sessionDetails && (
        <Stack gap="32px">
          <h2 style={{ marginBottom: "16px" }}>{strings.congratulations}!</h2>
          <div>{strings.subscriptionPayment.succeeded}</div>
          <Button
            variant="contained"
            fullWidth={false}
            onClick={() => navigate(PAGES_ROUTES.userPages)}
          >
            {strings.accessDashboard}
          </Button>
          <div>
            {strings.or}{" "}
            {!!(sessionDetails.invoice as Invoice).invoice_pdf?.length && (
              <Link
                href={(sessionDetails.invoice as Invoice).invoice_pdf!}
                target="_blank"
              >
                {strings.subscriptionPayment.clickHereToSeeInvoice.toLowerCase()}
              </Link>
            )}
          </div>
        </Stack>
      )}
    </BannerHalfLayout>
  );
};

export default CheckoutSuccess;
