import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSubscriptions } from "./../../../../store/user/actions";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  useMediaQuery,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { IApplicationState } from "./../../../../store";
import { ISubscriptionCreationResult } from "../../../../store/purchase/types";
import {
  getPlanNameByPriceId,
  translateStatus,
} from "./../../../../utils/stripe";
import SubscriptionDetailsDialog from "./dialog-sub-details";
import { InteractiveRow, TableContainer } from "./style";
import { formatToDateOnly } from "../../../../utils/dates";
import TriplePageTitle from "../../../components/page-title";
import strings from "../../../../localization";
import {
  COMPLEMENTARY_COLOR,
  PRIMARY_COLOR,
} from "./../../../../styles/colors";

interface IFinanceProps {
  userId: string;
}

const Finance = ({ userId }: IFinanceProps) => {
  const dispatch = useDispatch();
  const isSmallerThan500 = useMediaQuery("(max-width: 500px");
  const [errorMessage, setErrorMessage] = useState("");
  const [subscriptionToShowDetails, setSubscriptionToShowDetails] =
    useState<ISubscriptionCreationResult>();

  const subscriptions = useSelector(
    (state: IApplicationState) => state.user.subscriptions
  );

  useEffect(() => {
    dispatch(
      getSubscriptions(userId, undefined, (errorDetails: string) => {
        setErrorMessage(errorDetails);
      })
    );
  }, [dispatch, userId]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "succeeded":
        return PRIMARY_COLOR;
      case "failed":
        return "red";
      default:
        return "black";
    }
  };

  return (
    <>
      <TriplePageTitle
        titles={[strings.finance.title, strings.finance.subtitle, ""]}
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
                {!isSmallerThan500 && (
                  <TableCell>
                    {strings.finance.profileTableHeaders.startDate}
                  </TableCell>
                )}
                <TableCell>
                  {strings.finance.profileTableHeaders.endDate}
                </TableCell>
                <TableCell>
                  {strings.finance.profileTableHeaders.status}
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {subscriptions
                .sort(
                  (
                    a: ISubscriptionCreationResult,
                    b: ISubscriptionCreationResult
                  ) => {
                    const aUpdate = new Date(a.updatedAt).getTime();
                    const bUpdate = new Date(b.updatedAt).getTime();

                    return bUpdate - aUpdate;
                  }
                )
                .map(
                  (
                    subscription: ISubscriptionCreationResult,
                    index: number
                  ) => (
                    <InteractiveRow
                      key={subscription.subscriptionId}
                      onClick={() => setSubscriptionToShowDetails(subscription)}
                      index={index}
                    >
                      <TableCell>
                        {getPlanNameByPriceId(subscription.priceId)}
                      </TableCell>
                      {!isSmallerThan500 && (
                        <TableCell>
                          {formatToDateOnly(subscription.subscriptionStart)}
                        </TableCell>
                      )}
                      <TableCell>
                        {formatToDateOnly(subscription.subscriptionEnd)}
                      </TableCell>
                      <TableCell>
                        <span
                          style={{
                            color: getStatusColor(subscription.status),
                          }}
                        >
                          {translateStatus(subscription.status)}
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
        />
      )}
    </>
  );
};

export default Finance;
