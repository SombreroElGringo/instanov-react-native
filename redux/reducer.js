import {Map} from "immutable";
import {FETCH_STORIES, FETCH_STORIES_FAIL, FETCH_STORIES_SUCCESS} from "./constants";

const initialState = new Map({});

const handlers = {
	[FETCH_STORIES]: (state) => state.set("loading", true),
	[FETCH_STORIES_SUCCESS]: (state, action) => state.set("loading", false).set("posts", action.payload),
	[FETCH_STORIES_FAIL]: (state) => state.set("loading", false),
};

export default (state = initialState, action) => typeof handlers[action.type] === "function" ? handlers[action.type](state, action) : state;