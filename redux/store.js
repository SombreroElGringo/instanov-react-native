import {applyMiddleware, createStore} from "redux";
import thunk from 'redux-thunk'
import reducer from './reducer'

const enhancer = applyMiddleware(thunk);

const store = createStore(reducer, enhancer);

export default store;