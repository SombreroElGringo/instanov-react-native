import * as firebase from 'firebase';
import { FIREBASE_CONFIG } from '../constants/Environment';

if (!firebase.apps.length) {
  firebase.initializeApp(FIREBASE_CONFIG);
}

firebase.firestore().settings({ timestampsInSnapshots: true });

export const Authentication = firebase.auth();

export const Firestore = firebase.firestore();
