import { IDictionary } from "..";
import { RENDERED_PAGE_COMPONENT_HEIGHT } from "./../../constants/index";

export const en: IDictionary = {
  hide: "Hide",
  activate: "Activate",
  inactivate: "Inactivate",
  checkOurPlans: "Check our plans",
  youAreSpecial: "You can be special too!",
  ok: "OK",
  recurrency: {
    title: "Recurrency",
    monthly: "Monthly",
    month: "Month",
    yearly: "Yearly",
    year: "Year",
  },
  home: "Home",
  pages: "Pages",
  theme: "Theme",
  statistics: "Statistics",
  support: "Support",
  supportDescription:
    "Contact us and our team will get in touch as soon as possible.",
  toGetSupport: "to get our support.",
  pageNotFound: "There's nothing here!",
  getInTouch: "Get in touch",
  views: "Views",
  image: "Image",
  text: "Text",
  textImage: "Image & Text",
  icon: "Icon",
  video: "Video",
  launch: "Launch",
  textOverImage: "Text over image",
  unknown: "Unknown",
  columns: "Columns",
  rows: "Rows",
  clicks: "Clicks",
  type: "Type",
  backgroundColor: "Background color",
  fontColor: "Font color",
  fillColor: "Fill color",
  uploadImage: "Upload image",
  uploadBackgroundImage: "Upload background image",
  chooseEffect: "Choose effect",
  toggleVisibility: "Toggle visibility",
  makePagePublic: "Make page visible to your audience",
  makePagePrivate: "Make page invisible to your audience",
  remove: "Remove",
  removeExisting: "Remove Existing",
  tools: {
    button: {
      name: "Button",
      dialogTitle: "Create a Button",
      typeHelpText:
        "Your button may be only of a single type. It may have only text with no image, both text and image or only image. Text over image will put the image as background and the text in an absolute position over it.",
      columnsHelpText:
        "Every page may be divided in up to two sections (columns) and your button may occupy one (half) or two of them (full).",
      rowsHelpText: `Your button may occupy the space of one to 8 rows. Multiply the amount of rows by ${RENDERED_PAGE_COMPONENT_HEIGHT} and you will have the total height of your button (in pixels).`,
      borderRadiusHelpText:
        "Your button may have different pre-defined border radius.",
      shadowHelpText: "Your button may have different pre-defined shadows.",
      shadowStyles: {
        none: "None",
        smooth: "Smooth",
        normal: "Normal",
        hard: "Hard",
        extreme: "Extreme",
      },
    },
    icon: {
      name: "Icon",
    },
    video: {
      name: "Video",
    },
    launch: {
      name: "Launch",
    },
    whatsapp: {
      name: "Whatsapp",
    },
    map: {
      name: "Map",
      textfieldMapUrlLabel: "Google Maps URL",
    },
    spotify: {
      name: "Spotify",
      textfieldSpotifyUrlLabel: "Spotify URL",
    },
    progressBar: {
      name: "Progress Bar",
      textfieldProgressLabel: "Progress value",
    },
    counters: {
      name: "Counters",
      textfieldCounterLabel: "Counter",
      number: "Number",
      label: "Label",
    },
  },
  removeIcon: "Remove Icon",
  removeComponent: "Remove Component",
  removePage: "Remove Page",
  iconName: "Icon name",
  back: "Back",
  cancel: "Cancel",
  confirm: "Confirm",
  add: "Add",
  mountURL: "Mount URL",
  searchIconMinCaracters: "Search must have at least 3 caracters.",
  url: "URL",
  invalidUrl: "Invalid URL",
  hasToBeYoutubeVideo: "Has to be a YouTube video",
  colorPicker: "Pick a color",
  removeComponentConfirmation: "Do you really wish to remove this component?",
  removeIconConfirmation: "Do you really wish to remove this icon?",
  removePageConfirmation: "Do you really want to remove this page?",
  removeUserConfirmation: "Do you really want to remove your account?",
  yes: "Yes",
  no: "No",
  or: "or",
  and: "and",
  fileHandling: {
    chooseFile: "Choose a file",
    chooseImage: "Choose an image",
    dragAndDropYourImage: "Drag and drop your image here",
    dropYourImageHere: "Drop your image here",
    fileReadyToUpload: "File ready to upload",
    fileDeletedSuccessfully: "File deleted successfully",
    errorToDeleteFile: "Failed to delete the file.",
  },
  clickToSearchIt: "Click to search",
  next: "Next",
  webSiteExample: "https://www.mywebsite.com",
  send: "Send",
  scheduleComponentVisibleDate: "Schedule visibility",
  scheduleComponentVisibleDateInstructions:
    "Your link will be visible from this date on.",
  save: "Save",
  date: "Date",
  hour: "Hour",
  time: "Time",
  urlRequired: "URL required",
  textInComponentRequired: "Required for this component",
  imageInComponentRequired: "Choose an image to your component",
  selectAllOptions: "Select all the options!",
  videoUrl: "Video URL",
  videoComponentDescription:
    "Your video will ocupy 2 columns and 2 rows in your landing page",
  youtubeUrlExample: "https://www.youtube.com/embed/Lq2lNYKYpYw",
  youtubeIdExample: "Lq2lNYKYpYw",
  youtubeVideoId: "Youtube video ID",
  youtubeIdInstructions:
    "Access the YouTube video you want to add to your page and copy it's URL to here",
  mapsInstructions:
    "Open the place you want in Google Maps, copy the URL of the browser where the map is open and paste here.",
  spotifyInstructions:
    'Open Spotify, find the playlist, artist, album or track you want, click on the "...", select "Share" and then "Copy link to XXX". Then past the URL here.',
  clickHere: "Click here",
  step: "Step",
  share: "Share",
  understood: "Got it",
  invalidId: " Invalid ID",
  warningPrivatePage: "This page is not publicly available.",
  create: "Create",
  chooseOneToCreate: "Choose one to create",
  createPage: "Create Page",
  pageName: "Page name",
  pageUrl: "Page URL",
  requiredField: "Required field",
  requiredFields: "Required fields",
  pageUrlExample: "/unique-name-of-your-page",
  createPageError: {
    pageUrlBadFormat:
      "Badly formatted URL. It must have more than 3 characters and it's allowed only letters and hyphens, like this: /my-page",
    cannotContainWhiteSpaces: "Cannot contain white spaces",
  },
  launchMessageLabel: "Message",
  launchMessageExample: "for the innauguration of our shop!",
  launchComponentInstructions:
    "There will be a clock with a countdown in your page, showing how long it is to reach the date/time informed here, followed by a message above it.",
  launchDateTimeBeforeToday: "Must be future",
  days: "days",
  hours: "hours",
  minutes: "minutes",
  minutesAbbreviated: "min",
  secondsAbbreviated: "sec",
  seconds: "seconds",
  launchPrefixText: "It's left",
  chooseAnimation: "Choose animation",
  mountWhatsappURL: "Mount Whatsapp URL",
  selectAnOption: "Select an option",
  selectACurrency: "Select a currency",
  selectARecurrency: "Select a recurrency",
  duration: "Duration",
  startDelay: "Start delay",
  animation: "Animation",
  animationInstruction: "Simulation of your component",
  noAnimation: "No animation",
  repeatInfinitely: "Repeat infinitely",
  firstName: "First name",
  lastName: "Last name",
  name: "Name",
  password: "Password",
  confirmPassword: "Confirm Password",
  email: "Email",
  agreeWith: "Agree with",
  termsOfUse: "Terms of use",
  terms: "Terms",
  termsOfUseSubtitle: "Understand our termos of use",
  privacyPolicies: "Privacy Policies",
  privacyPoliciesSubtitle: "Understand our privacy policies",
  privacy: "Privacy",
  cookies: "Cookies",
  cookiesPolicies: "Cookies Policies",
  cookiesPoliciesSubtitle: " Understand our Cookies Policies",
  cookiesConsent:
    "We use Cookies and other technologies belonging to us and third parties to enable our website to function correctly and securely, and to personalize its content. We also use Cookies to analyze user browsing and adjust advertising to the user’s tastes and preferences.",
  wishesCommunications: "Wish to receive communcations by email",
  register: "Register",
  registerImperative: "Register",
  createYourAccount: "Create your account",
  signUp: "Sign Up",
  signIn: "Sign In",
  signIn2: "Sign In",
  accessAccount: "Access your account",
  welcomeBack: "Welcome back!",
  fillDataToAccessAccount: "Fill your credentials to access your account!",
  fillYourPersonalData: "Fill your personal data",
  emailExample: "email@example.com",
  passwordRequirements:
    "Password requirements: \n * Minimum 8 characters \n * At least 1 lowercase letter \n * At least 1 number",

  requiredPrivacyAccept: "You must accept terms and privacy to continue.",
  authErrors: {
    urlAlreadyExists: "URl already exists.",
    userAlreadyExists: "User already exists, try another email.",
    invalidCredentials: "Invalid password.",
    userNotFound: "User not found.",
    weakPassword: "Weak password.",
    invalidEmail: "Invalid email",
    passwordMustAttendRequirements:
      "Password must attend minimum requirements.",
    invalidToken: "Authentication error. Try to sign in again.",
    signInAgain: "Please sign in again",
    notAllowed: "Not allowed",
    accountExistsWithDifferentCredential:
      "Account exists, but it has another sign in method. Try again with the right sign in method.",
  },
  generalErrors: {
    errorSignUp: "Error creating your account.",
    errorSignIn: "Error to sign in.",
    errorSignOut: "Error to sign out.",
    unknownError: "Unknown error.",
    internalError: "Internal error.",
    signUpNotAllowed: "Socialbio isn't available to the public yet.",
    unexpectedERror: "Sorry, we had an unexpected error.",
  },
  profile: "Profile",
  profileSubtitle: "Check and update your personal data here",
  signOut: "Sign Out",
  noAccountYet: "I have no account",
  alreadyHaveAccount: "I already have an account",
  couldntFindPage: "Couldn't find the page",
  maximumFileSizeOf: "Maximum allowed size of the file is",
  viewPage: "View page",
  duplicate: "Duplicate",
  animations: {
    bounce: "Bounce",
    bounceIn: "Bounce In",
    bounceInDown: "Bounce In Down",
    bounceInLeft: "Bounce In Left",
    bounceInRight: "Bounce In Right",
    bounceInUp: "Bounce In Up",
    bounceOut: "Bounce Out",
    bounceOutDown: "Bounce Out Down",
    bounceOutLeft: "Bounce Out Left",
    bounceOutRight: "Bounce Out Right",
    bounceOutUp: "Bounce Out Up",
    fadeIn: "Fade In",
    fadeInDown: "Fade In Down",
    fadeInDownBig: "Fade In Down Big",
    fadeInLeft: "Fade In Left",
    fadeInLeftBig: "Fade In Left Big",
    fadeInRight: "Fade In Right",
    fadeInRightBig: "Fade In Right Big",
    fadeInUp: "Fade In Up",
    fadeInUpBig: "Fade In Up Big",
    fadeOut: "Fade Out",
    fadeOutDown: "Fade Out Down",
    fadeOutDownBig: "Fade Out Down Big",
    fadeOutLeft: "Fade Out Left",
    fadeOutLeftBig: "Fade Out Left Big",
    fadeOutRight: "Fade Out Right",
    fadeOutRightBig: "Fade Out Right Big",
    fadeOutUp: "Fade Out Up",
    fadeOutUpBig: "Fade Out Up Big",
    flash: "Flash",
    flip: "Flip",
    flipInX: "Flip In X",
    flipInY: "Flip In Y",
    flipOutX: "Flip Out X",
    flipOutY: "Flip Out Y",
    headShake: "Head Shake",
    hinge: "Hinge",
    jello: "Jello",
    lightSpeedIn: "Light Speed In",
    lightSpeedOut: "Light Speed Out",
    pulse: "Pulse",
    rollIn: "Roll In",
    rollOut: "Roll Out",
    rotateIn: "Rotate In",
    rotateInDownLeft: "Rotate In Down Left",
    rotateInDownRight: "Rotate In Down Right",
    rotateInUpLeft: "Rotate In Up Left",
    rotateInUpRight: "Rotate In Up Right",
    rotateOut: "Rotate Out",
    rotateOutDownLeft: "Rotate Out Down Left",
    rotateOutDownRight: "Rotate Out Down Right",
    rotateOutUpLeft: "Rotate Out Up Left",
    rotateOutUpRight: "Rotate Out Up Right",
    rubberBand: "Rubber Band",
    shake: "Shake",
    slideInDown: "Slide In Down",
    slideInLeft: "Slide In Left",
    slideInRight: "Slide In Right",
    slideInUp: "Slide In Up",
    slideOutDown: "Slide Out Down",
    slideOutLeft: "Slide Out Left",
    slideOutRight: "Slide Out Right",
    slideOutUp: "Slide Out Up",
    swing: "Swing",
    tada: "Ta-da!",
    wobble: "Wobble!",
    zoomIn: "Zoom In",
    zoomInDown: "Zoom In Down",
    zoomInLeft: "Zoom In Left",
    zoomInRight: "Zoom In Right",
    zoomInUp: "Zoom In Up",
    zoomOut: "Zoom Out",
    zoomOutDown: "Zoom Out Down",
    zoomOutLeft: "Zoom Out Left",
    zoomOutRight: "Zoom Out Right",
    zoomOutUp: "Zoom Out Up",
  },
  recommended: "Recommended",
  checkout: "Checkout",
  createNowYour: "Create now your",
  bio: "bio",
  forYourSocialMedia: "for your social media",
  landingPage: "landing page",
  forYourProductOrBusiness: "for your product or business",
  dependOnNoneToReleaseCreativity:
    "Release your creativity depending on NOBODY!",
  haveAccessToPremiumResources:
    "Access premium resources with a low investment!",
  differentiate: "Differentiate from the others!",
  getAPlanNow: "Get a plan now!",
  yourPlanIs: "Your plan is",
  thePlanYouSelectedIs: "The plan you selected is",
  youreCloserNowBecomeSubscriber:
    "You're closer now to become a privileged subscriber",
  nowChooseTheRecurrency:
    "Now you only need to choose a recurrency (with or without the year discount)",
  nowItsTimeToSubscribe: "Now it's time to finish your subscription",
  subscription: "Subscription",
  noSubscriptions: "No subscriptions",
  subscriptionPayment: {
    succeeded: "Subscription payment succeeded!",
    processing: "Your payment is processing.",
    failed: "Your payment was not successful, please try again.",
    declined: "Your payment was declined. Please check it with your bank.",
    userAbort: "Payment aborted. Try again.",
    processingError: "Sorry, we had a technical error.",
    somethingWentWrong: "Something went wrong.",
    cardNumberIncomplete: "Card number imcomplete.",
    paymentAlreadySucceeded:
      "You cannot confirm this PaymentIntent because it has already succeeded after being previously confirmed.",
    changeRecurrency: "Change recurrency",
    trustWarning: "Don't worry, your payment will be processed exclusively via",
    youHaveNoFinanceHistory: "You have no payments or subscriptions history.",
    errorOnPaymentClientSecret:
      "Error loading payment. Please refresh the page and try again.",
    subscriptionStatuses: {
      incomplete: "Incomplete",
      canceled: "Canceled",
      paid: "Paid",
      succeeded: "Succeeded",
    },
    amountPaid: "Amount paid",
  },
  upgradeYourPlan: "Upgrade your plan",
  plan: "Plan",
  freePlan: {
    name: "Free",
    benefits: [
      "Register with no credit card",
      "Create a single marvelous bio for you",
      "Create unlimited buttons in your bio",
      "Create unlimited icons in your bio",
      "Create unlimited videos in your bio",
      "Create unlimited launchs in your bio",
      "Share with no limits",
      "Embed any Youtube video",
      "Use an unique link for your bio",
      "Customize colors for each background and text",
    ],
  },
  vipPlan: {
    name: "Vip",
    benefits: ["Create until 5 bios", "Use animations in your components"],
  },
  platinumPlan: {
    name: "Platinum",
    benefits: [
      "Special and prioritized support",
      "Create as many bios as you want",
      "Apply animations to your components",
      "Schedule when a component gets publicly visible",
      "Analyse how your bio is performing using our analytics (clicks, loadings etc.)",
      "Insert your own custom Javascript code to your bio",
    ],
  },
  currency: "U$",
  year: "year",
  purchase: "Purchase",
  andWinAVipPlanFor: "and win a VIP plan for",
  sorryThisIsNotAvailable: "Sorry, this is not available yet",
  soon: "Soon...",
  faq: {
    menu: "FAQ",
    title: "Frequent Questions",
    description: "Find here the most common questions people ask.",
    stillNeedHelp: "Do you still need help?",
  },
  createNowYourPage: "Create now your page!",
  successUpdatePage: "Page updated successfully!",
  errorUpdatePage: "Failed to update page.",
  successUpdateUser: "User updated successfully!",
  successRemoveComponent: "Componente removido com sucesso!",
  errorRemoveComponent: "Falha ao remover componente.",
  errorUpdateUser: "Error updating user.",
  sorry: "Sorry",
  pagePreview: "Page Preview",
  message: "Message",
  messageExample:
    "Hi! This is Maria. What's up? I'm reaching you because I have a business opportunity for you!",
  errorSendingSupportContact: "Error sending email to support.",
  successSendingSupportContact: "Message sent successfully!",
  errorRecaptchaValidation:
    "Are you really a human? Error to validate your action.",
  goToHomePage: "Go to Homepage",
  goToPages: "Go to my Pages",
  webiseCreatedBy: "Website created by",
  allRightsReserved: "All rights reserved",
  about: "About",
  company: "Company",
  legal: "Legal",
  deleteAccount: "Delete account",
  delete: "Delete",
  deleteAccountSuccess: "Account successfuly deleted.",
  deleteAccountError: "Fail to delete the account.",
  plansBlockings: {
    yourPlanDoesntAllowCreateNewPage:
      "Your plan doesn't allow creating a new page",
    yourPlanDoesntAllowAnimation: "Your plan doesn't allow animation",
    yourPlanDoesntAllowComponentScheduling:
      "Your plan doesn't allow scheduling components",
  },
  somethingWentWrong: "Oh no! Something went wrong!",
  testimonials: {
    testimonialsTitle: "Testimonials",
    testimonialsSubtitle: "Check out what people are talking about us",
    userTestimonials: "My testimonials",
    testimonials: "Testimonials",
    userTestimonialsSubtitle: "Check out all testimonials you have submitted",
    noTestimonials: "No testimonials",
    createANewTestimonial: "Create testimonial",
    editATestimonial: "Edit testimonial",
    zeroRatingDialogTitle: "Confirm rating",
    deleteDialogTitle: "Confirm deletion",
    zeroRatingDialogText:
      "Do you really want to rate SocialBio with 0 or have you forgotten to select your rating?",
    deleteDialogText: "Do you really want to delete your testimonial?",
    leaveTestimonial: "Leave testimonial",
  },
  yourGallery: "Your gallery",
  fromYourGalleryOrTemplates: "From your gallery or our templates",
  orUploadANewFile: "Or upload a new image",
  orFromYourDevice: "Or from your device",
  componentBorderRadius: "Border Radius",
  borders: "Borders",
  shadow: "Shadow",
  customScripts: {
    insertCustomScript: "Insert a custom script",
    customScriptDescription:
      "Use these fields if you're an advanced user, to run custom Javascript code in your bio.",
    headerScript: "Script for the Header",
    endBodyScript: "Script after body",
    scriptNotValidated: "Script didn't pass our validation.",
  },
  personalData: "Personal",
  finance: {
    title: "Finance",
    subtitle: "Find here your payment history",
    profileTableHeaders: {
      plan: "Plan",
      startDate: "Start",
      endDate: "End",
      status: "Status",
    },
  },
  phoneNumber: "Phone Number",
  color: "Color",
  home2: {
    mainHeader: "Everything you do. Simple and straight forward.",
    mainSubheader: "Show the world the content only you know how to do.",
    buttonCreateFreeAccount: "Create my free account",
    earnSubscriptionLifetime: ["Earn a lifetime", "subscription"],
    areYouGonnaLoseIt: "Are you gonna lose it?",
    tripleTitles: [
      "For you or your company",
      "Exclusive interactive resources",
    ],
    iconTextCards: [
      {
        title: "Show your videos",
        subtitle:
          "Present your most important videos in a quicker and simpler way",
      },
      {
        title: "Customize colors and layout",
        subtitle:
          "Create your bio with your style, set colors, images and components",
      },
      {
        title: "Share wherever you want",
        subtitle: "Show all your followers the amazing content you have!",
      },
    ],
    section1: {
      title: "The best way to share your content",
      subtitle:
        "Follow up analytics about your links, schedule events, show videos and guide your audience to the right content.",
      button: ["Earn my lifetime", "subscription now!"],
    },
    section2: {
      title: "Manage all your content from a single workspace.",
      chips: [
        "Platinum lifetime subscription",
        "Unlimited team members",
        "Cancel anytime",
      ],
    },
    section3: {
      title: "What do our customers talk about us?",
    },
  },
  signInWith: "Sign in with",
};
