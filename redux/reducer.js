import {Map} from "immutable";
import {FETCH_STORIES, FETCH_STORIES_FAIL, FETCH_STORIES_SUCCESS, LIKE_POST} from "./constants";

const initialState = new Map({});

const handlers = {
	[FETCH_STORIES]: (state) => state.set("loading", true),
	[FETCH_STORIES_SUCCESS]: (state, action) => state.set("loading", false).set("posts", action.payload),
	[FETCH_STORIES_FAIL]: (state) => state.set("loading", false),
	[LIKE_POST]: (state, action) => state.update("posts", posts => {
		const index    = posts.findIndex(p => p.id === action.payload.id);
		const post     = posts[index];
		let likes      = post.likes || [];
		const username = action.payload.username;
		likes.includes(username)
			? likes = likes.filter(l => l !== username)
			: likes.push(username);
		post.likes   = likes;
		posts[index] = post;
		return [...posts];
	}),
};

export default (state = initialState, action) => typeof handlers[action.type] === "function" ? handlers[action.type](state, action) : state;