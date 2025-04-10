export const LETTER_WIDTH = 15;
export const IMAGE_EXTENSIONS = "image/gif,image/jpeg,image/png,image/webp";
export const YOUTUBE_EMBED_PREFIX = "https://www.youtube.com/embed/";
export const YOUTUBE_SHORT_URL_IDENTIFIER = "youtu.be/";
export const YOUTUBE_FULL_URL_IDENTIFIER = "watch?v=";
export const YOUTUBE_EMBED_URL_IDENTIFIER = "/embed/";
export const RENDERED_PAGE_COMPONENT_HEIGHT = 56;
export const RENDERED_PAGE_LAUNCH_COMPONENT_ROWS = 4;
export const MAXIMUM_FILE_SIZE = 3; //In MB
export const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z]).{8,}$/m;
export const EMAIL_REGEX = /^.+@.+..+$/im;
export const MAILTO_REGEX = /^(mailto:){1}( )?.+@.+..+/im;
export const TEL_REGEX = /^(tel:){1}( )?(\+)?[0-9]+/im;
export const CALLTO_REGEX = /^(callto:){1}( )?.+/im;
export const SMS_REGEX = /^(sms:){1}( )?(\+)?[0-9]+/im;
export const FAX_REGEX = /^(fax:){1}( )?(\+)?[0-9]+/im;
export const TOKEN_AUTH_ERROR = "auth/invalid-token";
export const MIN_WEBSITE_WIDTH = "275px";
export const HEADER_HEIGHT_DESKTOP = "100px";
export const HEADER_HEIGHT_MOBILE = "70px";
export const FOOTER_HEIGHT = "100px";
export const GDPR_CONSENT_STORAGE_KEY = "gdprConsent";
export const LINK_VALIDATOR_REGEX = new RegExp(
  "(https?:\\/\\/){1,}" + // protocol
    "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
    "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
    "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
    "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
    "(\\#[-a-z\\d_]*)?",
  "i"
);

export const COMPONENT_ANIMATIONS = [
  "bounce",
  "bounceIn",
  "bounceInDown",
  "bounceInLeft",
  "bounceInRight",
  "bounceInUp",
  "bounceOut",
  "bounceOutDown",
  "bounceOutLeft",
  "bounceOutRight",
  "bounceOutUp",
  "fadeIn",
  "fadeInDown",
  "fadeInDownBig",
  "fadeInLeft",
  "fadeInLeftBig",
  "fadeInRight",
  "fadeInRightBig",
  "fadeInUp",
  "fadeInUpBig",
  "fadeOut",
  "fadeOutDown",
  "fadeOutDownBig",
  "fadeOutLeft",
  "fadeOutLeftBig",
  "fadeOutRight",
  "fadeOutRightBig",
  "fadeOutUp",
  "fadeOutUpBig",
  "flash",
  "flip",
  "flipInX",
  "flipInY",
  "flipOutX",
  "flipOutY",
  "headShake",
  "hinge",
  "jello",
  "lightSpeedIn",
  "lightSpeedOut",
  "pulse",
  "rollIn",
  "rollOut",
  "rotateIn",
  "rotateInDownLeft",
  "rotateInDownRight",
  "rotateInUpLeft",
  "rotateInUpRight",
  "rotateOut",
  "rotateOutDownLeft",
  "rotateOutDownRight",
  "rotateOutUpLeft",
  "rotateOutUpRight",
  "rubberBand",
  "shake",
  "slideInDown",
  "slideInLeft",
  "slideInRight",
  "slideInUp",
  "slideOutDown",
  "slideOutLeft",
  "slideOutRight",
  "slideOutUp",
  "swing",
  "tada",
  "wobble",
  "zoomIn",
  "zoomInDown",
  "zoomInLeft",
  "zoomInRight",
  "zoomInUp",
  "zoomOut",
  "zoomOutDown",
  "zoomOutLeft",
  "zoomOutRight",
  "zoomOutUp",
];

export const ALLOW_SIGNUP = process.env.REACT_APP_ALLOW_SIGNUP === "true";

export const RECAPTCHA_SITE_KEY = process.env.REACT_APP_RECAPTCHA_SITE_KEY;

export const APP_ENVIROMENT = process.env.REACT_APP_ENV || "PROD";
export const ALLOW_PURCHASE = process.env.REACT_APP_ALLOW_PURCHASE === "true";

