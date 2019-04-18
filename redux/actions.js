import {COLLECTION_STORIES} from "../constants/Environment";
import {Authentication, Firestore} from "../helpers/firebase";
import {getCurrentUserDisplayName} from "../services/authentication";
import {
	FETCH_STORIES,
	FETCH_STORIES_FAIL,
	FETCH_STORIES_SUCCESS,
	LIKE_POST,
	SEND_COMMENT,
	SEND_COMMENT_FAIL,
	SEND_COMMENT_SUCCESS,
} from "./constants";

export const fetchPosts = () => async (dispatch) => {
	try {
		dispatch({type: FETCH_STORIES});
		let query = Firestore
			.collection("stories")
			.orderBy("timestamp", "desc");
		await query.onSnapshot(documents => {
			dispatch({
				type: FETCH_STORIES_SUCCESS,
				payload: documents.docs.map(d => ({...d.data(), id: d.id})),
			});
		});
	} catch (error) {
		dispatch({
			type: FETCH_STORIES_FAIL,
			error,
		});
	}
};

export const likePost = (id) => async (dispatch) => {
	try {
		dispatch({type: LIKE_POST, payload: {id, username: await getCurrentUserDisplayName()}});
		let ref        = await Firestore.collection("stories").doc(id);
		let document   = await ref.get();
		let likes      = document.data().likes || [];
		const username = await getCurrentUserDisplayName();
		if (likes.includes(username))
			likes = likes.filter(l => l !== username);
		else
			likes.push(username);
		ref.update({
			likes,
		});
	} catch (error) {
		console.log(error.message);
	}

};

export const sendComment = (id, message) => async dispatch => {
	console.log({id, message});
	if (!id || !message) return false;
	dispatch({type: SEND_COMMENT});
	try {
		const {displayName, photoURL} = Authentication.currentUser;

		const comment                 = {username: displayName, comment: message, timestamp: Date.now(), avatar: photoURL};
		const ref                     = Firestore.collection(COLLECTION_STORIES).doc(id);
		const post                    = await ref.get();
		const comments                = post.get("comments") || [];
		comments.push(comment);
		ref.update({
			comments,
		});
		dispatch({type: SEND_COMMENT_SUCCESS});
	} catch (error) {
		console.log(error.message);
		dispatch({type: SEND_COMMENT_FAIL, error});
	}
};