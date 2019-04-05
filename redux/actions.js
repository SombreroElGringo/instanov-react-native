import {Firestore} from "../helpers/firebase";
import {getDeviceName} from "../helpers/userDeviceInfo";
import {FETCH_STORIES, FETCH_STORIES_FAIL, FETCH_STORIES_SUCCESS, LIKE_POST} from "./constants";

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
		dispatch({type: LIKE_POST});
		let ref        = await Firestore.collection("stories").doc(id);
		let document   = await ref.get();
		let likes      = document.data().likes || [];
		let user = document.data().user;
		if (likes.includes(user.username))
			likes = likes.filter(l => l !== user.username);
		else
			likes.push(user.username);
		ref.update({
			likes,
		});
	} catch (error) {
		console.log(error.message);
	}

};