export enum GalleryContext {
  BACKGROUND,
  USER_PROFILE,
  PAGE_IMAGE,
  BUTTONS,
}

export const COMPONENT_MAX_ROWS = 8;
export const COMPONENT_MAX_COLUMNS = 2;
export enum ComponentBorderRadius {
  SQUARE = 0,
  SMOOTH_ROUNDED = 10,
  NORMAL_ROUNDED = 16,
  HARD_ROUNDED = 20,
  ROUNDED = 30,
}
export enum ComponentShadowStyle {
  NONE = "0px 0px 0px rgba(0, 0, 0, 0)",
  SMOOTH = "0px 4px 4px rgba(0, 0, 0, 0.06)",
  NORMAL = "0px 4px 4px rgba(0, 0, 0, 0.1)",
  HARD = "0px 4px 4px rgba(0, 0, 0, 0.3)",
  EXTREME = "0px 4px 1px rgba(0, 0, 0, 1)",
}
export const DEFAULT_COMPONENT_RADIUS = ComponentBorderRadius.SMOOTH_ROUNDED;

export const STRIPE_PUBLIC_KEY = process.env.REACT_APP_STRIPE_PUBLIC_KEY || "";

export const PRICES = {
  // TODO: buscar de collection de configs do mongo
  vip: {
    eur: {
      month: 990,
      year: 9990,
    },
    usd: {
      month: 990,
      year: 9990,
    },
    brl: {
      month: 1990,
      year: 19990,
    },
  },
  platinum: {
    eur: {
      month: 1990,
      year: 19990,
    },
    usd: {
      month: 1990,
      year: 19990,
    },
    brl: {
      month: 3990,
      year: 39990,
    },
  },
};

export const PLANS = {
  neon: "Neon",
  boost: "Boost",
};

export const CURRENCY_ABBREVIATIONS = {
  usd: "U$",
  brl: "R$",
} as const;

export const ANALYTICS_EVENTS = {
  /**
   * User logs in (Google default)
   */
  login: "login",
  /**
   * User completes a purchase (Google default)
   */
  purchase: "purchase",
  /**
   * User receives a refund (Google default)
   */
  refund: "refund",
  /**
   * User selects content on your website or app (Google default)
   */
  selectContent: "select_content",
  /**
   * User shares content from your website or app (Google default)
   */
  share: "share",
  /**
   * User signs up for an account on your website or app (Google default)
   */
  signUp: "sign_up",
  /**
   * User begins checkout (Google default)
   */
  beginCheckout: "begin_checkout",
  /**
   * User selects an item from a list of items or offerings (Google default)
   */
  selectItem: "select_item",
  /**
   * User selects a promotion (Google default)
   */
  selectPromotion: "select_promotion",
  /**
   * User views an item (Google default)
   */
  viewItem: "view_item",
  /**
   * User views a list of items or offerings (Google default)
   */
  viewItemList: "view_item_list",
  /**
   * User views a promotion (Google default)
   */
  viewPromotion: "view_promotion",
  /**
   * User submits a form or a request for information (Google default)
   */
  generateLead: "generate_lead",
  /**
   * User is marked as fitting the criteria to become a qualified lead (Google default)
   */
  qualifyLead: "qualify_lead",
  /**
   * User is marked as disqualified to become a lead for one of several reasons (Google default)
   */
  disqualifyLead: "disqualify_lead",
  /**
   * User contacts or is contacted by a representative (Google default)
   */
  working_lead: "working_lead",
  /**
   * User contacts or is contacted by a representative (Google default)
   */
  exception: "exception",
  /**
   * User views a page (Google default)
   */
  pageView: "page_view",
  /**
   * User cancels a purchase (custom)
   */
  purchaseCancel: "purchase_cancel",
  /**
   * User deletes a page (custom)
   */
  userPageDelete: "user_page_delete",
  /**
   * User turns a page as public (custom)
   */
  userTurnsPagePublic: "user_turns_page_private",
  /**
   * User turns a page as private (custom)
   */
  userTurnsPagePrivate: "user_turns_page_private",
} as const;

export const CAMPAIGN_ID_PARAM = "campaign_id";
export const CAMPAIGN_ORIGIN_PARAM = "campaign_origin";
