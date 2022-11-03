import { IUserCredentials } from "../../store/auth/types";
import { firebaseAuth } from "../../config/firebase/index";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  UserCredential,
} from "firebase/auth";

export const signUp = async (
  credentials: IUserCredentials
): Promise<UserCredential> =>
  createUserWithEmailAndPassword(
    firebaseAuth,
    credentials.email,
    credentials.password
  );

export const signIn = async (credentials: IUserCredentials) =>
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
