export interface UserSubscription {
  subscriptionId: string;
  isActive: boolean;
  interval: string;
  currency: string;
  onlineReceiptUrl: string;
  price: number;
  captureDate: Date;
  planName: string;
  planImageUrl: string;
  invoiceOnlineUrl: string;
  invoiceDownloadPdf: string;
  willCancelAt: Date | null;
  canceledAt: Date | null;
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
}
