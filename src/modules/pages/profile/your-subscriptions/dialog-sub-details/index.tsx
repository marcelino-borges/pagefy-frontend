import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from "@mui/material";
import strings from "../../../../../localization";
import { formatToDateOnly } from "../../../../../utils/dates";
import { UserSubscription } from "../../../../../store/user-subscriptions";
import DialogConfirmation from "../../../../components/dialog-confirmation";
import { useState } from "react";
import { cancelSubscription } from "../../../../../services/payments";
import { showErrorToast } from "../../../../../utils/toast";
import LoadingSpinner from "../../../../components/loading-spinner";
interface ISubscriptionDetailsDialogProps {
  subscription: UserSubscription;
  onClose: () => void;
  onCancel: () => void;
}

const SubscriptionDetailsDialog = ({
  subscription,
  onClose,
  onCancel,
}: ISubscriptionDetailsDialogProps) => {
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [isCanceling, setIsCanceling] = useState(false);

  const onCancelSubscription = async () => {
    setIsCanceling(true);
    try {
      await cancelSubscription(subscription.subscriptionId);
      onCancel();
      onClose();
    } catch (error) {
      console.log("Error canceling subscription: ", error);
      showErrorToast(strings.subscriptionPayment.cancelSubscriptionError);
    }
    setIsCanceling(false);
  };

  return (
    <>
      <Dialog
        open={true}
        onClose={onClose}
        fullWidth
        maxWidth="sm"
        style={{ minWidth: "300px" }}
      >
        <DialogTitle>{`${strings.subscription} ${subscription.planName}`}</DialogTitle>
        <DialogContent>
          <Stack direction="column" gap="8px" mt="24px">
            <div>
              ID: <strong>{subscription.subscriptionId}</strong>
            </div>
            <div>
              {strings.recurrency.titleSingular}:{" "}
              <strong>
                {subscription.interval === "year"
                  ? strings.recurrency.yearly
                  : strings.recurrency.monthly}
              </strong>
            </div>
            <div>
              {strings.subscriptionPayment.amountPaid}:{" "}
              <strong>{Number(subscription.price).toFixed(2)}</strong>
            </div>
            <div>
              {strings.finance.profileTableHeaders.status}:{" "}
              <strong>
                {subscription.isActive ? strings.active : strings.inactive}
              </strong>
            </div>
            <div>
              {strings.finance.profileTableHeaders.startDate}:{" "}
              <strong>
                {formatToDateOnly(subscription.currentPeriodStart)}
              </strong>
            </div>
            <div>
              {strings.finance.profileTableHeaders.endDate}:{" "}
              <strong>{formatToDateOnly(subscription.currentPeriodEnd)}</strong>
            </div>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setCancelDialogOpen(true);
            }}
            variant="muted"
            disabled={isCanceling}
          >
            <Stack direction="row" gap="8px" alignItems="center">
              {isCanceling && <LoadingSpinner color="black" size={12} />}
              {strings.subscriptionPayment.cancelSubscription}
            </Stack>
          </Button>
          <Button
            onClick={() => {
              onClose();
            }}
            disabled={isCanceling}
          >
            {strings.back}
          </Button>
        </DialogActions>
      </Dialog>
      <DialogConfirmation
        message={`${strings.subscriptionPayment.cancelSubscriptionConfirm} ${strings.actionCannotBeUndone}.`}
        title={strings.subscriptionPayment.cancelSubscription}
        confirmText={strings.yes}
        refuseText={strings.no}
        open={cancelDialogOpen}
        onClose={() => setCancelDialogOpen(false)}
        onRefuseCallback={() => setCancelDialogOpen(false)}
        onConfirmCallback={onCancelSubscription}
      />
    </>
  );
};

export default SubscriptionDetailsDialog;
