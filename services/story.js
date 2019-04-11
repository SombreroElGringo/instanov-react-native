import { Firestore } from '../helpers/firebase';
import { getUserDeviceInfo } from '../helpers/userDeviceInfo';
import { getCurrentUser } from '../services/authentication';
import { uploadImage } from '../services/upload';
import { reduceImageAsync } from '../helpers/shrinkImage';
import { COLLECTION_STORIES } from '../constants/Environment';

export const createStory = async ({ text, image: localUri }) => {
  try {
    const { uri: reducedImage, width, height } = await reduceImageAsync(
      localUri,
    );

    const remoteUri = await uploadImageAsync(reducedImage);
    const user = await getCurrentUser();
    Firestore.collection(COLLECTION_STORIES).add({
      text,
      timestamp: Date.now(),
      imageWidth: width,
      imageHeight: height,
      image: remoteUri,
      user: {
        uid: user.uid,
        username: user.displayName,
        avatarUrl: user.photoURL,
      },
      deviceInfo: getUserDeviceInfo(),
    });
  } catch ({ message }) {
    alert(message);
  }
};

export const likeStory = (id,names) => {
	Firestore.collection(COLLECTION_STORIES).doc(id).update({names})
}

const uploadImageAsync = async (uri) => await uploadImage(uri, await getCurrentUserID(), COLLECTION_STORIES);
