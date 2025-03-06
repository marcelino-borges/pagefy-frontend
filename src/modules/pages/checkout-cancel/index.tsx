import { useNavigate } from "react-router-dom";
import BannerHalfLayout from "../../components/site-content/banner-half-layout";
import { Button, Stack } from "@mui/material";
import strings from "../../../localization";
import routes from "../../../routes/paths";

const CheckoutCancel = () => {
  const navigate = useNavigate();

  return (
    <BannerHalfLayout bannerIndexToUse={9} bgPosition="0% 100%">
      <Stack gap="32px">
        <h2 style={{ marginBottom: "16px" }}>
          {strings.subscriptionPayment.paymentCancelled}
        </h2>
        <Button
          variant="contained"
          fullWidth={false}
          onClick={() => navigate(routes.pages)}
        >
          {strings.accessDashboard}
        </Button>
      </Stack>
    </BannerHalfLayout>
  );
};

export default CheckoutCancel;
