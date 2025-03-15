export interface UserSubscription {
  subscriptionId: string;
  stripeProductId: string;
  isActive: boolean;
  interval: string;
  currency: string;
  onlineReceiptUrl: string;
  price: number;
  captureDate: Date;
  planName: string;
  planImageUrl: string;
  invoiceOnlineUrl: string | null;
  invoiceDownloadPdf: string | null;
  willCancelAt: Date | null;
  canceledAt: Date | null;
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
}

export interface PlanFeatures {
  _id: string;
  stripeProductId: string;
  description: string;
  maxPages: number;
  animations: boolean;
  specialSupport: boolean;
  componentActivationSchedule: boolean;
  analytics: boolean;
  customJs: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface SubscriptionDetails {
  subscription: UserSubscription;
  features: PlanFeatures;
}
