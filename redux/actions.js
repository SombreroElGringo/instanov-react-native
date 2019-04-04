import {DUMMY_ACTION, DUMMY_ASYNC_ACTION} from "./constants";

export const dummyAction = (...params) => ({
	type: DUMMY_ACTION,
	payload: 'dummy',
});

export const dummyAsyncAction = (...params) => dispatch => {
	dispatch({
		type: DUMMY_ASYNC_ACTION,
	});
};