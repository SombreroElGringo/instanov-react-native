import { Firestore } from '../helpers/firebase';
import { getUserInfo } from '../helpers/userDeviceInfo'
import { getCurrentUserID } from '../services/authentication';
import { uploadImage } from '../services/upload';
import { reduceImageAsync } from '../helpers/shrinkImage';
import { COLLECTION_STORIES } from '../constants/Environment';

export const getStoriesByPagination = async ({size, start}) => {
  let ref = Firestore.collection(COLLECTION_STORIES)
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
          docId: doc.id,
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
    Firestore.collection(COLLECTION_STORIES).add({
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

export const likeStory = (id,names) => {
	Firestore.collection(COLLECTION_STORIES).doc(id).update({names})
}

const uploadImageAsync = async (uri) => await uploadImage(uri, 123/*getCurrentUserID()*/);// TODO: edit when auth implemented
