import { EventParams } from "firebase/analytics";

export interface EventParamsByEvent {
  begin_checkout: {
    currency?: EventParams["currency"];
    coupon?: EventParams["coupon"];
    value?: EventParams["value"];
    items?: EventParams["items"];
    [key: string]: any;
  };
  login: {
    method?: EventParams["method"];
    [key: string]: any;
  };
  page_view: {
    page_title?: string;
    page_location?: string;
    page_path?: string;
    [key: string]: any;
  };
  purchase: {
    value?: EventParams["value"];
    currency?: EventParams["currency"];
    transaction_id: EventParams["transaction_id"];
    tax?: EventParams["tax"];
    shipping?: EventParams["shipping"];
    items?: EventParams["items"];
    coupon?: EventParams["coupon"];
    affiliation?: EventParams["affiliation"];
    [key: string]: any;
  };
  purchase_cancel: {
    value?: EventParams["value"];
    currency?: EventParams["currency"];
    transaction_id: EventParams["transaction_id"];
    tax?: EventParams["tax"];
    shipping?: EventParams["shipping"];
    items?: EventParams["items"];
    coupon?: EventParams["coupon"];
    affiliation?: EventParams["affiliation"];
    [key: string]: any;
  };
  refund: {
    value?: EventParams["value"];
    currency?: EventParams["currency"];
    transaction_id: EventParams["transaction_id"];
    tax?: EventParams["tax"];
    shipping?: EventParams["shipping"];
    items?: EventParams["items"];
    coupon?: EventParams["coupon"];
    affiliation?: EventParams["affiliation"];
    [key: string]: any;
  };
  select_content: {
    content_type?: EventParams["content_type"];
    item_id?: EventParams["item_id"];
    [key: string]: any;
  };
  select_item: {
    items?: EventParams["items"];
    item_list_name?: EventParams["item_list_name"];
    item_list_id?: EventParams["item_list_id"];
    [key: string]: any;
  };
  select_promotion: {
    items?: EventParams["items"];
    promotion_id?: EventParams["promotion_id"];
    promotion_name?: EventParams["promotion_name"];
    [key: string]: any;
  };
  view_promotion: {
    items?: EventParams["items"];
    promotion_id?: EventParams["promotion_id"];
    promotion_name?: EventParams["promotion_name"];
    [key: string]: any;
  };
  share: {
    method?: EventParams["method"];
    content_type?: EventParams["content_type"];
    item_id?: EventParams["item_id"];
    [key: string]: any;
  };
  sign_up: {
    method?: EventParams["method"];
    [key: string]: any;
  };
  view_item: {
    currency?: EventParams["currency"];
    items?: EventParams["items"];
    value?: EventParams["value"];
    [key: string]: any;
  };
  user_page_delete: {
    page_id: string;
    email?: string;
  };
  userTurnsPagePublic: {
    page_id: string;
    email?: string;
  };
  user_turns_page_private: {
    page_id: string;
    email?: string;
  };
  view_item_list: {
    items?: EventParams["items"];
    item_list_name?: EventParams["item_list_name"];
    item_list_id?: EventParams["item_list_id"];
    [key: string]: any;
  };
  exception: {
    description?: EventParams["description"];
    fatal?: EventParams["fatal"];
    [key: string]: any;
  };
}

export type EventNameStringByString = keyof EventParamsByEvent;
