import {Authentication, Firestore} from "../helpers/firebase";
import { uploadImage } from '../services/upload';
import { reduceImageAsync } from '../helpers/shrinkImage';
import { COLLECTION_STORIES, COLLECTION_USERS } from "../constants/Environment";

export const signUp = async (username, email, password) => {
  await Authentication.createUserWithEmailAndPassword(email, password);
  const user = await Authentication.currentUser;
  await user.updateProfile({displayName: username});
};

export const signIn = async (email, password) =>
  await Authentication.signInWithEmailAndPassword(email, password);

export const signOut = async () =>
  await Authentication.signOut();

export const saveNewUsername = async (user, newUsername) => {

  await Firestore.collection(COLLECTION_STORIES).where("user.username", "==", user.displayName).get()
  .then(snapshot => {
    snapshot.docs.map(doc => Firestore.collection(COLLECTION_STORIES)
    .doc(doc.id).update({"user.username": newUsername}));
  });
  await user.updateProfile({displayName: newUsername});
};

export const saveAvatar = async ({ image: localUri }) => {
  try {
    const { uri: reducedImage, width, height } = await reduceImageAsync(
      localUri,
    );

    const remoteUri = await uploadImage(reducedImage, await getCurrentUserID(), COLLECTION_USERS);

    const user = await getCurrentUser();
    await user.updateProfile({photoURL: remoteUri});

    await Firestore.collection(COLLECTION_STORIES).where("user.username", "==", user.displayName).get()
    .then(snapshot => {
      snapshot.docs.map(doc => Firestore.collection(COLLECTION_STORIES)
      .doc(doc.id).update({"user.avatarUrl": remoteUri}));
    });
  } catch ({ message }) {
    alert(message);
  }
};

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
