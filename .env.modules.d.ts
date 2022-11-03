declare namespace NodeJS {
  export interface ProcessEnv {
    HOST: string;
    PORT?: string;
    REACT_APP_ENV?: string;
    REACT_APP_REGISTRATION_ENDPOINT?: string;
    REACT_APP_PAYMENTS_ENDPOINT?: string;
    REACT_APP_FIREBASE_API_KEY?: string;
    REACT_APP_FIREBASE_AUTH_DOMAIN?: string;
    REACT_APP_FIREBASE_PROJECT_ID?: string;
    FIREBASE_PROJECT_ID?: string;
    REACT_APP_FIREBASE_STORAGE_BUCKET?: string;
    REACT_APP_FIREBASE_MESSAGING_SENDER_ID?: string;
    REACT_APP_FIREBASE_APP_ID?: string;
    REACT_APP_FIREBASE_MEASUREMENT_ID?: string;
    REACT_APP_ALLOW_SIGNUP?: string;
    REACT_APP_ALLOW_PURCHASE?: string;
    REACT_APP_RECAPTCHA_SITE_KEY?: string;
    REACT_APP_STRIPE_PUBLIC_KEY?: string;
  }
}
