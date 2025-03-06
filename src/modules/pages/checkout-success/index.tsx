import { useNavigate, useSearchParams } from "react-router-dom";
import BannerHalfLayout from "../../components/site-content/banner-half-layout";
import { useEffect, useState } from "react";
import { getCheckoutSessionById } from "../../../services/payments";
import { Button, Link, Stack } from "@mui/material";
import strings from "../../../localization";
import { CheckoutSession } from "../../../store/checkout";
import LoadingSpinner from "../../components/loading-spinner";
import { Invoice } from "../../../store/invoice";
import routes from "../../../routes/paths";

const CheckoutSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const sessionIdParam = searchParams.get("session_id");
  const [sessionDetails, setSessionDetails] = useState<CheckoutSession>();
  const [isLoading, setIsLoading] = useState(true);

  const fetchCheckoutSession = async (sessionId: string) => {
    try {
      const res = await getCheckoutSessionById(sessionId);
      const checkoutSession = res?.data;

      setIsLoading(false);

      if (checkoutSession) {
        setSessionDetails(checkoutSession);
      }
    } catch (error) {
      console.log("Error fetching session details: ", error);
    }
  };

  useEffect(() => {
    if (sessionIdParam) fetchCheckoutSession(sessionIdParam);
  }, [sessionIdParam]);

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
            onClick={() => navigate(routes.pages)}
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
