import uuid from 'uuid';

import { Storage } from '../helpers/firebase';
import { COLLECTION_STORIES } from '../constants/Environment';

export const uploadImage = (uri, uid) => {
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

    const ref = Storage.ref(getUploadUri(uid));
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
}

const getUploadUri = (uid) => `${COLLECTION_STORIES}/${uid}/${uuid.v4()}.jpg`;
