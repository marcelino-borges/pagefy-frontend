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

export enum CouponDuration {
  FOREVER = "forever",
  ONCE = "once",
  REPEATING = "repeating",
}

export interface Coupon {
  id: string;
  object: string;
  amount_off: number | null;
  created: number;
  currency: string | null;
  duration: CouponDuration;
  /**
   * If `duration` is `repeating`
   */
  duration_in_months: number | null;
  livemode: boolean;
  max_redemptions: number | null;
  metadata: any;
  name: string | null;
  percent_off: number | null;
  redeem_by: number | null;
  times_redeemed: number;
  valid: boolean;
}

export interface StripeSubscription {
  id: string;
  object: "subscription";
  application: string | null;
  application_fee_percent: number | null;
  automatic_tax: {
    disabled_reason: string | null;
    enabled: boolean;
    liability: string | null;
  };
  billing_cycle_anchor: number;
  billing_cycle_anchor_config: string | null;
  billing_thresholds: string | null;
  cancel_at: number | null;
  cancel_at_period_end: boolean;
  canceled_at: number | null;
  cancellation_details: {
    comment: string | null;
    feedback: string | null;
    reason: string | null;
  };
  collection_method: string;
  created: number;
  currency: string;
  current_period_end: number;
  current_period_start: number;
  customer: string;
  days_until_due: number | null;
  default_payment_method: string | null;
  default_source: string | null;
  default_tax_rates: any[];
  description: string | null;
  discount: any;
  discounts: any[];
  ended_at: number | null;
  invoice_settings: {
    account_tax_ids: string | null;
    issuer: {
      type: string;
    };
  };
  items: {
    object: string;
    data: {
      id: string;
      object: string;
      billing_thresholds: string | null;
      created: number;
      discounts: any[];
      metadata: Record<string, any>;
      plan: {
        id: string;
        object: string;
        active: boolean;
        aggregate_usage: string | null;
        amount: number;
        amount_decimal: string;
        billing_scheme: string;
        created: number;
        currency: string;
        interval: string;
        interval_count: number;
        livemode: boolean;
        metadata: Record<string, any>;
        meter: string | null;
        nickname: string | null;
        product: string;
        tiers_mode: string | null;
        transform_usage: string | null;
        trial_period_days: number | null;
        usage_type: string;
      };
      price: {
        id: string;
        object: string;
        active: boolean;
        billing_scheme: string;
        created: number;
        currency: string;
        custom_unit_amount: string | null;
        livemode: boolean;
        lookup_key: string;
        metadata: Record<string, any>;
        nickname: string | null;
        product: string;
        recurring: {
          aggregate_usage: string | null;
          interval: string;
          interval_count: number;
          meter: string | null;
          trial_period_days: number | null;
          usage_type: string;
        };
        tax_behavior: string;
        tiers_mode: string | null;
        transform_quantity: string | null;
        type: string;
        unit_amount: number;
        unit_amount_decimal: string;
      };
      quantity: number;
      subscription: string;
      tax_rates: any[];
    }[];
    has_more: boolean;
    total_count: number;
    url: string;
  };
  latest_invoice: string;
  livemode: boolean;
  metadata: Record<string, any>;
  next_pending_invoice_item_invoice: string | null;
  on_behalf_of: string | null;
  pause_collection: string | null;
  payment_settings: {
    payment_method_options: {
      acss_debit: string | null;
      bancontact: string | null;
      card: {
        network: string | null;
        request_three_d_secure: string;
      };
      customer_balance: string | null;
      konbini: string | null;
      sepa_debit: string | null;
      us_bank_account: string | null;
    };
    payment_method_types: string | null;
    save_default_payment_method: string;
  };
  pending_invoice_item_interval: string | null;
  pending_setup_intent: string | null;
  pending_update: string | null;
  plan: {
    id: string;
    object: string;
    active: boolean;
    aggregate_usage: string | null;
    amount: number;
    amount_decimal: string;
    billing_scheme: string;
    created: number;
    currency: string;
    interval: string;
    interval_count: number;
    livemode: boolean;
    metadata: Record<string, any>;
    meter: string | null;
    nickname: string | null;
    product: string;
    tiers_mode: string | null;
    transform_usage: string | null;
    trial_period_days: number | null;
    usage_type: string;
  };
  quantity: number;
  schedule: string | null;
  start_date: number;
  status: string;
  test_clock: string | null;
  transfer_data: string | null;
  trial_end: number | null;
  trial_settings: {
    end_behavior: {
      missing_payment_method: string;
    };
  };
  trial_start: number | null;
}
