import * as firebase from 'firebase';
require('firebase/firestore');
import { FIREBASE_CONFIG } from '../constants/Environment';

if (!firebase.apps.length) {
  firebase.initializeApp(FIREBASE_CONFIG);
}

export const Authentication = firebase.auth();

export const Firestore = firebase.firestore();

export const Storage = firebase.storage();

export const getCurrentUser = async () =>
	await Authentication.currentUser;