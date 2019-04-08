import {Authentication} from "../helpers/firebase";

export const signUp = async (username, email, password) => {
  await Authentication.createUserWithEmailAndPassword(email, password);
  const user = await Authentication.currentUser;
  await user.updateProfile({displayName: username});
};

export const signIn = async (email, password) =>
  await Authentication.signInWithEmailAndPassword(email, password);

export const signOut = async () =>
  await Authentication.signOut();

export const isAuth = () =>
  new Promise((resolve, reject) =>
    Authentication.onAuthStateChanged(
      function(user) { return user ? resolve(true) : resolve(false); }
    )
  );

export const getCurrentUser = async () =>
  await Authentication.currentUser;

export const getCurrentUserToken = async () =>
  await Authentication.currentUser.getIdToken();

  export const getCurrentUserID = async () =>
  await Authentication.currentUser.uid;

export const getCurrentUserDisplayName = () => Authentication.currentUser.displayName;
