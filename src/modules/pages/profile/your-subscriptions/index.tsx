import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSubscriptions } from "../../../../store/user/actions";
import {
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  useMediaQuery,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { IApplicationState } from "../../../../store";
import SubscriptionDetailsDialog from "./dialog-sub-details";
import { InteractiveRow, TableContainer } from "./style";
import { formatToDateOnly } from "../../../../utils/dates";
import TriplePageTitle from "../../../components/page-title";
import strings from "../../../../localization";
import { COMPLEMENTARY_COLOR } from "../../../../styles/colors";
import { UserSubscription } from "../../../../store/user-subscriptions";

interface IFinanceProps {
  userId: string;
}

const YourSubscriptions = ({ userId }: IFinanceProps) => {
  const dispatch = useDispatch();
  const isSmallerThan500 = useMediaQuery("(max-width: 500px");
  const [errorMessage, setErrorMessage] = useState("");
  const [subscriptionToShowDetails, setSubscriptionToShowDetails] =
    useState<UserSubscription>();

  const subscriptions = useSelector(
    (state: IApplicationState) => state.user.subscriptions
  );

  const fetchSubscriptions = () => {
    dispatch(
      getSubscriptions(userId, undefined, (errorDetails: string) => {
        setErrorMessage(errorDetails);
      })
    );
  };

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  return (
    <>
      <TriplePageTitle
        titles={[strings.yourSubscriptions, strings.finance.subtitle, ""]}
        increasingSize
      />
      {subscriptions?.length && !errorMessage && (
        <TableContainer component={Paper} style={{ marginTop: "50px" }}>
          <Table>
            <TableHead>
              <TableRow
                style={{
                  borderBottom: "2px solid " + COMPLEMENTARY_COLOR,
                }}
              >
                <TableCell>
                  {strings.finance.profileTableHeaders.plan}
                </TableCell>
                <TableCell>{strings.value}</TableCell>
                {!isSmallerThan500 && (
                  <TableCell>
                    {strings.finance.profileTableHeaders.startDate}
                  </TableCell>
                )}
                <TableCell>
                  {strings.finance.profileTableHeaders.endDate}
                </TableCell>
                <TableCell>{strings.active}</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {subscriptions.map(
                (subscription: UserSubscription, index: number) => (
                  <InteractiveRow
                    key={subscription.subscriptionId}
                    onClick={() => setSubscriptionToShowDetails(subscription)}
                    index={index}
                  >
                    <TableCell>
                      <Stack gap="4px" direction="row">
                        <img
                          src={subscription.planImageUrl}
                          alt={subscription.planName}
                          height={20}
                          width="auto"
                        />
                        {subscription.planName} (
                        {subscription.interval === "year"
                          ? strings.recurrency.yearly
                          : strings.recurrency.monthly}
                        )
                      </Stack>
                    </TableCell>
                    <TableCell>
                      {Number(subscription.price / 100).toFixed(2)} (
                      {subscription.currency.toUpperCase()})
                    </TableCell>
                    {!isSmallerThan500 && (
                      <TableCell>
                        {formatToDateOnly(subscription.currentPeriodStart)}
                      </TableCell>
                    )}
                    <TableCell>
                      {formatToDateOnly(subscription.currentPeriodEnd)}
                    </TableCell>
                    <TableCell>
                      <span
                        style={{
                          fontWeight: 800,
                          color: subscription.canceledAt
                            ? "#ca2a2a"
                            : subscription.isActive
                            ? "#68c510"
                            : "black",
                        }}
                      >
                        {subscription.canceledAt
                          ? strings.subscriptionPayment.subscriptionStatuses
                          : subscription.isActive
                          ? strings.yes
                          : strings.no}
                      </span>
                    </TableCell>
                  </InteractiveRow>
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {subscriptionToShowDetails && (
        <SubscriptionDetailsDialog
          subscription={subscriptionToShowDetails}
          onClose={() => setSubscriptionToShowDetails(undefined)}
          onCancel={fetchSubscriptions}
        />
      )}
    </>
  );
};

export default YourSubscriptions;
