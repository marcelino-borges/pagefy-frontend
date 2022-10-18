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

  return (
    <>
      {errorMessage || (
        <>
          <TableContainer component={Paper} style={{}}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Plano</TableCell>
                  {!isSmallerThan500 && <TableCell>Início</TableCell>}
                  <TableCell>Fim</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {subscriptions?.length &&
                  subscriptions.map(
                    (
                      subscription: ISubscriptionCreationResult,
                      index: number
                    ) => (
                      <InteractiveRow
                        key={subscription.subscriptionId}
                        onClick={() =>
                          setSubscriptionToShowDetails(subscription)
                        }
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
                          {translateStatus(subscription.status)}
                        </TableCell>
                      </InteractiveRow>
                    )
                  )}
              </TableBody>
            </Table>
          </TableContainer>
        </>
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
