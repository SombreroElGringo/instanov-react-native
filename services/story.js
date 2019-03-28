import { Firestore } from '../helpers/firebase';

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
