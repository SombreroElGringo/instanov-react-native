import {Map} from 'immutable';
import {DUMMY_ACTION} from "./constants";

const initialState = new Map({
	dummy: undefined
});

const handlers = {
	[DUMMY_ACTION]: (state,action) => state.set('dummy', action.payload),
};

export default (state = initialState, action) => typeof handlers[action.type] === 'function' ? handlers[action.type](state,action) : state;