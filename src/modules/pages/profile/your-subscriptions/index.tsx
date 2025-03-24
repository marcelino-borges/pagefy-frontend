import { useCallback, useEffect, useState } from "react";
import {
  Grid,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  useMediaQuery,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import SubscriptionDetailsDialog from "./dialog-sub-details";
import { InteractiveRow, TableContainer } from "./style";
import { formatToDateOnly } from "../../../../utils/dates";
import TriplePageTitle from "../../../components/page-title";
import strings from "../../../../localization";
import { COMPLEMENTARY_COLOR } from "../../../../styles/colors";
import {
  PlanFeatures,
  UserSubscription,
} from "../../../../store/user-subscriptions";
import { getUserSubscriptions } from "../../../../services/payments";
import {
  toBase64,
  translateBoolToActiveInactive,
  translateBoolToYesNo,
} from "../../../../utils";
import LoadingSpinner from "../../../components/loading-spinner";
import { ANALYTICS_EVENTS } from "../../../../constants";
import PAGES_ROUTES from "../../../../routes/paths";
import { logAnalyticsEvent } from "../../../../services/firebase-analytics";
import { useSelector } from "react-redux";
import { IApplicationState } from "../../../../store";

interface IFinanceProps {
  userId: string;
  activeSubscription?: UserSubscription;
  planFeatures?: PlanFeatures;
}

const YourSubscriptions = ({
  userId,
  activeSubscription,
  planFeatures,
}: IFinanceProps) => {
  const isSmallerThan500 = useMediaQuery("(max-width: 500px");
  const [errorMessage, setErrorMessage] = useState("");
  const [isFetchingSubscription, setIsFetchingSubscription] = useState(false);
  const [subscriptionToShowDetails, setSubscriptionToShowDetails] =
    useState<UserSubscription>();

  const [subscriptions, setSubscriptions] = useState<UserSubscription[]>([]);

  const userProfile = useSelector(
    (state: IApplicationState) => state.user.profile
  );

  const fetchSubscriptions = useCallback(async () => {
    setIsFetchingSubscription(true);
    try {
      const subs = await getUserSubscriptions(userId);
      setSubscriptions(subs.data);
    } catch (error) {
      setErrorMessage((error as Error).message);
    }
    setIsFetchingSubscription(false);
  }, [userId]);

  useEffect(() => {
    fetchSubscriptions();
  }, [fetchSubscriptions]);

  useEffect(() => {
    logAnalyticsEvent(ANALYTICS_EVENTS.pageView, {
      page_path: PAGES_ROUTES.profile + "/your-subscriptions",
      page_title: "Profile Your Subscriptions",
      email: toBase64(userProfile?.email),
    });
  }, [userProfile?.email]);

  return (
    <>
      <TriplePageTitle
        titles={[strings.yourSubscriptions, strings.finance.subtitle, ""]}
        increasingSize
      />
      <Grid item pb="8px" mt="32px">
        <h3 style={{ fontWeight: 400 }}>
          <span>{`${strings.yourPlanIs}: `}</span>
          <span>
            <strong>
              <i>
                {activeSubscription
                  ? activeSubscription.planName
                  : strings.freePlan.name}
              </i>
            </strong>
          </span>
          {activeSubscription && (
            <span>
              {" "}
              ({strings.endsAt}{" "}
              {formatToDateOnly(activeSubscription.currentPeriodEnd)})
            </span>
          )}
        </h3>
        <h3>{strings.planFeatures.whatYourPlanHas}:</h3>
        <Stack direction="column" gap="8px" mt="16px" fontSize="0.8rem">
          <Stack direction="column" gap="8px">
            {strings.freePlan.benefits.map((benefit) => (
              <div key={benefit + Math.round(Math.random() * 10000)}>
                - {benefit}: <strong>{translateBoolToYesNo(true)}</strong>
              </div>
            ))}
          </Stack>
          <div>
            - {strings.planFeatures.maxPages}:{" "}
            <strong>{planFeatures ? planFeatures.maxPages : 1}</strong>
          </div>
          <div>
            - {strings.planFeatures.animations}:{" "}
            <strong>
              {translateBoolToYesNo(
                planFeatures ? planFeatures.animations : false
              )}
            </strong>
          </div>
          <div>
            - {strings.planFeatures.customJs}:{" "}
            <strong>
              {translateBoolToYesNo(
                planFeatures ? planFeatures.customJs : false
              )}
            </strong>
          </div>
          <div>
            - {strings.planFeatures.launchDateComponent}:{" "}
            <strong>
              {translateBoolToYesNo(
                planFeatures ? planFeatures.componentActivationSchedule : false
              )}
            </strong>
          </div>
          <div>
            - {strings.planFeatures.analytics}:{" "}
            <strong>
              {translateBoolToYesNo(
                planFeatures ? planFeatures.analytics : false
              )}
            </strong>
          </div>
          <div>
            - {strings.planFeatures.specialSupport}:{" "}
            <strong>
              {translateBoolToYesNo(
                planFeatures ? planFeatures.specialSupport : false
              )}
            </strong>
          </div>
        </Stack>
      </Grid>
      {isFetchingSubscription && (
        <Stack direction="row" gap="16px" mt="50px" alignItems="center">
          <LoadingSpinner color="black" size={30} />
          {strings.findingSubscriptionsHistory}
        </Stack>
      )}
      {!isFetchingSubscription && !!subscriptions?.length && !errorMessage && (
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
                <TableCell>{strings.status}</TableCell>
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
                        {!!subscription.canceledAt
                          ? strings.subscriptionPayment.subscriptionStatuses
                              .canceled
                          : translateBoolToActiveInactive(
                              subscription.isActive
                            )}
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
