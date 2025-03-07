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
import { ISubscriptionCreationResult } from "./../../../../../store/purchase/types";
import {
  getPlanNameByPriceId,
  translateStatus,
} from "./../../../../../utils/stripe/index";
interface ISubscriptionDetailsDialogProps {
  subscription: ISubscriptionCreationResult;
  onClose: () => void;
}

const SubscriptionDetailsDialog = ({
  subscription,
  onClose,
}: ISubscriptionDetailsDialogProps) => {
  console.log("Object.keys(subscription):", Object.keys(subscription));
  return (
    <Dialog
      open={true}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      style={{ minWidth: "300px" }}
    >
      <DialogTitle>{`${strings.subscription} ${getPlanNameByPriceId(
        subscription.priceId
      )}`}</DialogTitle>
      <DialogContent>
        <Stack direction="column" gap="8px" mt="24px">
          <div>
            ID: <strong>{subscription.subscriptionId}</strong>
          </div>
          <div>
            {strings.recurrency.titleSingular}:{" "}
            <strong>{subscription.recurrency}</strong>
          </div>
          <div>
            {strings.subscriptionPayment.amountPaid}:{" "}
            <strong>{subscription.latestInvoice?.amount_paid || "0"}</strong>
          </div>
          <div>
            {strings.finance.profileTableHeaders.status}:{" "}
            <strong>{translateStatus(subscription.status)}</strong>
          </div>
          <div>
            {strings.finance.profileTableHeaders.startDate}:{" "}
            <strong>{formatToDateOnly(subscription.subscriptionStart)}</strong>
          </div>
          <div>
            {strings.finance.profileTableHeaders.endDate}:{" "}
            <strong>{formatToDateOnly(subscription.subscriptionEnd)}</strong>
          </div>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            onClose();
          }}
        >
          {strings.back}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SubscriptionDetailsDialog;
