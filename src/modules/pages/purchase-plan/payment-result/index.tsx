import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import strings from "../../../../localization";
import { clearPurchaseState } from "../../../../store/purchase/actions";
import Header from "../../../components/header";
import ThinWidthContent from "../../../components/site-content/thin-width";
import DoneIcon from "@mui/icons-material/Done";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import ErrorIcon from "@mui/icons-material/Error";
import { Grid } from "@mui/material";
import InternalLink from "../../../components/internal-link/index";
import routes from "../../../../routes/paths";
import { translateErrorMessage } from "../utils";
import LoadingSpinner from "../../../components/loading-spinner";
import { SECONDARY_COLOR } from "../../../../styles/colors";

const PaymentResult = () => {
  const dispatch = useDispatch();

  const [resultStatus, setResultStatus] = useState<string | null | undefined>(
    ""
  );

  useEffect(() => {
    console.log("opening result screen");
    return () => {
      dispatch(clearPurchaseState());
    };
  }, [dispatch]);

  useEffect(() => {
    const redirectStatus = new URLSearchParams(window.location.search).get(
      "redirect_status"
    );

    setResultStatus(redirectStatus);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getIconByResultStatus = (resultStatus: string) => {
    switch (resultStatus) {
      case "succeeded":
        return (
          <DoneIcon
            color="primary"
            fontSize="inherit"
            style={{ fontSize: "100px" }}
          />
        );
      case "processing":
        return (
          <HourglassEmptyIcon
            color="info"
            fontSize="inherit"
            style={{ fontSize: "100px" }}
          />
        );
      case "failed":
      case "firebase_token":
      case "requires_payment_method":
        return (
          <ErrorIcon
            color="error"
            fontSize="inherit"
            style={{ fontSize: "100px" }}
          />
        );
      default:
        return <></>;
    }
  };

  return (
    <>
      <Header />
      <ThinWidthContent>
        {resultStatus ? (
          <div
            style={{
              margin: "auto",
            }}
          >
            <Grid justifyContent="center" textAlign="center">
              {getIconByResultStatus(resultStatus)}
            </Grid>
            <Grid textAlign="center" pt="32px">
              {translateErrorMessage(resultStatus)}
            </Grid>
            <Grid justifyContent="center" textAlign="center" pt="50px">
              <InternalLink to={routes.pages}>{strings.goToPages}</InternalLink>
            </Grid>
          </div>
        ) : (
          <div
            style={{
              margin: "auto",
            }}
          >
            <LoadingSpinner size={40} color={SECONDARY_COLOR} />
          </div>
        )}
      </ThinWidthContent>
    </>
  );
};

export default PaymentResult;
