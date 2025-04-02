export interface EventParamsByEvent {
  CompleteRegistration: {
    currency?: string;
    value?: number;
    status: boolean;
  };
  Lead: {
    currency?: string;
    value?: number;
  };
  Contact: {
    name?: string;
    email?: string;
  };
  InitiateCheckout: {
    content_ids?: string[] | number[];
    contents?: { id: string; quantity: number }[];
    currency?: string;
    num_items?: number;
    value?: number;
  };
  Purchase: {
    content_ids?: string[] | number[];
    contents?: { id: string; quantity: number }[];
    currency: string;
    num_items?: number;
    value: number;
    content_type?: "product";
  };
  Subscribe: {
    currency: string;
    /**
     * Total predicted value for a subscriber
     */
    predicted_ltv: number;
    value: number;
  };
}

export type EventNameStringByString = keyof EventParamsByEvent;
