import uuid from 'uuid';

import { Firestore } from '../helpers/firebase';
import { getUserInfo } from '../helpers/userDeviceInfo'
import { getCurrentUserID } from '../services/authentication';
import { uploadImage } from '../services/upload';
import { reduceImageAsync } from '../helpers/shrinkImage';

const COLLECTION_NAME = 'stories';

export const getStoriesByPagination = async ({size, start}) => {
  let ref = Firestore.collection(COLLECTION_NAME)
    .orderBy('timestamp', 'desc')
    .limit(size);

  try {

    if (start) {
      ref = ref.startAfter(start);
    }

    const querySnapshot = await ref.get();
    const data = [];
    querySnapshot.forEach(function(doc) {
      if (doc.exists) {
        const post = doc.data() || {};

        // Reduce the name
        const user = post.user || {};

        const name = user.deviceName;
        const reduced = {
          key: doc.id,
          name: (name || 'Anonymous').trim(),
          ...post,
        };
        data.push(reduced);
      }
    });

    const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
    return { data, cursor: lastVisible };

  } catch ({message}) {
    alert(message);
  }
}

export const createStory = async ({ text, image: localUri }) => {
  try {
    const { uri: reducedImage, width, height } = await reduceImageAsync(
      localUri,
    );

    const remoteUri = await uploadImageAsync(reducedImage);
    Firestore.collection(COLLECTION_NAME).add({
      text,
      uid: 123/*getCurrentUserID()*/, // TODO: edit when auth implemented
      timestamp: Date.now(),
      imageWidth: width,
      imageHeight: height,
      image: remoteUri,
      user: getUserInfo(),
    });
  } catch ({ message }) {
    alert(message);
  }
};

const uploadImageAsync = async (uri) => await uploadImage(uri, getUploadUri(getCurrentUserID()))

const getUploadUri = (uid) => `${COLLECTION_NAME}/${123/*uid*/}/${uuid.v4()}.jpg`; // TODO: edit when auth implemented
