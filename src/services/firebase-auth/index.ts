import { IUserCredentials } from "../../store/auth/types";
import { firebaseAuth } from "../../config/firebase/index";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  UserCredential,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
  OAuthProvider,
} from "firebase/auth";

export const signUp = async (
  credentials: IUserCredentials
): Promise<UserCredential> =>
  createUserWithEmailAndPassword(
    firebaseAuth,
    credentials.email,
    credentials.password
  );

export const signIn = async (
  credentials: IUserCredentials
): Promise<UserCredential> =>
  signInWithEmailAndPassword(
    firebaseAuth,
    credentials.email,
    credentials.password
  );

export const signOut = async () => {
  return firebaseAuth.signOut();
};

export const deleteUserAuth = async () => {
  return firebaseAuth.currentUser?.delete();
};

export const signInWithProvider = async (
  provider: GoogleAuthProvider | FacebookAuthProvider | OAuthProvider
): Promise<UserCredential> => {
  return signInWithPopup(firebaseAuth, provider);
};
