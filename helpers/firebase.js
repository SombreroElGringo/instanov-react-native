import * as firebase from 'firebase';
import { FIREBASE_CONFIG } from '../constants/Environment';

if (!firebase.apps.length) {
  firebase.initializeApp(FIREBASE_CONFIG);
}

export const Authentication = firebase.auth();
