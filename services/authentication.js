import { Authentication } from "../helpers/firebase";

export const signUp = async (email, password) =>
  await Authentication.createUserWithEmailAndPassword(email, password);

export const signIn = async (email, password) =>
  await Authentication.signInWithEmailAndPassword(email, password);

export const signOut = async () =>
  await Authentication.signOut();

export const isAuth = () =>
  new Promise((resolve, reject) =>
    Authentication.onAuthStateChanged(
      user => user ? resolve(true) : resolve(false)
    )
  );

export const getCurrentUser = async () =>
  await Authentication.currentUser();

export const getCurrentUserToken = async () =>
  await Authentication.currentUser.getIdToken();
