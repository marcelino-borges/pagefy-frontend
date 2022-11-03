import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import store from "../../store";
import { signInSuccess, signOutSuccess } from "../../store/auth/actions";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAnalytics = getAnalytics(firebaseApp);
export const firebaseAuth = getAuth();

onAuthStateChanged(firebaseAuth, (user) => {
  if (user) {
    user.getIdToken(true).then((token: any) => {
      store.dispatch(
        signInSuccess({
          accessToken: token,
          uid: user.uid,
        })
      );
    });
  } else {
    store.dispatch(signOutSuccess());
  }
});

export const getFirebaseToken = () =>
  firebaseAuth.currentUser?.getIdToken(true).then((token: any) => {
    if (token) {
      return token;
    }
    return null;
  });

export default firebaseConfig;
