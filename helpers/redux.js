import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import * as actions from '../redux/actions'

/* decorator to connect component */
export const connected = (App) => connect(
	(state) => Array.from(state.keys()).reduce((res, a) => ({...res, [a]: state.get(a)}), {}),
	dispatch => bindActionCreators(Object.keys(actions).reduce((res, a) => ({...res, [a]: actions[a]}),{}), dispatch)
)(App);