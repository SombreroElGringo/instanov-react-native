import uuid from 'uuid';

import { Storage } from '../helpers/firebase';
import { COLLECTION_USERS } from '../constants/Environment';
import { getCurrentUser } from '../helpers/firebase';

export const uploadImage = (uri, uid, collectionName) => {
  return new Promise(async (res, rej) => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        resolve(xhr.response);
      };
      xhr.onerror = function(e) {
        console.log(e);
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });

    const user = await getCurrentUser();
    if (COLLECTION_USERS === collectionName && user.photoURL) {
      await Storage.refFromURL(user.photoURL).delete();
    }

    const ref = Storage.ref(getUploadUri(collectionName, uid));
    const unsubscribe = ref.put(blob).on(
      'state_changed',
      state => {},
      err => {
        unsubscribe();
        rej(err);
      },
      async () => {
        unsubscribe();
        const url = await ref.getDownloadURL();
        res(url);
      },
    );
  });
};

const getUploadUri = (collectionName, uid) => `${collectionName}/${uid}/${uuid.v4()}.jpg`;
