export const LETTER_WIDTH = 15;
export const IMAGE_EXTENSIONS = "image/gif,image/jpeg,image/png,image/webp";
export const YOUTUBE_EMBED_PREFIX = "https://www.youtube.com/embed/";
export const YOUTUBE_SHORT_URL_IDENTIFIER = "youtu.be/";
export const YOUTUBE_FULL_URL_IDENTIFIER = "watch?v=";
export const YOUTUBE_EMBED_URL_IDENTIFIER = "/embed/";
export const RENDERED_PAGE_COMPONENT_HEIGHT = 56;
export const RENDERED_PAGE_COMPONENT_RADIUS = 6;
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
