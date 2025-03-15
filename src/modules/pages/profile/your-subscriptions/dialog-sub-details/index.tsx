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
import { showErrorToast } from "../../../../../utils/toast";
import LoadingSpinner from "../../../../components/loading-spinner";
import { Delete } from "@mui/icons-material";
import { ACESSIBILITY_RED } from "../../../../../styles/colors";
import { useDispatch, useSelector } from "react-redux";
import { cancelSubscription } from "../../../../../store/user/actions";
import { IApplicationState } from "../../../../../store";
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
  const dispatch = useDispatch();
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const isUserStateLoading = useSelector(
    (state: IApplicationState) => state.user.loading
  );

  const onCancelSubscription = async () => {
    dispatch(
      cancelSubscription(
        subscription.subscriptionId,
        () => {
          onCancel();
          onClose();
        },
        (error) => {
          console.log("Error canceling subscription: ", error);
          showErrorToast(strings.subscriptionPayment.cancelSubscriptionError);
        }
      )
    );
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
              <strong>
                {Number(subscription.price / 100).toFixed(2)} (
                {subscription.currency.toUpperCase()})
              </strong>
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
            sx={{
              color: ACESSIBILITY_RED,
              "&:hover": { backgroundColor: ACESSIBILITY_RED },
            }}
            disabled={isUserStateLoading}
          >
            <Stack direction="row" gap="8px" alignItems="center">
              {isUserStateLoading && <LoadingSpinner color="black" size={12} />}
              <Delete fontSize="small" />
              {strings.subscriptionPayment.cancelSubscription}
            </Stack>
          </Button>
          <Button
            onClick={() => {
              onClose();
            }}
            disabled={isUserStateLoading}
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
