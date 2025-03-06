interface Recurring {
  aggregate_usage: string | null;
  interval: "month" | "year";
  interval_count: number;
  meter: string | null;
  trial_period_days: number | null;
  usage_type: "licensed" | "metered";
}

interface Price {
  id: string;
  currency: string;
  lookup_key: string;
  product: string;
  recurring: Recurring;
  type: "one_time" | "recurring";
  unit_amount: number;
  unit_amount_decimal: string;
  created_at: string;
}

interface Features {
  pt: string[];
  en: string[];
}

export interface SubscriptionPlan {
  id: string;
  default_price: string;
  description: string;
  features: Features;
  images: string[];
  url: string | null;
  created_at: string;
  updated_at: string;
  name: string;
  prices: Price[];
}
